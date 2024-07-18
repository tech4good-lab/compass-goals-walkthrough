Welcome to the Causeway tutorial! The goal of Causeway is to help close the gap between learning the syntax for various web technologies (the focus of many tutorials) and the process of bringing those technologies together to build rich interactive web applications. Rather than comprehensively covering any technology, we'll be teaching you just enough to implement the given example. Our process will center on our particular stack (Angular, RxJS, NgRx, Firebase). 

## Learning with micro-roles and subgoal labels

We've decomposed the web development process into a series of smaller *micro-roles*. You'll start with micro-roles that center on what may initially seem like a tiny part of the process, but you'll gradually move your way up. Think about it like working your way up an organization - as you develop experience, your responsibilities and view of the project will increase in scope. Here are the micro-roles we've written up so far:

**Components**: UI widgets that do not interact with the backend. They have data passed to them and emit events for others to handle,
* Component: Elements (HTML, SCSS)
* Component: Layout (HTML, SCSS)
* Component: Data (Typescript, Angular)
* Component: Events (Typescript, Angular)

**Containers**: a page or section of a page often containing multiple components, and responsible for preparing data from the backend or initiating changes to the backend,
* Containers: Data (RxJS, Angular)
* Containers: Selectors (NgRx, Angular)
* Containers: Events (RxJS, Angular)
* Containers: Actions (NgRx, Angular)

Each micro-role is further divided up into a step-by-step process, also referred to as subgoal labels. The hope is that as we walk you through these steps, this will help you develop and evolve your own mental model for how to complete each given role. You may want to walk through multiple examples as some require steps that aren't necessary in others.

## Interactive Code Editor

Most steps will ask you to write some code in the interative code editor on the right. Try typing the following into the editor. As you type, the code will recompile and you'll see your edits rendered in the view on the bottom-right hand side.

```html
/// file: weekly-goals-item.component.html
<!-- ADD TEXT ON A NEW LINE -->
+++<h1>Hello world!</h1>+++
```
