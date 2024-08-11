/**
 * A directive to make an SVG element draggable. 
 * Uses explicitly SVG-centric properties like :x and :y.
 * 
 * So if you have something like a circle which lacks :x and :y,
 * you should wrap that circle in a <g>, give the <g> an :x and :y,
 * and apply the directive to the <g>.
 * 
 * An HTML-centric version would use things like :top and :left instead.
 * TODO: refactor to be generic enough to use with either SVG or HTML elements.
 */
import { DirectiveBinding, ObjectDirective, VNode } from "vue";


// attributes for the cumulative drag values
export const dragAttrs = {
    x: 'data-translate-x',
    y: 'data-translate-y',
    transform: 'transform',
};

// Shared map of elements to MutationObservers,
// so we can clean up our mutation observers when the element unmounts.
const observers = new Map<Element, MutationObserver>();

/**
 * Set up a mutation observer to watch for changes to dragAttrs.x and dragAttrs.y
 * @param { Element} el - the element to observe
 */
export const observe = (el:Element) => {

    // Options for the observer (which mutations to observe)
    const config = { attributes: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList: Array<MutationRecord>, _:MutationObserver) => {
        for (const mutation of mutationList) {
            if (mutation.type === "attributes") {
                const name = mutation.attributeName;
                if (name === dragAttrs.x || name === dragAttrs.y){
                    console.log(`vDraggable: the ${name} attribute was modified.`);
                    updateTranslation(el);
                }
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(el, config);

    // record the observer so we can disconnect it later on
    observers.set(el, observer);
};

/**
 * Clean up an observer
 * @param { Element } el - the element to unobserve
 */
export const unobserve = (el: Element) => {
    if (observers.has(el)){
        const observer = observers.get(el);
        observer?.disconnect();
        observers.delete(el);
    }
};

/**
 * Translate an element by the supplied deltas.
 * Keeps track of previous shifts via drag attributes
 * @param { Element } el - the element whose [transform:translate] value is to be mutated
 * @param { number } deltaX - horizontal shift, i.e. change in the x coordinate
 * @param { number } deltaY - vertical shift, i.e. change in the y coordinate 
 */
export const translateBy = (el:Element, deltaX: number, deltaY: number) => {
    const baseX = Number(el.getAttribute(dragAttrs.x) || '') || 0; 
    const baseY = Number(el.getAttribute(dragAttrs.y) || '') || 0;

    // calculate the final changed x and y
    const x = baseX + deltaX;
    const y = baseY + deltaY;

    // remember those new values
    el.setAttribute(dragAttrs.x, `${x}`);
    el.setAttribute(dragAttrs.y, `${y}`);

    // and then update the transform:translate
    updateTranslation(el);
};

/**
 * Reset the translation back to 0,0
 * @param { Element } el - the element whose [transform:translate] value is to be reset
 */
export const resetTranslation = (el:Element) => {
    el.setAttribute(dragAttrs.x, '0');
    el.setAttribute(dragAttrs.y, '0');

    updateTranslation(el);
};

/**
 * Set a new translation value based on [data-translate-x] and [data-translate-y]
 * @param { Element } el - the svg element whose [transform:translate] value is to be updated
 */
export const updateTranslation = (el: Element) => {
    const x = el.getAttribute(dragAttrs.x) || 0;
    const y = el.getAttribute(dragAttrs.y) || 0;
    const translation = `translate(${x}, ${y})`;

    // nb: this is incompatible with other transforms!
    // todo: make a utility method that safely leaves other transforms intact
    el.setAttribute(dragAttrs.transform, translation);
};

/**
 * Handler for when the element first mounts
 * @param { Element } el - the svg element to be dragged
 * @param { DirectiveBinding } binding - binding details, e.g. value, args, modifiers
 * @param { VNode } node - the Vue node associated with the raw Element
 */ 
const mounted = (el:Element, binding:DirectiveBinding, node:VNode) => {
    console.log(`vDraggable MOUNTED: `, el, binding, node);

    let dragging = false;

    el.addEventListener('pointerdown', (_) => {
        dragging = true;
    });

    document.body.addEventListener('pointerup', (_) => {
        dragging = false;
    });

    el.addEventListener('pointermove', (evt:Event) => {
        if (!dragging) {
            return;
        }
        if (!(evt instanceof MouseEvent)){
            return;
        }

        // we ARE dragging
        // shift the target by those amounts
        translateBy(el, evt.movementX, evt.movementY);
    });

    // add a mutation observer, so that anyone has access to both
    // [data-translate-x] and [data-translate-y]
    observe(el);
};

/**
 * Handler for whenever the element updates
 * @param { Element } el - the svg element to be dragged
 * @param { DirectiveBinding } binding - binding details, e.g. value, args, modifiers
 * @param { VNode } node - the Vue node associated with the raw Element
 */ 
const updated = (el:Element, binding:DirectiveBinding, node:VNode) => {
    console.log(`vDraggable UPDATED `, el, binding, node);

    resetTranslation(el);
};

/**
 * Handler for when the element unmounts
 * @param { Element } el - the svg element to be dragged
 */ 
const unmounted = (el:Element) => {
    console.log(`vDraggable UNMOUNTED `, el);

    unobserve(el);
};


/**
 * Custom directive to make an SVG draggable.
 */
export const vDraggable: ObjectDirective = {
    mounted,
    updated,
    unmounted,
};
