<script setup lang="ts">
/** an early practice component; nothing interactive about it */
const diameter = 400;
const radius = diameter / 2;
const origin = {
    x: radius,
    y: radius,
}
const q1 = `M ${origin.x},${origin.y} 
              L ${origin.x + radius},${radius}
              A ${radius},${radius}
              0 0 0
              ${origin.x}, ${origin.y - radius}
              L ${origin.x},${origin.y}`;

const q2 = `M ${origin.x},${origin.y} 
    L ${origin.x},${origin.y - radius}
    A ${radius},${radius}
    0 0 0
    ${origin.x - radius}, ${origin.y}
    L ${origin.x},${origin.y}`;

const q3 = `M ${origin.x},${origin.y} 
    L ${origin.x - radius},${radius}
    A ${radius},${radius}
    0 0 0
    ${origin.x}, ${origin.y + radius}
    L ${origin.x},${origin.y}`;

const q4 = `M ${origin.x},${origin.y} 
    L ${origin.x},${origin.y + radius}
    A ${radius},${radius}
    0 0 0
    ${origin.x + radius}, ${origin.y}
    L ${origin.x},${origin.y}`;


</script>

<script lang="ts">
    export default {
        name: 'DonutDemo'
    };
</script>

<template>
    <div :class="$style.donutDemo">
        <h2>Donut style</h2>
            <div>Coming soon!</div>
            <svg :class="$style.donut" width="400" height="400">
                
                <!-- blue arc, cartesian (1, 0) to cartesian (0, 1)-->
                 <path :d="q1" fill="blue"></path>

                <!-- green arc, cartesian (0, 1) to cartesian (-1, 0)-->
                <path :d="q2" fill="green"></path>

                <!-- orange arc, cartesian (-1, 0) to cartesian (0, -1)-->
                <path :d="q3" fill="orange"></path>

                <!-- purple arc, cartesian (0, -1) to cartesian (0, 1)-->
                <path :d="q4" fill="purple"></path>

                <!-- circle, to create a donut effect -->
                <circle :cx="radius" :cy="radius" :r="radius * 0.7" fill="white"></circle>
            </svg>
    </div>
</template>

<style module>
.donutDemo {
    border: 1px dotted blue;
}
</style>