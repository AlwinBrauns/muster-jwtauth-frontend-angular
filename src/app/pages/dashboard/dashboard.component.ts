import { Component, OnInit, OnDestroy } from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  allMembers: any[] = []
  utilsAllMembersSubscription!: Subscription

  constructor(private utils: UtilsService) {

  }

  ngOnInit(): void {

    this.utilsAllMembersSubscription = this.utils.getAllMembers().subscribe(value => {
      this.allMembers = value
    })
  }

  ngOnDestroy(): void {
    this.utilsAllMembersSubscription.unsubscribe()
  }

}
