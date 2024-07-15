import { Component, OnInit, ChangeDetectionStrategy, input, output, inject, WritableSignal, Signal, signal, computed, Inject, Injector } from '@angular/core';
import { GreetingAnimations } from './greeting.animations';
import { AccessState, User } from 'src/app/core/store/user/user.model';
import { AuthStore } from 'src/app/core/store/auth/auth.store';
import { BatchWriteService, BATCH_WRITE_SERVICE } from 'src/app/core/store/batch-write.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, startWith, map, of } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: GreetingAnimations,
  standalone: true,
  imports: [
  ],
})
export class GreetingComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  // --------------- LOCAL UI STATE ----------------------

  currentUser: Signal<User> = toSignal(of({
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
  }));

  // --------------- COMPUTED DATA -----------------------

  /** Current time as signal */
  time: Signal<Date> = toSignal(interval(1000).pipe(
    startWith(0),
    map(() => new Date()),
  ), { requireSync: true });

  /** Greeting message based on time of day */
  greeting: Signal<string> = computed(() => {
    const currentHour = this.time().getHours();
    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  });

  /** String representing user's name, truncated for smaller screens */
  userName: Signal<string> = computed(() => {
    return this.currentUser()?.name;
  });

  // --------------- EVENT HANDLING ----------------------

  // --------------- OTHER -------------------------------

  constructor(
  ) { }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit(): void {
  }
}
