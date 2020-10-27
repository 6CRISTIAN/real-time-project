import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-friend-create',
  templateUrl: './friend-create.component.html',
  styleUrls: ['./friend-create.component.scss']
})
export class FriendCreateComponent implements OnInit {

  public form: FormGroup

  constructor(private fb: FormBuilder) { this.initForm() }

  ngOnInit(): void { }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required]
    })
  }

  public submit(): void { }
}
