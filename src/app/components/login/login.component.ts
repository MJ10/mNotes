import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders} from 'angularfire2';
import { User } from '../../../User';
import { Note } from '../../../Note';
import { Router } from '@angular/router';
import { NotesService } from '../../services/note.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: any;

  constructor( public af:AngularFire, private router:Router, private noteService: NotesService) {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.onLoggedIn();
      }
    });
  }

  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then((success) => {
      this.onLoggedIn();
    }).catch((err) => {
      this.error = err;
    });
  }

  onLoggedIn() {
    this.router.navigateByUrl('/notes');
  }
  ngOnInit() {
  }

}
