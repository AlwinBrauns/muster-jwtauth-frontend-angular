import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Jwt} from "../models/Jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //BehaviorSubject behält den zuletzt gesendeten Wert in gegensatz zum normalen Subject
  private currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(undefined)

  login(user: User): Observable<any>{
    return this.http.post(Jwt.API_URL + "auth/signin", user)
  }

  logout(): void{
    this.deleteUser()
    this.currentUser.next(undefined)
  }

  register(user: User): Observable<any>{
    return this.http.post(Jwt.API_URL + "auth/signup", {
      username: user.username,
      password: user.password,
      roles: ["user"]
    })
  }

  private saveUser(user: User): void{
    localStorage.setItem('user', JSON.stringify(user))
  }

  private deleteUser(): void{
    localStorage.removeItem('user')
  }

  setCurrentUser(user: User): void{
    if(user.token) {
      this.deleteUser()
      this.saveUser(user)
      this.currentUser.next(user)
    }
  }

  getCurrentUser(): User{
    return this.currentUser.getValue()
  }

  getUserSubject(): Subject<User>{
    return this.currentUser
  }

  checkIfAlreadyLoggedIn(): void {
    let user: User = JSON.parse(<string>localStorage.getItem('user'))
    if(user){
      this.currentUser.next(user)
    }else {
      this.currentUser.next(undefined)
    }
  }
  constructor(private http: HttpClient) {
    this.checkIfAlreadyLoggedIn()
  }
}
