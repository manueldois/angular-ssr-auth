import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalConfig } from 'src/app/interfaces/modal-config';
import { ModalDirective } from 'src/app/modals/modal.directive';

@Component({
  selector: 'app-modal-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class ModalHostComponent implements OnInit {
  @ViewChild(ModalDirective, {static: true}) modalHost: ModalDirective

  @Input('config') config: ModalConfig;
  @Output('out') out = new EventEmitter<any>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

  ngOnInit(): void {
    this.injectModal()
  }

  injectModal(){
    if(!this.config.component) return

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.config.component);

    const viewContainerRef = this.modalHost.viewContainerRef;
    viewContainerRef.clear();
  
    const component = viewContainerRef.createComponent<any>(componentFactory)
    component.instance.out = this.out
  }

  onClickBck(){
    this.out.complete()
  }
}
