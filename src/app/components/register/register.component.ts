import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoutePaths} from "../../../RoutePaths";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  message: string = "";

  constructor(private authService: AuthService,  private route: Router, private msgService: MessageService) {
    msgService.getMessageSubjectAsObservable().subscribe(value => {
      this.message = value
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.registerForm.value.username===''){
      this.msgService.setMessage("you need a username")
      return
    }
    this.authService.register(this.registerForm.value).subscribe(response => {
      if(response) {
        this.msgService.setMessage("you have successfully registered the user: " + this.registerForm.value.username)
        this.route.navigate([RoutePaths.login])
      }
    })
  }
}
