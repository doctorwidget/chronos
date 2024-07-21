<!-- a component that draws SVG <path> shaped like a pie slice 
It is always centered at (radius, radius),

Note: this just provides the <path>, not the outer SVG!

TODO: account for Cartesian vs Computer coordinates 
(Computer = clockwise from 90, Cartesian = counterclockwise from 180)

-->
<script setup lang="ts">
import { computed } from 'vue';

import { getPointFromOrigin } from '../../trig/points';
import type { Point } from '../../trig/points';
import type { Angle } from '../../trig/angles';

export interface Props {
    // magnitude of the angle itself, with a specified unit type!
    angle: Angle,

    className?: string,

    // valid css color string
    fillColor?: string,

    // flag for x-axis-rotation: 0 means no rotation
    flagRotation?: number,
    // flag for large or small arc; 0 is the smaller arc (< 180), 1 is the larger one (> 180)
    flagLargeArc?: number,
    // flag for sweep direction; 0 for counterclockwise, 1 for clockwise
    flagSweep?: number,

    // offset controls whether or not we look like a pizza slice or a donut segment
    // - a pizza pie slice has zero offset
    // - a donut segment has an offset > 0 but < 1
    offset?: number,

    // origin of the slice;
    // e.g. for an SVG box of 200 x 200, our origin is at 100, 100
    origin: Point,

    // radius, in pixels, of the virtual circle this is a slice of
    radius: number,

    // valid css color string
    strokeColor?: string,
    
    // stroke width, in pixels
    strokeWidth?: number,
};

// both withDefaults and defineProps are compiler macros
const props = withDefaults(defineProps<Props>(), {
    // all non-primitive values must be factory functions!
    angle: () => {
        return {
            value: 90, 
            unit: 'degrees',
        }
    },

    // default flag values - all zeroes until proven otherwise
    flagRotation: 0, // no rotation
    flagLargeArc: 0, // use the small angle
    flagSweep: 1, // clockwise, not counterclockwise

    // pizza slice by default
    offset: 0,

    // another non-primitive value
    origin: () => {
        return {
            x: 100,
            y: 100,
        }
    },

    radius: 100
});

/**
 * Get the _first_ point for the slice.
 * This would be { x: 1, y: 0 } if we were working in a Cartesian unit circle.
 * But we're not! So it's the same _relative_ position, but with actual numbers 
 * substituted for the simple 0..1 range used by a unit circle. 
 * @type { ComputedRef<Point> }
 */
const firstPoint = computed(() => {
    return {
        x: props.origin.x + props.radius,
        y: props.origin.y,
    }
});

/**
 * Get the _second_ point for the slice.
 * This is the second point on the virtual circle that we are drawing an arc on.
 * The exact coordinates depend on the specified angle, radius, and origin point.
 * @type { ComputedRef<Point> }
 */
const secondPoint = computed(() => {
    return getPointFromOrigin(props.angle, props.radius, props.origin);
});

const pathAttr = computed(() => {
    const ox = props.origin.x;
    const oy = props.origin.y;
    const r = props.radius;
    const rotation = props.flagRotation;
    const largeArc = props.flagLargeArc;
    const sweep = props.flagSweep;

    // start from the origin
    let path = `M ${ox} ${oy} `;

    // line to point #1
    path += `L ${ firstPoint.value.x } ${ firstPoint.value.y } `

    // now the arc proper
    path += `A ${r} ${r} ${rotation} ${largeArc} ${sweep} ${secondPoint.value.x} ${secondPoint.value.y} `;
    
    // then back to the origin

    // TODO: this is where a donut path will be very different!
    // break out to one of two helper methods, where this is the simpler one
    path += `L ${ox} ${oy} `;

    // and always close off the path
    path += 'Z';

    return path;
});


</script>

<script lang="ts">
    export default {
        name: "Slice",
    };
</script>

<template>
    <path :d="pathAttr"
        :class="props.className"
        :fill="props.fillColor"
        :stroke="props.strokeColor"
        :stroke-width="props.strokeWidth">
    </path>
</template>

<style module>

</style>../../trig/points../../trig/angles