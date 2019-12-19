// Loads Cesium-library and holds jQuery document ready until loaded.

(function() {
    jQuery.holdReady(true);
    var CESIUM_LIB_URL = '/Oskari/libraries/Cesium/Cesium.js';
    var script = document.createElement('script');
    script.src = CESIUM_LIB_URL;
    script.onload = function () {
        jQuery.holdReady(false);
    };
    document.head.appendChild(script);
}());

jQuery(document).ready(function() {
    Oskari.app.loadAppSetup(ajaxUrl + 'action_route=GetAppSetup', window.controlParams, function() {
        jQuery('#mapdiv').append('Unable to start');
    });
});
