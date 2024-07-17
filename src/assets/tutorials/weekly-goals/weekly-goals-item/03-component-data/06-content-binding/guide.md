Now that we understand the structure of the provided input data, we can start binding data. In this step, we will focus on content binding, replacing the date and goal text with computed values that dynamically change based on provided data variables.

## Binding the current date

The easiest way to bind text is through <a href="https://angular.io/guide/interpolation" target="_blank">text interpolation</a>, which uses a pair of double curly braces, `{{` and `}}`, as delimiters. These curly braces enclose template expressions, which are usually data variables from our data model or functions defined in our TypeScript file. Whenever Angular detects this notation, it computes the value of the expression and assigns the computed value as a string to the corresponding HTML element. 

We saw that `quarterData` contains a `startTime` and `endTime` property that represent the start and end of a quarter. To use these, we need to transform them into the actual date string we want to bind. In this case, we can use one of <a href="https://angular.io/guide/pipes-overview" target="_blank">Angular's pre-defined pipes</a>, the <a href="https://angular.io/api/common/DatePipe" target="_blank">`DatePipe`</a>. Angular pipes are essentially functions that transform the value of some input variable into a desired format. Syntactically, pipes are denoted with the pipe operator `|` and placed to the right of the expression to be transformed: `{{ thisVariable | somePipe }}`. Many pipes also take parameters using colons `:` that specify what transformations to make. Add the following code to dynamically set the dates in the component:

```html
/// file: widget.component.html
<div class="header">
  <div class="title">Fall '18 Goals</div>
  ---<div class="date">9/24 - 12/14</div>---
  +++<div class="date">{{ quarterData.startTime | date:'M/d' }} - {{ quarterData.endTime | date:'M/d' }}</div>+++
</div>
```

## Binding the current quarter

We will also use the `startTime` to determine the quarter. However, in this case, we need to define our own custom function since this is not handled by the `DatePipe`. Add the following as a function within `widget.component.ts`:

```ts
/// file: widget.component.ts
+++getTerm() {
  const date = new Date(this.quarterData.startTime);
  const month = date.getMonth();
  if (month <= 2) {
    return 'Winter';
  } else if (month <= 5) {
    return 'Spring';
  } else if (month <= 8) {
    return 'Summer';
  } else {
    return 'Fall';
  }
}+++
```

Use this function by adding the following code to bind the card title:

```html
/// file: widget.component.html
<div class="header">
  ---<div class="title">Fall '18 Goals</div>---
  +++<div class="title">{{ getTerm() }} '{{ quarterData.startTime | date:'yy' }} Goals</div>+++
  <div class="date">{{ quarterData.startTime | date:'M' }}/{{ quarterData.startTime | date:'d' }} - {{ quarterData.endTime | date:'M' }}/{{ quarterData.endTime | date:'d' }}</div>
</div>
```
