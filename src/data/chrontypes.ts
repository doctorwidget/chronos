/**
 * A variety of time-related types.
 */

export type Chron = {
    name: string,
    start?: Date,
    end?: Date,
    title?: string,
};

export type SplitDuration = {
    end: Date,
    name: 'SplitDuration',
    start: Date,
    title: string,
};