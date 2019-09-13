import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export class Heroes {
  constructor(public id:number, public name:string, public power: string, public weakness: string, public info: string){}
}

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {

  constructor(private httpClient: HttpClient) {}

  sendLoginInfo(username, password){
    let cred = [];
    cred[0] = window.btoa(username);
    cred[1] = window.btoa(password);
    return this.httpClient.put('http://localhost:8080/hero/pass-cred', cred);
  }

  responseToJava(data: number){
    return this.httpClient.post('http://localhost:8080/send-to-java/', data.toString());
  }

  responseFromJava():Observable<string>{
    const requestOptions: Object = {responseType: 'text'}
    return this.httpClient.get<string>('http://localhost:8080/send-to-ang', requestOptions);
  }

  createHeroes(hero){
    console.log('heroes: ', hero)
    return this.httpClient.post<Heroes>("http://localhost:8080/add-hero", hero);
  }

  getAllHeroes():Observable<any>{
    return this.httpClient.get('http://localhost:8080/hero');
  }

  deleteHero(hero, id){
    return this.httpClient.delete<Heroes>('http://localhost:8080/delete-hero/' + id,{});
  }

}
