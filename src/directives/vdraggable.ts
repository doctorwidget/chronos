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

// TODO: create a JS Map<Element, Bindings>,
// so we can do things like removing MutationObservers when we're done
// (right now each of the lifecycle methods is a closure of its own,
// so there's no good way to for the unmounted() method to remove
// the mutationObservers set up by the mounted() method).

/**
 * Translate an element by the supplied deltas.
 * Keeps track of previous shifts via drag attributes
 */
export const translateBy = (el:Element, deltaX: number, deltaY: number) => {
    const baseX = Number(el.getAttribute(dragAttrs.x) || '') || 0; 
    const baseY = Number(el.getAttribute(dragAttrs.y) || '') || 0;

    const x = baseX + deltaX;
    const y = baseY + deltaY;

    // remember the new baseX and baseY
    el.setAttribute(dragAttrs.x, `${x}`);
    el.setAttribute(dragAttrs.y, `${y}`);

    // and then update the transform:translate
    updateTranslation(el);
};

/**
 * Reset the translation back to 0,0
 */
export const resetTranslation = (el:Element) => {
    el.setAttribute(dragAttrs.x, '0');
    el.setAttribute(dragAttrs.y, '0');

    updateTranslation(el);
};

/**
 * Set a new translation value based on [data-translate-x] and [data-translate-y]
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
 * Custom directive to make an SVG draggable.
 */
export const vDraggable: ObjectDirective = {
    mounted,
    updated,
};
