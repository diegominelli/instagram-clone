import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'instagram-clone';

  ngOnInit(): void {
    const config = {
      apiKey: "AIzaSyDc4yaui4EucQ8JJXmW4gOR3bqKauJ8mpU",
      authDomain: "instagram-clone-95bed.firebaseapp.com",
      databaseURL: "https://instagram-clone-95bed-default-rtdb.firebaseio.com",
      projectId: "instagram-clone-95bed",
      storageBucket: "instagram-clone-95bed.appspot.com",
      messagingSenderId: "655851349140",
      appId: "1:655851349140:web:9db49ec70643594e2d8081"
    };

    firebase.initializeApp(config);
  }
}
