import {
  Component,
  ComponentRef,
  computed,
  effect,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { IntermediateCodeMap } from 'src/app/mappings/intermediateCodeMap';
import { ApiService } from 'src/app/services/api/api-service';
import { ConfigService } from 'src/app/services/configuration/config-service';

@Component({
  selector: 'app-intermediate',
  standalone: false,
  templateUrl: './intermediate.page.html',
  styleUrls: ['./intermediate.page.scss'],
})
export class IntermediatePage implements OnInit {
  @ViewChild('dynamicView', { read: ViewContainerRef, static: true })
  vcr!: ViewContainerRef;

  private componentRef?: ComponentRef<any>;

  currentIntermediateIdx = computed(() =>
    this.configService.currentIntermediateIdx(),
  );

  mode = computed(() => this.configService.mode());

  constructor(
    private configService: ConfigService,
    private apiDataService: ApiService,
  ) {
    effect(() => {
      this.vcr.clear();
      const code = 'F0001';
      const component = IntermediateCodeMap[code];

      if (!component) return;

      this.componentRef = this.vcr.createComponent(component);

      this.componentRef.instance.stepIndex = this.currentIntermediateIdx();

      if (this.componentRef.instance.action) {
        this.componentRef.instance.action.subscribe(() => {
          this.handleNextStep();
        });
      }
    });
  }

  ngOnInit() {}

  handleNextStep() {
    const nextOpts = this.apiDataService.getOptionsForStep(
      this.currentIntermediateIdx() + 1,
      this.mode(),
    );
    if (nextOpts.length > 0) {
      this.configService.currentIntermediateIdx.update((i) => i + 1);
      return;
    }
    this.configService.goToNextPage();
  }

  goToHome() {
    this.apiDataService.selectedValues = {};
    this.configService.goToHomePage();
  }

  goToPrevPage() {
    delete this.apiDataService.selectedValues[
      this.currentIntermediateIdx() - 1
    ];
    this.configService.goToPrevPage();
  }
}
