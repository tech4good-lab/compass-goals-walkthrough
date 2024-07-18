Angular provides syntax that makes it really easy to "bind" a component view to a view model so that it updates dynamically with changes to that model.

## Intro to data binding

In this example below, the widget has a variable called `favoriteColor` defined in its Typescript file:

```ts
/// file: widget.component.ts
favoriteColor: string = 'blue';
```

Try adding the following to the HTML file. Notice how this takes the value of the variable and renders it in the view. If you go back to the Typescript file and change the variable value, you should see the view update accordingly too.

```html
/// file: widget.component.html
<div>{{ text }} {{ text }} {{ text }}</div>
+++<div>{{ favoriteColor }}</div>+++
```

This just illustrates one way to bind content. Angular provides syntax for binding styles, for displaying or hiding parts of a page based on a boolean expression, and for repeating sections of a page based on an array.

## Angular component inputs

UI Components are simple and do not interact with any backend database. Instead, any data they need from the broader environment needs to be passed to it through component inputs (variables in the Typescript file labeled with the `@Input()` decorator). The set of inputs define part of the component's API. Think about the component as a custom, interchangeable element that other, more complex components can utilize by passing in data as input parameters. 

See how this works by adding the following code to `page.component.html`. 

```html
/// file: page.component.html
<app-widget +++[text]="'hello'"+++></app-widget>
```

You'll see that the passed in text now shows up three times because the input `text` variable was already bound three times to the widget view in `widget.component.html`.
