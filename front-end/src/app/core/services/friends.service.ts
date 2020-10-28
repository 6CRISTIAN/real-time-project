import { Injectable, OnInit } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Friend } from '../models/model'
import { HttpClient } from '@angular/common/http'
import { friends } from 'src/app/utils/constants'

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private friends: Friend[] = []
  private _friends = new BehaviorSubject<Friend[]>(this.friends)
  public friends$ = this._friends.asObservable()

  constructor(private http: HttpClient) {
    this.getFriends()
      .subscribe(friends => {
        console.log(friends)
        this.friends = friends
        this._friends.next(this.friends)
      })
  }

  private getFriends = (): Observable<Friend[]> => this.http.get<Friend[]>(friends)
}
