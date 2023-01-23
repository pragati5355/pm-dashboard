import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBitbucketProjectDialogComponent } from './assign-bitbucket-project-dialog.component';

describe('AssignBitbucketProjectDialogComponent', () => {
  let component: AssignBitbucketProjectDialogComponent;
  let fixture: ComponentFixture<AssignBitbucketProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignBitbucketProjectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignBitbucketProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
