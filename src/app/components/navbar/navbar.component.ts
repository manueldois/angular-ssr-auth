import { Component, OnInit } from '@angular/core';
import { ModalLoginComponent } from 'src/app/modals/login/login.component';
import { ModalService } from 'src/app/modals/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  logIn(){
    const modal = this.modalService.openModal({
      component: ModalLoginComponent,
      title: "Log In"
    })

    modal.output.subscribe(console.log)
  }

  logOut(){

  }

}
