Just as we *declare* elements of a page in the HTML page, we declare styles of the elements in the SCSS page to change aspects of an element such as its color and font. SCSS stands for Sassy Cascading Style Sheets and is a generalization of CSS. Any valid CSS code is also valid SCSS code, which is why we will sometimes describe what we are teaching you as a feature of CSS.

## CSS declarations and selectors

Let's start by adding the following in the `weeekly-goals-item.component.scss` file to give all `div` elements an orange color.

```css
/// file: weekly-goals-item.component.scss
+++div {
  color: orange;
}+++
```

The `color: orange;` syntax above is a *CSS declaration*, which consists of a CSS property and a property value, separated by a colon: `property: value;`. Each CSS property has a corresponding set of valid values that it accepts. For example, when defining the CSS `color` property, one can use different values such as color keywords (`red`), hexadecimal codes (`#AE1293`), and RGB functions (`rgb(200, 255, 10, 0.5)`).

```css
/// no-file
color: purple;
color: #a020f0;
color: rgb(160, 32, 240);
```

CSS declarations specify what styling to apply. But one also needs *CSS selectors* to specify *which elements* those styles should apply to. For example, if you would like to declare styles that apply to all elements with a specific type, you use the name of the element type followed by a set of curly braces that enclose the CSS declarations. 

## Try defining some CSS styles

Try adding CSS selectors and declarations to change the colors of the various elements. Here are some things you might consider:
* Apply styles to the `h1`, `h2`, `h3`, `button`, and `p` elements,
* Use the common color name, hexidecimal or rgb format for specifying an element's `color`
