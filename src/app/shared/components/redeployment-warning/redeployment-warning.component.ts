import { Component, OnInit } from '@angular/core';
import { DetectRedeploymentService } from './redeployment-warning.service';

@Component({
  selector: 'app-redeployment-warning',
  templateUrl: './redeployment-warning.component.html',
  styleUrls: ['./redeployment-warning.component.scss'],
  standalone: true,
})
export class RedeploymentWarningComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  // --------------- LOCAL UI STATE ----------------------

  showRedeploymentWarning: boolean = false;

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  /** Triggers a refresh. */
  update() {
    this.detectRedeployment.refresh();
  }

  /** Ignores the warning. */
  close() {
    this.showRedeploymentWarning = false;
  }

  // --------------- OTHER -------------------------------
  
  constructor(public detectRedeployment: DetectRedeploymentService) {}

  ngOnInit() {
    this.detectRedeployment.redeployed().subscribe(() => {
      this.showRedeploymentWarning = true;
    });
  }
}
