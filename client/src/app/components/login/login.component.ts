import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { NotesService } from '../../services/note.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: any;

  constructor( public af:AngularFireAuth, private router:Router, private noteService: NotesService) {
    if(this.af.auth.currentUser != null) {
      this.onLoggedIn();
    }
  }

  loginGoogle() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      this.onLoggedIn();
    });
  }

  onLoggedIn() {
    this.router.navigateByUrl('/notes');
  }
  ngOnInit() {
  }

}
