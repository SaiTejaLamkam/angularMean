import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DemoServiceService {

  constructor(private http:HttpClient) { }
  getData(){
   return this.http.get('http://localhost:1234/file.php')

    // return  [
    //   {name:'Sai Teja',online:true},
    //   {name:'Subhan Basha',online:false},
    //   {name:'Vishnu Vardhan Varma',online:true},
    //   {name:'Sai Teja',online:true},
    //   {name:'Subhan Basha',online:false},
    //   {name:'Vishnu Vardhan Varma',online:true},
    //   {name:'Sai Teja',online:true},
    //   {name:'Subhan Basha',online:false},
    // ]
  }
}
