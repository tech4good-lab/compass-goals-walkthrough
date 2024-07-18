Let's handle user clicks on the pencil icon to emit events to the `editGoals` output.

## Use `(click)` and `emit()` to handle user clicks

Add the following code to trigger an event on the `editGoals` output whenever a user clicks the pencil icon. Then check that it opens a modal each time you click the pencil icon:

```html
/// file: widget.component.html
<img class="edit" +++(click)="editGoals.emit()"+++ src="/assets/img/edit.svg" width="26" height="26"/>
```

## Refactor to use an edit function

While the above code works and is fine for this simple case, we often prefer to put the event logic within a function that is bound to the user event. This way the logic stays inside the Typescript file and is more easily extendable. Create the following function in `widget.component.ts` and bind it to the `(click)` event:

```ts
/// file: widget.component.ts
+++onEdit() {
  this.editGoals.emit();
}+++
```

```html
/// file: widget.component.html
<img class="edit" (click)="---editGoals.emit()---+++onEdit()+++" src="/assets/img/edit.svg" width="26" height="26"/>
```

You've successfully handled the events in the Quarter Goals component!
