import { describe, expect, it } from 'vitest';

import { degrees } from '../trig/angles';
import { getArcPath, getArcPoints } from './path';

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
    it('works for a 90 degree angle donut', () => {
        const angle = degrees(90);
        const radius = 100;
        const origin = { x: 0, y: 0};
        const offset = 50; // degree of donut-ness

        const { innerA, outerB, outerC, innerD } = getArcPoints(angle, radius, origin, offset);

        // the inner points should be _offset_ from the origin
        expect(innerA.x).toBe(50);
        expect(innerA.y).toBe(0);

        // innerD is a vertical line - just a shorter one than outerC
        expect(innerD.x).toBeCloseTo(0);
        expect(innerD.y).toBeCloseTo(50);

        // outerB should be predictably at radius, 0 or we did something wrong :O
        expect(outerB.x).toBe(radius);
        expect(outerB.y).toBe(0);

        // outerC should be at 0, radius, but this was a calculated angle, so we need to use toBeCloseTo()
        expect(outerC.x).toBeCloseTo(0);
        expect(outerC.y).toBeCloseTo(radius);
    });

    // it('works for a 45 degree angle with a 50% offset')
    it('works for a 45 degree angle donut', () => {
        const angle = degrees(45);
        const radius = 100;
        const origin = { x: 0, y: 0};
        const offset = 50; // degree of donut-ness

        const { innerA, outerB, outerC, innerD } = getArcPoints(angle, radius, origin, offset);

        // the inner points should be _offset_ from the origin
        expect(innerA.x).toBe(50);
        expect(innerA.y).toBe(0);

        // outerB is at the origin X and Y 0
        expect(outerB.x).toBeCloseTo(radius);
        expect(outerB.y).toBeCloseTo(0);

        // outerC is the classic calculated angle and the full radius
        expect(outerC.x).toBeCloseTo(70.71);
        expect(outerC.y).toBeCloseTo(70.71);

        // innerD is also calculated and should be exactly half of outerC
        expect(innerD.x).toBeCloseTo(35.355);
        expect(innerD.y).toBeCloseTo(35.355);
    });

    // it('works for a -45 degree angle with a 50% offset')
    it('works for a NEGATIVE 45 degree angle donut', () => {
        const angle = degrees(-45);
        const radius = 100;
        const origin = { x: 0, y: 0};
        const offset = 50; // degree of donut-ness

        const { innerA, outerB, outerC, innerD } = getArcPoints(angle, radius, origin, offset);

        // the inner points should be _offset_ from the origin
        expect(innerA.x).toBe(50);
        expect(innerA.y).toBe(0);

        // outerB is at the origin X and Y 0
        expect(outerB.x).toBeCloseTo(radius);
        expect(outerB.y).toBeCloseTo(0);

        // outerC is the classic calculated angle and the full radius
        expect(outerC.x).toBeCloseTo(70.71);
        expect(outerC.y).toBeCloseTo(-70.71);

        // innerD is also calculated and should be exactly half of outerC
        expect(innerD.x).toBeCloseTo(35.355);
        expect(innerD.y).toBeCloseTo(-35.355);
    });

    // it('works for a -90 degree angle with a 50% offset')
    it('works for a NEGATIVE 90 degree angle donut', () => {
        const angle = degrees(-90);
        const radius = 100;
        const origin = { x: 0, y: 0};
        const offset = 50; // degree of donut-ness

        const { innerA, outerB, outerC, innerD } = getArcPoints(angle, radius, origin, offset);

        // the inner points should be _offset_ from the origin
        expect(innerA.x).toBe(50);
        expect(innerA.y).toBe(0);

        // outerB is at the origin X and Y 0
        expect(outerB.x).toBeCloseTo(radius);
        expect(outerB.y).toBeCloseTo(0);

        // outerC is the classic calculated angle and the full radius
        expect(outerC.x).toBeCloseTo(0);
        expect(outerC.y).toBeCloseTo(-100);

        // innerD is also calculated and should be exactly half of outerC
        expect(innerD.x).toBeCloseTo(0);
        expect(innerD.y).toBeCloseTo(-50);
    });

    /// large angle donuts
    // it('works for a 135 degree angle with a 50% offset')
    it('works for a 135 degree angle donut', () => {
        const angle = degrees(135);
        const radius = 100;
        const origin = { x: 0, y: 0};
        const offset = 50;

        const { innerA, outerB, outerC, innerD } = getArcPoints(angle, radius, origin, offset);

        
        expect(innerA.x).toBe(50);
        expect(innerA.y).toBe(0);

        expect(outerB.x).toBe(radius);
        expect(outerB.y).toBe(0);

        // outerC is the first calculated point
        expect(outerC.x).toBeCloseTo(-70.71);
        expect(outerC.y).toBeCloseTo(70.71);

         // innerD is the second calculated point
         expect(innerD.x).toBeCloseTo(-35.355);
         expect(innerD.y).toBeCloseTo(35.355);
    });

    // it('works for a 180 degree angle with a 50% offset')
    it('works for a 180 degree angle donut', () => {
        const angle = degrees(180);
        const radius = 100;
        const origin = { x: 0, y: 0};
        const offset = 50;

        const { innerA, outerB, outerC, innerD } = getArcPoints(angle, radius, origin, offset);

        
        expect(innerA.x).toBe(50);
        expect(innerA.y).toBe(0);

        expect(outerB.x).toBe(radius);
        expect(outerB.y).toBe(0);

        // outerC is the first calculated point
        expect(outerC.x).toBeCloseTo(-radius);
        expect(outerC.y).toBeCloseTo(0);

         // innerD is the second calculated point
         expect(innerD.x).toBeCloseTo(-offset);
         expect(innerD.y).toBeCloseTo(0);
    });

    // it('works for a 270 degree angle with a 50% offset')
    it('works for a 270 degree angle donut', () => {
        const angle = degrees(270);
        const radius = 100;
        const origin = { x: 0, y: 0};
        const offset = 50;

        const { innerA, outerB, outerC, innerD } = getArcPoints(angle, radius, origin, offset);

        
        expect(innerA.x).toBe(50);
        expect(innerA.y).toBe(0);

        expect(outerB.x).toBe(radius);
        expect(outerB.y).toBe(0);

        // outerC is the first calculated point
        expect(outerC.x).toBeCloseTo(0);
        expect(outerC.y).toBeCloseTo(-radius);

         // innerD is the second calculated point
         expect(innerD.x).toBeCloseTo(0);
         expect(innerD.y).toBeCloseTo(-offset);
    });
});

describe.skip('the getArcPath function', () => {
    // simplest case, 90 degree pie slice
    it('works for a 90 degree pie slice', () => {
        
    });

    // then the same, but a donut

    // large angle to test that we correctly calculate that flag

    // >360 angle to confirm that we apply modulo
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
//     but shouldn't it be handled automagically by getArcPath()? 
//     my gut feeling says it _should_ be handled automagically
//     In fact, my gut tells me that both largeArc and sweep should be handled automagically,
//     but somehow the methods need to remain amenable to overriding if desired.
//     Gotta think that through)