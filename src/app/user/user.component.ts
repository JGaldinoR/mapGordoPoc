import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnChanges, AfterViewInit {
  tableData :any;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {}

  ngOnChanges() {}

  ngAfterViewInit() {
    console.log('Hello Gordo');
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe(data => {
      console.log('Mapped Data: ', data);
      this.tableData = data;
    });
  }

}
