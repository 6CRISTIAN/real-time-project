import { EventEmitter } from '@angular/core';
import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Friend } from 'src/app/core/models/model';
import { FriendsService } from 'src/app/core/services/friends.service';

@Component({
  selector: 'app-friend-create',
  templateUrl: './friend-create.component.html',
  styleUrls: ['./friend-create.component.scss']
})
export class FriendCreateComponent implements OnChanges {

  @Input() friend: Friend
  @Output() updateEvent = new EventEmitter<void>()

  public form: FormGroup

  constructor(
    private fb: FormBuilder,
    private friendSv: FriendsService,
    private snackBar: MatSnackBar,
  ) { this.initForm() }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.friend && changes.friend)
      this.fillForm()
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      id: '',
      createdAt: '',
      updatedAt: ''
    })
  }

  public submit(): void {
    if (this.form.invalid) return

    const prom = this.friend
      ? this.friendSv.updateFriend(this.form.value)
      : this.friendSv.saveFriend(this.form.value)

    prom.then(_ => {
      this.friend
        ? this.updateEvent.emit()
        : this.form.reset()
      this.openAlert()
    }).catch(_ => { this.openAlert(true) })
  }

  private fillForm(): void {
    this.setValue('id', this.friend.id)
    this.setValue('name', this.friend.name)
    this.setValue('gender', this.friend.gender)
    const initValue = JSON.stringify(this.form.value)
    this.form.setValidators(this.diffFromInit(initValue))
  }

  public control = (name: string): AbstractControl => this.form.get(name)

  public value = (name: string): any => this.control(name) ? this.control(name).value : null

  public setValue = (name: string, value: any): void => this.control(name).setValue(value)

  private diffFromInit(initValue: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const diff = control.dirty && JSON.stringify(control.value) !== initValue
      return diff ? null : { diffFromInit: false }
    }
  }

  public openAlert(err = false): void {
    let msg = 'Hubo un error, intente mas tarde.'

    if (!err)
      msg = this.friend
        ? 'Se ha actualizado exitosamente'
        : 'Se ha creado exitosamente'

    this.snackBar.open(
      msg, 'OK', {
      duration: 3600,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    })
  }
}
