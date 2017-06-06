import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { MdToolbarModule, MdCardModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { firebase } from '../../../config/config';

import { NotesComponent } from './components/notes/notes.component';
import { LoginComponent } from './components/login/login.component';
import { EmailComponent } from './components/email/email.component';
import { SignupComponent } from './components/signup/signup.component';

import { AuthGuard } from './services/auth.service';
import { NotesService } from './services/note.service';
import { AngularFireAuth } from 'angularfire2/auth';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    EmailComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    BrowserAnimationsModule,
    MdToolbarModule,
    MdCardModule
  ],
  providers: [ AuthGuard, NotesService,AngularFireAuth ],
  bootstrap: [AppComponent]
})
export class AppModule { }
