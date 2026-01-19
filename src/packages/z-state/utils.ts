export const isObject = (value: any): boolean => {
    return typeof value === 'object' && value !== null;
}

const _equal = (a: unknown, b: unknown, visited: WeakMap<any, any> = new WeakMap()): boolean => {
    // Check if the values are the same
    if (a === b) return true;

    // Check if the values are objects
    if (!isObject(a) || !isObject(b)) {
        return Object.is(a, b);
    }

    // Check for cycles
    if (visited.has(a)) return true;
    visited.set(a, true);

    // Check if the values are arrays
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        return a.every((val, i) => _equal(val, b[i], visited));
    }
    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    }

    // Check if the values are objects
    const keysA = Object.keys(a as Record<string, any>);
    const keysB = Object.keys(b as Record<string, any>);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => _equal((a as Record<string, any>)[key], (b as Record<string, any>)[key], visited));
}

export const equal = (a: unknown, b: unknown): boolean => {
    return _equal(a, b);
}