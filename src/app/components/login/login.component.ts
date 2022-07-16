import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/User";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {RoutePaths} from "../../../RoutePaths";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })
  currentUserSubscription: Subscription
  currentUser: User
  message: string = "";

  constructor(private authService: AuthService, private route: Router, private msgService: MessageService) {
    msgService.getMessageSubjectAsObservable().subscribe(value => {
      this.message = value
    })
    authService.checkIfAlreadyLoggedIn()
    this.currentUserSubscription = authService.getUserSubject().subscribe(user => {
      if(user)
        this.goToDashboard()
    })
    this.currentUser = authService.getCurrentUser()
    if(this.currentUser){
      this.goToDashboard()
    }
  }

  private goToDashboard(): void{
    this.route.navigate([RoutePaths.dashboard]).catch((error)=>{
      console.log(error)
    })
  }

  ngOnInit(): void {
    this.message = this.msgService.getMessage()
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  }

  onSubmit() {
    this.authService.login(<User>this.loginForm.value).subscribe(data => {
      if(data?.token){
        let user: User = {
          token: data.token,
          username: data.username,
          roles: data.roles
        }
        this.authService.setCurrentUser(user)
      }else {
        this.msgService.setMessage("not correct, try again")
        this.route.navigate([RoutePaths.login])
      }
    })
  }
}
