const BasicBundle = Oskari.clazz.get('Oskari.BasicBundle');

export class SampleInfoBundleInstance extends BasicBundle {
    constructor () {
        super();
        this.__name = 'SampleInfoBundleInstance';
        this.loc = Oskari.getMsg.bind(null, 'sample-info');
    }
    // BasicBundle provides start() and calls _startImpl() at the end
    // This is the code that is run when this bundle is started as part of an application
    _startImpl () {
        // What we wan't to do here is add a segment to the guided tour introduction popup for new users
        this._registerForGuidedTour();
    }

    /**
     * @method _registerForGuidedTour
     * Registers bundle for guided tour help functionality. Waits for guided tour load if not found
     */
    _registerForGuidedTour () {
        // sandbox provides ways to interact with other parts of the application
        const sandbox = this.sandbox; // Likely addition to BasicBundle: this.getSandbox();

        // here we check if there is a 'GuidedTour' module is found on the application
        // most bundle instances register themselves on the sandbox with the bundles getName() function
        // for the bundle with id `guidedtour` the getName() returns 'GuidedTour' so we can use that to search for it:
        // https://github.com/oskariorg/oskari-frontend/blob/2.14.2/bundles/framework/guidedtour/instance.js#L36
        const tourInstance = sandbox.findRegisteredModuleInstance('GuidedTour');
        if (!tourInstance) {
            // The bundle hasn't been started yet
            // Lets try later since guided tour might be started later than this bundle
            Oskari.on('bundle.start', (msg) => {
                // here we need to use the bundle id `guidedtour`
                if (msg.id === 'guidedtour') {
                    this._registerForGuidedTour();
                }
            });
            // don't go further since we don't have anything to do without the `guidedtour` functionality
            return;
        }
        // Here we know that the bundle has been started, but just to be sure we can check it still provides the request that we need here as API 
        if (!sandbox.hasHandler('Guidedtour.AddToGuidedTourRequest')) {
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
            getContent: () => this.loc('guidedTour.message'),
            getPositionRef: () => jQuery('#login'),
            positionAlign: 'right'
        }]);
    }
};
