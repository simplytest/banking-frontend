import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterNewCustomerComponent } from './register-new-customer.component';

describe('RegisterNewCustomerComponent', () => {
  let component: RegisterNewCustomerComponent;
  let fixture: ComponentFixture<RegisterNewCustomerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNewCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
