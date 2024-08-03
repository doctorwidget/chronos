<!--
A component that draws a complete Pie (or Donut) chart 
based on an array of N chart data objects.

This component *does* render an outer SVG, and places
three child components within it:

- PieSlices.vue; the pie/donut graphic itself
- ChartLegend.vue; the legend (which takes a simple map of categories to colors)
- ChartTitle.vue; a title, rendered as an svg <text>, 
-->

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';

import PieSlices from '../svg/PieSlices.vue';
import ChartLegend from './ChartLegend.vue';
import Text from './Text.vue';
import type { Datum, StyleMap } from '../../util/data/types';
import { createStyleMap } from '../../util/svg/styles';
import type { Point } from '../../util/trig/points';


export interface Props {

    /////  props which duplicate and are passed downto PieSlices.vue
    // the data to turn into pie slices
    data: Array<Datum>,

    // diameter, in pixels, of the virtual circle to use for all slices
    diameter: number,

    // offset controls whether or not we look like a pizza slice or a donut segment
    // - a pizza pie slice has zero offset
    // - a donut segment has an offset > 0 but < 1
    offset?: number,

    //// a stylemap can be passed in, or we can generate our own default
    styles?: StyleMap,

    /// NB: if turned on, the legend will start as a simple display based on StyleMap,
    // BUT in phase II, someone needs to consider data counts,
    // so zero-count categories can be (optionally) omitted from the legend.
    // (That's probably something better handled here than in ChartLegend.vue)
    legend: boolean,

    // strokeWidth will only be used if we end up building our own styleMap;
    // if a full-blown StyleMap comes in as a prop, this is ignored
    strokeWidth?: number,

    //// Title for the chart
    title: string,

    //// height and width of the chart 
    //(must be bigger than the diameter or content will be clipped)
    height: number,
    width: number,
};

// both withDefaults and defineProps are compiler macros
const props = withDefaults(defineProps<Props>(), {
    // non-primitive data requires a factory function
    data: () => [] as Array<Datum>,

    // this really should be specified, but provide a non-zero default
    diameter: 400,

    // pizza slice by default
    offset: 0,

    // sure, we want a legend!
    legend: true,

    // again, this only comes into play if we generate a default stylemap
    strokeWidth: 2,

    // chart height and width - again, this is not the same as the circle diameter,
    // because we need to have room for the legend and title, etcetera
    height: 480,
    width: 640,
});

const styles = computed(() => {
    const map = createStyleMap(props.data);
    return map;
});

const viewBox = computed(() => {
    const { width, height } = props;
    return `0 0 ${width} ${height}`;
});

const titleLoc:ComputedRef<Point> = computed(() => {
    return {
        x: props.width / 2,
        y: 25,
    }
});

// origin point for the circle
const circleLoc:ComputedRef<Point> = computed(() => {
    return {
        x: props.width / 2,
        y: props.height / 2,
    };
});

const legendTransform = computed(() => {
    return `translate(5, ${props.height * 0.33})`;
});

</script>

<script lang="ts">
    export default {
        name: "PieChart",
    };
</script>

<template>
    <svg xmlns='http://www.w3.org/2000/svg'
        :width="props.width"
        :height="props.height"
        :viewBox="viewBox">

        <Text :content="props.title" 
            :class="$style.title" 
            :loc="titleLoc"
            :anchor="'middle'">
        </Text>

        <ChartLegend 
            :styleMap="styles" 
            :transform="legendTransform"
        />

        <PieSlices
            :data="data"
            :diameter="props.diameter"
            :origin="circleLoc"
            :offset="props.offset"
            :styles="styles"
        />

    </svg>
</template>

<style module>
.title {
    font-size: large;
    stroke: white;
    fill:white;
}
</style>