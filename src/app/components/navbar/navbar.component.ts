import { Component, OnInit } from '@angular/core';
import { ModalLoginComponent } from 'src/app/modals/login/login.component';
import { ModalService } from 'src/app/modals/modal.service';
import { AuthService } from 'src/app/core/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: string
  profilePicUrl: string

  constructor(
    private modalService: ModalService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.username = user && user.username
      this.profilePicUrl = user && new URL(user?.profilePicPath, 'http://localhost:3000').href
    })
  }

  logIn() {
    this.modalService.openModal({
      component: ModalLoginComponent,
      title: "Log In"
    })
  }

  logOut() {
    this.authService.logOut()
  }

}
