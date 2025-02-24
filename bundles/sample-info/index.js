import { BasicBundleInstance } from 'oskari-ui/BasicBundleInstance';

/*
 * This is an example of an app-specific bundle. It:
 * - registers itself with bundle id `sample-info` (at the end of the file)
 * - when started it tries to add an info segment to the `guidedtour` bundle by using the request API
 * - it handles loading/startup order and retries if this bundle has been started before the `guidedtour` bundle
 */

// most bundle instances register themselves on the sandbox with the bundles getName() function
// for the bundle with id `guidedtour` the getName() returns 'GuidedTour' so we can use that to search for it:
// https://github.com/oskariorg/oskari-frontend/blob/2.14.2/bundles/framework/guidedtour/instance.js#L36
const hasGuidedTourBundleStarted = (sandbox) => sandbox.findRegisteredModuleInstance('GuidedTour');

// you can listen to bundle.start to get notified when a bundle has been started
// or you can listen to app.start to get notified when all bundles of the app have been started
const runAfterGuidedTourStarts = (lazyStartFn) => {
    Oskari.on('bundle.start', (msg) => {
        // here we need to use the bundle id `guidedtour`
        if (msg.id === 'guidedtour') {
            lazyStartFn();
        }
    });
}
// Get a logger instance for our bundle
const log = Oskari.log('SampleInfoBundleInstance');

// The bundle instance implementation:
class SampleInfoBundleInstance extends BasicBundleInstance {
    // BasicBundle provides start() and calls _startImpl() at the end
    // This is the code that is run when this bundle is started as part of an application
    start (sandbox) {
        // registers to sandbox and saves the sandbox for getSandbox()
        super.start(sandbox);
        // What this bundle does is it adds a segment to the guided tour introduction popup
        this._registerForGuidedTour();
        // You can listen to Oskari events like this:
        this.on('MapClickedEvent', (evt) => {
            log.info('map clicked at', evt)
            // stop listening to map clicked event after the first one as an example
            this.off('MapClickedEvent');
        });
    }

    /**
     * @method _registerForGuidedTour
     * Registers a segment to be shown on the guided tour help functionality. Waits for guided tour load if not found on startup.
     */
    _registerForGuidedTour () {
        // sandbox provides ways to interact with other parts of the application
        const sandbox = this.getSandbox();

        // check if there is a 'GuidedTour' module has already been started as part of the application
        if (!hasGuidedTourBundleStarted(sandbox)) {
            // Handle the case where the Guided tour hasn't been started yet
            // Lets run the registration later when the guidedtour bundle starts since guided tour might be started later than this bundle
            runAfterGuidedTourStarts(() => this._registerForGuidedTour());
            // debug logging is not shown in console by default
            log.debug(`Guided tour not started yet, we'll try again later`);
            // don't go further since we don't have anything to do without the `guidedtour` functionality
            return;
        }
        // Here we know that the Guided tour bundle has been started
        // But just to be sure, we can check the request API that we need here is now available
        if (!sandbox.hasHandler('Guidedtour.AddToGuidedTourRequest')) {
            log.error(`Guided tour bundle doesn't provide the 'Guidedtour.AddToGuidedTourRequest'. The sample-info bundle cannot function properly!`);
            // This shouldn't happen since we get this far only if the GuidedTour bundle has been started as part of the app
            // This could happen if for some reason the `GuidedTour` bundle no longer provided the `Guidedtour.AddToGuidedTourRequest`
            return;
        }
        // Requests are documented on https://oskari.org/documentation/api/requests
        // This one is https://oskari.org/documentation/api/requests/latest/Guidedtour.AddToGuidedTourRequest
        // It's best practice to create a request/event API for interaction between bundles instead of calling their functions directly.
        // This way we can mess with the bundle internals and provide a documentable API that other bundles should be able to rely on between versions.
        sandbox.postRequestByName('Guidedtour.AddToGuidedTourRequest', [{
            bundleName: this.getName(),
            priority: 5,
            getTitle: () => this.loc('guidedTour.title'),
            getContent: () => this.loc('guidedTour.message')
        }]);
    }
};

// register our bundles factory function for bundle id 'sample-info'
// This was the bundle can be started by referencing it on the startup sequence of an app with the bundle id
Oskari.bundle('sample-info', () => new SampleInfoBundleInstance());
