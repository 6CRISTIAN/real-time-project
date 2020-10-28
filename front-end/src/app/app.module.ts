import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FriendCreateComponent } from './components/friend-create/friend-create.component';
import { FriendEditComponent } from './components/friend-edit/friend-edit.component';
import { FriendViewerComponent } from './components/friend-viewer/friend-viewer.component';
import { HttpClientModule } from '@angular/common/http';
import { FriendsService } from './core/services/friends.service';

@NgModule({
  declarations: [
    AppComponent,
    FriendCreateComponent,
    FriendEditComponent,
    FriendViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [FriendsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
