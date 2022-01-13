import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(){
    return this.http
      .get<any>(`${environment.apiUrl}/user/`,
       this.httpOptions);
  }

  saveUser(user: any){
    return this.http
    .post<any>(`${environment.apiUrl}/user/`,
                user,
                this.httpOptions);
  }

  updateUser(user: any){
    return this.http
    .put<any>(`${environment.apiUrl}/user/`,
                user,
                this.httpOptions);
  }

  deleteUser(id){
    return this.http
    .delete<any>(`${environment.apiUrl}/user/${id}`,
                this.httpOptions);
  }

  getAllDzongkhags(){
    return this.http
      .get<any>(`${environment.apiUrl}/master/dzongkhags`,
       this.httpOptions);
  }

  getAllGewogsByDzongkhagId(dzongkhagId: number){
    return this.http
      .get<any>(`${environment.apiUrl}/master/gewogs/${dzongkhagId}`,
       this.httpOptions);
  }

  getAllVillagesByGewogId(gewogId: number){
    return this.http
      .get<any>(`${environment.apiUrl}/master/villages/${gewogId}`,
       this.httpOptions);
  }
}
