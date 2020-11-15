import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { ModalLoginComponent } from 'src/app/modals/login/login.component';
import { ModalService } from 'src/app/modals/modal.service';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/../server/src/interfaces/user.interface'
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
