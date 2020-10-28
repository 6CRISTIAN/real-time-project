import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-friend-edit',
  templateUrl: './friend-edit.component.html',
  styleUrls: ['./friend-edit.component.scss']
})
export class FriendEditComponent implements OnInit {

  public friend = new FormControl()

  constructor() { }

  ngOnInit(): void { }

}
