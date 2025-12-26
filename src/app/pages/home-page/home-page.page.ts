import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { ContentCodeMap } from 'src/app/mappings/contentCodeMap';
import { HeaderCodeMap } from 'src/app/mappings/headerCodeMap';

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
          this.headerComponent.set(HeaderCodeMap[res.headerCode]);
          this.contentComponent.set(ContentCodeMap[res.contentCode]);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('codes fetched from api!!');
        },
      });
  }
}
