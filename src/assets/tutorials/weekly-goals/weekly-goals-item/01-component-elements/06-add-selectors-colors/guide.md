Let's continue working on our Weekly Goals Item component. In this step, we will use CSS selectors to set the `color` of each element. 

## Add a `class` attribute to the title

In the previous step, we used element selectors to apply styles to *all* elements of a specific tag type. A more common approach is to add `class` attributes to HTML tags that allow one to target that specific element or a group of elements with common styles. Add class attributes to the card title using the following:

```html
/// file: weekly-goals-item.component.html
<div +++class="goal-hashtag"+++>#coverletter</div>
```

## Use `.goal-hashtag` to add color styles

To apply styles to all elements with a given class, use a `.` followed by the class value. Use this to specify the `color` of the title by adding the below code to the `weekly-goals-item.component.scss` file:

```css
/// file: weekly-goals-item.component.scss
+++.goal-hashtag {
  color: #EE8B72;
}+++
```

## Add class attributes to color and size the remaining elements

Use the same syntax to add classes to the remaining elements and to apply the appropriate colors and font sizes specified in the 
<a href="https://www.figma.com/design/EcsVaVYa8ecIg5J2GJAFA6WH/Compass-for-Causeway?node-id=26836-796&t=u8f50eszGsPIydu0-4)">Weekly Goals Item design file</a>.

You will need to add class selectors and `color: #5A5A5A;` for the title,`goal-title`, of each task.
