import 'oskari-loader!oskari-frontend/packages/framework/bundle/mapfull/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/oskariui/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/ui-components/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/divmanazer/bundle.js';

// 3D mapmodule
import 'oskari-loader!oskari-frontend/packages/mapping/olcs/mapmodule/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/olcs/map3dtiles/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/time-control-3d/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/camera-controls-3d/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/dimension-change/bundle.js';

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

import 'oskari-loader!oskari-frontend/packages/framework/bundle/coordinatetool/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/guidedtour/bundle.js';
import 'oskari-bundle!oskari-frontend/bundles/framework/layerlist/';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/maplegend/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/statehandler/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/search/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/timeseries/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/userguide/bundle.js';

// app-specific bundle
import 'oskari-bundle!../../bundles/sample-info';

// mobile tuning
import 'oskari-lazy-loader?myplaces3!oskari-loader!oskari-frontend/packages/framework/bundle/myplaces3/bundle.js';
import 'oskari-lazy-loader?myplacesimport!oskari-frontend/packages/framework/bundle/myplacesimport/bundle.js';
import 'oskari-lazy-loader?mydata!oskari-frontend/bundles/framework/mydata/bundle.js';
import 'oskari-lazy-loader?publisher2!oskari-frontend/packages/framework/bundle/publisher2/bundle.js';
import 'oskari-lazy-loader?statsgrid!oskari-frontend/bundles/statistics/statsgrid/bundle.js';
import 'oskari-lazy-loader?featuredata!oskari-frontend/packages/framework/featuredata/bundle.js';
// end mobile tuning

import 'oskari-lazy-loader?printout!oskari-frontend/packages/framework/bundle/printout/bundle.js';
import 'oskari-lazy-loader?admin-layereditor!oskari-frontend/packages/admin/bundle/admin-layereditor/bundle.js';
import 'oskari-lazy-loader?admin-permissions!oskari-frontend/packages/admin/bundle/admin-permissions/bundle.js';
import 'oskari-lazy-bundle?admin!oskari-frontend/bundles/admin/admin';
import 'oskari-lazy-loader?metrics!oskari-frontend/packages/admin/bundle/metrics/bundle.js';
import 'oskari-lazy-loader?appsetup!oskari-frontend/packages/admin/bundle/appsetup/bundle.js';
import 'oskari-lazy-loader?admin-users!oskari-frontend/packages/framework/bundle/admin-users/bundle.js';

import './css/overwritten.css';
