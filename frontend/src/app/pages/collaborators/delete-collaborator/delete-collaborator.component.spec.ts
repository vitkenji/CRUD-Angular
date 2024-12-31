import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCollaboratorComponent } from './delete-collaborator.component';

describe('DeleteCollaboratorComponent', () => {
  let component: DeleteCollaboratorComponent;
  let fixture: ComponentFixture<DeleteCollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCollaboratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
