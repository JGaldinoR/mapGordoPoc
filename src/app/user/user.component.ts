import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { UserService } from './user.service';
//Gaby
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnChanges, AfterViewInit {
  tableData :any;
  exampleData :any;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
   //this.getStarWarsUser();
   //this.getPlanet();
   this.getMergeMap();
  }

  ngOnChanges(changes :SimpleChanges) {
    console.log('Changes: ', changes);
  }

  ngAfterViewInit() {
    
    //console.log('NG AFTER VIEW INIT', this.tableData);
    //this.getUser();
  }

  getMergeMap() {
    this.userService.getMergeMap().subscribe(data => {
      console.log('Subscribe: ', data);
      this.exampleData = data;
      
    })
  }

  getStarWarsUser() {
    this.userService.getStarWarsPerson().subscribe(data => {
      console.log('Subscribe: ', data);
      this.exampleData = data;
      console.log('FINISH');
      
    });
  }

  getPlanet() {
    this.userService.getPlanet().subscribe(data => {
      console.log('Subscribe: ', data);
      this.exampleData = data;
      
    })
  }

  showData() {
    console.log('DATA: ', this.exampleData);
  }
  // getAllUsers() {
  //   this.tableData = this.userService.getAllUsers().subscribe()
  // }

  // getUser() {
  //   //Another development change
  //   this.userService.getUser().subscribe(data => {
  //     console.log('Mapped Data: ', data);
  //     this.tableData = data;
  //   });
  // }

}
