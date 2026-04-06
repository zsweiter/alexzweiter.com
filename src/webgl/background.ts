import * as THREE from "three";

export class NebulaBackground {
    private scene = new THREE.Scene();
    private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    private renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false
    });

    private material: THREE.ShaderMaterial | null = null;
    private clock = new THREE.Clock();
    private rafId: number | null = null;
    private handlers: Array<() => void> = [];
    private _isMounted = false;

    private audioAnalyser: AnalyserNode | null = null;
    private audioDataArray: Uint8Array = new Uint8Array();
    private audioContext: AudioContext | null = null;
    private mediaElement: HTMLAudioElement | null = null;
    private audioCtx: AudioContext | null = null;
    private audioSource: AudioBufferSourceNode | null = null
    private gainNode: GainNode | null = null;

    private mouse = new THREE.Vector2(0.5, 0.5);
    private targetMouse = new THREE.Vector2(0.5, 0.5);
    private scrollOffset = new THREE.Vector2(0, 0);
    private targetScrollOffset = new THREE.Vector2(0, 0);
    private translateTarget = new THREE.Vector2(0, 0);
    private tmpVec = new THREE.Vector2();

    private zoomTarget = 1.0;
    private zoomSpeed = 0.02;
    private zoomCompleteEmitted = false;

    private textureLoader = new THREE.TextureLoader();
    private textureCache = new Map<string, THREE.Texture<HTMLImageElement>>();
    private isSwapping = false;
    public currentTextureUrl: string | null = null;

    public readonly MAIN_TEXTURE = "/textures/vibrant-liquid.jpg";
    public readonly OPTIONAL_TEXTURE = "/textures/abstract.jpg";
    public readonly MUSIC_TEXTURE = "/textures/vibrant-liquid.jpg";

    public constructor() { }

    public setup(target: HTMLElement) {
        if (this._isMounted) return;

        target.appendChild(this.renderer.domElement);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const uniforms = {
            uTime: { value: 0 },
            uOpacity: { value: 0 },
            uZoom: { value: 0.05 },
            uAudio: { value: 0 },
            uWave: { value: 0.0 },
            textureOne: { value: null as THREE.Texture | null },
            textureTwo: { value: null as THREE.Texture | null },
            textureSwap: { value: 0.0 }, // 0.0 = tex1, 1.0 = tex2
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uImageRes1: { value: new THREE.Vector2(1, 1) },
            uImageRes2: { value: new THREE.Vector2(1, 1) }
        };

        this.loadTexture(this.MAIN_TEXTURE).then(texture => {
            this.currentTextureUrl = this.MAIN_TEXTURE;
            uniforms.textureOne.value = texture;
            uniforms.textureTwo.value = texture; // Fallback inicial
            uniforms.uImageRes1.value.set(texture.image.width, texture.image.height);
            uniforms.uImageRes2.value.set(texture.image.width, texture.image.height);

            this.initMesh(uniforms);
            this.playIntro();
            this.animate();
        });

        this.bindEvents(uniforms);
        this._isMounted = true;
    }


    public loadTexture(url: string): Promise<THREE.Texture<HTMLImageElement>> {
        if (this.textureCache.has(url)) {
            return Promise.resolve(this.textureCache.get(url)!);
        }

        return new Promise((resolve, reject) => {
            this.textureLoader.load(
                url,
                (texture) => {
                    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
                    texture.generateMipmaps = true;
                    texture.minFilter = THREE.LinearMipmapLinearFilter;
                    this.textureCache.set(url, texture);
                    resolve(texture);
                },
                undefined,
                (err) => reject(err)
            );
        });
    }

    public preloadTextures(urls: string[]) {
        urls.forEach(url => this.loadTexture(url).catch(() => { }));
    }

    public async transitionToTexture(url: string, duration = 1.5) {
        if (!this.material || this.isSwapping || url === this.currentTextureUrl) return;

        this.isSwapping = true;
        this.currentTextureUrl = url;
        const newTexture = await this.loadTexture(url);

        const uniforms = this.material.uniforms;
        uniforms.textureTwo.value = newTexture;
        uniforms.uImageRes2.value.set(newTexture.image.width, newTexture.image.height);
        uniforms.textureSwap.value = 0.0;

        let startTime: number | null = null;

        const animateFade = (now: number) => {
            if (!startTime) startTime = now;
            const elapsed = (now - startTime) / 1000;
            const t = Math.min(elapsed / duration, 1.0);

            const progress = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            uniforms.textureSwap.value = progress;

            if (t < 1.0) {
                requestAnimationFrame(animateFade);
            } else {
                uniforms.textureOne.value = newTexture;
                uniforms.uImageRes1.value.copy(uniforms.uImageRes2.value);

                requestAnimationFrame(() => {
                    uniforms.textureSwap.value = 0.0;
                    this.isSwapping = false;
                });
            }
        };

        requestAnimationFrame(animateFade);
    }

    private initMesh(uniforms: any) {
        const geo = new THREE.PlaneGeometry(2, 2);

        this.material = new THREE.ShaderMaterial({
            uniforms,
            transparent: true,
            blending: THREE.AdditiveBlending,
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                precision mediump float;

                uniform sampler2D textureOne;
                uniform sampler2D textureTwo;
                uniform float textureSwap;

                uniform float uTime;
                uniform float uOpacity;
                uniform float uZoom;
                uniform float uAudio;
                uniform float uWave;

                uniform vec2 uMouse;
                uniform vec2 uResolution;
                uniform vec2 uImageRes1;
                uniform vec2 uImageRes2;

                varying vec2 vUv;

                vec2 getCoverUv(vec2 uv, vec2 res, vec2 img){
                    vec2 r = vec2(
                        min((res.x/res.y)/(img.x/img.y), 1.0),
                        min((res.y/res.x)/(img.y/img.x), 1.0)
                    );
                    return uv * r + (1.0 - r) * 0.5;
                }

                mat2 rot(float a){
                    float s = sin(a);
                    float c = cos(a);
                    return mat2(c, -s, s, c);
                }

                void main(){
                    vec2 uv1 = getCoverUv(vUv, uResolution, uImageRes1);
                    vec2 uv2 = getCoverUv(vUv, uResolution, uImageRes2);

                    float z1 = mix(1.0, 1.15, textureSwap) * uZoom;
                    float z2 = mix(0.85, 1.0, textureSwap) * uZoom;

                    uv1 = (uv1 - 0.5) * z1 + 0.5;
                    uv2 = (uv2 - 0.5) * z2 + 0.5;

                    uv1 = rot( 0.02 * textureSwap) * (uv1 - 0.5) + 0.5;
                    uv2 = rot(-0.02 * (1.0 - textureSwap)) * (uv2 - 0.5) + 0.5;

                    vec2 dUv1 = uv1 + vec2(uTime * 0.05, -uTime * 0.03);
                    vec2 dUv2 = uv2 + vec2(-uTime * 0.04, uTime * 0.02);
                    
                    vec4 disp1 = texture2D(textureOne, dUv1);
                    vec4 disp2 = texture2D(textureTwo, dUv2);
                    vec4 disp = mix(disp1, disp2, textureSwap);

                    float dist = distance(vUv, uMouse);
                    float mouseGlow = smoothstep(0.4, 0.0, dist);

                    vec2 offset = (disp.rg - 0.5) * (0.04 + mouseGlow * 0.08);
                    offset += uAudio * 0.1;

                    // Wave distortion effect
                    float waveStrength = uWave * 0.15;
                    vec2 center = vec2(0.5, 0.5);
                    float distFromCenter = length(vUv - center);
                    float wave = sin(distFromCenter * 20.0 - uTime * 3.0) * waveStrength;
                    offset += vec2(wave, wave * 0.5);

                    uv1 += offset;
                    uv2 += offset;

                    vec4 c1 = texture2D(textureOne, uv1);
                    vec4 c2 = texture2D(textureTwo, uv2);
                    vec4 base = mix(c1, c2, textureSwap);

                    float noise = sin((vUv.x + offset.x) * 10.0 + uTime) * sin((vUv.y + offset.y) * 10.0);
                    base.rgb += noise * 0.05;
                    base.rgb += mouseGlow * 0.15;
                    base.rgb *= 1.0 - length(vUv - 0.5) * 0.7;

                    gl_FragColor = vec4(base.rgb, uOpacity);
                }
            `
        });

        const mesh = new THREE.Mesh(geo, this.material);
        this.scene.add(mesh);
    }

    private bindEvents(uniforms: any) {
        const onMouseMove = (e: MouseEvent) => {
            this.targetMouse.x = e.clientX / window.innerWidth;
            this.targetMouse.y = 1.0 - e.clientY / window.innerHeight;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (!e.touches.length) return;
            this.targetMouse.x = e.touches[0].clientX / window.innerWidth;
            this.targetMouse.y = 1.0 - e.touches[0].clientY / window.innerHeight;
        };

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    this.targetScrollOffset.x = scrollY * 0.003;
                    this.targetScrollOffset.y = scrollY * 0.002;
                    ticking = false;
                });
                ticking = true;
            }
        };

        const onResize = () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            if (this.material) {
                this.material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

        this.handlers.push(
            () => window.removeEventListener('mousemove', onMouseMove),
            () => window.removeEventListener('touchmove', onTouchMove),
            () => window.removeEventListener('scroll', onScroll),
            () => window.removeEventListener('resize', onResize)
        );
    }

    private animate = () => {
        this.rafId = requestAnimationFrame(this.animate);

        if (!this.material) return;

        const elapsed = this.clock.getElapsedTime();
        const cycleDuration = 20;

        const uTime = (25) * (0.5 + 0.5 * Math.sin((elapsed / cycleDuration) * Math.PI * 2));

        this.mouse.lerp(this.targetMouse, 0.05);
        this.scrollOffset.lerp(this.targetScrollOffset, 0.05);
        this.translateTarget.copy(this.scrollOffset);

        this.material.uniforms.uTime.value = uTime;
        this.material.uniforms.uOpacity.value += (1 - this.material.uniforms.uOpacity.value) * 0.03;

        this.tmpVec.copy(this.mouse).add(this.translateTarget);
        this.material.uniforms.uMouse.value.copy(this.tmpVec);

        const z = this.material.uniforms.uZoom.value;
        this.material.uniforms.uZoom.value += (this.zoomTarget - z) * this.zoomSpeed;

        if (!this.zoomCompleteEmitted && Math.abs(z - this.zoomTarget) < 0.01) {
            this.zoomCompleteEmitted = true;
            window.dispatchEvent(new Event('zoomComplete'));
        }

        if (this.audioAnalyser) {
            this.audioAnalyser.getByteFrequencyData(this.audioDataArray as any);
            let sum = 0;
            for (let i = 0; i < this.audioDataArray.length; i++) sum += this.audioDataArray[i];
            const avg = sum / this.audioDataArray.length / 255;
            this.material.uniforms.uAudio.value += (avg - this.material.uniforms.uAudio.value) * 0.1;
        }

        this.renderer.render(this.scene, this.camera);
    };

    public zoomIn(duration = 1.2, targetZoom = 1.1) {
        if (!this.material) return;
        
        this.zoomCompleteEmitted = false;
        this.zoomTarget = targetZoom;
        this.zoomSpeed = 0.04;

        setTimeout(() => {
            this.zoomTarget = 1.0;
            this.zoomSpeed = 0.02;
        }, duration * 700);
    }

    public zoomOut(duration = 1.2, targetZoom = 0.65) {
        if (!this.material) return;
        
        this.zoomCompleteEmitted = false;
        this.zoomTarget = targetZoom;
        this.zoomSpeed = 0.03;
    }

    public async disperseTexture(duration = 1.5) {
        if (!this.material || this.isSwapping) return;
        
        this.isSwapping = true;
        const uniforms = this.material.uniforms;
        
        const startZoom = uniforms.uZoom.value;
        const startOpacity = uniforms.uOpacity.value;
        const startWave = uniforms.uWave.value;
        
        const startTime = performance.now();
        
        const animateDisperse = (now: number) => {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / (duration * 1000), 1.0);
            
            const easeInExpo = t === 0 ? 0 : Math.pow(2, 10 * t - 10);
            
            uniforms.uZoom.value = startZoom + (0.5 - startZoom) * easeInExpo;
            uniforms.uOpacity.value = startOpacity + (0.3 - startOpacity) * easeInExpo;
            uniforms.uWave.value = startWave + (1.0 - startWave) * easeInExpo;
            
            if (t < 1.0) {
                requestAnimationFrame(animateDisperse);
            } else {
                this.isSwapping = false;
            }
        };
        
        requestAnimationFrame(animateDisperse);
    }

    public async restoreFromDisperse(duration = 1.5) {
        if (!this.material) return;
        
        const uniforms = this.material.uniforms;
        const startZoom = uniforms.uZoom.value;
        const startOpacity = uniforms.uOpacity.value;
        const startWave = uniforms.uWave.value;
        
        this.zoomCompleteEmitted = false;
        
        const startTime = performance.now();
        
        const animateRestore = (now: number) => {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / (duration * 1000), 1.0);
            
            const easeOutExpo = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            
            uniforms.uZoom.value = startZoom + (1.1 - startZoom) * easeOutExpo;
            uniforms.uOpacity.value = startOpacity + (1.0 - startOpacity) * easeOutExpo;
            uniforms.uWave.value = startWave + (0.0 - startWave) * easeOutExpo;
            
            if (t < 1.0) {
                requestAnimationFrame(animateRestore);
            } else {
                setTimeout(() => {
                    this.zoomTarget = 1.0;
                    this.zoomSpeed = 0.02;
                    this.zoomCompleteEmitted = false;
                }, 500);
            }
        };
        
        requestAnimationFrame(animateRestore);
    }

    public zoomReset(duration = 1.5) {
        if (!this.material) return;
        
        this.zoomCompleteEmitted = false;
        
        const startZoom = this.material.uniforms.uZoom.value;
        const startTime = performance.now();
        
        const animateZoomReset = (now: number) => {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / (duration * 1000), 1.0);
            
            const easeOutExpo = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            const easedZoom = startZoom + (0.05 - startZoom) * easeOutExpo;
            
            this.material!.uniforms.uZoom.value = easedZoom;
            this.zoomTarget = 1.0;
            this.zoomSpeed = 0.02;

            if (t < 1.0) {
                requestAnimationFrame(animateZoomReset);
            } else {
                this.zoomCompleteEmitted = false;
                this.zoomIn(1.0, 1.1);
            }
        };

        requestAnimationFrame(animateZoomReset);
    }

    public playIntro() {
        this.material!.uniforms.uOpacity.value = 0;
        this.material!.uniforms.uZoom.value = 0.05;
        this.zoomCompleteEmitted = false;

        this.zoomTarget = 1.1;
        this.zoomSpeed = 0.04;

        setTimeout(() => {
            this.zoomTarget = 1.0;
            this.zoomSpeed = 0.02;
        }, 900);
    }

    public setZoom(target: number, speed = 0.04) {
        this.zoomTarget = target;
        this.zoomSpeed = speed;
        this.zoomCompleteEmitted = false;
    }

    public setAudio(analyser: AnalyserNode, dataArray: Uint8Array) {
        this.audioAnalyser = analyser;
        this.audioDataArray = dataArray;
    }

    public reinit() {
        if (!this.material) return;

        this.material.uniforms.uOpacity.value = 0;
        this.material.uniforms.uZoom.value = 0.05;

        this.zoomTarget = 1.1;
        this.zoomSpeed = 0.04;

        this.translateTarget.set(0, 0);

        this.zoomCompleteEmitted = false;
    }

    public connectAudio(mediaElement: HTMLAudioElement) {
        this.mediaElement = mediaElement;

        try {
            this.audioContext = new AudioContext();
            const source = this.audioContext.createMediaElementSource(mediaElement);
            this.audioAnalyser = this.audioContext.createAnalyser();
            this.audioAnalyser.fftSize = 256;
            this.audioDataArray = new Uint8Array(this.audioAnalyser.frequencyBinCount);

            source.connect(this.audioAnalyser);
            this.audioAnalyser!.connect(this.audioContext.destination);
        } catch (e) {
            console.warn('Audio context could not be created:', e);
        }
    }

    public setMusicPage(isMusic: boolean) {
        if (this.material) {
        }
    }

    public isMounted() {
        return this._isMounted;
    }

    public isLastImageLoaded(url: string) {
        return this.currentTextureUrl === url;
    }

    public destroy() {
        if (this.rafId) cancelAnimationFrame(this.rafId);

        this.handlers.forEach(fn => fn());
        this.handlers = [];

        this.textureCache.forEach(t => t.dispose());
        this.textureCache.clear();

        if (this.material) this.material.dispose();

        this.scene.clear();
        this.renderer.dispose();
        this.renderer.domElement.remove();

        this._isMounted = false;
    }
}

export const galaxy = new NebulaBackground();
