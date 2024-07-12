import { inject, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from './core/store/auth/auth.store';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
  ],
})
export class AppComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  constructor(
  ) {
  }

  ngOnInit() {
    // Load auth into store
    this.authStore.loadAuth();
  }
}
