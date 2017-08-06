import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { HomeComponent } from './views/home/home.component';
import {FormsModule} from "@angular/forms";
import { LobbyComponent } from './views/lobby/lobby.component';
import {SocketService} from "./services/socket.service";
import { CardComponent } from './views/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LobbyComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
