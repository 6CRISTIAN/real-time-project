import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Friend {
  id: number
  name: string
  gender: string
  createdAt: Date
  updatedAt: Date
}

@Component({
  selector: 'app-friend-create',
  templateUrl: './friend-create.component.html',
  styleUrls: ['./friend-create.component.scss']
})
export class FriendCreateComponent implements OnInit, OnChanges {

  @Input() friend: Friend

  public form: FormGroup

  constructor(private fb: FormBuilder) { this.initForm() }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.friend && changes.friend)
      this.fillForm()
  }

  ngOnInit(): void { }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      id: '',
      createdAt: '',
      updatedAt: ''
    })
  }

  public submit(): void { }

  private fillForm(): void {
    this.setValue('id', this.friend.id)
    this.setValue('name', this.friend.name)
    this.setValue('gender', this.friend.gender)
  }

  control = (name: string): AbstractControl => this.form.get(name)

  value = (name: string): any => this.control(name) ? this.control(name).value : null

  setValue = (name: string, value: any): void => this.control(name).setValue(value)
}
