import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Friend } from '../models/model'
import { HttpClient } from '@angular/common/http'
import { friends } from 'src/app/utils/constants'
import io from 'socket.io-client'

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

  private socketSubs(): void {
    this.socket = io('http://localhost:3000')
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
