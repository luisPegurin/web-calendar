import { Component, OnInit, Inject, Input} from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Event } from '../Event';
import { Day } from '../Day';
import {CalendarService} from '../calendar.service';
import { FormBuilder,FormGroup, FormControl, Validators  } from '@angular/forms';

@Component({
    selector: 'app-events-dialog',
    templateUrl: './events-dialog.component.html',
    styleUrls: ['./events-dialog.component.css']
})
export class EventsDialogComponent implements OnInit {


    newEvent!: Event;

    eventForm = this.fb.group({
        title: [ '', Validators.required ],
        startTime: ['',Validators.required],
        endTime: ['',Validators.required],
    });

    constructor(
            @Inject(MAT_DIALOG_DATA) public data: Day, 
            public calendarService: CalendarService,
            public dialogRef: MatDialogRef<EventsDialogComponent>,
            private fb: FormBuilder
            ) { 
        this.initNewEvent();
    }

    ngOnInit(): void {
    }

    initNewEvent() {
        this.newEvent =  { _id: 0, title: "",
        day: this.data.dayNum,
        month: this.data.month,
        year: this.data.year,
        startTime: '',
        endTime: '',
        user: 0};
    }

    deleteEvent(event:Event): void {
        this.data.events = this.data.events.filter( (ev) => ev !== event);
    }

    saveEvent():void {
        if (this.eventForm.valid) {
            this.newEvent.title = this.eventForm.value.title;
            this.newEvent.startTime = this.eventForm.value.startTime;
            this.newEvent.endTime = this.eventForm.value.endTime;
            this.calendarService.addEvent(this.newEvent);
            this.initNewEvent();
        }
    }
}
