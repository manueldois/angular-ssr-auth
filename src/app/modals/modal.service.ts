import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators'
import { ModalConfig } from '../interfaces/modal-config';
import { ModalHostComponent } from './host/host.component';
import { ModalDirective } from './modal.directive';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  @ViewChild('main', { static: true }) modalHost: ModalDirective

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {

  }

  openModal(config: ModalConfig) {
    // Create modal host
    const modalHostFactory = this.componentFactoryResolver.resolveComponentFactory(ModalHostComponent);
    const modalHostRef = modalHostFactory.create(this.injector);

    // Attach it to view tree and DOM
    this.appRef.attachView(modalHostRef.hostView);
    const domElem = (modalHostRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Config it to use the component passed
    modalHostRef.instance.config = config;

    return new Modal(modalHostRef)
  }
}

class Modal {
  constructor(private ref: ComponentRef<ModalHostComponent>){
    ref.instance.out.pipe(
      finalize(() => this.close())
    ).subscribe()
  }

  get output() {
    return this.ref.instance.out.asObservable()
  }

  close(){
      this.ref.destroy();
  }
}

