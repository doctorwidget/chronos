# TODO

## Clock demo page:

- page component
    + route
    + routerNavLink entry in navigation area
    + current time in various modes (A...Z)

- part A: ClockText.vue
    literally just the date!
    updates via requestAnimationFrame


- part B: SVG ClockAnalog.vue
    circle with 12 _marker_ elements (?)
    hour hand (path, rotate it)
    minute hand (path, rotate it)
    second hand (path, rotate it)
- AM/PM marker
    two text elements
    one rectangle with *very* rounded corners, behind both
    one "pill" that slide-toggles to cover "am" or "pm"
- vue component
    takes Date object
    renders hour, minute, seconds, am/pm

- part C: SVG ClockDigital.vue
    nine panels for HHMMSSmmm
    plus extra panel for AM vs PM (A)
    plus 4 colons, so 14 panels: HH:MM:SS:mmm:A
    one panel is a subcomponent CharPanel.vue
    mainly there so it can have onUnmounted animations
        i.e. enter = old one flips _down_
        while new one is _revealed
        so update needs to know _old_ somehow
    each _panel_ takes a character
    the whole _clock_ takes a date

## USA SVG page

Refer to SVG Essentials book
Get the lat/long files for all 50 states (including Alaska & Hawaii!)

store the files in a new data/ directory

- transform files to SVGs, each a complete SVG with:
    - viewport minX, minY, maxX, maxY
    - width = (maxX-minX) * (some sanity factor)
    - height = (maxY - minY) * (some sanity factor)
    - data-state='california'
- npm script to do the transformation
- now you have a data/states/*.* dir and an assets/states/*.* dir
    - and a states.ts file somewhere to handle the bookkeeping
    - names of each state mapped to svg file for each state
    - export const _stateNames_ = array of words
    - export const _stateSVGs_ = map with names to stringified svg data
- finally each svg exposes the raw lat/longs and the sanity factor for reuse
    + data-min-x...data-max-y
    + sanity factor
- now each SVG *in isolation* is the correct shape, but a complete SVG
- and if you wanted to *lay them all out*, you have all the info for doing so
    + one outer svg with an `id=usa-uuidfrag` and `data-uuid=uuidfrag`
    + include each child svg with an #id, `statename-uuidfrag` (same frag!)
    + each child is located via introspection
        + x = stateSvg.getAttribute('data-minX')
        + y = stateSvg.getAttribute('data-minY')
    + track each minx, miny, max, maxY as you iterate through all states
    + in the end, SVG has
        - *whatever width and height you want*
        - a *viewbox* of cumulativeMinX cumulativeMinY cumulativeMaxX cumulativeMaxY
- now to add interactivity
    + find SVG, get uuidfrag
    + find all the states (either via actual key values or just select all `[data-state]`)
    + add whatever you need to each






