import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Jwt} from "../models/Jwt";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  getAllMembers(): Observable<any>{
    return this.http.get(Jwt.API_URL + "users/all")
  }

  constructor(private http: HttpClient) { }
}
