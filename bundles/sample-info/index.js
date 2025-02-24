import { SampleInfoBundleInstance } from './SampleInfoBundleInstance';

// Register a factory function for the bundle id 'sample-info'
// This way the bundle can be started by referencing it on the startup sequence of an app
Oskari.bundle('sample-info', () => new SampleInfoBundleInstance());
