<!-- 
A component that renders an SVG <path> shaped like either
a pie slice or a donut segment, depending on the supplied offset.
You must supply:

- the radius of the underlying virtual circle
- the angle subtended by the (slice or segment)
- the offset (0 for a pie slice; > 0 for a segment)

The path is always drawn starting from angle 0; you should place the
<path> in a <g> and rotate that <g> to get the final rotation.
-->
<script setup lang="ts">
import { computed } from 'vue';

import { getArcPath } from '../../util/svg/path';
import type { Point } from '../../util/trig/points';
import type { Angle } from '../../util/trig/angles';
import { humanize } from '../../util/trig/angles';

export interface Props {
    // magnitude of the angle itself, with a specified unit type!
    angle: Angle,

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

    // pizza slice by default
    offset: 0,

    // another non-primitive value
    origin: () => {
        return {
            x: 0,
            y: 0,
        }
    },

    radius: 100
});


const pathAttr = computed(() => {
    const path = getArcPath(
        props.angle, 
        props.radius, 
        props.origin, 
        { offset: props.offset}
    );
    return path;
});

</script>

<script lang="ts">
    export default {
        name: "PieSlice",
    };
</script>

<template>
    <path :d="pathAttr"
        :class="props.className"
        :fill="props.fillColor"
        :stroke="props.strokeColor"
        :stroke-width="props.strokeWidth"
        :data-angle="humanize(angle)"
        :data-offset="offset">
    </path>
</template>

<style module>

</style>