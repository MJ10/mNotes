import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  isLoggedIn:boolean;

  constructor(private af: AngularFireAuth, private router: Router) {
    if(this.af.auth.currentUser != null) {
      this.isLoggedIn = true;
    }
  }

  onLogoutClicked() {
    this.af.auth.signOut().then((res) => {
      this.isLoggedIn = false;
      this.router.navigateByUrl('login');
    });

  }
}
