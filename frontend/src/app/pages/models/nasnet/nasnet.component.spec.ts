import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NasnetComponent } from './nasnet.component';

describe('NasnetComponent', () => {
  let component: NasnetComponent;
  let fixture: ComponentFixture<NasnetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NasnetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NasnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
