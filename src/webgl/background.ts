import { tween } from "@/packages/animation";
import * as THREE from "three";

class NebulaBackground {
    private audioAnalyser: AnalyserNode | null = null;
    private audioDataArray: Uint8Array = new Uint8Array();

    private material: THREE.ShaderMaterial | null = null;

    // ===== Animation state =====
    private zoomTarget = 1.0;
    private zoomSpeed = 0.02;

    private translateTarget = new THREE.Vector2(0, 0);

    private zoomCompleteEmitted = false;
    private isInitialized = false;

    private audioCtx!: AudioContext;
    private audioSource!: AudioBufferSourceNode;
    private gainNode!: GainNode;

    private backgroundTexture: THREE.Texture<HTMLImageElement> | null = null;
    private textureLoader = new THREE.TextureLoader();
    private _isMounted: boolean = false;

    private readonly scene: THREE.Scene;
    private readonly camera: THREE.OrthographicCamera;
    private readonly renderer: THREE.WebGLRenderer;

    private lastImageLoaded: string | null = null;

    public readonly MAIN_TEXTURE = "/textures/waves.png";
    public readonly OPTIONAL_TEXTURE = "/textures/abstract.jpg";

    public posterMesh: THREE.Mesh | null = null;

    public constructor() {
        this.backgroundTexture = null;

        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
        });
    }

    public async setBackgroundTexture(): Promise<THREE.Texture<HTMLImageElement>> {
        if (this.backgroundTexture) {
            return Promise.resolve(this.backgroundTexture);
        }

        return new Promise<THREE.Texture<HTMLImageElement>>((res, rej) => {
            this.textureLoader.load(this.MAIN_TEXTURE, (texture) => {
                texture.wrapS = THREE.MirroredRepeatWrapping;
                texture.wrapT = THREE.MirroredRepeatWrapping;

                this.backgroundTexture = texture;
                this.lastImageLoaded = this.MAIN_TEXTURE;
                res(texture);
            });
        });
    }

    public setup(target: HTMLElement) {
        if (this.isInitialized) return;
        this.isInitialized = true;

        target.appendChild(this.renderer.domElement);

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


        const uniforms = {
            uTime: { value: 0 },
            uOpacity: { value: 0 },
            uZoom: { value: 0.05 },
            textureOne: { value: null as THREE.Texture | null },
            textureTwo: { value: null },
            textureSwap: { value: 0.0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uResolution: {
                value: new THREE.Vector2(window.innerWidth, window.innerHeight),
            },
            uImageRes1: { value: new THREE.Vector2(1, 1) },
            uImageRes2: { value: new THREE.Vector2(1, 1) },
        };

        this.setBackgroundTexture().then((texture) => {
            uniforms.textureOne.value = texture;
            uniforms.textureOne.value = texture;
            uniforms.uImageRes1.value.set(texture.image.width, texture.image.height);

            this.initMesh(uniforms);
            this.playIntro();
        });

        const targetMouse = new THREE.Vector2(0.5, 0.5);
        const mouse = new THREE.Vector2(0.5, 0.5);

        this.bindEvents(uniforms, targetMouse);

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            if (this.audioAnalyser) {
                this.audioAnalyser.getByteFrequencyData(this.audioDataArray as any);
            }

            const elapsed = clock.getElapsedTime();
            const cycleDuration = 20;

            const uTime = 0 + (25 - 0) * (0.5 + 0.5 * Math.sin((elapsed / cycleDuration) * Math.PI * 2));

            mouse.lerp(targetMouse, 0.05);

            if (this.material) {
                const translatedMouse = mouse.clone().add(this.translateTarget);

                this.material.uniforms.uMouse.value.copy(translatedMouse);

                // Time
                this.material.uniforms.uTime.value = uTime;

                // Opacity intro
                this.material.uniforms.uOpacity.value += (1 - this.material.uniforms.uOpacity.value) * 0.03;

                // Zoom interpolation
                const z = this.material.uniforms.uZoom.value;
                this.material.uniforms.uZoom.value += (this.zoomTarget - z) * this.zoomSpeed;

                if (!this.zoomCompleteEmitted && Math.abs(z - this.zoomTarget) < 0.01) {
                    this.zoomCompleteEmitted = true;
                    this.onZoomCompleted();
                }
            }

            this.renderer.render(this.scene, this.camera);
        };

        animate();
        this._isMounted = true;
    }

    private initMesh(uniforms: any) {
        const geo = new THREE.PlaneGeometry(2, 2);

        this.material = new THREE.ShaderMaterial({
            vertexShader: /* glsl */ `
                varying vec2 vUv;
                void main(){
                    vUv = uv;
                    gl_Position = vec4(position,1.0);
                }
            `,
            fragmentShader: /* glsl */ `
                precision mediump float;

                uniform sampler2D textureOne;
                uniform sampler2D textureTwo;
                uniform float textureSwap;

                uniform float uTime, uZoom, uOpacity;
                uniform vec2 uMouse, uResolution;
                uniform vec2 uImageRes1, uImageRes2;

                varying vec2 vUv;

                vec2 getCoverUv(vec2 uv, vec2 res, vec2 img){
                    vec2 r = vec2(
                        min((res.x/res.y)/(img.x/img.y),1.0),
                        min((res.y/res.x)/(img.y/img.x),1.0)
                    );
                    return uv * r + (1.0 - r) * 0.5;
                }

                mat2 rot(float a){
                    float s = sin(a);
                    float c = cos(a);
                    return mat2(c,-s,s,c);
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
                    float mouse = smoothstep(0.4, 0.0, dist);

                    vec2 offset = (disp.rg - 0.5) * (0.04 + mouse * 0.08);

                    uv1 += offset;
                    uv2 += offset;

                    vec4 c1 = texture2D(textureOne, uv1);
                    vec4 c2 = texture2D(textureTwo, uv2);

                    vec4 color = mix(c1, c2, textureSwap);

                    color.rgb *= 1.0 - length(vUv - 0.5) * 0.6;

                    gl_FragColor = vec4(color.rgb, uOpacity);
                }

            `,
            uniforms: uniforms,
            transparent: true,
            blending: THREE.AdditiveBlending,
        });

        const backgroundMesh = new THREE.Mesh(geo, this.material);
        backgroundMesh.renderOrder = 1;
        this.scene.add(backgroundMesh);
    }

    private bindEvents(uniforms: Record<string, any>, targetMouse: THREE.Vector2) {
        window.addEventListener("mousemove", (e) => {
            targetMouse.x = e.clientX / window.innerWidth;
            targetMouse.y = 1.0 - e.clientY / window.innerHeight;
        });

        window.addEventListener(
            "touchmove",
            (e) => {
                if (!e.touches.length) return;
                targetMouse.x = e.touches[0].clientX / window.innerWidth;
                targetMouse.y = 1.0 - e.touches[0].clientY / window.innerHeight;
            },
            { passive: true }
        );

        window.addEventListener("resize", () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
        });
    }

    public transitionToTexture(url: string | THREE.Texture<HTMLImageElement>, duration = 1.5) {
        if (!this.material) return;

        const swap = (texture: THREE.Texture<HTMLImageElement>) => {
            texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
            const uniforms = this.material!.uniforms;

            uniforms.textureTwo.value = texture;
            uniforms.textureSwap.value = 0.0;
            uniforms.uImageRes2.value.set(texture.image.width, texture.image.height);

            let startTime: number | null = null;
            const _this = this;

            const animateFade = (now: number) => {
                if (!startTime) startTime = now;
                const elapsed = (now - startTime) / 1000;
                let t = Math.min(elapsed / duration, 1.0);

                const progress = t * t * (3.0 - 2.0 * t);
                uniforms.textureSwap.value = progress;

                if (t < 1.0) {
                    requestAnimationFrame(animateFade);
                } else {
                    uniforms.textureOne.value = texture;
                    uniforms.uImageRes1.value.copy(uniforms.uImageRes2.value);

                    requestAnimationFrame(() => {
                        uniforms.textureSwap.value = 0.0;
                    });
                }
            };

            requestAnimationFrame(animateFade);
        };

        if (url instanceof THREE.Texture) {
            swap(url);
        } else {
            this.textureLoader.load(url, (newTexture) => {
                this.lastImageLoaded = url;
                swap(newTexture);
            });
        }
    }

    public zoomIn(target = 1.1, speed = 0.04) {
        this.zoomTarget = target;
        this.zoomSpeed = speed;
    }

    public zoomOut(target = 0.9, speed = 0.04) {
        this.zoomTarget = target;
        this.zoomSpeed = speed;
    }

    public zoomReset(speed = 0.02) {
        this.zoomTarget = 1.0;
        this.zoomSpeed = speed;
    }

    public translate(x: number, y: number) {
        this.translateTarget.set(x, y);
    }

    public resetTranslate() {
        this.translateTarget.set(0, 0);
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

    public playIntro() {
        this.reinit();
        // this.createBackgroundSound();

        this.zoomIn(1.1, 0.04);

        setTimeout(() => {
            this.zoomReset(0.02);
        }, 900);
    }

    public setAudio(analyser: AnalyserNode, dataArray: Uint8Array) {
        this.audioAnalyser = analyser;
        this.audioDataArray = dataArray;
    }

    public setPoster(url: string) {
        /*  if (!this.posterMesh) {
             this.posterMesh = new THREE.Mesh(
                 new THREE.PlaneGeometry(1, 1),
                 new THREE.MeshBasicMaterial({ map: null, side: THREE.DoubleSide, opacity: 0 })
             );
             this.scene.add(this.posterMesh);
             this.posterMesh.renderOrder = 2;
 
             const animateFade = (now: number) => {
                 requestAnimationFrame(animateFade);
                 if (!this.posterMesh) return;
                 this.posterMesh.material.opacity += 0.01;
                 if (this.posterMesh.material.opacity >= 1) {
                     cancelAnimationFrame(animateFade);
                 }
             };
 
             animateFade(0);
         }
 
         const _this = this;
         this.textureLoader.load(url, (texture) => {
             _this.posterMesh!.material.map = texture;
             _this.posterMesh!.material.needsUpdate = true;
         }); */
    }

    public disposePoster() {
        /*    if (!this.posterMesh) return;
           this.scene.remove(this.posterMesh);
           this.posterMesh.geometry.dispose();
           this.posterMesh = null; */
    }

    public disconnectAudio() {
        this.audioAnalyser = null;
        this.audioDataArray = new Uint8Array();
    }

    public onZoomCompleted() {
        window.dispatchEvent(new Event("zoomComplete"));
    }

    public createBackgroundSound() {
        this.audioCtx = new AudioContext();

        fetch("/music/background.mp3")
            .then((r) => r.arrayBuffer())
            .then((b) => this.audioCtx.decodeAudioData(b))
            .then((buffer) => {
                this.audioSource = this.audioCtx.createBufferSource();
                this.audioSource.buffer = buffer;
                this.audioSource.loop = true;

                this.gainNode = this.audioCtx.createGain();
                this.gainNode.gain.value = 0.75;

                this.audioSource.connect(this.gainNode);
                this.gainNode.connect(this.audioCtx.destination);

                document.addEventListener(
                    "mousemove",
                    () => {
                        this.audioCtx.resume().then(() => {
                            this.audioSource.start();
                        });
                    },
                    { once: true }
                );
            });
    }

    public fadedPauseSound(duration = 0.5): Promise<void> {
        if (!this.gainNode) return Promise.resolve();

        const now = this.audioCtx.currentTime;

        this.gainNode.gain.cancelScheduledValues(now);
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
        this.gainNode.gain.linearRampToValueAtTime(0, now + duration);

        return new Promise((resolve) => setTimeout(resolve, duration * 1000));
    }

    public fadedResumeSound(duration = 0.5): Promise<void> {
        if (!this.gainNode) return Promise.resolve();

        const now = this.audioCtx.currentTime;

        this.gainNode.gain.cancelScheduledValues(now);
        this.gainNode.gain.setValueAtTime(0, now);
        this.gainNode.gain.linearRampToValueAtTime(0.75, now + duration);

        return new Promise((resolve) => setTimeout(resolve, duration * 1000));
    }

    public restoreBackgroundTexture() {
        this.setBackgroundTexture().then((texture) => {
            this.lastImageLoaded = this.MAIN_TEXTURE;

            this.transitionToTexture(texture);
        });
    }

    public isMounted() {
        return this._isMounted;
    }

    public isLastImageLoaded(url: string) {
        return this.lastImageLoaded === url;
    }
}

export const galaxy = new NebulaBackground();
