Next, let's define the direction for each `<div>` container. In some cases, you might also need to specify wrapping properties, but we do not need to do so for Quarter Goals.

## Specify `flex-direction` on `task`

We use the `flex-direction` property with value of either `row` or `column` to specify whether the elements in each of our containers should be arranged horizontally or vertically.

<img style="max-width: 300px;" src="/assets/images/layout-4-1.png" />

Add the following to the `.task` selector to arrange the number and text horizontally like in the design. Note that `display: flex;` is also needed to allow us to use flexbox properties.

```css
/// file: widget.component.scss
.task {
  +++display: flex;+++
  +++flex-direction: row;+++

  .number {
    ...
  }

  .text {
    ...
  }
}
```

Technically, since `row` is the default value of `flex-direction`, once we add `display: flex;`, we no longer need to specify the horizontal direction, but we will keep it to make it easier to understand what styles are being applied.

## Apply remaining Flexbox directions

It looks like we are done at this point since the remaining containers have elements laid out vertically. However, we will need to apply `display: flex` to use other flexbox properties in later steps, and this will require us to set `flex-direction` to `column`. Let's do this now:

* Add `display: flex;` to the `.widget`, `.header`, and `.tasks`. You should see the elements within those containers change to a horizontal layout,
* Add `flex-direction: column;` to the same selectors to change the layout direction back to a vertical layout.
