import { effect, reactive } from "./reactivity";

const attr = (el: any, n: string) => el.getAttribute(`s-${n}`) || el.getAttribute(`data-s-${n}`);
const has = (el: any, n: string) => el.hasAttribute(`s-${n}`) || el.hasAttribute(`data-s-${n}`);

export const $ = (selector: string | Element | Window | Document | (Element | Window | Document)[], ctx = document) => {
    let nodes: (Element | Window | Document)[] = [];
    if (selector instanceof Element || selector === window || selector === document) {
        nodes = [selector];
    } else if (typeof selector === "string") {
        nodes = Array.from(ctx.querySelectorAll(selector));
    } else if (Array.isArray(selector)) {
        nodes = selector;
    } else {
        nodes = [];
        console.warn("Invalid selector", selector);
    }

    const api = {
        nodes,

        each(fn: (el: Element, i: number) => void) {
            nodes.forEach((el, i) => fn(el as Element, i));
            return api;
        },

        on(type: string, handler: (event: Event) => void, opts?: AddEventListenerOptions) {
            return api.each(el =>
                el.addEventListener(type, handler, opts)
            );
        },

        off(type: string, handler: (event: Event) => void, opts?: AddEventListenerOptions) {
            return api.each(el =>
                el.removeEventListener(type, handler, opts)
            );
        },

        text(value: string) {
            if (value === undefined) {
                const node = nodes[0];
                if (!node) return;

                return node instanceof HTMLElement ? node.textContent : null;
            }

            return api.each(el => {
                el.textContent = value;
            });
        },

        html(value: string) {
            if (value === undefined) {
                const node = nodes[0];
                if (!node) return;

                return node instanceof HTMLElement ? node.innerHTML : null;
            }
            return api.each(el => {
                el.innerHTML = value;
            });
        },

        attr(name: string, value: string) {
            if (value === undefined) {
                const node = nodes[0];
                if (!node) return;

                return node instanceof HTMLElement ? node.getAttribute(name) : null;
            }
            return api.each(el => {
                value == null
                    ? el.removeAttribute(name)
                    : el.setAttribute(name, value);
            });
        },

        toggle(show: boolean) {
            return api.each((el) => {
                if (el instanceof HTMLElement) {
                    el.style.display = show ? '' : 'none';
                }
            });
        },

        find(sel: string) {
            const found: HTMLElement[] = [];
            api.each((el) => {
                if (el instanceof HTMLElement) {
                    found.push(...el.querySelectorAll(sel) as any);
                }
            });

            return $(found);
        }
    };

    return api;
}

const resolve = (scope: any, path: string): any => {
    if (!path) return;
    path = path.trim();
    if (path[0] === "!") return !resolve(scope, path.slice(1));

    const m = path.match(/^([a-zA-Z$_][\w.]*)\((.*?)\)$/);
    if (m) {
        const fn = getVal(scope, m[1]);
        if (typeof fn !== "function") return;
        const args = m[2]
            ? m[2].split(",").map((a) => {
                a = a.trim();
                if (!isNaN(a as any)) return +a;
                if (a[0] === '"' || a[0] === "'") return a.slice(1, -1);
                return getVal(scope, a);
            })
            : [];
        return fn.apply(scope, args);
    }

    return getVal(scope, path);
};

const getVal = (scope: any, path: string): any => {
    let v = scope;
    for (const p of path.split(".")) {
        if (v == null) return;
        v = v[p];
    }
    return typeof v === "function" ? v.bind(scope) : v;
};

const setVal = (scope: any, path: string, val: any) => {
    const ps = path.split(".");
    let t = scope;
    for (let i = 0; i < ps.length - 1; i++) t = t[ps[i]];
    t[ps[ps.length - 1]] = val;
};

// === TRANSICIONES ===
const transition = (el: any, show: boolean, done: () => void) => {
    const name = attr(el, "transition") || "v";
    if (!has(el, "transition")) {
        el.style.display = show ? "" : "none";
        return done();
    }

    const phase = show ? "enter" : "leave";
    const from = `${name}-${phase}-from`;
    const active = `${name}-${phase}-active`;
    const to = `${name}-${phase}-to`;

    if (show) el.style.display = "";
    el.classList.add(from, active);
    void el.offsetWidth;

    requestAnimationFrame(() => {
        el.classList.remove(from);
        el.classList.add(to);
    });

    const end = () => {
        el.classList.remove(active, to);
        if (!show) el.style.display = "none";
        done();
    };
    el.addEventListener("transitionend", end, { once: true });
};

