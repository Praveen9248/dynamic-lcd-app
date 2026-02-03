import {
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ApiService } from 'src/app/services/api/api-service';
import { ConfigService } from 'src/app/services/configuration/config-service';

@Component({
  selector: 'app-dynamic',
  standalone: false,
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss'],
})
export class DynamicComponent implements OnInit {
  @Output() action = new EventEmitter<void>();

  constructor(
    private configService: ConfigService,
    private apiDataService: ApiService,
  ) {}

  currentIdx = computed(() => this.configService.currentIntermediateIdx());

  ngOnInit(): void {}

  options = computed(() =>
    this.apiDataService.getOptionsForStep(this.currentIdx(), this.mode()),
  );

  mode = computed(() => this.configService.mode());

  handleFilter(opt: any) {
    const idx = this.currentIdx();

    this.apiDataService.selectedValues[idx] = opt;

    Object.keys(this.apiDataService.selectedValues)
      .map(Number)
      .filter((i) => i > idx)
      .forEach((i) => delete this.apiDataService.selectedValues[i]);

    this.action.emit();
  }
}
