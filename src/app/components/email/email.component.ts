import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../router.animations';
import { NotesService } from '../../services/note.service';
import { User } from '../../../User';
import { Note } from '../../../Note';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations:[moveIn(), fallIn()]
})
export class EmailComponent implements OnInit {

  state: string = '';
  error: any;

  constructor(public af: AngularFire,private router: Router, private noteService: NotesService) {
    this.af.auth.subscribe(auth => { 
      if(auth) {
        this.onLoggedIn();
      }
    });
  }


  onSubmit(formData) {
    if(formData.valid) {
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(
        (success) => {
        this.onLoggedIn();
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }

  onLoggedIn() {
    this.router.navigateByUrl('/notes');
  }

  ngOnInit() {
  }

}
