import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InceptionV3Component } from './inception-v3.component';

describe('InceptionV3Component', () => {
  let component: InceptionV3Component;
  let fixture: ComponentFixture<InceptionV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InceptionV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InceptionV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
