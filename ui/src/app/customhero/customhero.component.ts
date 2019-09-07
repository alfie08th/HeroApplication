import {Component, OnInit} from '@angular/core';
import {Heroes, HttpClientService} from "../services/http-client.service";

@Component({
  selector: 'app-customhero',
  templateUrl: './customhero.component.html',
  styleUrls: ['./customhero.component.css']
})
export class CustomheroComponent implements OnInit {

  constructor(private httpClient: HttpClientService) { }
  hero: Heroes = new Heroes(0, "", "", "", "");
  count: number;

  ngOnInit() {
    this.count = 0;
  }

  createHero():void{
    let objectId = localStorage.getItem('count');
    if(objectId===null){
      this.hero.id = this.count;
    }
    this.hero.id = Number(objectId);

    this.httpClient.createHeroes(this.hero).subscribe(data=>{}, e=>{});
    this.count = Number(objectId);
    this.count++;
    localStorage.setItem('count', (''+this.count));
  }

  viewAll(){
    //view All the Heroes
  }
  removeHero(){
    //remove particular  Heroes from all the heroes
  }

}
