<script setup lang="ts">
import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import Slice from '../svg/Slice.vue';
import type { Angle } from '../../trig/angles';
import { isLarge, sanitize, units } from '../../trig/angles';
import type { Point } from '../../trig/points';


/**
 * Models - directly hooked to inputs in the template
 */
 const angleValue = defineModel('angleValue', {
    default: 45,
    type: Number,
});
const angleUnits = defineModel('angleUnits', {
    default: 'degrees',
});
const size = defineModel('size', {
    default: 400,
});
const rotation = defineModel('rotation', {
    default: 0,
});
// baseline rotation to correct for cartesian vs computer
const CART = -90;

/**
 * Computed refs - derived from models above
 */
const angle:ComputedRef<Angle> = computed(() => {
    const raw = {
        value: angleValue.value,
        unit: angleUnits.value,
    } as Angle;

    const sanitized = sanitize(raw);

    if (sanitized.value === 0 && (Math.abs(raw.value) > 0)) {
        // We obviously want to treat exact multiples of a full circle as a full circle, not zero!
        // But there are an infinite number of arbitrary circles that you could use if
        // you try to draw an arc between two superimposed points.
        // So the real answer here should be to draw this as a true SVG <circle>,
        // but for now we'll do this quick and dirty hack of treating 360 as 359.999
        // (and 400 gradians as 399.999 gradians, and 2PI radians as (2PI - 0.001) radians, etc).

        // It's ironic that "sanitized" arcs will have these very floating-pointish values
        // when they started with whole numbers. But at least we've quarantined this fix
        // to the rendering layer; the 'sanitize()' can still be unit tested in its pure form.
        sanitized.value = units[raw.unit].circle - 0.001;
    }

    return sanitized;
});

/**
 * We want largeArc:true whenever the angle is > 180, aka a 'reflex' angle.
 * ('obtuse' angles are between 90 and 180, but they still use largeArc: false)
 */
const largeArc:ComputedRef<number> = computed(() => {
    return isLarge(angle.value) ? 1 : 0;
});
/**
 * Sweep should be *counterclockwise* for negative angles
 */
const sweep:ComputedRef<number> = computed(() => {
    return (angle.value.value < 0) ? 0 : 1;
})

const origin: ComputedRef<Point> = computed(() => {
    return {
        x: size.value / 2,
        y: size.value / 2,
    } as Point;
});

const transform: ComputedRef<string> = computed(() => {
    return `rotate(${CART + rotation.value}, ${origin.value.x}, ${origin.value.y})`
});

</script>

<template>
    <div :class="$style.arcLab">
        <h2>Arc Lab</h2>
        <div :class="$style.controls">
            <!-- angle value -->
            <span :class="$style.control">
                <label for="angleValue">Angle</label>
                <input id="angleValue" type="number" v-model="angleValue"/>
            </span>

            <!-- angle units -->
            <span :class="$style.control">
                <strong>Units: </strong>
                <span>
                    <input type="radio" id="uDegrees" value="degrees" v-model="angleUnits" />
                    <label for="uDegrees">Degrees</label>

                    <input type="radio" id="uGradians" value="gradians" v-model="angleUnits" />
                    <label for="uGradians">Gradians</label>

                    <input type="radio" id="uRadians" value="radians" v-model="angleUnits" />
                    <label for="uRadians">Radians</label>
                </span>
            </span>

            <!-- total SVG size-->
            <span :class="$style.control">
                <label for="size">Size</label>
                <input id="size" type="number" v-model="size"/>
            </span>

            <!-- rotation away from -90.
                (-90 corrects for cartesian vs computer graphics)
                (any value here modifies the -90 baselines)
             -->
            <span :class="$style.control">
                <label for="rotation">Rotation</label>
                <input type="number" v-model="rotation"/>
                degrees
            </span>

            <!-- offset value (donut vs pizza slice)-->

            <!-- fill color -->
        </div>
        <svg xmlns='http://www.w3.org/2000/svg'
            :viewPort="`0 0 ${size} ${size}`"
            :width="`${size}`" 
            :height="`${size}`">

            <g :transform="transform">
                <Slice
                    :angle="angle"
                    :origin="origin"
                    :radius="size / 2"
                    :fillColor="'skyblue'"
                    :flagLargeArc="largeArc"
                    :flagSweep="sweep"
                    >
                </Slice>
            </g>

        </svg>
    </div>
</template>

<style module>
.arcLab {
    border: 1px dotted green;
    width: 100%;
}

.controls {
    padding: 1rem;
    margin: 1rem;
}

.control {
    margin: 0.5rem;
    padding: 0.5rem;
    display: inline-block;
}

.control [type="number"] {
    width: 100px;
    max-width: 100px;
}

.control label {
    font-weight: bold;
}
</style>../../trig/angles../../trig/angles