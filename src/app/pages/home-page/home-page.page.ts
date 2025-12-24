import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  headerComponent = signal<any>('');
  contentComponent = signal<any>('');

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .get<any>('assets/configuration/homePageConfiguration.json')
      .subscribe({
        next: (res) => {
          this.headerComponent.set(res.headerCode);
          this.contentComponent.set(res.contentCode);
        },
      });
  }
}
