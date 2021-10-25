import { Component, OnInit } from '@angular/core';
import {CalendarService} from '../calendar.service';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';


@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
	constructor(
		private calendarService: CalendarService,
		private authService:  AuthService,
		private router: Router
			) { }
 
	month!: string;
	year!: number;

	ngOnInit(): void {
		this.updateYearMonth();
	}

	updateYearMonth():void {
		this.month = this.calendarService.getMonth();
		this.year = this. calendarService.getYear();
	}

	next(): void {
		this.calendarService.next();
		this.updateYearMonth();
	}

	prev(): void {
		this.calendarService.prev();
		this.updateYearMonth();
	}

	logout():void {
		this.authService.logout();
		this.router.navigate(['/login']);
	}
}