// === DIRECTIVAS ===
const dirs = {
    text: (el: any, v: any) => (el.textContent = String(v ?? "")),
    html: (el: any, v: any) => (el.innerHTML = String(v ?? "")),
    show: (el: any, v: any) => transition(el, !!v, () => { }),

    model: (el: any, path: string, scope: any) => {
        // Actualizar el input desde el estado
        effect(() => {
            const v = resolve(scope, path);
            if (el.type === "checkbox") {
                el.checked = !!v;
            } else {
                el.value = v ?? "";
            }
        });

        // Actualizar el estado desde el input
        if (!el._zBound) {
            el._zBound = 1;
            el.addEventListener("input", () => {
                let val = el.value;
                if (el.type === "checkbox") val = el.checked;
                if (el.type === "number") val = +el.value;
                setVal(scope, path, val);
            });
        }
    },

    bind: (el: any, v: any, scope: any, arg: string) => {
        if (!arg) return;
        if (arg === "class" && typeof v === "object") {
            Object.entries(v).forEach(([k, val]) => el.classList.toggle(k, !!val));
        } else if (arg in el) {
            el[arg] = v;
        } else {
            v ? el.setAttribute(arg, String(v)) : el.removeAttribute(arg);
        }
    },

    on: (el: HTMLElement & Record<string, any>, handler: string, scope: any, evt: string, mods: string[]) => {
        const key = `_z${evt}`;
        if (el[key]) return;
        el[key] = 1;

        el.addEventListener(evt, (e) => {
            if (mods.includes("prevent")) e.preventDefault();
            if (mods.includes("stop")) e.stopPropagation();

            if (!handler.includes("(")) {
                const fn = resolve(scope, handler);
                if (typeof fn === "function") fn(e, el);
            } else {
                resolve(scope, handler);
            }
        });
    },
};

// === HYDRATE ===
export const hydrate = (root: HTMLElement, scope: any) => {
    if (!scope) return console.error("Z-State: scope required");

    // s-for
    if (has(root, "for")) {
        const [alias, list] = attr(root, "for")
            .split(" in ")
            .map((s: string) => s.trim());
        const anchor = document.createComment("for");
        root.before(anchor);
        const template = root.cloneNode(true);
        root.remove();

        let nodes: any[] = [];
        effect(() => {
            // Limpiar nodos anteriores
            nodes.forEach((n) => n.remove());
            nodes = [];

            const items = resolve(scope, list) || [];
            items.forEach((item: any, i: number) => {
                const clone = template.cloneNode(true) as HTMLElement;
                clone.removeAttribute("s-for");

                const childScope = Object.create(scope);
                childScope[alias] = reactive(item);
                childScope.$index = i;

                anchor?.parentNode?.insertBefore(clone, anchor.nextSibling);
                nodes.push(clone);
                hydrate(clone, childScope);
            });
        });
        return;
    }

    // s-if
    if (has(root, "if")) {
        const path = attr(root, "if");
        const anchor = document.createComment("if");
        root.before(anchor);
        let mounted = false;

        effect(() => {
            const show = !!resolve(scope, path);

            if (show && !mounted) {
                anchor?.parentNode?.insertBefore(root, anchor.nextSibling);
                transition(root, true, () => { });
                mounted = true;
            } else if (!show && mounted) {
                transition(root, false, () => {
                    if (root.parentNode) root.remove();
                    mounted = false;
                });
            } else if (!show && !mounted) {
                if (root.parentNode) root.remove();
            }
        });
        return;
    }

    // Directivas
    Array.from(root.attributes).forEach((a) => {
        if (!/^s-/.test(a.name)) return;

        const [dir, arg, ...mods] = a.name.slice(2).split(/[:.]/);
        const expr = a.value;

        if (!dirs[dir as keyof typeof dirs]) return;

        if (dir === "on") {
            dirs.on(root, expr, scope, arg, mods);
        } else if (dir === "model") {
            dirs.model(root, expr, scope);
        } else {
            effect(() => {
                const val = resolve(scope, expr);
                dirs[dir as keyof typeof dirs](root, val, scope, arg, mods);
            });
        }
    });

    // Hijos
    for (let c: any = root.firstElementChild; c; c = c.nextElementSibling) {
        hydrate(c, scope);
    }
};
