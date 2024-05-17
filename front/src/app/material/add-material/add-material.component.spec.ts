import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterialComponent } from './add-material.component';

describe('AddMaterialComponent', () => {
  let component: AddMaterialComponent;
  let fixture: ComponentFixture<AddMaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMaterialComponent]
    });
    fixture = TestBed.createComponent(AddMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
