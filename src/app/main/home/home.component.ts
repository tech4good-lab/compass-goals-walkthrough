import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HomeAnimations } from './home.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  animations: HomeAnimations,
})
export class HomeComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  // --------------- LOCAL UI STATE ----------------------

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  // --------------- OTHER -------------------------------

  constructor() {
  }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit() {
  }
}
