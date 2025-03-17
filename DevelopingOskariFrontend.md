# Developing code under oskari-frontend

Oskari development mode is useful when developing the Oskari framework (code under `oskari-frontend`).
Since the framework doesn't contain an application by itself, the sample application can be used when developing new Oskari features.

1. Clone `oskari-frontend` repository next to the application repository: `git clone https://github.com/oskariorg/oskari-frontend.git`
2. Run `npm run dev-mode:enable` in the _application_ repository (or instead you can run `npm install ../oskari-frontend`).
3. Run `npm run build:dev` or `npm run start:dev` instead of the usual build commands to start the Webpack dev server

In this model, it's left to the developer to checkout the correct branches/versions of the `oskari-frontend` dependency.

Webpack dev server is used to serve the JS bundle and assets when running in local development.
When you see "Compiled successfully." after `npm run start:dev` in the terminal, you can open the app in the browser at `http://localhost:8081`.
This way the dev server has automatic reloading enabled for the application AND `oskari-frontend` when you save changes to JS code and hot reloading for S/CSS without need for full browser reload.

The `npm run build:dev` generates the usual build products under the `dist` folder.

On either case you will also need a oskari-server based server webapp to be running that responds to the XHR requests made by the frontend.

## Server-side functionality

You can download a pre-compiled copy of the server from [https://www.oskari.org/download] that includes Tomcat as servlet container to run the Oskari-based server-side application.
XHR calls by the frontend application will be proxied by the Webpack dev server to the Java backend assumed to be running on `http://localhost:8080`.

When the page is loaded the oskari.min.js and assets links are  configured in the Oskari-server `oskari-ext.properties`:

```
oskari.client.version=dist/devapp
```

When using the Webpack dev server the client version should be set as `dist/devapp`.

You can also build a Oskari-based Java webapp from source by cloning [sample-server-extension](https://github.com/oskariorg/sample-server-extension)
 and configure/run it on your own servlet-container OR replace the pre-built version that is included in the download from [https://www.oskari.org/download].

## FAQ

### Build fails on an error

```sh
npm ERR! path [...]
npm ERR! code ENOENT
npm ERR! errno -2
npm ERR! syscall rename
npm ERR! enoent ENOENT: no such file or directory, rename '[...]' -> '[...]'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent 
```

This is most likely due to `package-lock.json` being present in your environment. Package locking mechanism doesn't work gracefully with symlinked node_modules (`oskari-frontend / oskari-frontend-contrib`). Remove `package-lock.json` for now.

## Developing oskari-frontend-contrib

`oskari-frontend-contrib` repository contains unofficial bundles and applications created by the Oskari community.
You can develop these using the sample application like oskari-frontend: 

Developing code under `oskari-frontend-contrib` repository works the same way as with `oskari-frontend`:

1. Clone the contrib repository next to the application repository: `git clone https://github.com/oskariorg/oskari-frontend-contrib.git` 
2. Run `npm install ../oskari-frontend-contrib` in your application directory.

In either case you can then reference contrib components using `oskari-frontend-contrib` the same way you can use `oskari-frontend`.
