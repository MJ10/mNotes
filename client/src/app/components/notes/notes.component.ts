import { Component } from '@angular/core';
import { NotesService } from '../../services/note.service';
import { User } from '../../../User';
import { Note } from '../../../Note'
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent {
  notes: Note[];
  uid: any;
  user: User;
  data: string;
  loading: boolean = true;

  constructor(private notesService: NotesService, public af: AngularFireAuth, private router: Router) {
    if(this.af.auth.currentUser != null) {
      this.uid = this.af.auth.currentUser.uid;
    }
    this.loadNotes()
  }

  loadNotes() {
    this.notesService.getNotes(this.uid)
      .subscribe((user) => {
        if(user == null || user == "null"){
          let n_user: User = {
              uid: this.uid,
              notes: new Array<Note>()
            }
            this.notesService.addUser(n_user).subscribe(userd => {});
            this.loadNotes();
        } else{
          this.user = user;
          this.notes = user.notes;
          this.loading = false;
        }
    });
  }

  addNote(formData) {
    let note: Note = {
      content : this.data
    };
    let temp_notes = new Array<Note>();
    this.notes.forEach((note) => {
      temp_notes.push(note);
    });
    temp_notes.push(note);
    let temp_u_data: User = {
      uid: this.user.uid,
      notes: temp_notes
    };

    this.notesService.updateData(temp_u_data)
      .subscribe((response) => {
        if(response) {
          this.notes.push(note);
          this.user.notes = this.notes;
          this.data = '';
        }
      });
  }

  deleteNote(id) {
    let temp_notes = new Array<Note>();
    this.notes.forEach((note) => {
      temp_notes.push(note);
    });
    temp_notes.splice(id, 1);
    let temp_user:User = {
      uid: this.user.uid,
      notes: temp_notes
    };

    this.notesService.updateData(temp_user)
      .subscribe((resp) => {
        if(resp) {
          this.user = temp_user;
          this.notes = temp_notes;
        }
      });
  }
}
