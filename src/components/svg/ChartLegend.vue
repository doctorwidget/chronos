<!-- A component that takes N pie slice data objects 
and renders a color-coded legend for them. 

Returns only an SVG <g>, not a complete SVG!
-->

<script setup lang="ts">

import { computed } from 'vue';

import Text from './Text.vue';
import type { StyleMap } from '../../util/data/types';
import type { Point } from '../../util/trig/points';

const props = defineProps<{ 
    styleMap: StyleMap
}>();

const entries = computed(() => {
    return [...Object.entries(props.styleMap.styles)]
});

const CHIP_WIDTH = 20;
const LINE_HEIGHT = 35;
const PADDING = 10;
const NUDGE = 5;

const getRectLoc = (index:number):Point => {
    return {
        x: PADDING,
        y: (index * LINE_HEIGHT) - (CHIP_WIDTH - NUDGE),
    }
};

const getTextLoc = (index:number):Point => {
    return {
        x: CHIP_WIDTH + (PADDING * 2),
        y: index * LINE_HEIGHT,
    }
};

</script>


<script lang="ts">
    export default {
        name: "ChartLegend",
    };
</script>

<template>
    <g :class="$style.legend" data-type="ChartLegend">
        <g v-for="(entry, index) of entries">
            <rect :fill="entry[1].fillColor" 
                :x="getRectLoc(index).x"
                :y="getRectLoc(index).y"
                :width="CHIP_WIDTH"
                :height="CHIP_WIDTH" />
            <Text :content="entry[0]" :loc="getTextLoc(index)" :class="entry[0]"/>
        </g>
    </g>
</template>

<style module>
.legend {
    border: 1px dotted magenta;
}

.legend Text {
    fill: white;
}
</style>
