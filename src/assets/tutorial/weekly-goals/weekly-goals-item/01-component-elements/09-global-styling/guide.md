Look at that! We are very close to finishing the Weekly Goals Item Component: Elements role. For this final step, we just need to style the checkbox that accompanies each individual weekly goal using global styles.

## Global styles and SCSS variables.

We would like our checkboxes to be cyan-blue, or more specifically, the color ``#2DBDB1``. This is the primary color of most of the elements in the app we're developing (Compass). As such, it's appropriate for us to define some *SCSS variables* in our global styles file ``styles.scss``, which is located in the ``src`` folder. This is because any SCSS lines we write will be applied to any elements that are apart of the group referred to by the selectors. You'll notice that before, we were working inside of the ``src/app/main/home/weekly-goals/weekly-goal-item`` folder. That's because the Weekly Goals Item is apart of our app.

As we discussed in the last step, we're going to have to edit ``styles.scss`` if we want to edit the coloring of checkbox, since we can't do it in ``weekly-goals-item.component.scss`` without using deprecated features like ``ng::deep``. To start this process, let's first define a SCSS variable. This is a simple process: you assign a value to some variable name that begins with $, and then you can refer to that name instead of the value itself. This helps maintain readability in longer SCSS files.

https://v17.angular.io/guide/component-styles

```css
/// styles.scss
+++$primary-color: #2DBDB1;+++
html, body, app-root {
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

*, *:before, *:after {
  box-sizing: inherit;
}
```

## Overriding Angular Material stylings

Angular Material uses SCSS variables of their own to style their library components. You can see for yourself these values using through by right clicking the page and selecting "Inspect". 

<img style="max-width: 300px;" src="tutorial/example-images/inspect-element.png" alt="inspect-element-tutorial">

We want to get rid of the violet color ``#343dff`` from our checkbox. What we'll do then is we will override the these variables in the same way we do below. The html, body, app-root selectors – which are there by default in the ``style.scss`` are used to ensure all elements are effected by whatever is stated within that selector (i.e. ``height``, ``font-family``, etc.). As such, we'll add what we would like the color of our checkbox when it's selected to be.

```css
/// styles.scss
+++$primary-color: #2DBDB1;+++
html, body, app-root {
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  ++--mdc-checkbox-selected-icon-color: $primary-color;++
}

*, *:before, *:after {
  box-sizing: inherit;
}
```

We'll also want to target some on the elements as well within the Angular Material checkbox, such as the color of the checkmark and the color of the background of the checkbox.
```css
/// styles.scss
$primary-color: #2DBDB1;
html, body, app-root {
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  --mdc-checkbox-selected-icon-color: $primary-color;
}

*, *:before, *:after {
  box-sizing: inherit;
}
/** customizing the check boxes */
+++
.mat-mdc-checkbox .mdc-form-field .mdc-checkbox .mdc-checkbox__background {
  border-color: $primary-color !important;
}

.mat-mdc-checkbox .mdc-form-field .mdc-checkbox .mdc-checkbox__background .mdc-checkbox__checkmark {
  background-color: white !important;
  color: $primary-color !important;
}
+++
```

The remaining steps for you to take in ``styles.scss`` is to do the following:
* Declare the global font-family to ``Oxygen``, and remove the related line of SCSS in ``weekly-goal-item.component.scss`` since it's no longer necessary.
* Set the following remaining variables:
  * ``--mdc-checkbox-selected-focus-icon-color``
  * ``--mdc-checkbox-selected-hover-icon-color``
  * ``--mdc-checkbox-selected-pressed-icon-color``
  * ``--mdc-checkbox-selected-focus-state-layer-color``
  * ``--mdc-checkbox-selected-hover-state-layer-color``
  * ``-mdc-checkbox-selected-pressed-state-layer-color``

Once you've done that, you've successfully have added all the necessary elements you'll need for the Weekly Goal Item component and styled them!