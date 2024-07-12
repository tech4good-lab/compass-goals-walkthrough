import { Component, OnInit, ChangeDetectionStrategy, inject, Signal, Injector } from '@angular/core';
import { LandingAnimations } from './landing.animations';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: LandingAnimations,
  standalone: true,
})
export class LandingComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------

  // --------------- LOCAL UI STATE ----------------------

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  // --------------- OTHER -------------------------------

  constructor(
    private injector: Injector,
  ) {
  }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit() {
  }
}
