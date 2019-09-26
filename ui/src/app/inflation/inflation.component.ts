import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-inflation',
  templateUrl: './inflation.component.html',
  styleUrls: ['./inflation.component.css']
})
export class InflationComponent implements OnInit, AfterViewInit {

  constructor(private elem: ElementRef) { }
  count: number;
  yearThen: number;
  yearNow: number;

  ngOnInit() {
    this.count = 0;
  }

  convertResult(){
    console.log('reprimind')
  }

  ngAfterViewInit(){


    let yearNow = this.elem.nativeElement.getElementsByClassName('yearNow');
    let yearThen = this.elem.nativeElement.getElementsByClassName('yearThen');

    let thisYear = new Date();

    // console.log(yearThen)
    yearNow[0].innerHTML = '' + thisYear.getFullYear();


    let convertLogoImg = this.elem.nativeElement.querySelector('#convert-loop-img');
    let covertLoop = convertLogoImg;


    covertLoop.addEventListener('mousedown', ()=>{

      this.convertResult();
      this.count++;
      console.log(this.count, 'mouse is down')
      covertLoop.style.transform = "scale(0.5)";
      // covertLoop.style.background = "red";
      covertLoop.style.transition = ".5s";
      setTimeout(()=>{
        covertLoop.style.transform = "scale(1)";
        // covertLoop.style.background = "blue";
        covertLoop.style.transition = ".5s";
      }, 300);
    });



    // covertLoop.addEventListener('mouseup', ()=>{
    //   this.convertResult();
    //   console.log(this.count, 'mouse is up')
    //   covertLoop.style.transform = "scale(1)";
    //   // covertLoop.style.background = "blue";
    //   covertLoop.style.transition = ".5s";
    // });

  }

  showResult(){
    console.log('yearThen', this.yearThen);
    console.log('yearNow', this.yearNow);
  }

  convert(covertLoop){
  }
  convertBack(covertLoop){
  }
}
