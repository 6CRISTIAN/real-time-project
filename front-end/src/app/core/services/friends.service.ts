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
    this.retrieveFriends()
    this.socketSubs()
  }

  private retrieveFriends(): void {
    this.getFriends()
      .subscribe(friends => {
        this.friends = friends
        this._friends.next(this.friends)
      })
  }

  private async socketSubs(): Promise<void> {
    this.socket = await io('http://localhost:3000')
    this.socket.on('updated', friend => {
      this.updateFriends(friend)
    })
  }

  private updateFriends(fEvent: UpdateFriendEvent): void {
    const index = this.friends.findIndex(fri => fri.id == fEvent.my_friend_id)
    const itemsUpdated = fEvent.updated_values
    const friend = this.friends[index]

    if (itemsUpdated.name) friend.name = itemsUpdated.name
    if (itemsUpdated.gender) friend.gender = itemsUpdated.gender
    if (itemsUpdated.updatedAt) friend.updatedAt = itemsUpdated.updatedAt
    if (itemsUpdated.createdAt) friend.createdAt = itemsUpdated.createdAt

    setTimeout(_ => this._friends.next(this.friends), 0)
  }

  private getFriends = (): Observable<Friend[]> => this.http.get<Friend[]>(friends)

  public saveFriend = (friend: Friend): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.http.post(friends, friend)
        .subscribe(
          data => {
            resolve(data)
            this.retrieveFriends()
          },
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
