Most rich web applications store data in some backend database so that it can persist across multiple devices and user sessions. As you bind data to the view, you will need to be familiar with the relevant data models for your application.

## Entities in our Angular application

Much of our data is stored as a collection of *entities* organized into *entity types* such as a `User`, `Quarter`, `QuarterGoal`, etc. Each entity type stores predefined *attributes* for individual entities. For example, a `User` might have a `name` and `email`. 

When we retrieve this data into our Angular app, each entity is represented as an object with properties corresponding to each attribute. The model definition for a given entity type can be found in the `<entity>/<entity>.model.ts` file within `app/core/store`. For example, the `User` model is defined as follows:

```ts
/// file: user.model.ts
export interface User {
  __id: string;
  name: string;
  email: string;
  photoURL?: string;
  onboardingState: OnboardingState;
}
```

## Data binding entities to the view

Data binding entities works just like data binding for other variables. In the example below, the widget has an input variable called `currentUser` defined in its Typescript file and is of type `User` (defined in `app/core/store/user/user.model.ts`:

```ts
/// file: widget.component.ts
@Input() currentUser: User;
```

Try adding the following to the HTML file to see the JSON representation of the entire user object rendered in the view. In this case, we are using the <a href="https://angular.io/api/common/JsonPipe" target="_blank">JsonPipe</a> to get the JSON representation:

```html
/// file: widget.component.html
+++<div>{{ currentUser | json }}</div>+++
```

You can also bind specific properties. Modify your code as shown below to render the user name using `{{ currentUser.name }}`:

```html
/// file: widget.component.html
<div>{{ currentUser+++.name+++--- | json--- }}</div>
```
