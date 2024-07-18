Look at that! We are very close to finishing the Weekly Goals Item Component: Elements role. For this final step, we just need to style the checkbox that accompanies each individual weekly goal using global styles.

## Global styles and SCSS variables.

We would like our checkboxes to be cyan-blue, or more specifically, the color ``#2DBDB1``. This is the primary color of most of the elements in the app we're developing (Compass). As such, it's appropriate for us to define some *SCSS variables* in our global styles file ``styles.scss``, which is located in the ``src`` folder. This is because any SCSS lines we write will be applied to any elements that are apart of the group referred to by the selectors. You'll notice that before, we were working inside of the ``src/app/main/home/weekly-goals/weekly-goal-item`` folder. That's because the Weekly Goals Item is apart of our app.

We



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
