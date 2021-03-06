(function (global) {
    var map,
        geocoder,
        PostDetailsViewModel,
        app = global.app = global.app || {},
    	scope;

    PostDetailsViewModel = kendo.data.ObservableObject.extend({
        _lastMarker: null,
        _isLoading: false,
        
        username: "",
        title: "",
        description: "",
        date: new Date(),

        address: "",
        isGoogleMapsInitialized: false,

        onNavigateHome: function () {
            var that = this,
                position;

            that._isLoading = true;
            that.toggleLoading();

            navigator.geolocation.getCurrentPosition(
                function (position) {
                    position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    map.panTo(position);
                    that._putMarker(position);

                    that._isLoading = false;
                    that.toggleLoading();
                },
                function (error) {
                    //default map coordinates
                    position = new google.maps.LatLng(43.459336, -80.462494);
                    map.panTo(position);

                    that._isLoading = false;
                    that.toggleLoading();

                    navigator.notification.alert("Unable to determine current location. Cannot connect to GPS satellite.",
                        function () { }, "Location failed", 'OK');
                },
                {
                    timeout: 30000,
                    enableHighAccuracy: true
                }
            );
        },

        onSearchAddress: function () {
            var that = this;

            geocoder.geocode(
                {
                    'address': that.get("address")
                },
                function (results, status) {
                    if (status !== google.maps.GeocoderStatus.OK) {
                        navigator.notification.alert("Unable to find address.",
                            function () { }, "Search failed", 'OK');

                        return;
                    }

                    map.panTo(results[0].geometry.location);
                    that._putMarker(results[0].geometry.location);
                });
        },

        toggleLoading: function () {
            if (this._isLoading) {
                kendo.mobile.application.showLoading();
            } else {
                kendo.mobile.application.hideLoading();
            }
        },

        _putMarker: function (position) {
            var that = this;

            if (that._lastMarker !== null && that._lastMarker !== undefined) {
                that._lastMarker.setMap(null);
            }

            that._lastMarker = new google.maps.Marker({
                map: map,
                position: position
            });
        },
        
        loadPostDetails: function(postId) {
            var that = this;
            
            app.backendService.getPostDetails({userToken : app.userToken, postId : postId}).done(function(result){
                if(result.success) {
                    that.setFields(result.post);
                }
            });
        },
        
        setFields: function(post) {
            var that = this;
            
            that.set("title", post.title);
            that.set("description", post.description);
            that.set("date", kendo.toString(post.date, "d"));
            that.set("username", post.username);
        },
        
        init: function() {
            kendo.data.ObservableObject.fn.init.apply(this, [this]);
            scope = this;
        },
    
        initLocation: function () {
            var mapOptions;
            
            if (typeof google === "undefined") {
                return;
            }

            app.postDetailsService.viewModel.set("isGoogleMapsInitialized", true);

            mapOptions = {
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },

                mapTypeControl: false,
                streetViewControl: false
            };

            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            geocoder = new google.maps.Geocoder();
            app.postDetailsService.viewModel.onNavigateHome.apply(app.postDetailsService.viewModel, []);
        },

        show: function (args) {
            var that = scope;
            
            if (!app.postDetailsService.viewModel.get("isGoogleMapsInitialized")) {
                return;
            }
            
            var postId = args.view.params.postId;
            that.loadPostDetails(postId);

            //resize the map in case the orientation has been changed while showing other tab
            google.maps.event.trigger(map, "resize");
        },

        hide: function () {
            //hide loading mask if user changed the tab as it is only relevant to location tab
            kendo.mobile.application.hideLoading();
        },
    });

    app.postDetailsService = {
        viewModel: new PostDetailsViewModel()
    };
}
)(window);