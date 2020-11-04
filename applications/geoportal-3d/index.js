jQuery(document).ready(function() {
    function onSuccess () {
        var service = Oskari.getSandbox().getService('Oskari.map.DataProviderInfoService');
        if (service) {
            service.addGroup('osm.nominatim', 'Search', [
                { 'id': 'nominatim.attribution', 'name': 'The search functionality uses OpenStreetMap Nominatim, licensed under ODbL <a href="https://www.openstreetmap.org/copyright" target="_blank" ref="noopener">© OpenStreetMap contributors</a>' }
            ]);
        }
    }
    function onError () {
        jQuery('#mapdiv').append('Unable to start');
    }
    Oskari.app.loadAppSetup(ajaxUrl + 'action_route=GetAppSetup', window.controlParams, onError, onSuccess);
});
