Now that we've defined colors for our text elements, let's define the remaining text-related styles. For Weekly Goals Item, we need to set the `font-family` and `font-size` properties. 

## Specify `font-size`

The CSS `font-size` property is used to specify the size of the font. The most common absolute units is pixels (`px`), while the most common relative unit is `em`, which represents the page's current font size. Just like the color, we use the design file to determine the appropriate weight and size of given text. Add these corresponding styles for the title element:

```css
/// file: weekly-goal-item.component.scss
.goal-title {
  color: #5A5A5A;
  +++font-size: 16px;+++
}
```

## Use `*` and `font-family` to set font

To use the `Oxygen` font on all of our elements, as specified in the design file, we use the `*` selector which targets all elements and the `font-family` property that allows for declaring fonts. Add the below to `weekly-goals-item.component.scss`:

```css
/// file: weekly-goals-item.component.scss
+++@import url(//fonts.googleapis.com/css?family=Oxygen);+++

+++* {
  font-family: Oxygen;
}+++
```

## Add text styles for remaining elements

Reference the Figma design and use the same syntax above to set the `font-size`for the remaining text elements, if applicable. In particular:
* Set the styles for the goal's title
* Set the styles for the goal's hashtag


We'll conclude by just noting some other text-related styles:
* font-related properties: `text-decoration`, `font-style`, `text-decoration`, `text-shadow`, `text-transform`, `font-variant`,
* paragraph-related properties: `text-align`, `text-indent`, `line-height`, `letter-spacing`, `word-spacing`, `text-overflow`, `white-space`, and 
* list-related properties `list-style-type`, `list-style-position`

In practice, don't worry about memorizing them all, just search the internet when trying to figure out what property to use. Some comphrensive lists are also available, e.g. on <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference">Mozilla</a>.
