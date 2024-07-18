We are now ready to begin working on our Quarter Goals component. We are assuming that the component inputs have already been defined for you by those responsible for the higher-level components or pages that your component is a part of. The first thing you need to do then is to review your component to understand what input data you are being passed for binding to the view.

## Review the input data type definitions

One way to understand the structure of any input variables provided is to look at the variable type definitions. Like many other programming languages, variables in TypeScript have some datatype, such as number, boolean, string, etc. Once you get familiar with Typescript's <a href="https://www.typescriptlang.org/docs/handbook/basic-types.html" target="_blank">type notation</a>, simply glancing at the type definition will tell you the structure of the data variables.

Since this will require you to become familiar with other parts of the application beyond your widget component files, we are displaying the files for most of the application starting from the `app` directory. Starting from our `app/main/page/widget/widget.component.ts` file, we see that a `quarterData` input variable has been added for us with type `QuarterData`:

```ts
/// file: app/main/page/widget/widget.component.ts
import { QuarterData } from '../+state/page.model';

@Input() quarterData: QuarterData;
```

Opening the `app/main/page/+state/page.model.ts` file from which `QuarterData` is being imported, we can see that the `QuarterData` type extends the `Quarter` type with an additional `quarterGoals` field that consists of an array of `QuarterGoal` objects:

```ts
/// file: app/main/page/+state/page.model.ts
import { Quarter } from '../../../core/store/quarter/quarter.model';
import { QuarterGoal } from '../../../core/store/quarter-goal/quarter-goal.model';

export interface QuarterData extends Quarter {
  quarterGoals: QuarterGoal[];
}
```

The `QuarterGoal` and `Quarter` types represent entities stored in the database. The type definitions for these are all stored within `app/core/store/[entity]/[entity].model.ts`:

```ts
/// file: app/core/store/quarter/quarter.model.ts
export interface Quarter {
  __id: string; // string representation of startTime
  startTime: number; // start of quarter in GMT time in milliseconds since 1/1/1970
  endTime: number; // end of quarter in GMT time in milliseconds since 1/1/1970
}
```

```ts
/// file: app/core/store/quarter/quarter-goal.model.ts
export interface QuarterGoal {
  __id: string;
  __userId: string;
  __quarterId: string;
  text: string;
  completed: boolean;
  order: number;
}
```

## Review passed in input data

If the higher-level component has already retrieved the necessary data and has passed it into the widget, you can also inspect the data being passed in by logging the variable to the console or binding the json object to the view using `{{ quarterData | json }}`. If you do in our case, you'll see the following data being passed in:

```
/// no-file
{
  "__id": "1688194800000",
  "startTime": 1688194800000,
  "endTime": 1696143599999,
  "quarterGoals": [
    {
      "__id": "qg1",
      "__quarterId": "1688194800000",
      "__userId": "test-user",
      "text": "Finish cover letters",
      "completed": false,
      "order": 1
    }, {
      "__id": "qg2",
      "__quarterId": "1688194800000",
      "__userId": "test-user",
      "text": "Apply to internships",
      "completed": false,
      "order": 2
    }, {
      "__id": "qg3",
      "__quarterId": "1688194800000",
      "__userId": "test-user",
      "text": "Technical interview prep!",
      "completed": false,
      "order": 3
    }
  ]
}
```

From this, we can see that we'll likely want to use the `startTime` and `endTime` variables to determine the specific quarter we are currently in and the date interval to display. We'll want to use the `quarterGoals` array to determine the specific goals to display.
