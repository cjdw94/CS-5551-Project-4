import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Model1Component } from './model1.component';

describe('Model1Component', () => {
  let component: Model1Component;
  let fixture: ComponentFixture<Model1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Model1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Model1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
