import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Friend } from 'src/app/core/models/model';
import { FriendsService } from 'src/app/core/services/friends.service';

@Component({
  selector: 'app-friend-edit',
  templateUrl: './friend-edit.component.html',
  styleUrls: ['./friend-edit.component.scss']
})
export class FriendEditComponent implements OnInit, OnDestroy {

  public friend = new FormControl()

  public friends: Friend[] = []
  public showForm: boolean = false
  private subscriptions: Subscription[] = []

  constructor(public friendSv: FriendsService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.friend.valueChanges
        .subscribe(res => { this.showForm = res ? true : false })
    )
    this.friendsSubs()
  }

  private friendsSubs(): void {
    this.subscriptions.push(
      this.friendSv.friends$.subscribe(friends => {
        if (this.friend.value)
          this.catchEvent()
        this.friends = friends
      })
    )
  }

  public catchEvent() {
    const currentValue = this.friend.value.id
    setTimeout(() => this.friend.setValue(
      this.friends.find(fri => fri.id == currentValue)
    ))
  }

  public reRender(): void {
    this.showForm = false
    setTimeout(_ => this.showForm = true, 0)
  }

  ngOnDestroy(): void {
    for (let subs of this.subscriptions)
      subs.unsubscribe()
  }

}
