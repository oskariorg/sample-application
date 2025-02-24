Oskari.clazz.define('Oskari.sample.HelloRequest',
    function (target = 'World') {
        this.target = target;
    }, {
        __name: 'HelloRequest',
        getName: function () {
            return this.__name;
        },
        getTarget: function () {
            return this.target;
        }
    }, {
        protocol: ['Oskari.mapframework.request.Request']
    });
