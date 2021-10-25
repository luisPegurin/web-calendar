import { Injectable } from '@angular/core';
import { Day } from './Day';
import { Event } from './Event';
import { Observable, of, Subject , BehaviorSubject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class CalendarService {

    constructor(private http: HttpClient,) { }
 
    month: number = new Date().getMonth();

    year: number = new Date().getFullYear();

    daysSubject = new BehaviorSubject<Day[]>([]);
    daysSubject$ = this.daysSubject.asObservable();

    // monthSubject = new Subject<number>();
    // monthSubject$ = this.monthSubject.asObservable();


    events: Event[] = [];

    eventsUrl: string = 'http://localhost:3000/events';

    

    generateDays(): void {
        let aux = new Date(this.year, this.month, 1); // first day of the month
        let auxNum = 1 - aux.getDay(); // parameter of first day to be printed

        let days : Day[] =[];
         for (let i =0; i < 42; i++) {
            aux = new Date(this.year, this.month, auxNum + i);
            
            // if we are in the next month and on a sunday, the next row will have only next month's days 
            if ( aux.getDay() == 0 && (aux.getMonth() == this.month + 1 || (this.month == 11 && aux.getMonth() == 0) ) ) {
                break;
            }
            days.push({dayNum: aux.getDate(), month: aux.getMonth(), year: aux.getFullYear(), events: []});
        }
        this.daysSubject.next( days);
        this.mergeEvents();
    }

    loadEvents(): void{
        this.http.get<Event[]>(this.eventsUrl)
            .subscribe( events => { 
                this.events = events;
                this.mergeEvents();
                console.log('subscribe')
            });
    }

    mergeEvents(): void {
        let days: Day[] = this.daysSubject.getValue();
        days = days.map((d) => {
            let dayEvents = this.events.filter( (ev) => ev.day == d.dayNum 
                    && ev.month == d.month 
                    && ev.year == d.year);
            d.events = dayEvents;
            return d;
        });
    }

    deleteEvent(event:Event) {
        this.http.delete(`${this.eventsUrl}/${event._id}`).subscribe( _ => {
            this.events = this.events.filter( (ev) => ev !== event);
            this.mergeEvents();            
        });
    }

    addEvent(event: Event) {
        delete event._id;
        this.http.post<Event>(this.eventsUrl, event).subscribe(ev => {
            event._id = ev._id;
            this.events.push(event);
            console.log('response',ev);
            this.mergeEvents();
        });
    }

    updateEvent(event: Event) {
        return this.http.put(this.eventsUrl, event);
    }

    getYear():number {
        return this.year;
    }

    numberToMonth(monthNumer:number):string {
        let monthNames: string[] = [
            'Janeiro','Fevereiro', "Março", "Abril","Maio","Junho", "Julho", "Agosto", "Setembro","Outubro", "Novembro", "Dezembro"
        ];
        return monthNames[monthNumer];
    }

    getMonth(): string {
        return this.numberToMonth(this.month);
    }

    getMOnthNumber(): number {
        return this.month;
    }

    prev(): void {
        this.month--;
        if (this.month == -1) {
            this.month = 11;
            this.year--;
        }
        this.generateDays();
    }

    next(): void {
        this.month++;
        if (this.month == 12) {
            this.month = 0;
            this.year++;
        }
        this.generateDays();
        // this.monthSubject.next(this.month);
    }
}
