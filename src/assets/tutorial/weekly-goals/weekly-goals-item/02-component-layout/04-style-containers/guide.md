Let add any necessary borders and background for the div container elements we just added. In this case, we only need to do so for the outermost `widget` container div.

## Add `box-shadow` and `border-radius`

To match the border style specified in the design, add the following CSS border properties in the `.widget` selector:

```css
/// file: widget.component.scss
.widget {
  +++box-shadow: 0px 4px 4px 0px #d3e1da;
  border-radius: 10px;+++
  ...
}
```
The property `border-radius` defines the radius of an element's corners. Specifying a single value like the above will apply rounded corners to all four corners. If you had wanted to customize the border radius for each corner, you could specify four values (top-left, top-right, bottom-right, and bottom-left). The property `box-shadow` creates a drop-shadow effect for an element. The five arguments in the property value represent: x-offset, y-offset, spread, blur, and color.

**Caution**: Notice that CSS property values are separated by spaces and not by commas. If commas are accidentally included (e.g. `box-shadow: 0px, 4px, 4px, 0px, #d3e1da;`), it will not work!

**Note:** We place properties for the parent container *above* any nested selectors for child elements. This makes our code easy to read since you can see the styles directly targeting a container before looking at styles for children of the container.

## Add `background` to widget container

The `background` property takes the same values as that of `color`, i.e. color keywords, hexadecimal values, or RGBA values. Add the following code to match the background in the Figma design:

```css
/// file: widget.component.scss
.widget {
  +++background: #ffffff;+++
  box-shadow: 0px 4px 4px 0px #d3e1da;
  border-radius: 10px;
  ...
}
```
