import { SampleInfoBundleInstance } from './instance.js';

// register factory function for our bundle
Oskari.bundle('sample-info', () => new SampleInfoBundleInstance());
