/**
 * Miscellaneous math functions
 */
import type { Datum, UnitDatum } from "./types";
import { UnitInterval } from './types';

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

/**
 * Round a floating point value to a desired number of significant digits.
 * E.g. 
 *  toPrecision(3.14159, 0) = 3;
 *  toPrecision(3.14159, 1) = 3.1
 *  toPrecision(3.14159, 2) = 3.14
 *  toPrecision(3.14159, 3) = 3.142
 * @param { number } value - a number, presumably floating-point.
 * @param { number } [precision=0] - desired number of significant digits
 * @return { number } - that number rounded to the specified precision
 */
export const toPrecision = (value: number, precision=0) => {
    const digits = Math.round(Math.abs(precision));

    const factor = Math.pow(10, digits);

    // temporarily inflate
    const inflated = value * factor;

    // round off
    const rounded = Math.round(inflated);

    // restore original scale
    const final = rounded / factor;   

    return final;
};


/**
 * Take a series of datums, and returns a copy of that data,
 * where each datum in the copy has been decorated with the
 * correct UnitInterval value for that datum as part of the series.
 * 
 * Only works with scalar data! Throws a TypeError if given Point or Point3D data.
 * 
 * @param { Array<Datum> } - the original data series
 * @return { Array<UnitDatum> } - copy of the data, now as UnitDatum instances
 */
export const toUnitData = (data: Array<Datum>):Array<UnitDatum> => {
    const total:number = data.reduce((acc: number, cur: Datum) => {
        if (typeof cur.value !== 'number'){
            throw new Error('toUnitData() received invalid data');
        }
        const val = cur.value as number;

        acc += val;

        return acc;
    }, 0);

    const unitData:Array<UnitDatum> = data.map((datum) => {
        const clone = globalThis.structuredClone(datum);

        const fraction = (clone.value as number) / total;

        const unitInterval = new UnitInterval(fraction);

        const unitDatum:UnitDatum = {
            ...clone,
            I: unitInterval,
        };

        return unitDatum;
    });

    return unitData;
};
