import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTelephoneComponent } from './create-telephone.component';

describe('CreateTelephoneComponent', () => {
  let component: CreateTelephoneComponent;
  let fixture: ComponentFixture<CreateTelephoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTelephoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTelephoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
