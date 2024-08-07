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

describe('the getArcPath function', () => {
    // simplest case, 90 degree pie slice
    it('works for a 90 degree pie slice', () => {
        const angle = degrees(90);
        const radius = 100;
        const origin = { x: 0, y: 0 };

        const path = getArcPath(angle, radius, origin);

        const parts = path.split(" ");
        expect(parts[0]).toBe('M');
        expect(parts[1]).toBe('0');
        expect(parts[2]).toBe('0');
        expect(parts[3]).toBe('L');
        expect(parts[4]).toBe('100');
        expect(parts[5]).toBe('0');
        expect(parts[6]).toBe('A');
        expect(parts[7]).toBe('100');
        expect(parts[8]).toBe('100');
        expect(parts[9]).toBe('0');
        expect(parts[10]).toBe('0');
        expect(parts[11]).toBe('1');
        expect(parts[12]).toBe('0');
        expect(parts[13]).toBe('100');
        expect(parts[14]).toBe('L');
        expect(parts[15]).toBe('0');
        expect(parts[16]).toBe('0');
        expect(parts[17]).toBe('A');
        expect(parts[18]).toBe('0');
        expect(parts[19]).toBe('0');
        expect(parts[20]).toBe('0');
        expect(parts[21]).toBe('0');
        expect(parts[22]).toBe('0');
        expect(parts[23]).toBe('0');
        expect(parts[24]).toBe('0');
        expect(parts[25]).toBe('Z');
        expect(parts.length).toBe(26);
    });

    it('works for a 90 degree donut (offset 50)', () => {
        const angle = degrees(90);
        const radius = 100;
        const origin = { x: 0, y: 0 };
        const opts = { offset: 50 };

        const path = getArcPath(angle, radius, origin, opts);

        const parts = path.split(" ");
        expect(parts[0]).toBe('M');
        expect(parts[1]).toBe('50');
        expect(parts[2]).toBe('0');
        expect(parts[3]).toBe('L');
        expect(parts[4]).toBe('100');
        expect(parts[5]).toBe('0');
        expect(parts[6]).toBe('A');
        expect(parts[7]).toBe('100');
        expect(parts[8]).toBe('100');
        expect(parts[9]).toBe('0');
        expect(parts[10]).toBe('0');
        expect(parts[11]).toBe('1');
        expect(parts[12]).toBe('0');
        expect(parts[13]).toBe('100');
        expect(parts[14]).toBe('L');
        expect(parts[15]).toBe('0');
        expect(parts[16]).toBe('50');
        expect(parts[17]).toBe('A');
        expect(parts[18]).toBe('50');
        expect(parts[19]).toBe('50');
        expect(parts[20]).toBe('0');
        expect(parts[21]).toBe('0');
        expect(parts[22]).toBe('0');
        expect(parts[23]).toBe('50');
        expect(parts[24]).toBe('0');
        expect(parts[25]).toBe('Z');
        expect(parts.length).toBe(26);
    });

});
