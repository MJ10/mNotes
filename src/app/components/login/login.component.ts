import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders} from 'angularfire2';
import { User } from '../../../User';
import { Note } from '../../../Note';
import { Router } from '@angular/router';
import { moveIn } from '../../router.animations';
import { NotesService } from '../../services/note.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
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
    this.af.auth.subscribe(
      (auth) => {
      this.noteService.getNotes(auth.auth.uid)
        .subscribe((user) => {
          if(user == null || user == "null" || user.uid == null) {
            let n_user: User = {
              uid: auth.auth.uid,
              notes: new Array<Note>()
            }
            this.noteService.addUser(n_user).subscribe(userd => {});
            this.router.navigateByUrl('/login');
          }
        });

        this.router.navigateByUrl('/notes');
      })
      .unsubscribe();
  }

  ngOnInit() {
  }

}
