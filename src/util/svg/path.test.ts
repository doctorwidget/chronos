import { describe, expect, it } from 'vitest';

import { degrees } from '../trig/angles';
import { getArcPoints } from './path';

describe('the getArcPoints function', () => {

    it('works for a 90 degree angle pie slice (no offset)', () => {
        let angle = degrees(90);
        let radius = 100;
        let origin = { x: 0, y: 0};

        const { innerA, outerB, outerC, innerD } = getArcPoints(angle, radius, origin);

        // the inner points should be the same as the origin
        expect(innerA.x).toBe(0);
        expect(innerA.y).toBe(0);

        // anything that involves actual angle calculations requires us to use toBeCloseTo(), not toBe()
        expect(innerD.x).toBeCloseTo(0);
        expect(innerD.y).toBeCloseTo(0);

        // outerB should be predictably at radius, 0 or we did something wrong :O
        expect(outerB.x).toBe(radius);
        expect(outerB.y).toBe(0);

        // outerC should be at 0, radius, but this was a calculated angle, so we need to use toBeCloseTo()
        expect(outerC.x).toBeCloseTo(0);
        expect(outerC.y).toBeCloseTo(radius);
    });

    it('works for a 45 degree angle pie slice (no offset)', () => {
        let angle = degrees(45);
        let radius = 100;
        let origin = { x: 0, y: 0};

        const { innerA, outerB, outerC, innerD } = getArcPoints(angle, radius, origin);

        // the inner points should be the same as the origin
        expect(innerA.x).toBe(0);
        expect(innerA.y).toBe(0);

        // anything that involves actual angle calculations requires us to use toBeCloseTo(), not toBe()
        expect(innerD.x).toBeCloseTo(0);
        expect(innerD.y).toBeCloseTo(0);

        // outerB should be predictably at radius, 0 or we did something wrong :O
        expect(outerB.x).toBe(radius);
        expect(outerB.y).toBe(0);

        // outerC should be at 70.71, 70.71, but this was a calculated angle, so we need to use toBeCloseTo()
        expect(outerC.x).toBeCloseTo(70.71);
        expect(outerC.y).toBeCloseTo(70.71);
    });

    it('works for a negative 45 degree angle pie slice (no offset)', () => {
        let angle = degrees(-45);
        let radius = 100;
        let origin = { x: 0, y: 0};

        const { innerA, outerB, outerC, innerD } = getArcPoints(angle, radius, origin);

        // the inner points should be the same as the origin
        expect(innerA.x).toBe(0);
        expect(innerA.y).toBe(0);

        // anything that involves actual angle calculations requires us to use toBeCloseTo(), not toBe()
        expect(innerD.x).toBeCloseTo(0);
        expect(innerD.y).toBeCloseTo(0);

        // outerB should be predictably at radius, 0 or we did something wrong :O
        expect(outerB.x).toBe(radius);
        expect(outerB.y).toBe(0);

        // outerC should be at 70.71, -70.71, but this was a calculated angle, so we need to use toBeCloseTo()
        expect(outerC.x).toBeCloseTo(70.71);
        expect(outerC.y).toBeCloseTo(-70.71);
    });

    it('works for a negative 90 degree angle pie slice (no offset)', () => {
        let angle = degrees(-90);
        let radius = 100;
        let origin = { x: 0, y: 0};

        const { innerA, outerB, outerC, innerD } = getArcPoints(angle, radius, origin);

        // the inner points should be the same as the origin
        expect(innerA.x).toBe(0);
        expect(innerA.y).toBe(0);

        // anything that involves actual angle calculations requires us to use toBeCloseTo(), not toBe()
        expect(innerD.x).toBeCloseTo(0);
        expect(innerD.y).toBeCloseTo(0);

        // outerB should be predictably at radius, 0 or we did something wrong :O
        expect(outerB.x).toBe(radius);
        expect(outerB.y).toBe(0);

        // outerC should be at 0, -radius, but this was a calculated angle, so we need to use toBeCloseTo()
        expect(outerC.x).toBeCloseTo(0);
        expect(outerC.y).toBeCloseTo(-radius);
    });

    /// large angle pie slices
    it('works for a 135 degree angle pie slice (no offset)', () => {
        let angle = degrees(135);
        let radius = 100;
        let origin = { x: 0, y: 0};

        const { innerA, outerB, outerC, innerD } = getArcPoints(angle, radius, origin);

        // the inner points should be the same as the origin
        expect(innerA.x).toBe(0);
        expect(innerA.y).toBe(0);

        // anything that involves actual angle calculations requires us to use toBeCloseTo(), not toBe()
        expect(innerD.x).toBeCloseTo(0);
        expect(innerD.y).toBeCloseTo(0);

        // outerB should be predictably at radius, 0 or we did something wrong :O
        expect(outerB.x).toBe(radius);
        expect(outerB.y).toBe(0);

        // outerC should be at -70.71, +70.71, but this was a calculated angle, so we need to use toBeCloseTo()
        expect(outerC.x).toBeCloseTo(-70.71);
        expect(outerC.y).toBeCloseTo(70.71);
    });

    it('works for a 180 degree angle pie slice (no offset)', () => {
        let angle = degrees(180);
        let radius = 100;
        let origin = { x: 0, y: 0};

        const { innerA, outerB, outerC, innerD } = getArcPoints(angle, radius, origin);

        // the inner points should be the same as the origin
        expect(innerA.x).toBe(0);
        expect(innerA.y).toBe(0);

        // anything that involves actual angle calculations requires us to use toBeCloseTo(), not toBe()
        expect(innerD.x).toBeCloseTo(0);
        expect(innerD.y).toBeCloseTo(0);

        // outerB should be predictably at radius, 0 or we did something wrong :O
        expect(outerB.x).toBe(radius);
        expect(outerB.y).toBe(0);

        // outerC should be at -100, 0, but this was a calculated angle, so we need to use toBeCloseTo()
        expect(outerC.x).toBeCloseTo(-100);
        expect(outerC.y).toBeCloseTo(0);
    });


    it('works for a 270 degree angle pie slice (no offset)', () => {
        let angle = degrees(270);
        let radius = 100;
        let origin = { x: 0, y: 0};

        const { innerA, outerB, outerC, innerD } = getArcPoints(angle, radius, origin);

        // the inner points should be the same as the origin
        expect(innerA.x).toBe(0);
        expect(innerA.y).toBe(0);

        // anything that involves actual angle calculations requires us to use toBeCloseTo(), not toBe()
        expect(innerD.x).toBeCloseTo(0);
        expect(innerD.y).toBeCloseTo(0);

        // outerB should be predictably at radius, 0 or we did something wrong :O
        expect(outerB.x).toBe(radius);
        expect(outerB.y).toBe(0);

        // outerC should be at 0, -100, but this was a calculated angle, so we need to use toBeCloseTo()
        expect(outerC.x).toBeCloseTo(0);
        expect(outerC.y).toBeCloseTo(-100);
    });


    /// small angle donuts
    // it('works for a 90 degree angle with a 50% offset')
    // it('works for a 45 degree angle with a 50% offset')
    // it('works for a -45 degree angle with a 50% offset')
    // it('works for a -90 degree angle with a 50% offset')


    /// large angle donuts
    // it('works for a 135 degree angle with a 50% offset')
    // it('works for a 180 degree angle with a 50% offset')
    // it('works for a 270 degree angle with a 50% offset')
});

// describe('the getArcPath function', () => {})
// this one will be a giant PITA to test!
// Q: is it even worth testing?
// A: do exactly one test for the correct string _form_, without worrying about the values
// (getArcPoints provides the values... getArcPath is just about stringing together a bigass string... so test that!)
// and there are details to test!
// - the sweep flag must be reversed for the innerD to innerA arc
// - the large arc flag must turn on for large arcs
//    (this bears thinking about; it's all explicit in slice.vue right now...
//     but shouldn't it be handled automagically be getArcPath()? 
//     my gut feeling says it _should_ be handled automagically
//     In fact, my gut tells me that both largeArc and sweep should be handled automagically,
//     but somehow the methods need to remain amenable to overriding if desired.
//     Gotta think that through)