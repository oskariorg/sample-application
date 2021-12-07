# ![alt text](../master/applications/geoportal/logo.png "Oskari") Sample application

This is an example that can be used as a template for building Oskari application frontend.

Click the "Use this template" button on the repository to create a copy of the files under your username and start customizing it.

This application can be seen in http://dev.oskari.org. For backend see https://github.com/oskariorg/sample-server-extension.

## Setup

Here are the steps to setup the build environment:

1. Make sure you have the command line programs `git`, and `node` version 10.12.0 or greater (recommended 12)
2. Clone the application repository (this one): `git clone https://github.com/oskariorg/sample-application.git`
3. Run `npm install`

## Creating your own Oskari application

After you have done the basic setup (above), the application can be built directly from this repo with eg. `npm run build`. The output will be under `dist/`.

See the main [oskari-frontend repo](https://github.com/oskariorg/oskari-frontend#readme) for detailed instructions about the build parameters.

### App composition

An Oskari frontend application consists of bundles that are defined in the `main.js` for each app (an example can be found [here](../master/applications/geoportal/main.js)). Only bundles referenced here can be instantiated at runtime.

The applications use oskari-frontend framework's Webpack to create builds. The framework introduces loaders that can be used for importing Oskari bundles.

* oskari-loader

   Bundles will be included to the main app js bundle.
* oskari-lazy-loader

   Bundles are loaded dynamically at runtime. These bundles won't be included in the main app js bundle.

Bundles that are used only in a limited part of the app (for example admin tools) can be configured to load dynamically by using the `oskari-lazy-loader`.
>Using lazy loader will decrease the size of the main app JS bundle and speed up the page loading.

### Managing dependencies

The application has `oskari-frontend` framework repository as dependency. This means you can reference bundles in `oskari-frontend` repo with eg. `import 'oskari-loader!oskari-frontend/packages/statistics/statsgrid/bundle.js'` in main.js.

If you wan't to build a custom bundle using oskari-frontend components, you can reference those by using `oskari-frontend` in bundle.js.
```javascript
scripts: [
    {
        type: "text/javascript",
        src: "oskari-frontend/bundles/mapping/mapmodule/AbstractMapModule.js"
    }
]
```

#### Oskari development mode

Oskari development mode is useful when developing the Oskari framework. Since the framework doesn't contain an application by itself, the sample application can be used when developing new Oskari features.

1. Clone `oskari-frontend` repository next to the application repository: `git clone https://github.com/oskariorg/oskari-frontend.git`
2. Run `npm run dev-mode:enable` in the application repository.

In this model, it's left to the developer to checkout the correct branches/versions of the `oskari-frontend` dependency.

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

### Customized application icons

It's possible to override any icon in `oskari-frontend/resources/icons` with app-specific icons. To add icons for your application or to override icons: include a folder named `icons` under the application folder. To replace an icon provide a png-file with the same name as in `oskari-frontend/resources/icons`. For maximum compatibility the pixel size for overridden icon should match the original. Any png-files in the app-specific icons folder will be included in the sprite that is generated so this can be used to add icons for app-specific bundles.

After running the production build it's possible to create a customized set of icons for the application by running a command `npm run sprite -- [version]:[application path]` like

    npm run sprite -- 1.0.0:applications

Note! Requires (GraphicsMagick)[http://www.graphicsmagick.org/] to be installed on the server and the "gm" command to be usable on the cmd/bash.\
Note! You must first run a production build for the application to create the corresponding dist-folder. With the example command the sprite will be generated under the `dist\1.0.0\geoportal` folder as `icons.png` and `icons.css`.\
Note! To use the customized icons set your HTML (JSP) on the oskari-server need to link the icons.css under the application folder (default JSP links it from under oskari-frontend/resources/icons.css).

## Development server

Run `npm start` for development server with auto reload for JS and hot reload for SCSS.

# Reporting issues
All Oskari-related issues should be reported here: https://github.com/oskariorg/oskari-docs/issues

### FAQ

#### "Out of memory" error when running Webpack

If you get an error when running the build like  "FATAL ERROR: Committing semi space failed. Allocation failed - process out of memory" or "FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory" you need to configure some more memory for the node-process.

In linux you can use:

    export NODE_OPTIONS=--max_old_space_size=4096
    npm run build

Or in Windows:

    set NODE_OPTIONS=--max_old_space_size=4096 && npm run build

#### Production build "freezes"

CPU usage of the computer shows nothing is happening, but the bash/cmd is still executing the build command. Try setting "parallel" to false on UglifyJsPlugin configuration in webpack.config.js:

    new UglifyJsPlugin({
        sourceMap: true,
        parallel: false
    })

#### Build fails on an error

```
npm ERR! path [...]
npm ERR! code ENOENT
npm ERR! errno -2
npm ERR! syscall rename
npm ERR! enoent ENOENT: no such file or directory, rename '[...]' -> '[...]'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent 
```

This is most likely due to `package-lock.json` being present in your environment. Package locking mechanism doesn't work gracefully with symlinked node_modules (`oskari-frontend / oskari-frontend-contrib`). Remove `package-lock.json` for now.

## License
 
This work is dual-licensed under MIT and [EUPL v1.1](https://joinup.ec.europa.eu/software/page/eupl/licence-eupl) 
(any language version applies, English version is included in https://github.com/oskariorg/oskari-docs/blob/master/documents/LICENSE-EUPL.pdf).
You can choose between one of them if you use this work.
 
`SPDX-License-Identifier: MIT OR EUPL-1.1`

Copyright (c) 2014-present National Land Survey of Finland
