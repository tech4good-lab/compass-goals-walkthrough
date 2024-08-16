import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavbarAnimations } from './navbar.animation';
import { MatButtonModule } from '@angular/material/button';

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

  // --------------- LOCAL UI STATE ----------------------

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  // --------------- OTHER -------------------------------

  constructor() {
  }

  ngOnInit(): void {
  }
}
