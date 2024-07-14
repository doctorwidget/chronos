<script setup lang="ts">

import { computed } from 'vue';

import { 
    differenceInCalendarDays,
    differenceInCalendarWeeks,
    differenceInCalendarMonths,
    differenceInCalendarYears,
    differenceInSeconds,
    intervalToDuration,
 } from 'date-fns';

import type { Chron } from '../../data/chrontypes';

const props = defineProps<{ 
    chron: Required<Chron>,
 }>();

const now = Date();

const duration = computed(() => {
    return intervalToDuration({
        start: props.chron.start,
        end: props.chron.end
    });
});

const percent = computed(() => {
    const secondsDone = differenceInSeconds(now, props.chron.start);
    const secondsLeft = differenceInSeconds(props.chron.end, now);
    const total = secondsDone + secondsLeft;
    const pct = secondsDone / total;
    const roundedPct = (pct * 100).toFixed(2);
    return roundedPct;
});

const yearsDone = computed (() => {
    return differenceInCalendarYears(now, props.chron.start);
});

const yearsLeft = computed(() => {
    return differenceInCalendarYears(props.chron.end, now);
});

const yearsTotal = computed(() =>{
    return differenceInCalendarYears(props.chron.end, props.chron.start);
});

const weeksDone = computed (() => {
    return differenceInCalendarWeeks(now, props.chron.start);
});

const weeksLeft = computed(() => {
    return differenceInCalendarWeeks(props.chron.end, now);
});

const weeksTotal = computed(() =>{
    return differenceInCalendarWeeks(props.chron.end, props.chron.start);
});

const daysDone = computed (() => {
    return differenceInCalendarDays(now, props.chron.start);
});

const daysLeft = computed(() => {
    return differenceInCalendarDays(props.chron.end, now);
});

const daysTotal = computed(() =>{
    return differenceInCalendarDays(props.chron.end, props.chron.start);
});


</script>

<script lang="ts">
/** allow importers to check 'SplitDuration.name'
 * E.g. see the switch statement in ../ChronView.vue;
 * If we don't have this clause here, 'SplitDuration.vue' is undefined,
 * and a 'SplitDuration' chron will be routed to the Unknown renderer 
 * instead of being routed here
 */
export default {
    name: 'SplitDurationText',
}
</script>

<template>
    <div :class="$style.splitDuration">
        <h2>{{ props.chron.title }}</h2>
        <ul>
            <li>
                <em>Start</em> <span>{{ props.chron.start }}</span>
            </li>
            <li>
                <em>End</em> <span>{{ props.chron.end }}</span>
            </li>
            <li>
                <em>Duration</em> <span>{{ duration }}</span>
            </li>
            <li :class="$style.big">
                <strong>Percent</strong> <span>{{ percent }}%</span>
            </li>
        </ul>
        <table :class="$style.unitTable">
            <caption>By Units</caption>
            <tr>
                <th scope="col">Units</th>
                <th scope="col">Done</th>
                <th scope="col">Left</th>
                <th scope="col">Total</th>
            </tr>
            <tr>
                <th scope="row">Days</th>
                <td>{{ daysDone }}</td>
                <td>{{ daysLeft }}</td>
                <td>{{ daysTotal }}</td>
            </tr>
            <tr>
                <th scope="row">Weeks</th>
                <td>{{ weeksDone }}</td>
                <td>{{ weeksLeft }}</td>
                <td>{{ weeksTotal }}</td>
            </tr>
            <tr>
                <th scope="row">Years</th>
                <td>{{ yearsDone }}</td>
                <td>{{ yearsLeft }}</td>
                <td>{{ yearsTotal }}</td>
            </tr>

        </table>
    </div>
</template>

<style module>
.splitDuration {
    border: 1px dotted magenta;
}

.unitTable {
    width: 100%;
}

.unitTable caption {
    font-style:italic;
    font-size:small;
}
</style>
