## Introduction to Flexbox-based positioning

Most simple layouts can be accomplished using flexbox-based positioning, where elements are repeatedly partitioned into groups using `<div>` tags, with each group arranged either horizontally or vertically to form nested rows and columns.

<img src="/assets/images/layout-2-1.png" />

## The HTML hierarchy

In a hierarchy of nested `<div>` elements, we often refer to the higher-level `<div>` elements as *containers* or *wrappers* because they contain or wrap other elements between their opening and closing tags. In the example to the right, the `block-container` class contains two elements of class `col` that are arranged horizontally. Each of those `col` elements are themselves also containers that contain elements with class `block` that are arranged vertically. 

Try changing the value of `flex-direction` in `.block-container` to `column` and the `flex-direction` in `.col` to `row`.

```css
/// file: widget.component.scss
.block-container {
  display: flex;
  flex-direction: ---row---+++column+++;
  
  .col {
    display: flex;
    flex-direction: ---column---+++row+++;
    margin: 2px;

    ...
  }
}
```

## Flexbox positioning properties

As you saw, `flex-direction` is a CSS property that sets the layout direction of items in a container. For this and other flexbox properties to work, the `display: flex` property must also be specified. Other properties allow one to set the size, alignment, and spacing of the container element (the flex container) or the child elements within it (the flex items). The below diagram shows different properties you may need to apply to either flex containers or flex items, and what they are used for. A few of these (marked \*) are not flexbox properties but are relevant. Grayed out properties are those subsumed by a more general property.

<img src="/assets/images/layout-1-1.png" width= "100%">

## Try out some Flexbox properties

Try out some Flexbox properties to change the layout:
* Add `flex-grow: 1;` to the `.block` selector (keeping the previous two changes to `flex-direction`). This causes each block to resize/expand into the extra space available in each row.
