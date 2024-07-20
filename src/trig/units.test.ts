import { describe, expect, it } from 'vitest';

import {
    abbrs,
    convert,
    degrees,
    equals,
    gradians,
    radians,
} from './units';

describe('angular units', () => {
    const zero = degrees(0);
    const thirty = degrees(30);
    const half = degrees(45);
    const sixty = degrees(60);
    const right = degrees(90);
    const oblique = degrees(135);
    const hemi = degrees(180);
    const semi = degrees(270);
    const circ = degrees(360);
    const dangles = [zero, thirty, half, sixty, right, oblique, hemi, semi, circ];

    const gzero = gradians(0);
    const gthirty = gradians(33.333);
    const ghalf = gradians(50);
    const gsixty = gradians(66.667);
    const gright = gradians(100);
    const goblique = gradians(150);
    const ghemi = gradians(200);
    const gsemi = gradians(300);
    const gcirc = gradians(400);
    const gangles = [gzero, gthirty, ghalf, gsixty, gright, goblique, ghemi, gsemi, gcirc];

    const rzero = radians(0);
    const rthirty = radians(Math.PI / 6);
    const rhalf = radians(Math.PI / 4);
    const rsixty = radians(Math.PI / 3);
    const rright = radians(Math.PI / 2);
    const roblique = radians((Math.PI * 3) / 4 );
    const rhemi = radians(Math.PI);
    const rsemi = radians(Math.PI * 1.5);
    const rcirc = radians(Math.PI * 2);
    const rangles = [rzero, rthirty, rhalf, rsixty, rright, roblique, rhemi, rsemi, rcirc];

    const d = abbrs.d;
    const g = abbrs.g;
    const r = abbrs.r;

    describe('sugared creation functions', () => {
        it('works works with degrees', () => {
            expect(zero.unit).toBe(d);
            expect(thirty.unit).toBe(d);
            expect(half.unit).toBe(d);
            expect(sixty.unit).toBe(d);
            expect(right.unit).toBe(d);
            expect(oblique.unit).toBe(d);
            expect(hemi.unit).toBe(d);
            expect(semi.unit).toBe(d);
            expect(circ.unit).toBe(d);
        });

        it('works works with gradians', () => {
            expect(gzero.unit).toBe(g);
            expect(gthirty.unit).toBe(g);
            expect(ghalf.unit).toBe(g);
            expect(gsixty.unit).toBe(g);
            expect(gright.unit).toBe(g);
            expect(goblique.unit).toBe(g);
            expect(ghemi.unit).toBe(g);
            expect(gsemi.unit).toBe(g);
            expect(gcirc.unit).toBe(g);
        });

        it('works works with radians', () => {
            expect(rzero.unit).toBe(r);
            expect(rthirty.unit).toBe(r);
            expect(rhalf.unit).toBe(r);
            expect(rsixty.unit).toBe(r);
            expect(rright.unit).toBe(r);
            expect(roblique.unit).toBe(r);
            expect(rhemi.unit).toBe(r);
            expect(rsemi.unit).toBe(r);
            expect(rcirc.unit).toBe(r);
        });
    });

    describe('the convert function', () => {

        it('converts to degrees to gradians', () => {
            expect(convert(zero, g).value).toBe(0);
            expect(convert(thirty, g).value).toBeCloseTo(33.33);
            expect(convert(half, g).value).toBe(50);
            expect(convert(sixty, g).value).toBeCloseTo(66.67);
            expect(convert(right, g).value).toBe(100);
            expect(convert(oblique, g).value).toBe(150);
            expect(convert(hemi, g).value).toBe(200);
            expect(convert(semi, g).value).toBe(300);
            expect(convert(circ, g).value).toBe(400);

            const units = dangles.map(a => convert(a, g).unit);
            for (const u of units) {
                expect(u).toBe('gradians');
            }
        });

        it('converts degrees to radians', () => {
            expect(convert(zero, r).value).toBe(0);
            expect(convert(thirty, r).value).toBe(Math.PI / 6);
            expect(convert(half, r).value).toBe(Math.PI / 4);
            expect(convert(sixty, r).value).toBe(Math.PI / 3);
            expect(convert(right, r).value).toBe(Math.PI / 2);
            expect(convert(oblique, r).value).toBe(Math.PI * 0.75);
            expect(convert(hemi, r).value).toBe(Math.PI);
            expect(convert(semi, r).value).toBe(Math.PI * 1.5);
            expect(convert(circ, r).value).toBe(Math.PI * 2);

            const units = dangles.map(a => convert(a, r).unit);
            for (const u of units) {
                expect(u).toBe('radians');
            };
        });
    

        it('converts gradians to degrees', () => {
            expect(convert(gzero, d).value).toBe(0);
            expect(convert(gthirty, d).value).toBeCloseTo(30);
            expect(convert(ghalf, d).value).toBe(45);
            expect(convert(gsixty, d).value).toBeCloseTo(60);
            expect(convert(gright, d).value).toBe(90);
            expect(convert(goblique, d).value).toBe(135);
            expect(convert(ghemi, d).value).toBe(180);
            expect(convert(gsemi, d).value).toBe(270);
            expect(convert(gcirc, d).value).toBe(360);
            
            const units = gangles.map(a => convert(a, d).unit);
            for (const u of units) {
                expect(u).toBe('degrees');
            };
        });

        it('converts gradians to radians', () => {
            expect(convert(gzero, r).value).toBe(0);
            expect(convert(gthirty, r).value).toBeCloseTo(Math.PI / 6);
            expect(convert(ghalf, r).value).toBeCloseTo(Math.PI / 4);
            expect(convert(gsixty, r).value).toBeCloseTo(Math.PI / 3);
            expect(convert(gright, r).value).toBeCloseTo(Math.PI / 2);
            expect(convert(goblique, r).value).toBe(Math.PI * 0.75);
            expect(convert(ghemi, r).value).toBeCloseTo(Math.PI);
            expect(convert(gsemi, r).value).toBe(Math.PI * 1.5);
            expect(convert(gcirc, r).value).toBeCloseTo(Math.PI * 2);

            const units = gangles.map(a => convert(a, r).unit);
            for (const u of units) {
                expect(u).toBe('radians');
            };
        });

        it('converts radians to degrees', () => {
            expect(convert(rzero, d).value).toBe(0);
            expect(convert(rthirty, d).value).toBeCloseTo(30);
            expect(convert(rhalf, d).value).toBe(45);
            expect(convert(rsixty, d).value).toBeCloseTo(60);
            expect(convert(rright, d).value).toBe(90);
            expect(convert(roblique, d).value).toBe(135);
            expect(convert(rhemi, d).value).toBe(180);
            expect(convert(rsemi, d).value).toBe(270);
            expect(convert(rcirc, d).value).toBe(360);

            const units = rangles.map(a => convert(a, d).unit);
            for (const u of units) {
                expect(u).toBe('degrees');
            };
        });

        it('converts radians to gradians', () => {
            expect(convert(rzero, g).value).toBe(0);
            expect(convert(rthirty, g).value).toBeCloseTo(33.33);
            expect(convert(rhalf, g).value).toBe(50);
            expect(convert(rsixty, g).value).toBeCloseTo(66.67);
            expect(convert(rright, g).value).toBe(100);
            expect(convert(roblique, g).value).toBe(150);
            expect(convert(rhemi, g).value).toBe(200);
            expect(convert(rsemi, g).value).toBe(300);
            expect(convert(rcirc, g).value).toBe(400);

            const units = rangles.map(a => convert(a, g).unit);
            for (const u of units) {
                expect(u).toBe('gradians');
            };
        });
    
    });

    describe('the equals function', () => {

        it('recognizes degree/gradian equality', () => {
            expect(equals(zero, gzero)).toBeTruthy();
            expect(equals(thirty, gthirty)).toBeTruthy();
            expect(equals(half, ghalf)).toBeTruthy();
            expect(equals(sixty, gsixty)).toBeTruthy();
            expect(equals(right, gright)).toBeTruthy();
            expect(equals(oblique, goblique)).toBeTruthy();
            expect(equals(hemi, ghemi)).toBeTruthy();
            expect(equals(semi, gsemi)).toBeTruthy();
            expect(equals(circ, gcirc)).toBeTruthy();
        });

        it('recognizes degree/radian equality', () => {
            expect(equals(zero, rzero)).toBeTruthy();
            expect(equals(thirty, rthirty)).toBeTruthy();
            expect(equals(half, rhalf)).toBeTruthy();
            expect(equals(sixty, rsixty)).toBeTruthy();
            expect(equals(right, rright)).toBeTruthy();
            expect(equals(oblique, roblique)).toBeTruthy();
            expect(equals(hemi, rhemi)).toBeTruthy();
            expect(equals(semi, rsemi)).toBeTruthy();
            expect(equals(circ, rcirc)).toBeTruthy();
        });

        it('recognizes gradian/radian equality', () => {
            expect(equals(gzero, rzero)).toBeTruthy();
            expect(equals(gthirty, rthirty)).toBeTruthy();
            expect(equals(ghalf, rhalf)).toBeTruthy();
            expect(equals(gsixty, rsixty)).toBeTruthy();
            expect(equals(gright, rright)).toBeTruthy();
            expect(equals(goblique, roblique)).toBeTruthy();
            expect(equals(ghemi, rhemi)).toBeTruthy();
            expect(equals(gsemi, rsemi)).toBeTruthy();
            expect(equals(gcirc, rcirc)).toBeTruthy();
        });
    });

});



