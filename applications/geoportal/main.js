// main starting point
import 'oskari-bundle!oskari-frontend/bundles/framework/mapfull';

// jQuery-based UI components
import 'oskari-loader!oskari-frontend/packages/framework/bundle/oskariui/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/ui-components/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/divmanazer/bundle.js';

// the brand new mainnavigation to replace divmanazer eventually
import 'oskari-bundle!oskari-frontend/bundles/framework/mainnavigation';

// 2D mapmodule and support for additional map layer types
import 'oskari-bundle!oskari-frontend/bundles/mapping/mapmodule/map2d_ol';
import 'oskari-bundle!oskari-frontend/bundles/mapping/maparcgis';

// additional map related bundles
import 'oskari-bundle!oskari-frontend/bundles/mapping/drawtools';
import 'oskari-bundle!oskari-frontend/bundles/mapping/toolbar';
import 'oskari-bundle!oskari-frontend/bundles/mapping/infobox';
import 'oskari-bundle!oskari-frontend/bundles/mapping/heatmap';
import 'oskari-bundle!oskari-frontend/bundles/mapping/maprotator';
import 'oskari-bundle!oskari-frontend/bundles/mapping/userstyle';

// other bundles
import 'oskari-bundle!oskari-frontend/bundles/framework/coordinatetool';
import 'oskari-bundle!oskari-frontend/bundles/framework/guidedtour';
import 'oskari-bundle!oskari-frontend/bundles/framework/layerlist';
import 'oskari-bundle!oskari-frontend/bundles/framework/maplegend';
import 'oskari-bundle!oskari-frontend/bundles/framework/statehandler';
import 'oskari-bundle!oskari-frontend/bundles/framework/timeseries';
import 'oskari-bundle!oskari-frontend/bundles/framework/userguide';
import 'oskari-bundle!oskari-frontend/bundles/framework/findbycoordinates';
import 'oskari-bundle!oskari-frontend/bundles/framework/myfeatures';

// support for 3D-layer type and 2d/3d switcher
import 'oskari-bundle!oskari-frontend/bundles/mapping/tiles3d';
import 'oskari-bundle!oskari-frontend/bundles/mapping/dimension-change';

// app-specific (example) bundle. Remove from actual app!!
import 'oskari-bundle!../../bundles/sample-info';

// lazy-loaded as these are not used for every user (allows mobile version etc)
import 'oskari-lazy-bundle?metadatasearch!oskari-frontend/bundles/catalogue/metadatasearch';
import 'oskari-lazy-bundle?metadataflyout!oskari-frontend/bundles/catalogue/metadataflyout'
import 'oskari-lazy-bundle?search!oskari-frontend/bundles/framework/search';
import 'oskari-lazy-bundle?featuredata!oskari-frontend/bundles/framework/featuredata';
import 'oskari-lazy-bundle?language-selector!oskari-frontend/bundles/framework/language-selector';
import 'oskari-lazy-bundle?mydata!oskari-frontend/bundles/framework/mydata';
import 'oskari-lazy-bundle?publisher2!oskari-frontend/bundles/framework/publisher2';
import 'oskari-lazy-bundle?statsgrid!oskari-frontend/bundles/statistics/statsgrid';
import 'oskari-lazy-bundle?printout!oskari-frontend/bundles/framework/printout';

// admin functionalities (lazy-loaded)
import 'oskari-lazy-bundle?admin-layereditor!oskari-frontend/bundles/admin/admin-layereditor';
import 'oskari-lazy-bundle?admin-permissions!oskari-frontend/bundles/admin/admin-permissions';
import 'oskari-lazy-bundle?admin!oskari-frontend/bundles/admin/admin';
import 'oskari-lazy-bundle?metrics!oskari-frontend/bundles/admin/metrics';
import 'oskari-lazy-bundle?appsetup!oskari-frontend/bundles/admin/appsetup';
import 'oskari-lazy-bundle?admin-users!oskari-frontend/bundles/admin/admin-users';

import './css/overwritten.css';