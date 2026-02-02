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

  currentAttributePageComponent = computed(() => {
    let code = 'F0001';
    return IntermediateCodeMap[code];
  });

  constructor(
    private configService: ConfigService,
    private apiDataService: ApiService,
  ) {
    effect(() => {
      const component = this.currentAttributePageComponent();
      if (component) {
        this.loadComponent(component);
      }
    });
  }

  private loadComponent(component: any) {
    this.vcr.clear();
    this.componentRef = this.vcr.createComponent(component);

    if (this.componentRef.instance.action) {
      this.componentRef.instance.action.subscribe((action: any) => {
        this.handleFilterNavigate(action);
      });
    }
  }

  ngOnInit() {}

  goNextStep() {
    if (
      this.apiDataService.intermediateDataTrack()[
        this.configService.currentIntermediateIdx()
      ].length > 0 ||
      this.configService.currentIntermediateIdx() < 2
    ) {
      this.configService.currentIntermediateIdx.update((i) => i + 1);
      console.log(this.configService.currentIntermediateIdx());
      return;
    }
    console.log(this.configService.currentIntermediateIdx());
    this.configService.goToNextPage();
  }

  handleFilterNavigate(action: any) {
    this.goNextStep();
  }

  goToPrevPage() {
    this.configService.goToPrevPage();
  }

  goToHome() {
    this.configService.goToHomePage();
  }
}
