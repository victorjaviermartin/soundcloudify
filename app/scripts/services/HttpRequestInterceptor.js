(function(){
    'use strict';

    angular.module('soundCloudify')
        .service("HttpRequestInterceptor", HttpRequestInterceptor);

    function HttpRequestInterceptor($injector){

        var $rootScope = $injector.get('$rootScope'), user;

        $rootScope.$on('identity.confirm', function(event, data) {
            if (data.identity.id && data.identity.email) {
                user = data.identity;
            }
        });
    
        var user;

        return {
            request: function($config) {

                if (!user) return $config;

                if($config && $config.url && $config.url.indexOf('http://localhost') === 0) {
                    $config.headers['uid'] = user.id;
                }
                return $config;
            }
        };
    };

}());
