import { Component, OnInit } from '@angular/core';
import {DemoServiceService} from '../demo-service.service';
import { resolve } from 'q';
interface myData{
  obj : Object[]
}
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  title = 'app';
  myDisabledValue = false;
  myVariable = 'sai teja';
  text = "teja";
  records = [];
  // records = [
  //   {name:'Sai Teja',online:true},
  //   {name:'Subhan Basha',online:false},
  //   {name:'Vishnu Vardhan Varma',online:true},
  //   {name:'Sai Teja',online:true},
  //   {name:'Subhan Basha',online:false},
  //   {name:'Vishnu Vardhan Varma',online:true},
  //   {name:'Sai Teja',online:true},
  //   {name:'Subhan Basha',online:false},
  // ]
  constructor(private myFirstService: DemoServiceService){

  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     this.myFirstService.getData().subscribe((data: myData) =>{
      this.records = data.obj;
      // console.log(data,"*********");
    });
  }

  callMyFunction(){
    this.myDisabledValue = !this.myDisabledValue;
    // console.log("Function Called!");
  }

  updateValue(ev){
    this.text = ev.target.value;
  }

}
