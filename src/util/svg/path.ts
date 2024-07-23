/**
 * Utilities for working with SVG <path> elements
 */
import { clamp } from '../math';
import type { Angle } from '../trig/angles';
import { getPointFromOrigin } from '../trig/points';
import type { Point } from '../trig/points';

/**
 * Get a complete [d] attribute for an arc-shaped <path>.
 * 
 * The assumption is the arc will be centered on the supplied origin point,
 * on a virtual circle/ellipse with the supplied radius. 
 * 
 * @param { Angle } angle - angular length of the arc
 * @param { number } radius - radius of the virtual circle that the arc runs along
 * @param { Point} origin - local origin point
 * @param { number } [offset=0] - how far to offset the inner part of the path; 0 = true pizza slice; > 0 = donut segment 
 * @param { number } [rotation=0] - the x-axis-rotation of the virtual ellipse. No effect for a true circle!
 * @param { 0 | 1 } [large=0] - draw the larger angle when 1; otherwise draw the smaller one
 * @param { 0 | 1 } [sweep=1] - draw the arc clockwise when 1; otherwise draw the arc counterclockwise
 * @return { string } - string value for the [d] attribute, creating the arc described by the above
 */
export const getArcPath = (angle:Angle, radius: number, origin:Point, offset = 0, rotation=0, large=0, sweep=1) => {
    const innerRadius = radius - clamp(offset, 0, radius - 1);

    const { innerA, outerB, outerC, innerD, } = getArcPoints(angle, radius, origin, offset);

    // start at innerA,
    let d = `M ${innerA.x} ${innerA.y} `;

    // straight line to outerB
    d += `L ${ outerB.x } ${ outerB.y } `;

    // the outer arc, from outerB to outerC
    d += `A ${radius} ${radius} ${rotation} ${large} ${sweep} ${outerC.x} ${outerC.y} `;

    // straight line from outerC to innerD
    d += `L ${outerC.x} ${ outerC.y } `;

    // the inner arc, from innerD back to innerA (note the reversal of sweep!)
    d += `A ${ innerRadius } ${ innerRadius } ${ rotation } ${ large } ${ sweep ? 0 : 1 } ${innerA.x} ${innerA.y} `;

    d += `Z`; // should be unecessary, but better safe than sorry!

    return d;
};

/** 
 * The four (4) points used when defining a complete arc in an SVG 
 * The 4 points define a parallelogram-like object, except that two of the sides are arcs, not lines.
*/
export type ArcPoints = {
    innerA: Point, // origin point when offset = 0 
    outerB: Point, // a point at (0, radius) (final rotation is handled outside the path)
    outerC: Point, // the calculated point based on the angle and radius
    innerD: Point, // origin point when offset = 0
};

/**
 * Gets the four (4) points used when defining a complete arc. 
 * 
 * 
 * @param { Angle } angle - angular length of the arc
 * @param { number } radius - radius of the virtual circle that the arc runs along
 * @param { Point} origin - local origin point
 * @param { number } [offset=0] - how far to offset the inner part of the path; 0 = true pizza slice; > 0 = donut segment 
 */
export const getArcPoints = (angle:Angle, radius: number, origin:Point, offset: number = 0): ArcPoints => {

    // clamp the offset; it cannot be less than 0 or greater than the radius - 1
    const _offset = clamp(offset, 0, radius - 1);

    // first point is the inner corner of the segment on the first line;
    // this will be exactly equal to the origin if the offset is 0
    const innerA = {
        x: origin.x + _offset,
        y: 0,
    };

    // second point is the outer corner of the segment on the first line;
    // the offset never matters for this one
    const outerB = {
        x: origin.x + radius,
        y: 0,
    };

    const outerC = getPointFromOrigin(angle, radius, origin);
    const innerD = getPointFromOrigin(angle, origin.x + _offset, origin);

    return {
        innerA,
        outerB,
        outerC,
        innerD,
    };
};
