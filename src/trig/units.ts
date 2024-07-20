/**
 * Units for angles.
 */
/**
 * facts & data about the units used for angles
 */
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
