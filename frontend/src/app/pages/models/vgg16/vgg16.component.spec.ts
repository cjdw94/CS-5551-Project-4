import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VGG16Component } from './vgg16.component';

describe('VGG16Component', () => {
  let component: VGG16Component;
  let fixture: ComponentFixture<VGG16Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VGG16Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VGG16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
