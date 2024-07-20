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
 * Sugared functions for making angles with units.
 */
export const degrees = (value: number):Angle => {
    return {
        value,
        unit: 'degrees'
    }
};
export const gradians = (value: number):Angle => {
    return {
        value,
        unit: 'gradians',
    }
};
export const radians = (value: number):Angle => {
    return {
        value,
        unit: 'radians',
    }
};
