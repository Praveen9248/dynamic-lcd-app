import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-setup',
  standalone: false,
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage {
  deviceCredentials!: string;
  qrCodeDownloadLink: SafeUrl = '';

  ngOnInit() {
    let credentials = {
      deviceId: 'device12345',
      hashCode: '1DF1-1FF1-2HJ4',
    };
    let res = JSON.stringify(credentials);
    this.deviceCredentials = res;
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
}
