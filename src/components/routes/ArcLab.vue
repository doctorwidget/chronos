<script setup lang="ts">
import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import Slice from '../svg/Slice.vue';
import type { Angle, Point } from '../../trig/units';

const angle:ComputedRef<Angle> = computed(() => {
    return {
        value: 45,
        unit: 'degrees'
    } as Angle;
});

const origin: ComputedRef<Point> = computed(() => {
    return {
        x: 200,
        y: 200,
    } as Point;
});

const rotation: ComputedRef<string> = computed(() => {
    return `rotate(-90, ${origin.value.x}, ${origin.value.y})`
});

</script>

<template>
    <div :class="$style.arcLab">
        <h2>Arc Lab</h2>
        <p>Coming soon</p>
        <svg xmlns='http://www.w3.org/2000/svg'
            viewPort="0 0 400 400"
            width="400" height="400">

            <g :transform="rotation">
                <Slice
                    :angle="angle"
                    :origin="origin"
                    :radius="200"
                    :fillColor="'skyblue'"
                    >
                </Slice>
            </g>

        </svg>
    </div>
</template>

<style module>
.arcLab {
    border: 1px dotted green;
}
</style>