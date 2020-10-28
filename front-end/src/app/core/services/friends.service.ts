import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Friend } from '../models/model'
import { HttpClient } from '@angular/common/http'
import { friends } from 'src/app/utils/constants'
import io from 'socket.io-client'

export interface UpdateFriendEvent {
  my_friend_id: number
  updated_values: any
}


@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private socket: any

  private friends: Friend[] = []
  private _friends = new BehaviorSubject<Friend[]>(this.friends)
  public friends$ = this._friends.asObservable()

  constructor(private http: HttpClient) {
    this.getFriends()
      .subscribe(friends => {
        this.friends = friends
        this._friends.next(this.friends)
      })

    this.socketSubs()
  }

  private async socketSubs(): Promise<void> {
    this.socket = await io('http://localhost:3000')
    this.socket.on('updated', friend => {
      console.log('·················· updated friend', friend)
      this.updateFriends(friend)
    })
  }

  private updateFriends(fEvent: UpdateFriendEvent): void {
    console.log()
    const index = this.friends.findIndex(fri => fri.id === fEvent.my_friend_id)
    if (fEvent.updated_values.name) this.friends[index].name = fEvent.updated_values.name
    if (fEvent.updated_values.gender) this.friends[index].gender = fEvent.updated_values.gender
    if (fEvent.updated_values.updatedAt) this.friends[index].updatedAt = fEvent.updated_values.updatedAt
    if (fEvent.updated_values.createdAt) this.friends[index].createdAt = fEvent.updated_values.createdAt
    setTimeout(_ => this._friends.next(this.friends), 0)
  }

  private getFriends = (): Observable<Friend[]> => this.http.get<Friend[]>(friends)

  public saveFriend = (friend: Friend): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.http.post(friends, friend)
        .subscribe(
          data => resolve(data),
          err => reject(err)
        )
    })
  }

  public updateFriend = (friend: Friend): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.http.put(friends + '/' + friend.id, friend)
        .subscribe(
          data => resolve(data),
          err => reject(err)
        )
    })
  }
}
