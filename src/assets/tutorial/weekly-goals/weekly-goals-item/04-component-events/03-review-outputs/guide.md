We are now ready to begin working on our Quarter Goals component. We are assuming that the component outputs have already been defined for you by those responsible for the higher-level components or pages that your component is a part of. The first thing you need to do then is to review your component to understand what outputs you will need to emit.

## Review the output event emitter

Take a look at the `editGoals` output that has been defined for you in your component. You will see that it has the `@Output()` decorator and is of type `EventEmitter`, a class provided by Angular that allows us to emit events. The `<void>` syntax is <a href="https://www.typescriptlang.org/docs/handbook/2/generics.html" target="_blank">Typescript generics syntax</a>, and in this case, indicates that the `editGoals` event does not emit any data.

```ts
/// file: widget.component.ts
/** Edit goals event triggered on clicking the pencil icon. */
@Output() editGoals: EventEmitter<void> = new EventEmitter<void>();
```

## Test the output event emitter

After reviewing our component, it is clear that we will need to emit an `editGoals` event when the pencil icon is clicked. We will do this in the next step. In the meantime, let's test the event. Try (temporarily) adding the following code to trigger the `editGoals` event two seconds after the component is initialized (after we're sure the `quarterData` information has been retrieved from the backend database):

```ts
/// file: widget.component.ts
ngOnInit() {
  +++setTimeout(() => {
    this.editGoals.emit();
  }, 2000);+++
}
```

Since the higher-level component has already been implemented to handle the `editGoals` output, you can see that this triggered the opening of a modal for editing the goals for the quarter.
