/**
 * Low level data abstractions
 */
import { toPrecision } from './math';
import type { Point, Point3D } from '../trig/points';

export type AxisNames = {
    x: string,
    y: string,
}

export type AxisNames3D = AxisNames & { z:string };


/**
 * A value is the scalar portion of something that can be plotted.
 */
export type Value = number | Point | Point3D;

/**
 * No data makes sense if it has no units.
 */
export type Units = string | AxisNames | AxisNames3D;

/**
 * An order might be a valueless sequence, or it might an actual timestamp.
 * All order values from the same data set should have the same Order type.
 */
export type Order = number | Date;

/**
 * A datum in in its most generic generic form
 */
export type Datum = {
    // not all data is categorized
    category?: string,

    // optional extra info
    detail?: Details,

    // not all data is ordered
    order?: Order,

    units: Units,

    value: Value,
};

/**
 * Typescript won't let you define numeric types with a limited range (yet?)
 * For now we'll define this utility class.
 * (Note that the units are a big weird; "57%" is stored here as 0.57, not 57)
 */
export class UnitInterval {
    readonly value: number;

    constructor(num: number) {
       if (num < 0 || num > 1) {
           throw new Error("Invalid percentage");
       }
       this.value = num;
    }

    /** 
     * Get this value as a _percentage_,
     * to the specified number of significant digits
     * @param { number } [digits=0] - desired number of significant digits
     * @return { number }
     */
    percent(digits=0) {
        // a raw percent with infinite precision
        const raw = this.value * 100;
        const percent = toPrecision(raw, digits);
        return percent;
    }
};

/**
 * A datum *after* analyzing it as part of a data set, 
 * and assigning it a Unit Interval (I) fraction value. 
 * NB: No individual Datum has a relevant unit interval fraction in isolation;
 * this only makes sense in the context of a data set.
 */
export type UnitDatum = Datum & { I: UnitInterval };

/** Some data may have extra annotation information */
export type Details = Record<string, unknown>;

/** completely optional style information for use with SVGs */
export type SvgStyle = {
    fillColor?: string,
    strokeColor?: string,
    strokeWidth?: number,
};

/**
 * A Key function is anything that extracts a key from a datum. 
 * E.g. for a stylemap, the keyFn will commonly be d => d.category || 'unknown'
 */
export type KeyFn = (d: Datum) => string;

/** 
 * An array of Datums might be accompanied by a stylemap.
 * Different stylemaps can be swapped in and out without affecting the data. 
 */
export type StyleMap = {
    // get the desired key from a Datum
    keyFn: KeyFn,

    // after extracting a key from a Datum, look up the SvgStyle here
    styles: Record<string, SvgStyle>,
};
