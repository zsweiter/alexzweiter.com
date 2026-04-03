import * as THREE from "three";

class GalaxyParticles {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private particles: THREE.Points | null = null;
    private particleMaterial: THREE.ShaderMaterial | null = null;
    private particleCount = 8000;
    private mouse = new THREE.Vector2(0, 0);
    private targetMouse = new THREE.Vector2(0, 0);
    private time = 0;
    private isMounted = false;
    private container: HTMLElement | null = null;

    public constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 50;

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        });
    }

    public setup(container: HTMLElement) {
        if (this.isMounted) return;
        this.isMounted = true;
        this.container = container;

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);

        container.appendChild(this.renderer.domElement);
        container.style.zIndex = "-1";

        this.initParticles();
        this.bindEvents();

        const animate = () => {
            requestAnimationFrame(animate);
            this.update();
            this.renderer.render(this.scene, this.camera);
        };

        animate();
    }

    private initParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);
        const randomness = new Float32Array(this.particleCount * 3);
        const angles = new Float32Array(this.particleCount);

        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;

            const angle = Math.random() * Math.PI * 2;
            const radius = Math.pow(Math.random(), 0.5) * 35;
            const spiralArms = 3;
            const armOffset = (i % spiralArms) / spiralArms * Math.PI * 2;
            const spiralAngle = angle + armOffset + radius * 0.15;

            const x = Math.cos(spiralAngle) * radius;
            const y = (Math.random() - 0.5) * (radius * 0.15);
            const z = Math.sin(spiralAngle) * radius;

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;

            const colorChoice = Math.random();
            if (colorChoice < 0.4) {
                colors[i3] = 0.8 + Math.random() * 0.2;
                colors[i3 + 1] = 0.85 + Math.random() * 0.15;
                colors[i3 + 2] = 1.0;
            } else if (colorChoice < 0.7) {
                colors[i3] = 1.0;
                colors[i3 + 1] = 0.7 + Math.random() * 0.2;
                colors[i3 + 2] = 0.8 + Math.random() * 0.2;
            } else if (colorChoice < 0.85) {
                colors[i3] = 0.6 + Math.random() * 0.2;
                colors[i3 + 1] = 0.7 + Math.random() * 0.2;
                colors[i3 + 2] = 1.0;
            } else {
                colors[i3] = 0.9 + Math.random() * 0.1;
                colors[i3 + 1] = 0.9 + Math.random() * 0.1;
                colors[i3 + 2] = 1.0;
            }

            sizes[i] = Math.random() * 1.5 + 0.5;

            randomness[i3] = (Math.random() - 0.5) * 2;
            randomness[i3 + 1] = (Math.random() - 0.5) * 2;
            randomness[i3 + 2] = (Math.random() - 0.5) * 2;

            angles[i] = angle;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute("randomness", new THREE.BufferAttribute(randomness, 3));
        geometry.setAttribute("angle", new THREE.BufferAttribute(angles, 1));

        this.particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            },
            vertexShader: /* glsl */ `
                attribute float size;
                attribute vec3 color;
                attribute vec3 randomness;
                attribute float angle;

                uniform float uTime;
                uniform vec2 uMouse;
                uniform float uPixelRatio;

                varying vec3 vColor;
                varying float vAlpha;

                mat2 rot(float a) {
                    float s = sin(a);
                    float c = cos(a);
                    return mat2(c, -s, s, c);
                }

                void main() {
                    vColor = color;

                    vec3 pos = position;

                    float dist = length(pos.xz);
                    float rotateSpeed = 0.15 / (dist + 1.0);
                    float currentAngle = angle + uTime * rotateSpeed;

                    pos.x = cos(currentAngle) * dist;
                    pos.z = sin(currentAngle) * dist;

                    float mouseInfluence = 1.0 - smoothstep(0.0, 0.5, length(uMouse));
                    vec2 mouseOffset = uMouse * dist * 0.05 * mouseInfluence;
                    pos.x += mouseOffset.x;
                    pos.z += mouseOffset.y;

                    pos += randomness * sin(uTime * 0.5 + angle * 3.0) * 0.3;

                    float pulse = sin(uTime * 2.0 + dist * 0.2) * 0.5 + 0.5;
                    pos.y += pulse * 0.5 * (1.0 - dist / 35.0);

                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mvPosition;

                    float sizeScale = size * (300.0 / -mvPosition.z);
                    gl_PointSize = sizeScale * uPixelRatio;

                    vAlpha = smoothstep(35.0, 10.0, dist) * (0.6 + pulse * 0.4);
                    vAlpha *= smoothstep(0.0, 5.0, -mvPosition.z);
                }
            `,
            fragmentShader: /* glsl */ `
                varying vec3 vColor;
                varying float vAlpha;

                void main() {
                    vec2 center = gl_PointCoord - 0.5;
                    float dist = length(center);

                    float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;

                    vec3 glow = vColor * 1.2;
                    vec3 finalColor = mix(vColor, glow, smoothstep(0.3, 0.0, dist));

                    gl_FragColor = vec4(finalColor, alpha * 0.8);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        this.particles = new THREE.Points(geometry, this.particleMaterial);
        this.scene.add(this.particles);
    }

    private bindEvents() {
        window.addEventListener("mousemove", (e) => {
            this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener("touchmove", (e) => {
            if (!e.touches.length) return;
            this.targetMouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        }, { passive: true });

        window.addEventListener("resize", () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            if (this.particleMaterial) {
                this.particleMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
            }
        });
    }

    private update() {
        this.time += 0.01;
        this.mouse.lerp(this.targetMouse, 0.05);

        if (this.particleMaterial) {
            this.particleMaterial.uniforms.uTime.value = this.time;
            this.particleMaterial.uniforms.uMouse.value.copy(this.mouse);
        }
    }

    public dispose() {
        if (this.particles) {
            this.particles.geometry.dispose();
            this.particleMaterial?.dispose();
            this.scene.remove(this.particles);
        }
        this.renderer.dispose();
        if (this.container && this.renderer.domElement) {
            this.container.removeChild(this.renderer.domElement);
        }
    }
}

export const galaxyParticles = new GalaxyParticles();
