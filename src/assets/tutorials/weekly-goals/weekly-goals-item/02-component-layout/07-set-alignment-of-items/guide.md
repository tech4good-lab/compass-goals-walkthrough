If the dimensions of an item is smaller than the dimensions of their container, there will be extra space remaining. Specifying alignment will determine how items are positioned with the additional space. 

## Use `align-items` and `align-self` to set appropriate alignment

The property `align-items` is used to align groups in the direction perpendicular to that specified by `flex-direction`. The property `align-self` is similar, except it is added on individual items rather than on the parent container.

<img src="/assets/images/layout-6-2.png" />

In Quarter Goals, each task contains a number and text element that are laid out horizontally but that need to be centered vertically. Add the following code to achieve this:

```css
/// file: widget.component.scss
.task {
  display: flex;
  flex-direction: row;
  +++align-items: center;+++
  ...
}
```

Similarly, the `edit` icon should be at the right-hand side of the card. Use `align-self` to achieve this with the following code:

```css
/// file: widget.component.scss
.edit {
  cursor: pointer;
  +++align-self: flex-end;+++
}
```
