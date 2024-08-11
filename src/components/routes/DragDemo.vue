<script setup lang="ts">
import { computed, ref } from 'vue';

import { vDraggable } from '../../directives/vdraggable';

/** component demonstrating our custom v-draggable and v-droppable directives */
const width = ref(800);
const height = ref(400);

const center = computed(() => {
    return {
        x: width.value  / 2,
        y: height.value  / 2,
    }
});

const radius = computed(() => {
    const smaller = Math.min(width.value, height.value);
    return smaller / 6;
});

const viewBox = computed(() => {
    return `0 0 ${width.value} ${height.value}`
});

</script>

<script lang="ts">
    export default {
        name: 'DragDemo'
    };
</script>

<template>
    <div :class="$style.dragDemo">
        <h2>A Draggable SVG</h2>
            <svg :class="$style.donut" :width="width" :height="height" :view-box="viewBox">
                <circle 
                    v-draggable.foo="'bar'"
                    :cx="center.x" 
                    :cy="center.y" 
                    :r="radius" 
                    fill="skyblue"></circle>
            </svg>
    </div>
</template>

<style module>
.dragDemo {
    border: 1px dotted purple;
}

.outer {
    background-color: navajowhite;
}
</style>