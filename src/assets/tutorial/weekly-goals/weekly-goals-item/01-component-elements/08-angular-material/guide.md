We're almost in the home stretch! For this second-to-last step, we just need to add the checkbox that accompanies each individual weekly goal.

## Introduction to Angular Material library components

For our Weekly Goals Item, should be able to check a goal off to mark it as completed. Any completed goals should remain checked, unless we decide to unmark it to be an incomplete goal again. Creating an element like a robust checkbox would be hard to do on our own, which is why many frameworks have their own or third-party material components library. For Angular, the most popular material component library is <a href="https://material.angular.io/">Angular Material</a>. This library gives us common reliable components to work without any headache. You'll find there's many other things it offers besides checkboxes (such as menus, buttons, etc.), so have a look for yourself <a href="https://material.angular.io/components/categories">look for yourself</a>!

We can import Angular Material's checkbox component into our Weekly Goal Item component by modifying ``weekly-goal-item.component.ts`` like so:
```
++import { MatCheckbox } from '@angular/material/checkbox';++

@Component({
  selector: 'app-weekly-goal-item',
  templateUrl: './weekly-goal-item.component.html',
  styleUrls: ['./weekly-goal-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [WeeklyGoalItemAnimations],
  imports: [
    ++MatCheckbox,++
  ],
  standalone: true,
})
```

While we could import the whole entire material library, it's more appropriate to only import the components we need. Now that we've imported ``MatCheckbox``, we can add checkboxes to our HTML.

```html
/// file: weekly-goals-item.component.html
+++<mat-checkbox class="check-box"></mat-checkbox>+++
<div class="goal-title">Finish Google Cover Letter</div>
<div class="goal-hashtag">#applyinternships</div>
```

## Update the `cursor` for the checkbox

Since the newly added icon will be clickable, we should update the cursor to indicate this when the user hovers over it. Add this functionality using the `cursor: pointer;` CSS declaration:

```css
/// file: widget.component.scss
+++.checkbox {
  cursor: pointer;
}+++
```
Looking at the output on the right, you may notice the color of the checkbox doesn't match the design. Because this is a third-party component, we'll need to apply global stylings to override the default styling this checkbox has – which we'll discuss in the next step.
