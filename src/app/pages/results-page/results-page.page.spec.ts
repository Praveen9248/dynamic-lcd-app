import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsPagePage } from './results-page.page';

describe('ResultsPagePage', () => {
  let component: ResultsPagePage;
  let fixture: ComponentFixture<ResultsPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
