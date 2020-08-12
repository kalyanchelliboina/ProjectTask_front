import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  he = localStorage.getItem('token');

  private baseUrl = "http://localhost:3000";

  constructor(private http:HttpClient,
              private router:Router) { }

  registerUser(data) {
    return this.http.post<any>(this.baseUrl + '/api/register', data)
  }

  loginUser(data) {
    return this.http.post<any>(this.baseUrl + '/api/login', data)
  }

  getapi(){
    return this.http.get<any>(this.baseUrl + '/api', { headers: {authorization: this.he}})
  }

  getUsers(){
    return this.http.get<any>(this.baseUrl + '/api/users', {headers : {authorization: this.he}})
  }
  
  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
