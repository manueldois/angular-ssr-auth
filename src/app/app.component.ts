import { Component } from '@angular/core';
import { ModalService } from './modals/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular SSR Auth';

  constructor(private modalService: ModalService){}
}
