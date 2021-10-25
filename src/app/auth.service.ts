import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, Subject , BehaviorSubject} from 'rxjs';


interface Token { accessToken: string}

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	loginUrl: string = 'http://localhost:3000/login';
	registerUrl: string = 'http://localhost:3000/user';

	constructor(private http: HttpClient) { }

	login (email: string, password : string) {
		return this.http.post<Token>(this.loginUrl, { email, password})
			.pipe(
				tap(res => this.storeToken(res.accessToken))
			);
	}

	registerUser (email: string, password : string ) {
		return this.http.post<Token>(this.registerUrl, { email, password})
			.pipe(
				tap(res => this.storeToken(res.accessToken))
			);
	}

	private storeToken(token: string) {
		window.localStorage.setItem('token', token);
	}

	logout () {
		window.localStorage.removeItem('token');
	}

	getToken() {
		return window.localStorage.getItem('token');
	}

	isLoggedIn(): boolean {
		let token = this.getToken();
		if(token) {
			let tokensplit = token.split('.');
			let payload = JSON.parse(atob(tokensplit[1]));
			if (payload.exp > Date.now()/1000 ) {
				return true;
			} else {
				this.logout();
			}
		}
		return false;
	}
}
