import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }   from './app.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';

import { LoginComponent } from './components/login/login.component';
import { EmailComponent } from './components/email/email.component';
import { SignupComponent } from './components/signup/signup.component';

import { AuthGuard } from './services/auth.service';
import { NotesService } from './services/note.service';
import { routes } from './app.router';
import { NotesComponent } from './components/notes/notes.component';

export const firebaseConfig = {
  //paste your config
};

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, MaterialModule.forRoot(), AngularFireModule.initializeApp(firebaseConfig), routes ],
  declarations: [ AppComponent, LoginComponent, EmailComponent, SignupComponent, NotesComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ AuthGuard, NotesService ]
})
export class AppModule { }
