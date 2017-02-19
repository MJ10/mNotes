import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NotesService{ 
    constructor(private http: Http) {
        
    }

    getNotes(uid) {
        return this.http.get('/api/user/'+ uid)
        .map(res => res.json());
    }

    updateData(user) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/user/'+ user.uid, JSON.stringify(user), {headers: headers})
        .map(res => res.json());
    }

    addUser(user) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/user/add', JSON.stringify(user), {headers: headers})
        .map(res => res.json());
    }
}