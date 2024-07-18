Let's start our Quarter Goals component layout by planning how you will group elements together into nested rows and columns. 

## Plan the hierarchy of containers

The figure below shows some potential groupings. Besides what is necessary to make sure all elements in a group are laid out vertically or horizontally, it is also common to define divs that correspond to a conceptual portion of the view (e.g. the "card header", the "tasks", or a "task") or to define divs corresponding to portions of the component that have a background or border (e.g. for the entire card).

<img style="max-width: 300px;" src="/assets/content/tutorial/example-images/quartergoal-grouping.png" alt="quartergoals-grouping">

Using these groupings gives us the following plan:

```
/// no-file
widget (column)
  header (column)
    title (element)
    date (element)
  tasks (column)
    task (row)
      number (element)
      text (element)
    task (row)
      number (element)
      text (element)
    task (row)
      number (element)
      text (element)
  pencil (element)
```

## Add a div for the entire widget

In `widget.component.html`, let's first add `<div>` tags to group all elements together, making sure to add an appropriate class name and to indent the original elements to reflect the hierarchy:

```html
/// file: widget.component.html
+++<div class="widget">+++
  <div class="title">Fall '18 Goals</div>
  <div class="date">9/24 - 12/14</div>
  ...
+++</div>+++
```

## Nest previous selectors under the new class

In `widget.component.scss`, nest the selectors to reflect the hierarchy too. This makes the targetting more specific so that CSS declarations added within the `.title` block apply specifically to elements with class `.title` that lie within elements with class `.widget`. Organizing styles based on the hierarchy also makes it easier to find the styles for a given part of the component:

```css
/// file: widget.component.scss
+++.widget {+++
  .title {
    color: #2dbdb1;
    font-weight: 600;
    font-size: 22px;
  }
  .date {
    color: #2dbdb1;
    font-weight: 300;
    font-size: 18px;
  }
  ...
+++} +++
```

## Try updating the rest of the hierarchy

Follow the same steps to create the remaining parts of the hierarchy. For each of the below, you should: 1) add opening and closing `<div>` tags, enclosing and indenting the elements you are grouping together, 2) add a representative `class` attribute for the new container element, 3) adjust the SCSS selectors to nest accordingly when appropriate.
* Group together the header elements (title and date) in a div with class `header`,
* Group together each task (number and text) in a div with class `task`,
* Group together the list of three tasks in a div with class `tasks`,
