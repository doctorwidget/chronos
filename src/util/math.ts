/**
 * Miscellaneous math functions
 */

/**
 * Clamp a value between a min and a max (inclusive)!
 * 
 * @param { number } val - the value to clamp
 * @param { number } min - the smallest allowed value to clamp to
 * @param { number } max - the largest allowed value to clamp to
 */
export const clamp = (val: number, min: number, max: number):number => {
    if (min > max) {
        throw new Error(`invalid clamp constraints: min (${min}) > max (${max})`);
    };

    const aboveMinimum = Math.max(val, min);
    const clamped = Math.min(aboveMinimum, max); 

    return clamped;
};