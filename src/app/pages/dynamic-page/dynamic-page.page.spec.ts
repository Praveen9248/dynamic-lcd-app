import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicPagePage } from './dynamic-page.page';

describe('DynamicPagePage', () => {
  let component: DynamicPagePage;
  let fixture: ComponentFixture<DynamicPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
