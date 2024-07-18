Let's get started on creating the Quarter Goals component. In this step, we will identify and declare all the text elements of our component.

## Use `<div>` to declare the card title

Let's start at the top of the component and work our way to the bottom of the component. Use the `<div>` tag to declare the text element `Fall '18 Goals`.

```html
/// file: weekly-goals-item.component.html
+++<div>Finish Google Cover Letter</div>+++
```

In this case, it's not needed to use a header tag like (`<h1>`) since it carries additional semantic meaning for accessibility purposes. These tags also come with default styles that need to be removed or modified. Because of this, we will be using `<div>` tags in our tutorial since it comes with no added styling.

## Declare the remaining text elements

Underneath the card title element you just added, use the same syntax to define the remaining text element, which is the goal's corresponding hashtag we use to categorize it in Compass (i.e. `#coverletter)

Make sure as you're doing this, you declare separate elements for the goal and its hashtag because they need to be positioned and styled differently. 
