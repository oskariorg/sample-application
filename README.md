# Sample application

This is a template that can be used as base for building Oskari application frontend.

Click the "Use this template" button on the repository to create a copy of the files under your username and start customizing it.

This application can be seen in http://dev.oskari.org.

## Setup

This repository and the main oskari-frontend repository should be located side by side on your filesystem. Here are the steps to setup the build environment:

1. Make sure you have the command line programs `git`, and `node` version 8 or greater
2. Clone the main frontend repository: `git clone https://github.com/oskariorg/oskari-frontend.git`
3. Clone the application repository (this one): `git clone https://github.com/oskariorg/sample-application.git`
    - Now we have directories `oskari-frontend` and `sample-application` side by side
4. Run `npm install` in both above repo directories

Running `npm install` in this repo will create symlinks to the `oskari-frontend` directory under node_modules.

In this model, it's left to the developer to checkout the correct branches/versions of the above repos.

## Building

After you have done the basic setup (above), the application can be built directly from this repo with eg. `npm run build -- --env.appdef=1.0.0:applications`. The output will be under `dist/`.

See the main [oskari-frontend repo](https://github.com/oskariorg/oskari-frontend#readme) for detailed instructions about the build parameters.

## Building your own application

You may use this repository as a base for your own Oskari application frontend. For backend see https://github.com/oskariorg/sample-server-extension.

### Managing dependencies

With the symlinks in place import-statements and other path references to `oskari-frontend` will resolve to the appropriate directories. This means you can reference bundles in `oskari-frontend` repo with eg. `import 'oskari-loader!oskari-frontend/packages/statistics/statsgrid/bundle.js'` in main.js.

If you wan't to build a custom bundle using oskari-frontend components, you can reference those by using `oskari-frontend` in bundle.js.
```
...
    source: {
        scripts: [
            {
                type: "text/javascript",
                src: "oskari-frontend/bundles/mapping/mapmodule/AbstractMapModule.js"
            },
        ]
    }
...
```

#### Oskari frontend contrib

`oskari-frontend-contrib` repository contains unofficial bundles and applications for Oskari created by the Oskari community. 
If you want to use the contrib bundles, you should clone the contrib repo next to your application repository and take following steps:

1. Clone the contrib repository: `git clone https://github.com/oskariorg/oskari-frontend-contrib.git`
2. Go to `oskari-frontend-contrib` directory and run `npm install`.
3. Edit your application's `package.json` by adding `"oskari-frontend-contrib": "file:../oskari-frontend-contrib"` to the dependencies section.
4. Run `npm install` in your application directory.

You can then reference contrib components using `oskari-frontend-contrib` the same way you can use `oskari-frontend`.

### Libraries

Before adding a library dependency (either under `libraries/` or via NPM), you should check if the library is already included in `oskari-frontend` repo. If it is, you can reference it in your bundle.js with eg. `oskari-frontend/libraries/geostats/1.5.0/lib/geostats.min.js`. NPM package dependencies defined in `oskari-frontend` repo can be imported directly in code found in this repo eg. Open Layers `import olMap from 'ol/Map';`. Note: this is not how node module resolution usually works; it's a special feature of the Oskari build system aimed to avoid library code duplication & version conflicts. To see which packages can be used in this way, see `dependencies` in [oskari-frontend package.json](https://github.com/oskariorg/oskari-frontend/blob/master/package.json).

If the library isn't included in `oskari-frontend` repo, you can add it into this repo, either as dependency in package.json (preferred) or under `libraries/`. Dependencies under `libraries/` require a reference in bundle.js, NPM dependencies do not; just `import` in your code.

 ## Development server

 Run `npm start` for development server with auto reload for JS and hot reload for SCSS.

# Reporting issues
All Oskari-related issues should be reported here: https://github.com/oskariorg/oskari-docs/issues

### Known issues

WIP: Build fails with `ENOENT: no such file or directory... This is related to npm not being able to find a file.`
* This is most likely due to `package-lock.json` being present in your environment. Package locking mechanism doesn't work gracefully with symlinked node_modules (`oskari-frontend / oskari-frontend-contrib`). Remove `package-lock.json` for now.
