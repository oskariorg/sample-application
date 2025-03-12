// main starting point
import 'oskari-bundle!oskari-frontend/bundles/framework/mapfull';

// jQuery-based UI components
//  note: old loader
import 'oskari-loader!oskari-frontend/packages/framework/bundle/oskariui/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/ui-components/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/divmanazer/bundle.js';

// 2D mapmodule and support for additional map layer types
//  note: old loader
import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapmodule/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapwmts/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/wfsvector/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapuserlayers/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/maparcgis/bundle.js';

// additional map related bundles
//  note: old loader
import 'oskari-loader!oskari-frontend/packages/mapping/ol/infobox/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/toolbar/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/drawtools/bundle.js';
//  note: new loader
import 'oskari-bundle!oskari-frontend/bundles/framework/coordinatetool';
import 'oskari-bundle!oskari-frontend/bundles/framework/publishedstatehandler';

// RPC connector
//  note: old loader
import 'oskari-loader!oskari-frontend/packages/framework/bundle/rpc/bundle.js';

// bundles that are loaded if the user has selected them to be shown on the embedded map
//  note: old loader
import 'oskari-lazy-loader?maprotator!oskari-frontend/packages/mapping/ol/maprotator/bundle.js';
//  note: new loader
import 'oskari-lazy-bundle?maplegend!oskari-frontend/bundles/framework/maplegend';
import 'oskari-lazy-bundle?featuredata!oskari-frontend/bundles/framework/featuredata';
import 'oskari-lazy-bundle?statsgrid!oskari-frontend/bundles/statistics/statsgrid';
import 'oskari-lazy-bundle?routingService!oskari-frontend/bundles/framework/routingService';
import 'oskari-lazy-bundle?timeseries!oskari-frontend/bundles/framework/timeseries';
import 'oskari-lazy-bundle?metadataflyout!oskari-frontend/bundles/catalogue/metadataflyout'
import 'oskari-lazy-bundle?metadatasearch!oskari-frontend/bundles/catalogue/metadatasearch';

import './css/overwritten.css';
