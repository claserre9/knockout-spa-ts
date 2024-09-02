
# Knockout SPA with Typescript

This repository contains a TypeScript-based frontend application template. It incorporates Knockout.js for MVVM architecture and Sammy.js for client-side routing, making it a powerful starting point for building single-page applications (SPAs).

## Features

- **TypeScript**: Used to add static typing to JavaScript, improving code quality and maintainability.
- **Knockout.js**: MVVM framework that simplifies UI bindings, allowing for dynamic and responsive interfaces.
- **Sammy.js**: Lightweight routing framework that facilitates the creation of SPAs with client-side routing and event handling.
- **Webpack**: Utilized as the module bundler, enabling the transformation and bundling of JavaScript, CSS, and other assets.


## Getting Started

### Prerequisites

Ensure that you have the following installed on your machine:

- Node.js (v14.x or higher)
- npm (v6.x or higher)

### Installation

To set up the project locally, clone the repository and install the dependencies:

```bash
git clone https://github.com/claserre9/knockout-spa-ts.git
cd ts-fe-app
npm install
```

### Running the Development Server

The entry point for the frontend application is `src/app.ts`. This file initializes the Knockout.js view models and configures Sammy.js for routing. To start the development server and view your application in the browser, run:

```bash
npm start
```

This will start the application at `http://localhost:3000`.

### Building the Project

To create a production-ready build, use the following command:

```bash
npm run build
```

The build process will bundle the application into the `dist` directory, optimized for deployment.

## Project Structure

- **src/**: Contains the source code of the application.
    - **app.ts**: The main entry point for the application where Knockout.js view models and Sammy.js routes are configured.
    - **viewmodels/**: Contains the Knockout.js view models.
    - **views/**: HTML templates that are bound to the Knockout.js view models.
    - **styles/**: SCSS files for styling the application.
- **server.js/ts**: Scripts for serving the application during development.
- **webpack.config.js**: Configuration file for Webpack, including loaders and plugins.
- **package.json**: Lists the project's dependencies and scripts.
- **tsconfig.json**: TypeScript configuration file, defining compiler options and project settings.


## Contributing

Contributions are welcome! To contribute:

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.
