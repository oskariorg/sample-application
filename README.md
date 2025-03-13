![alt text](applications/geoportal/oskari_logo_rgb_horizontal.svg "Oskari logo")

# Template for Oskari-based frontend

This repository is an example that can be used as a template for building a frontend/browser-based UI for Oskari-based applications.

Click the "Use this template" button on the repository to create a copy of the files under your username and start customizing it.

This application can be seen in https://dev.oskari.org. For backend see https://github.com/oskariorg/sample-server-extension.

## Setup

Here are the steps to setup the build environment:

1. Make sure you have the command line programs `git`, and `node` version 16.12.0 or greater (recommended 20)
2. Clone the application repository (this one or your own copy that is based on this template): `git clone https://github.com/oskariorg/sample-application.git`
3. Run `npm install`

## Creating your own Oskari application

After you have done the basic setup (above), the application can be built directly from this repo with eg. `npm run build`. The output will be under `dist/`.

See the main [oskari-frontend repo](https://github.com/oskariorg/oskari-frontend#readme) for detailed instructions about the build parameters.

### App composition

An Oskari-based frontend application consists of bundles that are imported in the `main.js` for each app (an example can be found [here](applications/geoportal/main.js)).
Only bundles referenced here are included in the build-product and can be instantiated at runtime.

The applications use oskari-frontend framework's Webpack to create builds. The framework introduces loaders that can be used for importing Oskari bundles.

* oskari-bundle

   Bundles will be included to the oskari.min.js that will be created for the application.

* oskari-lazy-bundle

   Bundles are loaded dynamically at runtime. Only includes a reference to the functionality instead of the whole implementation.

* Deprecated loaders

    oskari-loader and oskari-lazy-loader correspond to the new loaders, but expect the deprecated bundle.js file format to be used for including a bundle.

The lazy loaders only include references to bundles so they can be started/loaded if needed. If you have functionality that is not shown for all users you should consider using the lazy-loader for importing a bundle. An example could be bundles that provide admin-functionality where only a small set of users sees them. This reduces the size of the file users need to download when opening the application by only adding a stub for the functionality instead of the whole implementation.
Using lazy loader will decrease the size of the main app JS bundle and speed up the page loading.

### Managing dependencies

The application has the `oskari-frontend` repository as a dependency. This means you can reference bundles in `oskari-frontend` repo with eg. `import 'oskari-bundle!oskari-frontend/bundles/statistics/statsgrid'` in main.js.

Another usual use-case might be importing the bundle-instance base class or some UI-library parts from oskari-frontend with the `oskari-ui` reference:

```javascript
import { BasicBundleInstance } from 'oskari-ui/BasicBundleInstance';
import { Message, Label, Tooltip } from 'oskari-ui';
import { PrimaryButton, DeleteButton, SecondaryButton } from 'oskari-ui/components/buttons';
```

This means that you could also reference a file directly using `oskari-frontend`, but you probably shouldn't and you might want to discuss this on [Gitter](https://app.gitter.im/#/room/#oskariorg_chat:gitter.im) before going this route.
```javascript
import 'oskari-frontend/bundles/..../someRandom.js';
```

#### Oskari development mode

Oskari development mode is useful when developing the Oskari framework. Since the framework doesn't contain an application by itself, the sample application can be used when developing new Oskari features.

1. Clone `oskari-frontend` repository next to the application repository: `git clone https://github.com/oskariorg/oskari-frontend.git`
2. Run `npm run dev-mode:enable` in the application repository (or you can run `npm install ../oskari-frontend`).

In this model, it's left to the developer to checkout the correct branches/versions of the `oskari-frontend` dependency.

#### Oskari frontend contrib

`oskari-frontend-contrib` repository contains unofficial bundles and applications for Oskari created by the Oskari community. 
If you want to use the contrib bundles, you should clone the contrib repo next to your application repository and take following steps:

To use the existing code as is you can run `npm install https://github.com/oskariorg/oskari-frontend-contrib.git#[oskari version]`.

For developing code under `oskari-frontend-contrib` repository you can 
1. Clone the contrib repository next to the application repository: `git clone https://github.com/oskariorg/oskari-frontend-contrib.git` 
2. Run `npm install ../oskari-frontend-contrib` in your application directory.

In either case you can then reference contrib components using `oskari-frontend-contrib` the same way you can use `oskari-frontend`.

### Libraries

NPM package dependencies defined in `oskari-frontend` repo are available for use on the application since oskari-frontend provides them as its own dependencies. These can be imported directly in code found in this repo eg. OpenLayers `import olMap from 'ol/Map';`. To see which packages can be used in this way, see `dependencies` in [oskari-frontend package.json](https://github.com/oskariorg/oskari-frontend/blob/master/package.json).

Note: There still are some legacy libraries under `oskari-frontend/libraries` that are used from those files instead of npm modules. These will be removed in future releases and replaced with modules that can be installed through npm. 

If the library isn't included in `oskari-frontend` repo, you can add it into the application repo (like this one) as usual and import files from that library like on any software.

### Customized application icons

The `icons.png` and `icons.css` under the application folders are pre-generated from icons in `oskari-frontend/resources/icons` and it's possible to override any icon in `oskari-frontend/resources/icons` with an app-specific icon. To add icons for your application or to override the built-in icons: add a folder named `icons` under the application folder (e.g. `application/applications/geoportal/icons`). To replace an icon provide a png-file with the same name as in `oskari-frontend/resources/icons`. For maximum compatibility the pixel size for overridden icon should match the original. Any png-files in the app-specific icons folder will be included in the sprite (`icons.png` and `icons.css`) that is generated so this can be used to add icons for app-specific bundles however you might want to use SVG-icons instead and this is something that oskari-frontend is moving towards as well.

After running the production build it's possible to create a customized set of icons for the application by running a command `npm run sprite -- [version]:[application path]` like

    npm run sprite -- 1.0.0:applications

This will write the customized versions of the `icons.png` and css with the override icons under `sample-application/dist/[version]/geoportal`.
Note! Requires (GraphicsMagick)[http://www.graphicsmagick.org/] to be installed and the "gm" command to be usable on the cmd/bash.
Note! You must first run a production build for the application to create the corresponding dist-folder. With the example command the sprite will be generated under the `dist/1.0.0/geoportal` folder as `icons.png` and `icons.css`.
Note! To use the customized icons set your HTML (JSP) on the oskari-server need to link the `icons.css` under the application folder (default JSP links it from under `oskari-frontend/resources/icons.css`).

## Development server

Run `npm start` for development server on `http://localhost:8081` with auto reload for JS and hot reload for SCSS.
This can be used when developing the frontend application and assumes that you have the server running on localhost:8080.

If you are developing oskari-frontend (have the ../oskari-frontend on package.json) you can use `npm run start:dev` instead.
This allows autoreloading for files under oskari-frontend as well.

# Reporting issues

All Oskari-related issues should be reported here: https://github.com/oskariorg/oskari-documentation/issues

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
