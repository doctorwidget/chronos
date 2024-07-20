/**
 * Types and functions for working with points and angles.
 */
import type { Angle } from './units';
import { convert } from './units';

export type Point = {
    x: number,
    y: number,
};

/**
 * In a Cartesian system, angles go counterclockwise, 
 * since positive Y values go up with respect to the origin. 
 * But in Javascript (and all computer graphics), angles go clockwise,
 * since positive Y values go down with respect to the origin.
 */
export const yCorrection = {
    cartesian: -1,
    computer: 1,
};

/**
 * Get the X and Y coordinates for a point at angle a on a circle of radius r.
 * @param { Angle } angle - angle on the circle
 * @param { number } radius - radius (in px)
 * @return { Point } - coordinates (in px) for the desired point
 */
export const getPoint = (angle: Angle, radius: number): Point => {

    const x = getX(angle, radius);
    const y = getY(angle, radius);

    return { x, y }
};

/**
 * Get the X value for a point at angle a on a circle of radius r.
 * @param { Angle } angle - angle on the circle
 * @param { number } radius - radius (in px)
 * @return { number } - x value (in px) for the desired point
 */
export const getX = (angle: Angle, radius: number): number => {
    const radians = convert(angle, 'radians');

    //  Given that our desired x is the 'adjacent' value,
    //  and that the radius of the circle is the hypotenuse:

    //  1. cos(theta) = adjacent / hypotenuse
    //  2. adjacent = sin(theta) * hypotenuse

    // therefore:
    const x = Math.cos(radians.value) * radius;

    return x;
};

/**
 * Get the Y value for a point at angle a on a circle of radius r.
 * @param { Angle } angle - angle on the circle
 * @param { number } radius - radius (in px)
 * @return { number } - y value (in px) for the desired point
 */
export const getY = (angle: Angle, radius: number): number => {
    const radians = convert(angle, 'radians');

    // Given that our desired y is the 'opposite' value,
    // and that the radius of the circle is the hypotenuse:

    //  1. sin(theta) = opposite / hypotenuse
    //  2. opposite = sin(theta) * hypotenuse
    
    // therefore:
    const y = Math.sin(radians.value) * radius;

    return y;
};

