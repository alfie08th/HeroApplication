import {Component, ElementRef, OnInit} from '@angular/core';
import {HttpClientService} from "../services/http-client.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  dataSending: boolean;
  dataSent: boolean;

  message: string;

  constructor(private loginService:  HttpClientService, private elem: ElementRef) { }

  ngOnInit() {
  }

  checkLogin(){
    this.loginService.sendLoginInfo(this.username, this.password).subscribe(data=>{}, e=> {console.log('error: ', e)});

    var num = Math.floor(Math.random() * 100);
    this.message = 'Data: [' + num +'] sent to Java';
    this.loginService.responseToJava(num).subscribe(data=>{console.log('data: ', data)}, e=>{e});
    this.dataSending = true;
    this.dataSent = false;
    this.showDataStatus();
  }

  showDataStatus(){
    var t;
    var msgFromJava = '';
    t  = setInterval(()=>{
      this.loginService.responseFromJava().subscribe(data=>{
        if(data!=null){
          msgFromJava = data;
          setTimeout(()=>{
            this.dataSending = false;
            this.dataSent = true;
            this.message = 'Response: [' + msgFromJava +'] from Java';
          }, 1500);
        }
      }, e=>{e})
    }, 500);

    setTimeout(()=>{
      if(msgFromJava!=null){
        clearInterval(t);
      }
    }, 1500);


  }

}
