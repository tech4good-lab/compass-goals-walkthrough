After sizing our child groups and aligning them within the container, the final step in laying them out is to finalize their positioning by adding space between the items within a container (using `margin`) and between the items and their parent container (using `padding`). 

## Add `padding` to the container

As can be seen in the design, there is some space on the border of sides of the card widget. Add this with the following:

```css
/// file: widget.component.scss
.widget {
  ...
  +++padding: 19px 23px 23px 26px;+++
  ...
}
```

Note that this padding does not increase the width or height of the card. In general, assuming that one has added the <a href="https://css-tricks.com/box-sizing/" target="_blank">common setting</a> of `box-sizing: border-box;` as a style across your entire app (as we have), spacing that is specified using `padding` is counted as part of an elements height and width whereas spacing that is specified using `margin` is not. This makes padding useful for specifying spacing between a container and the child items within it.

<img style="max-width: 300px;" src="/assets/images/box-model.png" />

## Add `margin` to space items apart

To match the design, we also need to add spacing between items. Do this with the following code:

```css
/// file: widget.component.scss
.header {
  +++margin-bottom: 13px;+++
  .title {
    +++margin-bottom: 8px;+++
  }
}

.tasks {
  +++margin-bottom: 4px;+++
  .task {
    +++margin-bottom: 12px;+++
    .number {
      +++margin-right: 20px;+++
    }
  }
}
```

Since margin is not counted within a containers width and height, it is best used for spacing between adjacent items in a container. The below diagram shows how margin and padding affect two groups of items within a container.

<img src="/assets/images/box-model-multiple.png" />
