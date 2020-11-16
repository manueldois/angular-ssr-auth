import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../shared.scss']
})
export class ModalLoginComponent implements OnInit {
  @Output('out') out: EventEmitter<{ username: string }>

  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit() {

  }

  onSubmit() {
    this.authService.logIn(
      this.loginForm.value
    )
      .then(() => this.out.complete())
      .catch(err => console.log(err))
  }

  onCancel() {
    this.out.complete()
  }

}
