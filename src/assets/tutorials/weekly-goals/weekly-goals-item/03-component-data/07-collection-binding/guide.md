Next, we will bind the `quarterGoals` to the view, which will require us to learn how to bind collections.

## Bind quarterGoals content

We will start by binding the quarter goals using text interpolation like in the previous step. Make the following edits to bind the quarter goal number and text:

```html
/// file: widget.component.html
<div class="task">
  <div class="number">---1---+++{{ quarterData.quarterGoals[0].order }}+++</div>
  <div class="text">---Finish cover letters---+++{{ quarterData.quarterGoals[0].text }}+++</div>
</div>
<div class="task">
  <div class="number">---2---+++{{ quarterData.quarterGoals[1].order }}+++</div>
  <div class="text">---Apply to internships---+++{{ quarterData.quarterGoals[1].text }}+++</div>
</div>
<div class="task">
  <div class="number">---3---+++{{ quarterData.quarterGoals[2].order }}+++</div>
  <div class="text">---Technical interview prep!---+++{{ quarterData.quarterGoals[2].text }}+++</div>
</div>
```

## Use `*ngFor` to refactor goal data binding

The problem with the above code is that it is repetitive and only works if there are exactly three goals. It would not work if the user had only defined two goals, for example. Angular provides the `*ngFor` directive to make it easier to bind arrays in a manner that is analogous to a for-each loop. When added to an element with the syntax `*ngFor="let item of collection"`, the directive repeats the element, and all the elements within it, once for each item in the array. The `collection` should be the array that you are binding, but the `item` is an arbitrary variable of your choice that holds the value of the item in each loop iteration and can be used for further content binding. Refactor your earlier binding by modifying your code to the following:

```html
/// file: widget.component.html
<div class="task"+++ *ngFor="let goal or quarterData.quarterGoals"+++>
  <div class="number">{{ +++goal.order+++---quarterData.quarterGoals[0].order--- }}</div>
  <div class="text">{{ +++goal.text+++---quarterData.quarterGoals[0].text--- }}</div>
</div>
---<div class="task">
  <div class="number">{{ quarterData.quarterGoals[1].order }}</div>
  <div class="text">{{ quarterData.quarterGoals[1].text }}</div>
</div>
<div class="task">
  <div class="number">{{ quarterData.quarterGoals[2].order }}</div>
  <div class="text">{{ quarterData.quarterGoals[2].text }}</div>
</div>---
```

## Use `trackBy` to improve performance

Data binding in Angular works through what's called *change detection*: whenever a variable is modified, Angular re-renders all parts of a view that use that variable. For arrays, there are many ways that the array can change. For example, while it is possible that the entire array changed, it is also possible that only a single item was added or removed. Ideally, we don't want the browser to completely remove and add the entire array after any given change since this can make your application very laggy. 

To prevent this, Angular's `*ngFor` directive tries to reuse DOM elements corresponding to previous items so long as it can identify the items. By default, Angular uses an object's reference to track its modifications, but it is very common for the object's reference to have changed even though the actual values haven't. To help Angular identify unique elements in your array, you can use the `trackBy` syntax to provide a function computing a unique identifier for each object. When we have an array of entities retrieved from a backend database, we use the primary key to uniquely identify the entity. In our case, our primary keys correspond to the `__id` property. Update the data binding code to use `trackBy` with the following:

```ts
/// file: widget.component.ts
+++trackByFn(index: number, goal: QuarterGoal): string {
  return goal.__id;
}+++
```

```html
/// file: widget.component.html
<div class="task" *ngFor="let goal or quarterData.quarterGoals+++; trackBy: trackByFn+++">
  <div class="number">{{ goal.order }}</div>
  <div class="text">{{ goal.text }}</div>
</div>
```

Congratulations! You have successfully finished binding the input data to your component.
