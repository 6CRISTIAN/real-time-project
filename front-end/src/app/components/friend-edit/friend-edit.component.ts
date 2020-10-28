import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FriendsService } from 'src/app/core/services/friends.service';

@Component({
  selector: 'app-friend-edit',
  templateUrl: './friend-edit.component.html',
  styleUrls: ['./friend-edit.component.scss']
})
export class FriendEditComponent implements OnInit, OnDestroy {

  public friend = new FormControl()
  public showForm: boolean = false
  private subscription: Subscription

  constructor(public friendSv: FriendsService) { }

  ngOnInit(): void {
    this.subscription = this.friend.valueChanges
      .subscribe(res => { this.showForm = res ? true : false })
  }

  public reRender(): void {
    this.showForm = false
    setTimeout(_ => this.showForm = true, 0)
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }

}
