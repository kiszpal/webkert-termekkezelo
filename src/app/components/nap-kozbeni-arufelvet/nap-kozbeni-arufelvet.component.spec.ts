import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NapKozbeniArufelvetComponent } from './nap-kozbeni-arufelvet.component';

describe('NapKozbeniArufelvetComponent', () => {
  let component: NapKozbeniArufelvetComponent;
  let fixture: ComponentFixture<NapKozbeniArufelvetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NapKozbeniArufelvetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NapKozbeniArufelvetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
