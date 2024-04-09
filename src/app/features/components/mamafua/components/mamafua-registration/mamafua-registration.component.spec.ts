import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MamafuaRegistrationComponent } from './mamafua-registration.component';

describe('MamafuaRegistrationComponent', () => {
  let component: MamafuaRegistrationComponent;
  let fixture: ComponentFixture<MamafuaRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MamafuaRegistrationComponent]
    });
    fixture = TestBed.createComponent(MamafuaRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
