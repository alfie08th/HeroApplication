import {Component, OnInit} from '@angular/core';
import {Heroes, HttpClientService} from "../services/http-client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customhero',
  templateUrl: './customhero.component.html',
  styleUrls: ['./customhero.component.css']
})
export class CustomheroComponent implements OnInit {

  constructor(private httpClient: HttpClientService, private route: Router) { }
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
    this.route.navigateByUrl('hero').then(r => {});
    // window.location.replace('http://localhost:4200/hero');
  }

  viewAll(){
    //view All the Heroes
  }
  removeHero(){
    //remove particular  Heroes from all the heroes
  }

}
