import {
  createComponent,
  EnvironmentInjector,
  Injectable,
} from '@angular/core';
import { LoadingModalComponent } from '../components/modal/loading-modal/loading-modal.component';

@Injectable({
  providedIn: 'root',
})
export class GlobalLoaderService {
  private loaderRef?: HTMLElement;

  constructor(private injector: EnvironmentInjector) {}

  private appendLoader() {
    console.log('this.loaderRef',this.loaderRef);

    if (!this.loaderRef) {
      const componentRef = createComponent(LoadingModalComponent, {
        environmentInjector: this.injector,
      });

      document.body.appendChild(componentRef.location.nativeElement);
      this.loaderRef = componentRef.location.nativeElement;
    }
  }

  show() {
    console.log('this.appendLoader();');

    this.appendLoader();
    this.loaderRef?.classList.add('show');
  }

  hide() {
    this.loaderRef?.classList.remove('show');
  }
}
