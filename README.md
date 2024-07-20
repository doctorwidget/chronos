# TODO

- separate the 4 color circle into a completely fixed svg vue component

- implement utils/trig.js
    + has to handle all 3 unit types!
    + our data wants gradians
    + svg rotation (etc) wants degrees
    + all JS math wants radians
    + so we need all 3 converters (bidirectional)
    + and a getPointFromAngle(origin, angle, radius)
- set up vue router; want at least 3 routes:
    + home page is what we have now; this is our real goal
    + page#2 = the hardcoded 4 slice pie
    + page#3 = a new arc playground
- implement the slice.vue component
    + accept { origin, angle, radius, fillColor, strokeColor, strokeWidth, className } as props
    + use the methods above to get the _points_
    + use SVG path commands to draw the pie slice
    + return (a complete SVG or just a g?)
- arc playground page
    + outer view
    + controls view
    + slice view
    + can use controls to manage the slide
- implement a SplitDurationDonut.vue component that creates the full donut based on 3 quantities
    + quantity1 = done
    + quantity2 = togo
    + quantity3 = today
    