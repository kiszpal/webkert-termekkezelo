import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NapVegiLeltarComponent } from './nap-vegi-leltar.component';

describe('NapVegiLeltarComponent', () => {
  let component: NapVegiLeltarComponent;
  let fixture: ComponentFixture<NapVegiLeltarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NapVegiLeltarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NapVegiLeltarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
