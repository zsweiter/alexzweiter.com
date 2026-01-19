const easings = {
    linear: (t: number) => t,
    easeInQuad: (t: number) => t * t,
    easeOutQuad: (t: number) => t * (2 - t),
    easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: (t: number) => t * t * t,
    easeOutCubic: (t: number) => (--t) * t * t + 1,
    easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeOutExpo: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    easeInElastic: (t: number) => t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3)),
    easeOutBounce: (t: number) => {
        const n1 = 7.5625, d1 = 2.75;
        if (t < 1 / d1) return n1 * t * t;
        else if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
        else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
        else return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
};


type Easings = keyof typeof easings;

interface AnimatableProps {
    x?: number; y?: number; z?: number;
    opacity?: number; scale?: number; rotation?: number;
    [key: string]: any; // Permite otras propiedades numéricas
}

interface AnimationConfig extends AnimatableProps {
    duration?: number;
    easing?: Easings;
    onUpdate?: (target: any) => void;
    onComplete?: () => void;
    delay?: number;
}

type RawAnimationConfig = {
    target: any;
    startValues: any;
    endValues: any;
    duration: number;
    easingFn: (t: number) => number;
    startTime: number;
    onUpdate?: Function;
    onComplete?: Function;
    delay?: number;
}

class AnimationHub {
    private animations: RawAnimationConfig[] = [];
    private isRunning: boolean = false;

    public to(target: any, config: AnimationConfig) {
        const { duration, easing, onUpdate, onComplete, ...props } = config;
        const startValues = this.getCurrentValues(target, props);
        this.createAnimation(target, startValues, props, duration, easing, onUpdate, onComplete);
    }

    private getCurrentValues(target: any, props: AnimatableProps) {
        const startValues: any = {};
        for (const key in props) {
            startValues[key] = target[key] || 0;
        }

        return startValues;
    }

    private createAnimation(target: any, startValues: any, endValues: any, duration?: number, easing?: Easings, onUpdate?: Function, onComplete?: Function, delay?: number) {
        const startTime = performance.now() + (delay || 0);

        this.animations.push({
            target,
            startValues,
            endValues,
            duration: duration || 1000,
            easingFn: easing ? (easings[easing] || easings.linear) : easings.linear,
            startTime,
            onUpdate,
            onComplete,
            delay: delay || 0
        });

        if (!this.isRunning) {
            this.isRunning = true;
            requestAnimationFrame(this.update.bind(this));
        }
    }

    private update(currentTime: number) {
        for (let i = this.animations.length - 1; i >= 0; i--) {
            const anim = this.animations[i];
            const elapsed = currentTime - anim.startTime;
            const progress = Math.min(elapsed / anim.duration, 1);

            if (elapsed < 0) {
                continue;
            }

            const easedProgress = anim.easingFn(progress);

            for (const prop in anim.endValues) {
                const start = anim.startValues[prop];
                const end = anim.endValues[prop];
                anim.target[prop] = start + easedProgress; // Ajustar la interpolación
            }

            if (anim.onUpdate) anim.onUpdate(anim.target);

            if (progress === 1) {
                if (anim.onComplete) anim.onComplete();
                this.animations.splice(i, 1);
            }
        }

        if (this.animations.length > 0) {
            requestAnimationFrame(this.update.bind(this));
        } else {
            this.isRunning = false;
        }
    }

    public from(target: object, config: AnimationConfig) {
        const startValues = this.getCurrentValues(target, Object.keys(config));
        const endValues = this.applyInitialValues(startValues, Object.keys(config));
        this.createAnimation(target, startValues, endValues, config.duration, config.easing, config.onUpdate, config.onComplete);
    }

    public fromTo(target: object, config: AnimationConfig) {
        const startValues = this.getCurrentValues(target, Object.keys(config));
        const endValues = this.applyInitialValues(startValues, Object.keys(config));
        this.createAnimation(target, startValues, endValues, config.duration, config.easing, config.onUpdate, config.onComplete);
    }


    public applyInitialValues(currentValues: object & Record<string, any>, properties: string[]): AnimationConfig {
        const fromValues: Record<string, any> = {};
        properties.forEach((property) => {
            fromValues[property] = currentValues[property];
        });

        return fromValues as AnimationConfig;
    }

}

export const tween = new AnimationHub();