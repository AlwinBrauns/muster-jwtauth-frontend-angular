import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageSubject: BehaviorSubject<string> = new BehaviorSubject<string>("")

  getMessageSubjectAsObservable(): Observable<string>{
    return this.messageSubject.asObservable()
  }

  setMessage(msg: string, time: number = 3000): void{
    this.messageSubject.next(msg)
    new Promise(resolve => setTimeout(resolve, time)).then(()=>{
      this.messageSubject.next("")
    })
  }

  getMessage(): string{
    return this.messageSubject.value
  }

  constructor() { }
}
