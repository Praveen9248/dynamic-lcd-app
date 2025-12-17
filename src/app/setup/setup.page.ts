import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  standalone: false,
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {
  fb = inject(FormBuilder);
  constructor(private router: Router) {}

  headerOptions = [
    {
      code: '0001',
      title: 'Normal with Logo',
      image:
        'https://image2url.com/images/1765968871382-0fcfb6a3-5cf3-467e-a826-45c754fcf537.png',
    },
    {
      code: '0010',
      title: 'Normal without Logo',
      image:
        'https://image2url.com/images/1765968983026-6f907028-4c9c-4137-b624-ed3eec71ed4e.png',
    },
    {
      code: '0100',
      title: 'Normal',
      image:
        'https://image2url.com/images/1765969099160-d6996eca-db3b-4b27-b754-dc8251c6fbf9.png',
    },
    {
      code: '1000',
      title: 'Short Header',
      image:
        'https://image2url.com/images/1765969130928-dcebb169-440d-4c68-b28d-5f507935b804.png',
    },
  ];
  contentOptions = [
    {
      code: '0002',
      title: 'Carousel Layout',
      image:
        'https://image2url.com/images/1765969256866-a3c67172-77c1-4b7a-8548-d3c19cc20c12.png',
    },
    {
      code: '0020',
      title: 'Slider Options Layout',
      image:
        'https://image2url.com/images/1765969444135-d764d795-8629-43f2-b634-809743200580.png',
    },
    {
      code: '0200',
      title: 'Grid Layout',
      image:
        'https://image2url.com/images/1765969466750-f0e46199-6baa-4e1a-8c77-59204802a69e.png',
    },

    {
      code: '2000',
      title: 'Full Screen',
      image:
        'https://image2url.com/images/1765969393195-b4ad1f87-200c-4c67-a0c1-f491409d7fe7.png',
    },
  ];

  ngOnInit() {
    if (localStorage.getItem('layoutOptions')) this.router.navigate(['']);
  }

  homeSetupForm = this.fb.group({
    headercode: ['0001', Validators.required],
    contentcode: ['0002', Validators.required],
  });

  onSelectHeader(code: string) {
    this.homeSetupForm.patchValue({ headercode: code });
  }

  onSelectContent(code: string) {
    this.homeSetupForm.patchValue({ contentcode: code });
  }

  onHomePageSetup() {
    console.log(this.homeSetupForm.value);
    let data = { homePageLayout: this.homeSetupForm.value };
    localStorage.setItem('layoutOptions', JSON.stringify(data));
    this.router.navigate(['']);
  }
}
