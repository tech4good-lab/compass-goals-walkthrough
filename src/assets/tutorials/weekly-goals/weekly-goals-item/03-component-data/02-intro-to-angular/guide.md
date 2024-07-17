There are three fundamental languages used in web development: HTML, CSS, and Javascript. You have already been introduced to the first two for creating the static view of a webpage. Javascript allows us to programmatically modify this static view to create more dynamic webpages.

## From plain Javascript to Javascript frameworks

When webpages are rendered, browsers use the defined HTML and CSS to create an object-oriented representation of the page called the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction" target="_blank">Document Object Model (DOM)</a>. This programming interface defines objects, properties, and methods that represent the elements of a specific page and makes it possible to programmatically manipulate them using scripting languages such as Javascript. 

Libraries such as <a href="https://jquery.com/" target="_blank">jQuery</a> were created to simplify implementation of common functions like animating new elements within a page or modifying certain text, but complex web applications that use jQuery quickly become hard to maintain since it is hard to figure out what Javascript code might be affecting a particular element's behavior. This led to front-end frameworks such as Angular, React, and Vue.js.

## <a href="https://angular.io/guide/architecture-components" target="_blank">Component-based architecture in Angular</a>

One of the patterns that Angular encourages is developing web applications with a component-based architecture. Component-based architectures represent different parts of an app as self-contained "components", each of which has their own set of HTML, SCSS, and Typescript files defining how that part of the page looks and behaves. These components can then be treated almost as if they were custom HTML elements that can be inserted into a page with a corresponding tag.

Look at the `page.component.html` file and notice the HTML-like tag syntax `<app-widget></app-widget>`. Duplicate this like in the code below and see how this results in two copies of the widget you've been implementing:

```html
/// file: page.component.html
<app-widget></app-widget>
+++<app-widget></app-widget>+++
```

Now open up the `widget.component.ts` file. Notice that the `@Component` decorator specifies several values for defining the component. The `selector: 'app-widget'` syntax determines the "tag name" for the component and the `templateUrl` and `styleUrls` syntax specifies the HTML and SCSS files that will be used to render the component view. To see this in action, try changing the selector value in this file as well as in the `page.component.html` where it is used:

```ts
/// file: widget.component.ts
@Component({
  selector: '---app-widget---+++app-hello+++',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: WidgetAnimations,
})
```

```html
/// file: page.component.html
+++<app-hello></app-hello>+++
---<app-widget></app-widget>
<app-widget></app-widget>---
```

## <a href="https://malcoded.com/posts/angular-2-components-and-mvvm" target="_blank">MVVM-like patterns in Angular</a>

In addition to a component-based architecture, Angular also encourages separating the view from the model in a manner similar to the common <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller" target="_blank">Model-View-Controller (MVC)</a> and <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel" target="_blank">Model-View-ViewModel (MVVM)</a> patterns for increased separation of concerns. In an Angular component, the view is defined within the HTML and SCSS files of a component. The Typescript file is responsible for retrieving data from the model and preparing it for the view. There is then syntax that "binds" data variables defined in the Typescript file to the view so that the content or styles are automatically updated with changes in those bound variables. We will be learning to do that in this role.
