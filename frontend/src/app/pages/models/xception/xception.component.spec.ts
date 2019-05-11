import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XceptionComponent } from './xception.component';

describe('XceptionComponent', () => {
  let component: XceptionComponent;
  let fixture: ComponentFixture<XceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
