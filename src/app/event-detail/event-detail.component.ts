import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {Event} from '../Event'; 
import {CalendarService} from '../calendar.service';
import {NgxTimepickerFieldComponent} from 'ngx-material-timepicker';
import { FormBuilder,FormGroup, FormControl, Validators  } from '@angular/forms';

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

	@Input() event!: Event ;

    updateForm = false;

    eventForm= this.fb.group({
            title: [ '', Validators.required ],
            startTime: ['', Validators.required],
            endTime: ['', Validators.required],
        });;

    constructor(
        public calendarService: CalendarService,
        private fb: FormBuilder
    ) { 
    }

    ngOnInit(): void {
        this.eventForm = this.fb.group({
            title: [ this.event.title, Validators.required ],
            startTime: [this.event.startTime, Validators.required],
            endTime: [this.event.endTime, Validators.required],
        });
    }

    deleteEvent(): void {
        this.calendarService.deleteEvent(this.event);
        // this.deleteEventEmitter.emit();
    }

    openEditor(): void {
        this.updateForm = true;
    }

    closeEditor(): void {
        this.updateForm = false;
    }

    updateEvent():void {
        if (this.eventForm.valid) {
            this.event.title = this.eventForm.value.title;
            this.event.startTime = this.eventForm.value.startTime;
            this.event.endTime = this.eventForm.value.endTime;
            this.calendarService.updateEvent(this.event)
                .subscribe((res) => {
                    this.closeEditor();
                })
        }
        
    }
}
