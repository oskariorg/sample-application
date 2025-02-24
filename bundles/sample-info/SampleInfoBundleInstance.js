import { BasicBundleInstance } from 'oskari-ui/BasicBundleInstance';
import './event/HelloEvent';
import './request/HelloRequest';

/*
 * This is an example of an app-specific bundle. It:
 * - extends 'oskari-ui/BasicBundleInstance' to handle the usual boilerplaty stuff
 * - when started it tries to add an info segment to the `guidedtour` bundle by using the request API
 * - it handles loading/startup order and retries if this bundle has been started before the `guidedtour` bundle
 * - some code is moved to helpers, just to make the code/comment ratio stay at acceptable level within the bundle
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
};
// Get a logger instance for our bundle
const log = Oskari.log('SampleInfoBundleInstance');

// The bundle instance implementation:
export class SampleInfoBundleInstance extends BasicBundleInstance {
    // BasicBundle provides start() and calls _startImpl() at the end
    // This is the code that is run when this bundle is started as part of an application
    start (sandbox) {
        // registers to sandbox and saves the sandbox for getSandbox()
        super.start(sandbox);
        // What this bundle does is it adds a segment to the guided tour introduction popup
        this._registerForGuidedTour();
        // demonstrate how to interact with other bundles
        this._interactionDemo();
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

    /**
     * This function demonstrates:
     * - how to trigger an event that the bundle provides/notify other bundles that something happened
     * - how to provide a request that other bundles can use
     * - How to listen to events like the 'MapClickedEvent' from `mapmodule` bundle
     */
    _interactionDemo () {
        // sandbox provides ways to interact with other parts of the application
        const sandbox = this.getSandbox();
        // HelloEvent is provided by this bundle (in ./event/HelloEvent.js)
        //  to notify other bundles that something happened in the application that other bundles might be interested to know
        //  this is a simple example how to do this and it doesn't make much sense here,
        //  but consider you have a shopping cart bundle that can notify other bundles when items have been added to the cart
        //  another bundle might change recommendations on it's own UI based on this info
        const eventTemplate = Oskari.eventBuilder('HelloEvent');
        // Lets register handling a HelloRequest and send a HelloEvent when we get one just as a simple demo
        //  HelloRequest is provided by this bundle (in ./request/HelloRequest.js)
        // now other bundles can request this bundle to do something
        this.addRequestHandler('HelloRequest', (req) => sandbox.notifyAll(eventTemplate(req.getTarget())));
        // You can listen to Oskari events from other bundles like this:
        this.on('MapClickedEvent', (evt) => {
            log.info('map clicked at', evt);
            // stop listening to map clicked event after the first one as an example
            this.off('MapClickedEvent');
            // simulate being another bundle that requests us to welcome the clicked coordinates
            sandbox.postRequestByName('HelloRequest', [`something at coordinates [${evt.getLonLat().lon}, ${evt.getLonLat().lat}]`]);
        });

        // Nothing prevents us from listening to our own events as well:
        this.on('HelloEvent', (evt) => {
            log.info(`Hello ${evt.getTarget()}`);
        });
        // We can also call our code from the browser dev console with:
        // Oskari.getSandbox().postRequestByName('HelloRequest'); for "Hello World"
        // Oskari.getSandbox().postRequestByName('HelloRequest', ['User']); for "Hello User"
    }
};
