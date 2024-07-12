# CompassGoalsWalkthrough

This project was initialized by using [Tech4Good's Angular Schematics](https://github.com/tech4good-lab/angular-schematics) after a base project repository was generated with [Angular CLI](https://github.com/angular/angular-cli). You can check the early commits of package.json to determine the versions used to generate it.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Run `ng serve --configuration production` to run a prod server locally. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate container|entity`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Run `firebase deploy` to deploy to production and `firebase deploy -P dev` to deploy to dev

## Version number

We use the syntax `MAJOR.MINOR.PATCH` for versioning, where
* `MAJOR` contains significant new features or overhauls of the user experience requiring user adaptation, removal of features, or data migration that could result in data loss
* `MINOR` contains performance improvements, non-disruptive ui enhancements, and new smaller features that enhance the application but don't interfere with existing features
* `PATCH` contains bug fixes, minor usability and performance fixes that don't add new capabilities
