<script setup lang="ts">

import { computed } from 'vue';

import type { FormatDurationOptions } from 'date-fns';
import { 
    differenceInCalendarDays,
    differenceInCalendarWeeks,
    differenceInCalendarMonths,
    differenceInCalendarYears,
    differenceInSeconds,
    format,
    formatDuration,
    intervalToDuration,
 } from 'date-fns';

import type { Chron } from '../../data/chrontypes';

const props = defineProps<{ 
    chron: Required<Chron>,
 }>();

const now = Date();


const duration = computed(() => {
    const d = intervalToDuration({
        start: props.chron.start,
        end: props.chron.end
    });
    return d;
});
const durationDone = computed(() => {
    const d = intervalToDuration({
        start: props.chron.start,
        end: now,
    });
    return d;
});
const durationLeft = computed(() => {
    const d = intervalToDuration({
        start: now,
        end: props.chron.end,
    });
    return d;
});


// 'formatDuration' formats a length of time, and it uses a format object
const durationFmt: FormatDurationOptions = {
    format: ['years', 'months', 'days']
};
const durationStr = computed(() => formatDuration(duration.value, durationFmt));
const durationDoneStr = computed(() => formatDuration(durationDone.value, durationFmt));
const durationLeftStr = computed(() => formatDuration(durationLeft.value, durationFmt));

// regular old 'format' is for a single day, and so it uses a format string
const dateFmt = `MMMM do, yyyy`;
const startStr = computed(() => format(props.chron.start, dateFmt));
const endStr = computed(() => format(props.chron.end, dateFmt));
const nowStr = computed(() => format(now, dateFmt));


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

const monthsDone = computed (() => {
    return differenceInCalendarMonths(now, props.chron.start);
});

const monthsLeft = computed(() => {
    return differenceInCalendarMonths(props.chron.end, now);
});

const monthsTotal = computed(() =>{
    return differenceInCalendarMonths(props.chron.end, props.chron.start);
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
                <em>Start</em> <span>{{ startStr }}</span>
            </li>
            <li>
                <em>End</em> <span>{{ endStr }}</span>
            </li>
            <li>
                <em>Duration Total</em> <span>{{ durationStr }}</span>
            </li>
            <li>
                <em>Duration Done</em> <span>{{ durationDoneStr }}</span>
            </li>
            <li>
                <em>Duration Left</em> <span>{{ durationLeftStr }}</span>
            </li>
            <li>
                <strong>Today</strong> <span>{{ nowStr }}</span>
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
                <th scope="row">Months</th>
                <td>{{ monthsDone }}</td>
                <td>{{ monthsLeft }}</td>
                <td>{{ monthsTotal }}</td>
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

tr td {
    color: black;
    font-weight: bold;
}

tr td:nth-child(2){
    background-color: palegreen;
}

tr td:nth-child(3){
    background-color: palevioletred;
}

tr td:nth-child(4) {
    background-color: paleturquoise;
}

</style>
