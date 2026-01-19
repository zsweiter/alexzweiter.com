import { equal } from "./utils";

type EffectFn = () => void;

let activeEffect: EffectFn | null = null;

const subs = new WeakMap<object, Map<string, Set<EffectFn>>>();
const errorHandlers = new Set<(error: Error) => void>();

const globalState = new Map<string, any>();

export const effect = (fn: EffectFn) => {
    const run = () => {
        activeEffect = run;
        try {
            fn();
        } catch (error) {
            errorHandlers.forEach(handler => handler(error as Error));
        } finally {
            activeEffect = null;
        }
    };

    run();
};

const track = (target: object, key: string) => {
    if (!activeEffect) return;
    let deps = subs.get(target);
    if (!deps) subs.set(target, (deps = new Map()));
    let dep = deps.get(key);
    if (!dep) deps.set(key, (dep = new Set()));
    dep.add(activeEffect);
};

const trigger = (target: object, key: string) => {
    const dep = subs.get(target)?.get(key);
    if (dep) [...dep].forEach((e) => e());
};

export const handleError = (handler: (error: Error) => void) => {
    errorHandlers.add(handler);
};

export const removeErrorHandler = (handler: (error: Error) => void) => {
    errorHandlers.delete(handler);
};

// api
export class Subject<T> {
    _subs: EffectFn[] = [];
    _value: T;
    constructor(value: T) {
        this._value = value;
    }

    get value() {
        track(this, "value");
        return this._value;
    }

    set value(value: T) {
        if (!equal(this._value, value)) {
            this._value = value;
            trigger(this, "value");
        }
    }
    subscribe(fn: EffectFn) {
        this._subs.push(fn);
    }
    unsubscribe(fn: EffectFn) {
        this._subs.splice(this._subs.indexOf(fn), 1);
    }
}

export const reactive = <T extends object>(o: T) => {
    if (!o || typeof o !== "object") return o;
    return new Proxy<T>(o, {
        get(target: any, key: string, receiver: any) {
            track(target, key);
            const value = Reflect.get(target, key, receiver);
            return typeof value === "object" && value !== null ? reactive(value) : value;
        },
        set(target: any, key: string, value: T, receiver: any) {
            const old = target[key];
            const res = Reflect.set(target, key, value, receiver);
            if (!equal(old, value)) {
                trigger(target, key);
            }

            return res;
        },
    });
};

export const ref = <T>(value: T) => {
    return new Subject<T>(value);
}


export const provide = <T>(key: string, value: T) => {
    globalState.set(key, value);
}

export const inject = <T>(key: string, fallback?: T): T | undefined => {
    return globalState.get(key) || fallback;
}
