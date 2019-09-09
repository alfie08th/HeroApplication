import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Heroes, HttpClientService} from "../services/http-client.service";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor(private httpClient: HttpClientService, private elem: ElementRef) { }
  heroes: Heroes;
  box: any;
  n: number;

  ngOnInit() {
    this.n = 0;
    this.httpClient.getAllHeroes().subscribe(data=>{this.heroes = data;}, e=>{});
    this.box = [];
    for(let i=0; i<3; i++){
      this.box[i] = {id: i, name: Math.random()};
    }
    this.displayAllHeroes();
  }

  displayAllHeroes(){
    this.httpClient.getAllHeroes().subscribe(data=>{
      this.heroes = data[data.length-1];
      console.log('heroes: ', this.heroes)
    }, e=>{});
  }

  ngAfterViewInit(){

    let heroHeadCol = this.elem.nativeElement.getElementsByClassName('hero-head-col');
    let heroMainRow = this.elem.nativeElement.getElementsByClassName('hero-main-row');
    let heroMainOverlay = this.elem.nativeElement.getElementsByClassName('hero-main-overlay');
    let heroEachRow = this.elem.nativeElement.getElementsByClassName('hero-each-row');
    let heroEdit = this.elem.nativeElement.getElementsByClassName('hero-edit');


    let heroHeading = this.elem.nativeElement.getElementsByClassName('hero-head');
    let heroInfo = this.elem.nativeElement.getElementsByClassName('hero-info');

    //if screen is vertical
    let screenHeight = window.innerHeight*0.07 + "px";

    for(let c=0; c<heroMainRow.length; c++) {
      // heroHeadRow[c].style.height = screenHeight;
      // heroEdit[c].style.height = screenHeight;
      heroEachRow[c].style.height = screenHeight;
      heroMainOverlay[c].style.height = screenHeight;
      heroMainRow[c].style.height = screenHeight;

      // heroEdit[c].style.background = 'orange';
      let infoMarginTop = (window.innerHeight*0.07)*0.15+ 'px';
      heroEdit[c].style.marginTop = infoMarginTop


      let heroMainRowWidth = heroMainRow[c].getBoundingClientRect().width;

      let color = ['pink', 'lightgreen', 'dodgerblue'];
      // heroMainOverlay[c].style.background = color[c];
      heroMainOverlay[c].style.width = heroMainRowWidth + 'px';


      for (let j = 0; j < heroHeading.length; j++) {
        let headSize = heroHeading[j].getBoundingClientRect().width;
        heroInfo[this.n].style.width = headSize + "px !important";
        heroInfo[this.n].style.marginTop = infoMarginTop;
        heroInfo[this.n].style.paddingTop = infoMarginTop;

        let infoWordCount = heroInfo[this.n].innerHTML.length;
        let headingWordCount = heroHeading[j].innerHTML.length;
        if (infoWordCount > headingWordCount) {
          let infoColString = heroInfo[this.n].innerHTML.toString();
          let idInfo = c*5;
          let id = heroInfo[idInfo].innerHTML;
          heroInfo[this.n].innerHTML = '' + infoColString.substring(0, headingWordCount) + '...';
          heroInfo[idInfo].innerHTML = id;
        }
        this.n++;
      }
    }

    for(let p=0; p<heroEachRow.length; p++){
      heroMainOverlay[p].style.opacity = '0';
      heroMainOverlay[p].addEventListener('mouseenter', ()=>{
        heroMainRow[p].style.background = 'rgba(0,0,0,0.5)';
        heroMainRow[p].style.transition = '0.5s';
        heroMainOverlay[p].style.opacity = '1';
      });
      heroMainOverlay[p].addEventListener('mouseleave', ()=>{
        heroMainRow[p].style.background = 'transparent';
        heroMainRow[p].style.transition = '0.5s';
        heroMainOverlay[p].style.opacity = '0';
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    window.location.reload();
  }

}
