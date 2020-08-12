import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  he = localStorage.getItem('token');
  private baseUrl= "http://localhost:3000";

  constructor(private http: HttpClient,
              private router: Router) { }

createProject(data) {
  return this.http.post<any>(this.baseUrl + '/project', data, {headers: { authorization: localStorage.getItem('token')}});
}

viewProjects() {
  return this.http.get<any>(this.baseUrl + '/project/viewprojects', {headers: { authorization: localStorage.getItem('token')}})
}

viewProject(id) {
  return this.http.get<any>(this.baseUrl + '/project/viewproject/' + id, { headers: { authorization : localStorage.getItem('token')}})
}

createTask(data,id) {
  return this.http.post<any>(this.baseUrl + '/project/createTask/' + id, data, { headers: { authorization: localStorage.getItem('token')}})
}

viewAllTasks(id) {
  return this.http.get<any>(this.baseUrl + '/project/viewAllTasks/' + id, { headers: { authorization: localStorage.getItem('token')}})
}

viewTask(taskId) {
  return this.http.get<any>(this.baseUrl + '/project/viewTask/' + taskId, {headers: { authorization: localStorage.getItem('token')}})
}

createComment(id,data) {
  return this.http.post<any>(this.baseUrl + '/project/comment/' + id, data, {headers: { authorization: localStorage.getItem('token')}})
}

updateDateDescription(id,data) {
  return this.http.patch<any>(this.baseUrl + '/project/updateTask/dateDescription/' + id, data, {headers: { authorization: localStorage.getItem('token')}})
}


}
