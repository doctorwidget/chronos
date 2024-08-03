/**
 * Utilities for working with SVG <path> elements
 */
import { clamp } from '../data/math';
import type { Angle } from '../trig/angles';
import { isLarge, sanitize } from '../trig/angles';
import { getPointFromOrigin } from '../trig/points';
import type { Point } from '../trig/points';

/**
 * The data we need to draw one (1) arc-like SVG path.
 */
export type ArcDatum = {
    // magnitude of the angle itself, with a specified unit type!
    angle: Angle,

    // completely optional category name
    category?: string,

    className?: string,

    // valid css color string
    fillColor?: string,

    // offset controls whether or not we look like a pizza slice or a donut segment
    // - a pizza pie slice has zero offset
    // - a donut segment has an offset > 0 but < 1
    offset?: number,

    // origin of the slice;
    // e.g. use an origin of 100, 100 to get a path centered in
    // an SVG with a viewBox of 0 0 200 200
    origin: Point,

    // radius, in pixels, of the virtual circle this is a slice of
    radius: number,

    // rotation of the angle
    // (after drawing it starting from x:radius, y:0)
    rotation?: Angle,

    // valid css color string
    strokeColor?: string,

    // stroke width, in pixels
    strokeWidth?: number,
};

/** 
 * There are a ton of options for drawing the actual path attribute
 * Rather than requiring them as arguments (and potentially getting stuck with unwanted defaults)
 * we define an options object with everything optional. 
 */
export type ArcPathOptions = {
    // i.e. x-axis-rotation option; rotates the virtual ellipse, so no effect for true circles.
    xAxisRotation: number, 

    // large arc flag; draw the smaller (0) or larger (1) of the 2 possible circles
    // we _usually_ calculate this by determining if the module of the angle is > 180
    // but we should _allow_ users to specify it in the object if they have that need
    largeArcFlag: 0 | 1,

    // sweep flag, aka the clockwise flag
    // 1 means the angle is drawn clockwise
    // 0 means the angle is drawn counterclockwise; 
    sweep: 0 | 1,

    // how far to offset the inner part of the path
    // 0 = a classic pizza slice
    // N = some degree of donut-ness
    // This will be clamped between 0 and (radius-1), and defaults to 0 if unspecified
    offset: number,
};

/**
 * Get a complete [d] attribute for an arc-shaped <path>.
 * 
 * The assumption is the arc will be centered on the supplied origin point,
 * on a virtual circle/ellipse with the supplied radius. 
 * 
 * @param { Angle } angle - angular length of the arc
 * @param { number } radius - radius of the virtual circle that the arc runs along
 * @param { Point} origin - local origin point
 * @param { Partial<ArcPathOptions> } opts - optional arc-related options (all have sane defaults)
 * @return { string } - string value for the [d] attribute, creating the arc described by the above
 */
export const getArcPath = (angle:Angle, radius: number, origin:Point, opts:Partial<ArcPathOptions> = {}) => {
    // sanitize the angle via modulo division
    const _angle = sanitize(angle);

    // donut-ness; 
    // defaults to 0 - no donut-ness at all, just a pizza slice
    const offset = opts.offset || 0;

    // inner radius will be used when drawing the inner arc
    // in a zero-offset situation, this is useless but harmless
    const innerRadius = clamp(offset, 0, radius - 1);

    // rotation of the ellipse, if the arc is around an ellipse instead of a circle
    // defaults to 0 - no such rotation
    const rotation = opts.xAxisRotation || 0;

    // large angle, yes or no?
    // defaults to being calculated; angle > 180 gets drawn with largeArc:1, otherwise largeArc:0
    const calcLarge = isLarge(_angle) ? 1 : 0;
    const large = opts.hasOwnProperty('largeArcFlag') ? opts.largeArcFlag! : calcLarge;

    // sweep direction
    const sweep = opts.hasOwnProperty('sweep') ? opts.sweep! : 1;

    // get the points
    const { innerA, outerB, outerC, innerD, } = getArcPoints(_angle, radius, origin, offset);

    // round the points to the nearest 0.01 pixels
    const points = [innerA, outerB, outerC, innerD];
    for (const p of points) {
        p.x = (Math.round(p.x * 100)) / 100;
        p.y = (Math.round(p.y * 100)) / 100;
    }

    //// DRAW THE PATH
    // start at innerA,
    let d = `M ${innerA.x} ${innerA.y} `;

    // straight line to outerB
    d += `L ${ outerB.x } ${ outerB.y } `;

    // the outer arc, from outerB to outerC
    d += `A ${radius} ${radius} ${rotation} ${large} ${sweep} ${outerC.x} ${outerC.y} `;

    // straight line from outerC to innerD
    d += `L ${innerD.x} ${ innerD.y } `;

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
        y: origin.y,
    };

    // second point is the outer corner of the segment on the first line;
    // the offset never matters for this one
    const outerB = {
        x: origin.x + radius,
        y: origin.y,
    };

    const outerC = getPointFromOrigin(angle, radius, origin);
    const innerD = getPointFromOrigin(angle, _offset, origin);

    return {
        innerA,
        outerB,
        outerC,
        innerD,
    };
};
