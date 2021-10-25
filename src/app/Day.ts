import { Event } from './Event';

export interface Day {
    dayNum: number;
    month: number;
    year: number;
    events: Event[]; 
    // weekday: number;
}
