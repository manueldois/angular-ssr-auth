import { AfterViewInit, Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(){

  }

  onSubmit(){
    this.out.next(
      this.loginForm.value
    )
    this.out.complete()
  }

  onCancel(){
    this.out.complete()
  }

}
