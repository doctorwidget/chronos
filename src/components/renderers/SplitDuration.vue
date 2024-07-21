<!--
This should eventually be split up into at least four components:

1. this top level renderer, SplitDuration
2. a SplitDurationSummary.vue component, handling the <list> of universal text value
3. a SplitDurationTable.vue component, rendering the original table
4. a SplitDurationDonut.vue component, rendering a D3 donut view. 

And then we would watch the renderStyle ref and use either the table or donut
renderer, depending on what the user just choice. While we're at it, we should
sure use <component :is...> instead of the current [v-if] approach. 

Also, the "style" value is currently managed as in-component local state. 
It would be better to move that elsewhere and pass it in as a prop. 

Finally, I'd like the remaining SplitDuration.vue file to be even shorter, 
We probably should create a new util file, which imports and uses all of
the various date-fns methods. There should be one main exported helper function
that can be called whenever either date changes; it should return a single
object with values for all 12 cells of the table, with human-friendly keys. 
And in the util file, obviously we should just have a function that decides 
which of the `differenceFoo` methods to call based on an input argument. 

...but it's too early to do any of that now. 
For now, we remain a wordy proof-of-concept, 
and that's perfectly OK!
-->

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
import DonutDemo from '../routes/DonutDemo.vue';

const props = defineProps<{ 
    chron: Required<Chron>,
 }>();


 /** more use of the v-model macro, new in Vue 3.4 */
 type RenderStyle = 'table' | 'donut';
 const renderStyle = defineModel<RenderStyle, string>({
    default: "table",
});

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
    name: 'SplitDuration',
}
</script>

<template>
    <div :class="$style.splitDuration">
        <h2>{{ props.chron.title }}</h2>

        <!-- summary list: refactor me to a component -->
        <ul :class="$style.summary">
            <li>
                <em>Start</em> <span>{{ startStr }}</span>
            </li>
            <li>
                <em>End</em> <span>{{ endStr }}</span>
            </li>
            <li>
                <em>Total time</em> <span>{{ durationStr }}</span>
            </li>
            <li>
                <em>Time done</em> <span>{{ durationDoneStr }}</span>
            </li>
            <li>
                <em>Time Left</em> <span>{{ durationLeftStr }}</span>
            </li>
            <li :class="$style.big">
                <em>Percent</em> <span>{{ percent }}%</span>
            </li>
        </ul>
        <div>
            <strong>Render style: </strong>
            <span>
                <input type="radio" id="styleTable" value="table" v-model="renderStyle" />
                <label for="styleTable">Table</label>

                <input type="radio" id="styleDonut" value="donut" v-model="renderStyle" />
                <label for="donut">Donut</label>
            </span>
        </div>

        <!-- table style: refactor me to a component -->
        <table :class="$style.unitTable" v-if="renderStyle==='table'">
            <caption>Durations as of {{ nowStr }}</caption>
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

        <!-- donut style; refactor me to a component -->
        <div v-if="renderStyle==='donut'">
            <DonutDemo></DonutDemo>
        </div>
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

.summary {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.summary li {
    display: inline-block;
    width: 250px;
    min-width: 250px;
    padding: 1rem;
    border: 1px dotted navajowhite;
}

.summary li em {
    font-weight: bold;
    font-family: monospace;
    color: navajowhite;
}
.summary li > span {
    font-size: small;
}

svg.donut {
    background-color: white;
}
</style>
