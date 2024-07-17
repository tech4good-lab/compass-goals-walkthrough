The next step is to set the sizes of all containers and to specify what should happen when contents exceed the dimensions of its container (e.g. whether a long task description should be truncated or should scroll).

## Set `height` and `width` of containers

We typically start from the outermost container and work our way in to evaluate whether we need to set the width and height of each div container to a fixed pixel value or to some percentage of the parent container's dimensions. The design shows that the card dimensions have a fixed width and height. Add this with the following:

```css
/// file: widget.component.scss
.widget {
  +++width: 265px;
  height: 310px;+++
  ... 
}
```

Add the following to make the `.header` and `.tasks` take up the full width of the card.

```css
/// file: widget.component.scss
.header {
  +++width: 100%;+++
  ...
}

.tasks {
  +++width: 100%;+++
}
```

We see that the `.number` is `20px` wide, has `20px` of space between itself and the text, and that the `.text` takes up the remainder of the width. Add the following to set the dimensions of number and text accordingly (we will handle spacing between items in a later step):

```css
/// file: widget.component.scss
.number {
  +++width: 20px;+++
}

.text {
  +++width: calc(100% - 40px);+++
}
```

## Set `overflow-y` to enable scrolling

Since it is not explicitly stated in the design, we will assume that all three goals should be displayed even if a goal has a very long description. We will also assume that the text can scroll vertically to allow one to read the entire description if it is long. To do this, set the `.text` to have a `max-height` and use `overflow-y` to specify what happens when the content overflows the specified height:

```css
/// file: widget.component.scss
.text {
  width: calc(100% - 40px);
  +++max-height: 44px;
  overflow-y: auto;+++
}
```

Note that we used `max-height` rather than `height` to set the text height. The reason for this is because we want to be able to vertically align the center of the number and text regardless of whether the text is one or multiple lines. Using `max-height` makes this possible (you can test this out in a later step when we implement alignment). Test the scrolling behavior by updating the text for one of the goals in `widget.component.html` to a very long description that requires more than two lines of text.
