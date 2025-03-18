![alt text](applications/geoportal/oskari_logo_rgb_horizontal.svg "Oskari logo")

# Template for Oskari-based frontend

This repository is an template for building a browser-based UI for Oskari-based applications.

For customizing your own application, click the "Use this template" button on the repository to create a copy of the files under your username.

For fully functioning web application you will also need a server-side component. A template for creating your own Oskari-based backend service can be found in [https://github.com/oskariorg/sample-server-extension].

These two combined can be used for creating Oskari-based applications such as featured in [https://dev.oskari.org].

## Setup

Here are the steps to setup the build environment:

1. Make sure you have the command line programs `git` and `node`
2. Clone the application repository (this one or using the GitHub template to make your own copy): `git clone https://github.com/oskariorg/sample-application.git`
3. Run `npm install` on the `sample-application` folder

Versions:
- `nodejs` version 16.12.0 or greater (recommended 20)
- `git` version shouldn't matter

## Creating your own Oskari application

You can customize the application by selecting any `bundles` from `oskari-frontend` that provide functionality and/or add your own
 application-specific bundles/code that provide any customized functionality you might need.

The main codebase for Oskari-based frontend can be found on https://github.com/oskariorg/oskari-frontend.
However this repository is the recommended way for setting up and customizing applications.

The `oskari-frontend` repository is used as a library for this one and brings in:
- the frontend framework (accessible through `Oskari` global variable)
- selection of `bundles` that offer functional building blocks that can be imported as part of the application.
- Webpack build configuration and scripts

After you have done the basic setup (above) and any customization changes you would like to make, the application can be built directly from this repo with `npm run build`.
The build process generates output under `dist/[version]` folder where `[version]` is from [package.json](package.json) file.

Special case: If on your production server your application index.jsp location is mapped to something else than the root (eg. `https://yourdomain.com/my-oskari-app/`), but the assets are mapped relative to the root (eg. `https://yourdomain.com/Oskari/dist/...`), you need to add the build parameter `--env absolutePublicPath=true` like this: `npm run build -- --env absolutePublicPath=true`.

### Development server

Instead of building the application with `npm run build` you can run `npm start` to start a Webpack dev server on `http://localhost:8081` with auto reload for JS and hot reload for SCSS.
This can be used when developing the frontend application and assumes that you have the server running on localhost:8080.

### App composition

An Oskari-based frontend application consists of `bundles` that can be imported in the `main.js` for an application (an example can be found [here](applications/geoportal/main.js)).
Only bundles referenced here are included in the build-product and can be instantiated at runtime.

The `index.js` file is the frontend application entrypoint that requests the server for an `app setup`. JSON definition of what should be started.
The `app setup` is a JSON definition of the application that reference `bundles` that should be started for a specific application.

The applications use oskari-frontend framework's Webpack configuration for builds. The framework introduces loaders that can be used for importing Oskari bundles.

* `oskari-bundle`

   Bundles will be included to the `oskari.min.js` that will be created for the application.

* `oskari-lazy-bundle`

   Bundles are loaded dynamically at runtime. Only includes a reference to the functionality instead of the whole implementation.

* Deprecated loaders

    `oskari-loader` and `oskari-lazy-loader` correspond to the new loaders, but expect the deprecated `bundle.js` file format to be used for including a bundle.

The lazy loaders only include references to bundles so they can be started/loaded if needed. If you have functionality that is not shown for all users you should consider using the lazy-loader for importing a bundle. An example could be bundles that provide admin-functionality where only a small set of users sees them. This reduces the size of the file users need to download when opening the application by only adding a stub for the functionality instead of the whole implementation.
Using lazy loader will decrease the size of the main app JS file and speed up page loading.

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

#### Oskari frontend contrib

`oskari-frontend-contrib` repository contains unofficial bundles created by the Oskari community.

To use the contrib-bundles you need to install the repository for your app `npm install https://github.com/oskariorg/oskari-frontend-contrib.git#[oskari version]`.
You can then reference contrib components using `oskari-frontend-contrib` the same way you can use `oskari-frontend`:

```javascript
import 'oskari-bundle!oskari-frontend-contrib/bundles/terrain-profile';
```

Note !These are not maintained at the same level as bundles under `oskari-frontend` and things might not work, but if you do find something that doesn't work you can report an issue.

#### Libraries

NPM package dependencies defined in `oskari-frontend` repo are available for use on the application since oskari-frontend provides them as its own dependencies. These can be imported directly in code found in this repo eg. OpenLayers `import olMap from 'ol/Map';`. To see which packages can be used in this way, see `dependencies` in [oskari-frontend package.json](https://github.com/oskariorg/oskari-frontend/blob/master/package.json).

Note: There still are some legacy libraries under `oskari-frontend/libraries` that are used from those files instead of npm modules. These will be removed in future releases and replaced with modules that can be installed through npm. 

If the library isn't included in `oskari-frontend` repo, you can add it into the application repo (like this one) as usual and import files from that library like on any software.

Note! Since the Webpack configuration is provided through `oskari-frontend`, a compatible version of `Webpack` and all of its dependencies are brought in as regular dependencies through `oskari-frontend` as well. These dependencies are not included in the build product, but because of the way they are introduced (as non-devDependencies) they might be flagged by security checkers. This means that while some vulnerable libraries might show up on scanners, the vulnerabilities are not automatically exploitable from end-user perspective as most are only used at build time.

### Customized application icons

The `icons.png` and `icons.css` under the application folders are pre-generated from icons in `oskari-frontend/resources/icons` and it's possible to override any icon in `oskari-frontend/resources/icons` with an app-specific icon. To add icons for your application or to override the built-in icons: add a folder named `icons` under the application folder (e.g. `application/applications/geoportal/icons`). To replace an icon provide a png-file with the same name as in `oskari-frontend/resources/icons`. For maximum compatibility the pixel size for overridden icon should match the original. Any png-files in the app-specific icons folder will be included in the sprite (`icons.png` and `icons.css`) that is generated so this can be used to add icons for app-specific bundles however you might want to use SVG-icons instead and this is something that oskari-frontend is moving towards as well.

After running the production build it's possible to create a customized set of icons for the application by running a command `npm run sprite -- [version]:[application path]` like

    npm run sprite -- 1.0.0:applications

This will write the customized versions of the `icons.png` and css with the override icons under `sample-application/dist/[version]/geoportal`.
Note! Requires (GraphicsMagick)[http://www.graphicsmagick.org/] to be installed and the "gm" command to be usable on the cmd/bash.
Note! You must first run a production build for the application to create the corresponding dist-folder. With the example command the sprite will be generated under the `dist/1.0.0/geoportal` folder as `icons.png` and `icons.css`.
Note! To use the customized icons set your HTML (JSP) on the oskari-server need to link the `icons.css` under the application folder (default JSP links it from under `oskari-frontend/resources/icons.css`).

# Reporting issues

All Oskari-related issues should be reported here: https://github.com/oskariorg/oskari-documentation/issues

### FAQ

#### "Out of memory" error when running Webpack

If you get an error when running the build like  "FATAL ERROR: Committing semi space failed. Allocation failed - process out of memory" or "FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory" you need to configure some more memory for the node-process.

In linux you can use:

```sh
export NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

Or in Windows:
```sh
set NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

#### Production build "freezes"

CPU usage of the computer shows nothing is happening, but the bash/cmd is still executing the build command. Try setting "parallel" to false on UglifyJsPlugin configuration in webpack.config.js:

```javascript
new UglifyJsPlugin({
    sourceMap: true,
    parallel: false
})
```

## License
 
This work is dual-licensed under MIT and [EUPL v1.1](https://joinup.ec.europa.eu/software/page/eupl/licence-eupl) 
(any language version applies, English version is included in https://github.com/oskariorg/oskari-docs/blob/master/documents/LICENSE-EUPL.pdf).
You can choose between one of them if you use this work.
 
`SPDX-License-Identifier: MIT OR EUPL-1.1`

Copyright (c) 2014-present National Land Survey of Finland
