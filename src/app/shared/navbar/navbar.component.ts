import { Component, OnInit, ChangeDetectionStrategy, signal, WritableSignal } from '@angular/core';
import { NavbarAnimations } from './navbar.animation';
import { MatButtonModule } from '@angular/material/button';
import { AccessState, User } from 'src/app/core/store/user/user.model';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  animations: NavbarAnimations,
  imports: [
    MatButtonModule,
  ],
})
export class NavbarComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------
  sampleUserData : User ={
    __id: '1',
    email: 'a@sample.com',
    name: 'User A',
    photoURL: 'http://loremflickr.com/100/100',
    isAdmin: false,
    consented: true,
    accessState: AccessState.DONE,
    _createdAt: Timestamp.now(),
    _updatedAt: Timestamp.now(),
    _deleted: false,
  };

  currentUser: WritableSignal<User> = signal<User | null>(this.sampleUserData);

  // --------------- LOCAL UI STATE ----------------------

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  // --------------- OTHER -------------------------------

  constructor() {
  }

  ngOnInit(): void {
  }
}
