import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  headerCode = signal<string>('');
  contentCode = signal<string>('');

  ngOnInit() {
    if (localStorage.getItem('layoutOptions')) {
      // console.log(true);
      let res = JSON.parse(localStorage.getItem('layoutOptions')!);
      // console.log(res);
      this.headerCode.set(res.homePageLayout.headercode);
      this.contentCode.set(res.homePageLayout.contentcode);
    }
  }
}

//this is used for changing the ui in time intervals

// setInterval(() => {
//   switch (this.headerCode()) {
//     case '0001':
//       this.headerCode.set('0010');
//       break;
//     case '0010':
//       this.headerCode.set('0100');
//       break;
//     case '0100':
//       this.headerCode.set('1000');
//       break;
//     default:
//       this.headerCode.set('0001');
//   }
// }, 5000);
// this.contentCode.set('0002');
// setInterval(() => {
//   switch (this.contentCode()) {
//     case '0002':
//       this.contentCode.set('0020');
//       break;
//     case '0020':
//       this.contentCode.set('0200');
//       break;
//     case '0200':
//       this.contentCode.set('2000');
//       break;
//     default:
//       this.contentCode.set('0002');
//   }
// }, 5000);
