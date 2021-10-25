import { Component, OnInit } from '@angular/core';
import { Day } from '../Day';
import { Event } from '../Event';
import {CalendarService} from '../calendar.service';
import { EventsDialogComponent } from '../events-dialog/events-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
    constructor(
        public calendarService: CalendarService, 
        public dialog: MatDialog,
        private authService:  AuthService,
        private router: Router
    ) { }

    days: Day[] = [];

    ngOnInit(): void {
        if(!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
        }
        this.calendarService.daysSubject$.subscribe(data => this.days = data);
        // this.calendarService.monthSubject$.subscribe(month => this.month = month);
        this.calendarService.generateDays();
        // this.month = this.calendarService.getMonthNumber();
        // this.calendarService.getEvents().subscribe(data => console.log('afaf') )
        this.calendarService.loadEvents();
    } 

    openEventsDialog(day: Day): void {
        this.dialog.open(EventsDialogComponent, {
            // disableClose: true,
            width: '600px',
            maxHeight: '90vh',
            data: day
        });
    }
}
