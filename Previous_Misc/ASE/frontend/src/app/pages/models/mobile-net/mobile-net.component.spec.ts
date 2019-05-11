import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNetComponent } from './mobile-net.component';

describe('MobileNetComponent', () => {
  let component: MobileNetComponent;
  let fixture: ComponentFixture<MobileNetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileNetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileNetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
