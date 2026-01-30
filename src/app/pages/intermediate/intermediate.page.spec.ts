import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntermediatePage } from './intermediate.page';

describe('IntermediatePage', () => {
  let component: IntermediatePage;
  let fixture: ComponentFixture<IntermediatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IntermediatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
