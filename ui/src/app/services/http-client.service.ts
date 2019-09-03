import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


export class Heroes {
  constructor(
    private id:number,
    private name:string,
    private power: string,
    private weakness: string,
    private info: string
  ){}
}

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {

  constructor(private httpClient: HttpClient) {}

  sendLoginInfo(username, password){
    let id = 1;
    let cred = [];
    cred[0] = window.btoa(username);
    cred[1] = window.btoa(password);
    console.log('username: ', cred[0])
    console.log('password: ', cred[1])
    return this.httpClient.put(`http://localhost:8080/hero/${id}`,(cred));
  }

  responseToJava(data: number){
    var val = data.toString();
    return this.httpClient.post(`http://localhost:8080/send-to-java/${1}`, val);
  }

  responseFromJava():Observable<string>{
    const requestOptions: Object = {responseType: 'text'}
    return this.httpClient.get<string>('http://localhost:8080/send-to-ang', requestOptions);
  }

  createHeroes(name, power, weakness, info){
    let id = 1;
    let heroSpec = [];
    heroSpec[0] = name;
    heroSpec[1] = power;
    heroSpec[2] = weakness;
    heroSpec[3] = info;
    return this.httpClient.post(`http://localhost:8080/hero/${1}`,(heroSpec));
  }

  getAllHeroes(){
    return this.httpClient.get<Heroes[]>('http://localhost:8080/hero');
  }

}
