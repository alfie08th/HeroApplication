import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomheroComponent } from './customhero.component';

describe('CustomheroComponent', () => {
  let component: CustomheroComponent;
  let fixture: ComponentFixture<CustomheroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomheroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomheroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
