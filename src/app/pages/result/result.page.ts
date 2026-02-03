import { Component, computed, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api-service';
import { ConfigService } from 'src/app/services/configuration/config-service';

@Component({
  selector: 'app-result',
  standalone: false,
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
  ) {}

  currentIntermediateIdx = computed(() =>
    this.configService.currentIntermediateIdx(),
  );

  ngOnInit() {
    console.log(this.apiService.selectedValues);
  }

  goToPrevPage() {
    delete this.apiService.selectedValues[this.currentIntermediateIdx()];
    this.configService.goToPrevPage();
  }

  goToHome() {
    this.configService.goToHomePage();
  }
}
