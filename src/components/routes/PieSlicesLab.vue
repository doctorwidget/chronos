<!-- component for working with a PieSlices component in isolation.
 So: not a PieChart component! There is no title or legend, 
 and limited ability to pass along styles, etc. 
 Just the PieSlices, please. 
 -->
<script setup lang="ts">
import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import PieSlices from '../svg/PieSlices.vue';
import type { Datum } from '../../util/data/types';
import type { Point } from '../../util/trig/points';

// 3 arcs, 'alpha', 'beta', and 'gamma'
// all angles use degrees
// all size 400
// offsets default to zero but can be set to equal the unit interval value

/**
 * Models - directly hooked to inputs in the template
 */
const aQuantity = defineModel('aQuantity', {
    default: 50,
    type: Number,
});

const bQuantity = defineModel('bQuantity', {
    default: 100,
    type: Number,
});

const gQuantity = defineModel('gQuantity', {
    default: 300,
    type: Number,
});

const offset = defineModel('offset', {
    default: 0,
});

// constants (for now)
const size = 400;
const origin:Point = {
    x: 200,
    y: 200,
};

const data:ComputedRef<Array<Datum>> = computed(() => {

    return [
        {
            value: aQuantity.value,
            units: 'days',
        },
        {
            value: bQuantity.value,
            units: 'days',
        },
        {
            value: gQuantity.value,
            units: 'days'
        }
    ];

});

</script>

<template>
    <div :class="$style.arcLab">
        <h2>Pie / Donut Chart Lab</h2>
        <div :class="$style.controls">
            <!-- arc quantity values -->
            <span :class="$style.control">
                <label for="aQuantity">Arc Alpha Quantity</label>
                <input id="aQuantity" type="number" min="0" v-model="aQuantity"/>
            </span>

            <span :class="$style.control">
                <label for="bQuantity">Arc Beta Quantity</label>
                <input id="bQuantity" type="number" min="0" v-model="bQuantity"/>
            </span>

            <span :class="$style.control">
                <label for="bQuantity">Arc Gamma Quantity</label>
                <input id="bQuantity" type="number" min="0" v-model="gQuantity"/>
            </span>

            <!-- offset value (donut vs pizza slice)-->
            <span :class="$style.control">
                <label for="offset">Offset</label>
                <input id="offset" type="number" v-model="offset" min="0" max="500"/>
                pixels
            </span>
        </div>
        <svg xmlns='http://www.w3.org/2000/svg'
            :viewPort="`0 0 ${size} ${size}`"
            :width="`${size}`" 
            :height="`${size}`">

            <PieSlices
                :data="data"
                :diameter="size"
                :origin="origin"
                :offset="offset"
            ></PieSlices>
            
        </svg>
    </div>
</template>


<style module>
.arcsLab {
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
</style>