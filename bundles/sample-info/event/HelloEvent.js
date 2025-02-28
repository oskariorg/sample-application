Oskari.clazz.define('Oskari.sample.HelloEvent',
    function (target = 'World') {
        this.target = target;
    }, {
        __name: 'HelloEvent',
        getName: function () {
            return this.__name;
        },
        getTarget: function () {
            return this.target;
        }
    }, {
        protocol: ['Oskari.mapframework.event.Event']
    });
