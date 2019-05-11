import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResNet50Component } from './res-net50.component';

describe('ResNet50Component', () => {
  let component: ResNet50Component;
  let fixture: ComponentFixture<ResNet50Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResNet50Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResNet50Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
