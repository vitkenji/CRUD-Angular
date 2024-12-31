import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTelephoneComponent } from './delete-telephone.component';

describe('DeleteTelephoneComponent', () => {
  let component: DeleteTelephoneComponent;
  let fixture: ComponentFixture<DeleteTelephoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTelephoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTelephoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
