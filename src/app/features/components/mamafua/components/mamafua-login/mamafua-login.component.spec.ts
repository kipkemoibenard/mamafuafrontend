import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MamafuaLoginComponent } from './mamafua-login.component';

describe('MamafuaLoginComponent', () => {
  let component: MamafuaLoginComponent;
  let fixture: ComponentFixture<MamafuaLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MamafuaLoginComponent]
    });
    fixture = TestBed.createComponent(MamafuaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
