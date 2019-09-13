import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Heroes, HttpClientService} from "../services/http-client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, AfterViewInit {

  constructor(private httpClient: HttpClientService, private elem: ElementRef, private route: Router) { }
  heroes:Heroes[];
  cell:number;

  ngOnInit() {
    this.cell = 0;
    this.displayAllHeroes();
  }

  displayAllHeroes(){
    this.httpClient.getAllHeroes().subscribe(data=>{
      this.heroes = data;
    }, e=>{});
  }

  addHeroes(){
    this.route.navigateByUrl("custom-hero").then(r=>{});
  }

  deleteHeroes(hero: Heroes): void{
    let heroLength = this.heroes.length;
    console.log('hero.length:', this.heroes.length);
    this.httpClient.deleteHero(hero, heroLength).subscribe(data=>{
      this.heroes = this.heroes.filter(u=> u !==hero);
    }, e=>{});
    this.route.navigateByUrl('hero').then(r=>{});

    localStorage.setItem('count', (''+heroLength));
  }

  ngAfterViewInit(){
    setTimeout(()=>{
     this.showDisplay();
    },50)
  }


  showDisplay(){

    let heroMainRow = this.elem.nativeElement.getElementsByClassName('hero-main-row');
    let heroMainOverlay = this.elem.nativeElement.getElementsByClassName('hero-main-overlay');
    let heroEachRow = this.elem.nativeElement.getElementsByClassName('hero-each-row');
    let heroEdit = this.elem.nativeElement.getElementsByClassName('hero-edit');
    let heroHeading = this.elem.nativeElement.getElementsByClassName('hero-head');
    let heroInfo = this.elem.nativeElement.getElementsByClassName('hero-info');

    let screenHeight = window.innerHeight*0.07 + "px";
    let screenWidth = '';
    let infoMarginTop = (window.innerHeight * 0.07) * 0.15 + 'px';

    for (let row = 0; row < heroEachRow.length; row++) {
      heroEachRow[row].style.height = screenHeight;
      heroMainOverlay[row].style.height = screenHeight;
      heroMainRow[row].style.height = screenHeight;

      heroEdit[row].style.marginTop = infoMarginTop;

      let heroMainRowWidth = heroMainRow[row].getBoundingClientRect().width;
      heroMainOverlay[row].style.width = heroMainRowWidth + 'px';
      screenWidth = heroMainRowWidth;

      for (let col = 0; col < heroHeading.length; col++) {
        let headSize = heroHeading[col].getBoundingClientRect().width;
        heroInfo[this.cell].style.width = headSize + "px !important";
        heroInfo[this.cell].style.marginTop = infoMarginTop;
        heroInfo[this.cell].style.paddingTop = infoMarginTop;

        let infoWordCount = heroInfo[this.cell].innerHTML.length;
        let headingWordCount = heroHeading[col].innerHTML.length;
        if (infoWordCount > headingWordCount) {
          let infoColString = heroInfo[this.cell].innerHTML.toString();
          heroInfo[this.cell].innerHTML = '' + infoColString.substring(0, headingWordCount) + '...';
        }
        this.cell++;
        let limit = heroHeading.length * heroEachRow.length;
        if (this.cell === limit)
          this.cell = 0;
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    window.location.reload();
  }


}
