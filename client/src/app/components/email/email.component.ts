import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { NotesService } from '../../services/note.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit {

  error: any;

  constructor(public af: AngularFireAuth) {

  }


  onSubmit(formData) {
    if(formData.valid) {
      this.af.auth.signInWithEmailAndPassword(
        formData.value.email,
        formData.value.password).then(() => {

      });
    }
  }

  ngOnInit() {
  }

}
