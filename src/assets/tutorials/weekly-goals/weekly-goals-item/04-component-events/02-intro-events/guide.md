## DOM events and event binding

When a user clicks a button, scrolls down the page, or hovers over an element, these all trigger *DOM events* on the webpage that can be listened to using Javascript and handled to implement desired behavior. Clicking a button, for example, triggers a `click` event, while pressing a key triggers a `keypress` event. Angular provides syntax for binding events. All you need to do is enclose the name of the event type within parentheses and set this parameter equal to the code you'd like to run (typically executing a function): `(eventType)="functionName()"`.

Try binding the `appendString()` function to the button's `click` event using the code below. Each time the button is clicked, the function `appendString()` is executed, and 'hello!' is concatenated to the bound local variable `thisStringVariable`.

```html
/// file: widget.component.html
<p>The below button appends hello to the string</p>
<button +++(click)="appendString()"+++>Click to append "hello!"</button>

<div class="variable">{{ thisStringVariable }}</div>
```

## Angular component outputs

UI Components are simple and only handle local changes. If any changes need to be made outside of the component, then it needs to emit events for others to handle through component outputs (variables in the Typescript file labeled with the `@Output()` decorator). The set of inputs and outputs define the component's API. Think about the component as a custom, interchangeable element that other, more complex components can utilize by passing in data as input parameters or binding functions to handle emitted events. 

See how this works by adding the following code to `page.component.html`:

```html
/// file: page.component.html
<app-widget +++(append)="showSnackbar('yay!')"+++></app-widget>
```

You'll notice that a global Snackbar message is now displayed on each button press. This is because the higher-level component is handling the emitted events on the `append` output.
