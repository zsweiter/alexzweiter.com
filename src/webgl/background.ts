import * as THREE from "three";

class NebulaBackground {
    private audioAnalyser: AnalyserNode | null = null;
    private audioDataArray: Uint8Array = new Uint8Array();

    private material: THREE.ShaderMaterial | null = null;
    private mesh: THREE.Mesh | null = null;

    // ===== Animation state =====
    private zoomTarget = 1.0;
    private zoomSpeed = 0.02;

    private translateTarget = new THREE.Vector2(0, 0);

    private zoomCompleteEmitted = false;
    private isInitialized = false;

    private audioCtx!: AudioContext;
    private audioSource!: AudioBufferSourceNode;
    private gainNode!: GainNode;

    public setup(canvas: HTMLCanvasElement) {
        if (this.isInitialized) return;
        this.isInitialized = true;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas,
            alpha: true,
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const loader = new THREE.TextureLoader();

        const uniforms: any = {
            uTime: { value: 0 },
            uOpacity: { value: 0 },
            uZoom: { value: 0.05 },
            uDisp: { value: null },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uResolution: {
                value: new THREE.Vector2(window.innerWidth, window.innerHeight),
            },
            uImageRes: { value: new THREE.Vector2(1, 1) },
        };

        loader.load("/textures/bg.jpg", (texture) => {
            texture.wrapS = THREE.MirroredRepeatWrapping;
            texture.wrapT = THREE.MirroredRepeatWrapping;

            uniforms.uDisp.value = texture;
            uniforms.uImageRes.value.set(texture.image.width, texture.image.height);

            this.initMesh(scene, uniforms);
            this.playIntro();
        });

        const targetMouse = new THREE.Vector2(0.5, 0.5);
        const mouse = new THREE.Vector2(0.5, 0.5);

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
            renderer.setSize(window.innerWidth, window.innerHeight);
            uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
        });

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

            renderer.render(scene, camera);
        };

        animate();
    }

    private initMesh(scene: THREE.Scene, uniforms: any) {
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

                uniform sampler2D uDisp;
                uniform float uTime, uZoom, uOpacity;
                uniform vec2 uMouse, uResolution, uImageRes;

                varying vec2 vUv;

                vec2 getCoverUv(vec2 uv, vec2 res, vec2 img){
                    vec2 r = vec2(
                        min((res.x/res.y)/(img.x/img.y),1.0),
                        min((res.y/res.x)/(img.y/img.x),1.0)
                    );
                    return uv * r + (1.0 - r) * 0.5;
                }

                void main(){
                    vec2 uv = getCoverUv(vUv, uResolution, uImageRes);

                    vec2 dispUv = uv;
                    dispUv.x += uTime * 0.05;
                    dispUv.y -= uTime * 0.02;

                    vec4 disp = texture2D(uDisp, dispUv);

                    float dist = distance(vUv, uMouse);
                    float mouseEffect = smoothstep(0.4, 0.0, dist);

                    float strength = 0.03 + mouseEffect * 0.075;

                    vec2 uvZoomed = (uv - 0.5) * uZoom + 0.5;
                    vec2 distortedUv =
                        uvZoomed + (disp.rg - 0.5) * strength;

                    vec3 color = texture2D(uDisp, distortedUv).rgb;

                    color *= 1.0 - length(vUv - 0.5) * 0.6;

                    gl_FragColor = vec4(color, uOpacity);
                }
            `,
            uniforms,
            transparent: true,
        });

        this.mesh = new THREE.Mesh(geo, this.material);
        scene.add(this.mesh);
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
        this.createBackgroundSound();

        this.zoomIn(1.1, 0.04);

        setTimeout(() => {
            this.zoomReset(0.02);
        }, 900);
    }

    public setAudio(analyser: AnalyserNode, dataArray: Uint8Array) {
        this.audioAnalyser = analyser;
        this.audioDataArray = dataArray;
    }

    public disconnectAudio() {
        this.audioAnalyser = null;
        this.audioDataArray = new Uint8Array();
    }

    public onZoomCompleted() {
        window.dispatchEvent(new Event("zoomComplete"));
    }

    public dissolveToTexture(url: string) {
        const loader = new THREE.TextureLoader();

        loader.load(url, (texture) => {
            if (!this.material) return;

            texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;

            this.material.uniforms.uTexture.value = texture;
            this.material.uniforms.uDissolve.value = 0;
        });
    }

    public createBackgroundSound() {
        this.audioCtx = new AudioContext();

        fetch("/music/background.wav")
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
}

export const galaxy = new NebulaBackground();
