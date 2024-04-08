import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MamafuaDashboardComponent } from './mamafua-dashboard.component';

describe('MamafuaDashboardComponent', () => {
  let component: MamafuaDashboardComponent;
  let fixture: ComponentFixture<MamafuaDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MamafuaDashboardComponent]
    });
    fixture = TestBed.createComponent(MamafuaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
