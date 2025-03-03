import 'oskari-bundle!oskari-frontend/bundles/framework/mapfull';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/oskariui/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/ui-components/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/divmanazer/bundle.js';

// 3D mapmodule
import 'oskari-loader!oskari-frontend/packages/mapping/olcs/mapmodule/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/olcs/map3dtiles/bundle.js';
import 'oskari-bundle!oskari-frontend/bundles/mapping/time-control-3d';
import 'oskari-bundle!oskari-frontend/bundles/mapping/camera-controls-3d';
import 'oskari-bundle!oskari-frontend/bundles/mapping/dimension-change';

import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapwmts/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/maparcgis/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/wfsvector/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapmyplaces/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapuserlayers/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/drawtools/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/toolbar/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/infobox/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/heatmap/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/maprotator/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/userstyle/bundle.js';

import 'oskari-bundle!oskari-frontend/bundles/framework/coordinatetool';
import 'oskari-bundle!oskari-frontend/bundles/framework/guidedtour';
import 'oskari-bundle!oskari-frontend/bundles/framework/layerlist';
import 'oskari-bundle!oskari-frontend/bundles/framework/maplegend';
import 'oskari-bundle!oskari-frontend/bundles/framework/search';
import 'oskari-bundle!oskari-frontend/bundles/framework/statehandler';
import 'oskari-bundle!oskari-frontend/bundles/framework/timeseries';
import 'oskari-bundle!oskari-frontend/bundles/framework/userguide';

// app-specific bundle
import 'oskari-bundle!../../bundles/sample-info';

// mobile tuning
import 'oskari-lazy-bundle?myplaces3!oskari-frontend/bundles/framework/myplaces3';
import 'oskari-lazy-bundle?myplacesimport!oskari-frontend/bundles/framework/myplacesimport';
import 'oskari-lazy-bundle?mydata!oskari-frontend/bundles/framework/mydata';
import 'oskari-lazy-bundle?publisher2!oskari-frontend/bundles/framework/publisher2';
import 'oskari-lazy-bundle?statsgrid!oskari-frontend/bundles/statistics/statsgrid';
import 'oskari-lazy-bundle?featuredata!oskari-frontend/bundles/framework/featuredata';
// end mobile tuning

import 'oskari-lazy-bundle?printout!oskari-frontend/bundles/framework/printout';
import 'oskari-lazy-bundle?admin-layereditor!oskari-frontend/bundles/admin/admin-layereditor';
import 'oskari-lazy-bundle?admin-permissions!oskari-frontend/bundles/admin/admin-permissions';
import 'oskari-lazy-bundle?admin!oskari-frontend/bundles/admin/admin';
import 'oskari-lazy-bundle?metrics!oskari-frontend/bundles/admin/metrics';
import 'oskari-lazy-bundle?appsetup!oskari-frontend/bundles/admin/appsetup';
import 'oskari-lazy-bundle?admin-users!oskari-frontend/bundles/admin/admin-users';

import './css/overwritten.css';
