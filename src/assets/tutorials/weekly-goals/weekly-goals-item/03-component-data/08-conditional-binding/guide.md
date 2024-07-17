In the final step, we will make sure that the card only shows when the `quarterData` variable has been provided using a conditional binding.

## Use `*ngIf` to check quarterData

If you look carefully, there is a split second at the very beginning of loading the webpage when the card is empty before the data appears in the card. You can also see that in the console, there are errors like "Cannot read properties of null (reading 'startTime')". The reason for that is because `quarterData` starts off as `null` for the split seconds before the data has been loaded from the backend databased and passed into it. Fix this by adding the following:

```html
/// file: widget.component.html
<div class="widget"+++ *ngIf="quarterData"+++>
  ...
</div>
```

Angular provides the `*ngIf` directive to dynamically add or remove certain sections of our webpage based on a provided boolean expression. If the expression evaluates to true, the element and all its child elements will be added. If the expression evaluates to false, the element will be removed from the view.

## Use `*ngIf` to add a loading indicator

If we want to add additional polish to our application, we might want to show a loading icon until `quarterData` has been provided. Add the following code to only show the card when `quarterData` is not null and to show a loading indicator and label otherwise.

```html
/// file: widget.component.html
<div class="widget" *ngIf="quarterData">
  ...
</div>
+++<div class="loading" *ngIf="!quarterData">
  <mat-spinner [diameter]="60" [strokeWidth]="2"></mat-spinner>
</div>+++
```

Congratulations! You have successfully finished binding the input data to your component.
