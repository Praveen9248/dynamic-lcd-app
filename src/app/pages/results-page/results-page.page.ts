import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { ResultComponentCodeMap } from 'src/app/mappings/resultComponentCodeMap';

@Component({
  selector: 'app-results-page',
  standalone: false,
  templateUrl: './results-page.page.html',
  styleUrls: ['./results-page.page.scss'],
})
export class ResultsPagePage implements OnInit {
  resultComponent = signal<any>('');
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .get<any>('assets/configuration/resultPageConfiguration.json')
      .subscribe({
        next: (res) => {
          console.log(res);
          this.resultComponent.set(ResultComponentCodeMap[res.resultCode]);
        },
      });
  }
}
