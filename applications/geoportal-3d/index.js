jQuery(document).ready(function() {
    function onSuccess () {
        var service = Oskari.getSandbox().getService('Oskari.map.DataProviderInfoService');
        if (service) {
            service.addGroup('osm.nominatim', 'Search', [
                {
                    'id': 'nominatim.attribution',
                    'name': 'The search functionality uses OpenStreetMap Nominatim, licensed under ODbL',
                    'source': {
                        'name': '© OpenStreetMap contributors',
                        'url': 'https://www.openstreetmap.org/copyright'
                    }
                }
            ]);
        }
    }
    function onError () {
        jQuery('#mapdiv').append('Unable to start');
    }
    Oskari.app.loadAppSetup(ajaxUrl + 'action_route=GetAppSetup', window.controlParams, onError, onSuccess);
});
