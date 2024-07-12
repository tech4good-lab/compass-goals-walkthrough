import { inject, Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, Signal } from '@angular/core';
import { User } from '../../core/store/user/user.model';
import { AuthStore } from '../../core/store/auth/auth.store';
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatMenuTrigger, MatMenu],
})
export class NavbarComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------

  // --------------- LOCAL UI STATE ----------------------

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  // --------------- OTHER -------------------------------

  constructor() {
  }

  ngOnInit(): void {
  }
}
