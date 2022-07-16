import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-basic-alert',
  templateUrl: './basic-alert.component.html',
  styleUrls: ['./basic-alert.component.scss']
})
export class BasicAlertComponent implements OnInit {
  @Input() message: string = ""

  constructor() { }

  ngOnInit(): void {
  }

}
