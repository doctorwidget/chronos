/**
 * Units for angles.
 */
/**
 * facts & data about the units used for angles
 */
import { toPrecision } from "../data/math";

export const units = {
    degrees: {
        abbr: 'd',
        circle: 360,
        name: 'degrees',
        to: {
            degrees: 1,
            gradians: 10/9,
            radians: Math.PI / 180,
        }
    },
    gradians: {
        abbr: 'g',
        circle: 400,
        name: 'gradians',
        to: {
            degrees: 9/10,
            gradians: 1,
            radians: Math.PI / 200,
        }
    },
    radians: {
        abbr: 'r',
        circle: Math.PI * 2,
        name: 'radians',
        to: {
            degrees: 180 / Math.PI,
            gradians: 200 / Math.PI,
            radians: 1,
        }
    }
} as const;


export type AngleUnits = typeof units;
export type AngleUnitKey =  keyof AngleUnits;
export type AngleUnitValue = typeof units[AngleUnitKey];


export const abbrs = {
    d: 'degrees',
    g: 'gradians',
    r: 'radians',
} as const;


/** Always include units with your angles, or all is lost! */
export type Angle = {
    value: number,
    unit: AngleUnitKey,
};

/**
 * Convert an angle from one unit to another
 * 
 * @param { Angle } from - incoming angle, to be converted
 * @param { AngleUnitKey | AngleUnitValue } - unit to convert to
 * @return { Angle } - same value in different units
 */
export const convert = (from: Angle, to: AngleUnitKey | AngleUnitValue): Angle => {
    const { unit, value } = from;

    const angleData = typeof to === 'string' ? units[to] : to;
    const convertedUnit = angleData.name;

    const conversionFactor = units[unit].to[convertedUnit];

    const convertedValue = value * conversionFactor;

    const converted = {
        value: convertedValue,
        unit: convertedUnit,
    }

    return converted;
};

/**
 * Sugar for creating an angle in degrees.
 * @param { number } value - number (in degrees)
 * @return { Angle } - Angle in degrees
 */
export const degrees = (value: number):Angle => {
    return {
        value,
        unit: 'degrees'
    }
};
/**
 * Sugar for creating an angle in gradians.
 * @param { number } value - number (in gradians)
 * @return { Angle } - Angle in gradians
 */
export const gradians = (value: number):Angle => {
    return {
        value,
        unit: 'gradians',
    }
};
/**
 * Sugar for creating an angle in radians.
 * @param { number } value - number (in radians)
 * @return { Angle } - Angle in radians
 */
export const radians = (value: number):Angle => {
    return {
        value,
        unit: 'radians',
    }
};

/**
 * Compare two angles and determine if they are equal
 * to the specified number of significant digits.
 * 
 * @param { Angle } a - first angle
 * @param { Angle } b - second angle
 * @param { number } [digits = 2] - significant digits tolerance (1 = 0.1, 2 = 0.001, etc)
 * @return { boolean } - true if the angles are equal to the specified precision
 */
export const equals = (a:Angle, b:Angle, digits = 2): boolean => {
    const ar = convert(a, 'radians');
    const br = convert(b, 'radians');

    const gap = Math.abs(ar.value - br.value);

    const tolerance = Math.pow(10, (digits * -1));

    return gap < tolerance;
};

/**
 * Is an angle a "large" angle, aka greater than a hemicircle.
 * We need to know this when using SVG arc commands.
 * 
 * @param { Angle } angle - the angle to test
 * @return { boolean } - true if that angle is greater than a hemicircle; otherwise false
 */
export const isLarge = (angle: Angle) => {
    const radians = convert(angle, 'radians');
    const value = radians.value;

    // the answer is different for positive vs negative angles,
    // and not in a way that we can fix with Math.abs!
    if (value >= 0) {
        return value > Math.PI;
    } else {
        return Math.abs(value) > Math.PI;
    }
};

/**
 * Sanitize an angle to its "modulo" version; clip the angle to a value between
 * +360 and -360 when using degrees, or the equivalent range for other units. 
 * 
 * e.g. an angle of 720 degrees should render exactly like one of 360 degrees,
 * and an angle of 540 degrees should be rendered exactly the same as one of 180 degrees,
 * and so on.
 * 
 * @param { Angle } angle - the angle to sanitize
 * @return { Angle } - a new angle based on the old one, constrained to + or - one full circle. 
 */
export const sanitize = (angle: Angle): Angle => {
    const fullCircle = units[angle.unit].circle;
    const sanitizedValue = angle.value % fullCircle;
    
    return {
        value: sanitizedValue,
        unit: angle.unit,
    }
};

/**
 * Get the human-readable version of an angle
 * @param  { Angle } angle - the angle to humanize
 */
export const humanize = (angle: Angle):String => {
    return `${toPrecision(angle.value, 1)} ${angle.unit}`;
};