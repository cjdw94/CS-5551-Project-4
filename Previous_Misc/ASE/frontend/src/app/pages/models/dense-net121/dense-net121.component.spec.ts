import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenseNet121Component } from './dense-net121.component';

describe('DenseNet121Component', () => {
  let component: DenseNet121Component;
  let fixture: ComponentFixture<DenseNet121Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenseNet121Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenseNet121Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
