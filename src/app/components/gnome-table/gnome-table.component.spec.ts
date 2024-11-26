import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GnomeTableComponent } from './gnome-table.component';

describe('GnomeTableComponent', () => {
  let component: GnomeTableComponent;
  let fixture: ComponentFixture<GnomeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GnomeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GnomeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
