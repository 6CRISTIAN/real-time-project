import { Component, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/core/services/friends.service';

@Component({
  selector: 'app-friend-viewer',
  templateUrl: './friend-viewer.component.html',
  styleUrls: ['./friend-viewer.component.scss']
})
export class FriendViewerComponent implements OnInit {

  constructor(public friendSv: FriendsService) { }

  ngOnInit(): void { }

  public getGenderDisplay(gender: string): string {
    if (!gender) return
    switch (gender) {
      case 'M': return 'masculino'
      case 'F': return 'femenino'
      case 'O': return 'otro'
    }
  }
}
