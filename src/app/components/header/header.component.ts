import { Component, OnInit } from '@angular/core';
import {RoutePaths} from "../../../RoutePaths";
import {User} from "../../models/User";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  routes: any = {
    home: RoutePaths.home,
    login: RoutePaths.login,
    register: RoutePaths.register
  }
  hamburgerActivated: boolean = false
  userSubscription: Subscription
  showLogout: boolean = false

  constructor(private loginService: AuthService, private router: Router) {
    this.userSubscription = loginService.getUserSubject().subscribe(user => {
      if(user)
      {
        this.routes = {
          home: RoutePaths.home,
          dashboard: RoutePaths.dashboard
        }
        this.showLogout = true
      }else {
        this.routes = {
          home: RoutePaths.home,
          login: RoutePaths.login,
          register: RoutePaths.register
        }
        this.showLogout = false
      }
    })
  }

  ngOnInit(): void {
  }

  onOpenNav(): void {
    this.hamburgerActivated = !this.hamburgerActivated
  }

  onLogout() {
    this.loginService.logout();
    this.router.navigate([RoutePaths.home])
  }
}
