<!-- 
A component that takes N pie slice data objects, 
and draws them as a Pie (or donut).

Does NOT return a complete SVG!
Simply returns a <g> with pie slice children
-->
<script setup lang="ts">
import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import PieSlice from '../svg/PieSlice.vue';
import { toUnitData } from '../../util/data/math';
import type { Datum, UnitDatum, StyleMap } from '../../util/data/types';
import type { ArcDatum } from '../../util/svg/path';
import { createStyleMap } from '../../util/svg/styles';
import { degrees } from '../../util/trig/angles';
import type { Point } from '../../util/trig/points';


export interface Props {
    // the data to turn into pie slices
    data: Array<Datum>,

    // diameter, in pixels, of the virtual circle to use for all slices
    diameter: number,

    // offset controls whether or not we look like a pizza slice or a donut segment
    // - a pizza pie slice has zero offset
    // - a donut segment has an offset > 0 but < 1
    offset?: number,

    // origin of each slice;
    // e.g. use an origin of 100, 100 to get a path centered in
    // an SVG with a viewBox of 0 0 200 200
    origin: Point,

    // non-optional style map; deciding on styles is above our pay grade!q
    styles: StyleMap,
};

// both withDefaults and defineProps are compiler macros
const props = withDefaults(defineProps<Props>(), {
    // non-primitive data requires a factory function
    data: () => [] as Array<Datum>,

    // this really should be specified, but provide a non-zero default
    diameter: 100,

    // pizza slice by default
    offset: 0,

    // another non-primitive value, another factory function
    origin: () => {
        return {
            x: 0,
            y: 0,
        }
    },
});

// convert the raw data into angle-centric Unit Interval data
const sliceData: ComputedRef<Array<ArcDatum>> = computed(() => {
    const { diameter, origin, offset } = props;
    const radius = diameter / 2;

    const unitized:Array<UnitDatum> = toUnitData(props.data);
    
    // starting rotation is -90, to account for cartesian vs computer coordinates
    // (n.b: we stick with degrees here, since those are the only units allowed for SVG rotations)
    const rotationSoFar = degrees(-90);

    // stylemap for determining stroke, fill, etc
    const { keyFn, styles } = createStyleMap(unitized);
    
    // convert the raw scalar data above to ArcDatum instances
    const arcData:Array<ArcDatum> = unitized.map((datum) => {

        // percent of the circle that this datum takes up
        const percent = datum.I.percent(2);
        const circleFraction = 360 * (percent / 100);
        const angle = degrees(circleFraction);

        // rotation for THIS angle
        const rotation = {
            value: rotationSoFar.value,
            unit: rotationSoFar.unit,
        };
    
        // rotation for the NEXT angle;
        rotationSoFar.value += angle.value;

        // strokewidth should be almost nothing unless the angle is very tiny
        let strokeWidth = 1;
        if (percent < 1){
            // keep tiny values visible
            strokeWidth = 5;
        }

        const key = keyFn(datum);
        const style = styles[key];

        const arcDatum:ArcDatum = {
            angle,
            offset,
            origin,
            radius,
            rotation,

            // style info
            fillColor: style.fillColor!,
            strokeColor: style.strokeColor!,
            strokeWidth: strokeWidth || style.strokeWidth,

            // optional extra info
            datum,
        };

        return arcDatum;
    });

    return arcData;
});

// get the correct transformation attribute for a given slice
const getTransform = (slice: ArcDatum):string => {
    const { origin, rotation } = slice;
    const degrees = rotation ? rotation.value : 0;
    const x = origin.x;
    const y = origin.y;

    const transform = `rotate(${degrees}, ${x}, ${y})`;

    return transform;
};

// get the value as a percentage
const getPercent = (slice:ArcDatum):string => {
    if (slice.datum && 'I' in slice.datum){
        const interval = slice.datum.I.percent(2);
        return `${interval}%`
    }

    return 'N/A';
};


</script>

<script lang="ts">
    export default {
        name: "PieSlices",
    };
</script>

<template>
    <g :class="$style.pieSlices">
        <g v-for="slice in sliceData" :transform="getTransform(slice)">
            <PieSlice
                :angle="slice.angle"
                :offset="slice.offset"
                :origin="slice.origin"
                :radius="slice.radius"
                :fillColor="slice.fillColor"
                :strokeColor="slice.strokeColor"
                :strokeWidth="slice.strokeWidth"
                :data-category="slice.datum?.category"
                :data-value="slice.datum?.value"
                :data-unit="slice.datum?.units"
                :data-percent="getPercent(slice)"
            ></PieSlice>
        </g>
    </g>
</template>

<style module>
.pieSlices {
    border: 1px dotted violet;
}
</style>