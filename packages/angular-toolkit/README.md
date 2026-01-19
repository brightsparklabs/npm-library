# BSL Angular Toolkit

The Angular Toolkit is a collection of components, styles/themes and Angular utilities which are
commonly used across BSL projects.

The library code can be found in [./projects/lib](./projects/lib) and a basic dev showcase app using
the library has been setup in [./projects/dev](./projects/dev).

This project is using the [Analog](https://analogjs.org/) meta-framework for Angular.

## Development server

To start a local development server, run either:

```bash
bun run start
```

Once the dev server is running, open your browser and navigate to `http://localhost:5173/`. The
application will automatically reload whenever you modify any of the dev source files in [./projects/dev/src](./projects/dev/src)

To also setup the `lib` project to rebuild run the following:

```bash
bun run watch:lib
```

Any changes made to the `lib` project source files in [./projects/lib/src](./projects/dev/src) will cause the dev server
to automatically reload.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
cd ./projects/lib
ng generate component src/component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
bun run build:lib
```

This will compile the library and store the build artifacts in the `dist/` directory. By default,
the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev) test runner, use the following command:

```bash
bun run test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the
[Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
