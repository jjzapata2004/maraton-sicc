import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MaratonService {

  constructor(private http : HttpClient) {

   }

   register(image){
     return this.http.post<any>('http://localhost:8080/register', image);
   }

   compare(image){
    return this.http.post<any>('http://localhost:8080/compare', image);
  }

}
