import {
  Component,
  ComponentRef,
  computed,
  effect,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ResultComponentCodeMap } from 'src/app/mappings/resultCodeMap';
import { ApiService } from 'src/app/services/api/api-service';
import { ConfigService } from 'src/app/services/configuration/config-service';

@Component({
  selector: 'app-result',
  standalone: false,
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  @ViewChild('resultHost', { read: ViewContainerRef, static: true })
  resultVcr!: ViewContainerRef;

  resultsRef!: ComponentRef<any>;

  resultComponent = computed(() => {
    let code = this.configService.configData()?.result?.template;
    console.log(code);
    return ResultComponentCodeMap[code];
  });

  currentIntermediateIdx = computed(() =>
    this.configService.currentIntermediateIdx(),
  );

  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
  ) {
    effect(() => {
      const component = this.resultComponent();

      if (!component || !this.resultVcr) return;

      this.loadComponent(component);
    });
  }

  ngOnInit() {
    console.log(this.apiService.selectedValues);
  }

  loadComponent(component: any) {
    this.resultVcr.clear();
    this.resultsRef = this.resultVcr.createComponent(component);
  }

  goToPrevPage() {
    delete this.apiService.selectedValues[this.currentIntermediateIdx()];
    this.configService.goToPrevPage();
  }

  goToHome() {
    this.configService.goToHomePage();
  }
}
