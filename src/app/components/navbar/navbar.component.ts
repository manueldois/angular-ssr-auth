import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalLoginComponent } from 'src/app/modals/login/login.component';
import { ModalService } from 'src/app/modals/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  logIn() {
    const modal = this.modalService.openModal({
      component: ModalLoginComponent,
      title: "Log In"
    })
  }

  logOut() {

  }

}
