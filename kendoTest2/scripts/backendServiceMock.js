(function (global) {
    BackendServiceMock = kendo.data.ObservableObject.extend({
        currentToken: 0,
        token2username: {},
        
        login: function(params) {
            var that = this,
            	defer = $.Deferred();
            
            for(var i = 0; i < users.length; i++) {
                var user = users[i];
                
                if (params.username && params.username == user.username && 
                		params.password && params.password == user.password) {
                    that.currentToken++;
					that.token2username[that.currentToken] = params.username;
                    
                    defer.resolve({
		                success : true,
                        userToken: that.currentToken, //the server generates random guid for each user login
                        msg : "OK",
                    });
                }
            }
            
            defer.resolve({
                success : false,
                msg: "Authentication failed! Bad username or password"
            });
            
            return defer.promise();
        },
        
        getPosts: function(params) {
            var that = this, 
            	defer = $.Deferred();
            
            if (params.userToken && that.token2username[params.userToken]) {
                defer.resolve({
                    success: true,
                    msg: "OK",
                    posts:[
                    	{username: "ikivanov", date: users[0].posts[2].date, title: users[0].posts[2].title, description: users[0].posts[2].description, route: users[0].posts[2].route, pics: users[0].posts[2].pics},
                    	{username: "ikivanov", date: users[0].posts[1].date, title: users[0].posts[1].title, description: users[0].posts[1].description, route: users[0].posts[1].route, pics: users[0].posts[1].pics},
                    	{username: "vlao85", date: users[1].posts[1].date, title: users[1].posts[1].title, description: users[1].posts[1].description, route: users[1].posts[1].route, pics: users[1].posts[1].pics},
                    	{username: "kolevstefan", date: users[3].posts[1].date, title: users[3].posts[1].title, description: users[3].posts[1].description, route: users[3].posts[1].route, pics: users[3].posts[1].pics},
                    ]
                });
            } else {
                defer.resolve({
                    success: false,
                    msg: "Invalid user token"
                });
            }
            
            return defer.promise();
        },
        
        getPostDetails: function(params) {
            var that = this, 
            	defer = $.Deferred();

            if (params.userToken && that.token2username[params.userToken]) {
                if (!params.postId) {
                    defer.resolve({
                        success: false,
                        msg: "Post ID should be provided."
                    });
                }
                
                var username = that.token2username[params.userToken];
                var user = getUserByUsername(username);
                var post = getPostById(user, params.postId);

                defer.resolve({
                    success: true,
                    msg: "OK",
                    post: post
                });
            }
            else {
                defer.resolve({
                    success: false,
                    msg: "Invalid user token"
                });
            }
            
            return defer.promise();
        }
    });

    app.backendServiceMock = new BackendServiceMock();

    var getUserByUsername = function(username) {
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            
            if (username === user.username) {
                return user;
            }
        }
        
        return null;
    }
    
    var getPostById = function(user, postId) {
        if (!user || !postId) {
            return null;
        }
        
        for (var i = 0; i < user.posts.length; i++) {
            var post = user.posts[i];
            if (post.id === postId) {
                return post;
            }
        }
        
        return null;
    }
    
    var users = [
    	{
            username : "ikivanov", 
            password : "123", 
            following: ["vlao85", "bloodymirova", "kolevstefan"],
            posts: 
            [
            	{id: "a367cddd-f4e2-4090-a438-18d269bc794f", date : new Date(2014, 4, 1), title : "My First Ride", description: "Sf - Elin Pelin - Sf", route: {}, pics : []},
            	{id: "6a118825-bd83-40df-b5bf-7f5af7ffdf91", date : new Date(2014, 4, 2), title : "My Second Ride", description: "Sf - Svoge - Sf", route: {}, pics : []},
            	{id: "3df1147a-9fd2-4c59-b6ba-56d3990c4db5", date : new Date(2014, 4, 3), title : "Polygona circle", description: "A circle of my downtown.", 
                    route: [
                    	{lat: 42.66542, lon: 23.38158},
                        {lat: 42.66603, lon: 23.38076},
                        {lat: 42.66614, lon: 23.38058},
                        {lat: 42.66498, lon: 23.37909},
                        {lat: 42.66457, lon: 23.37859},
                        {lat: 42.66405, lon: 23.37792},
                        {lat: 42.66378, lon: 23.37786},
                        {lat: 42.66371, lon: 23.37786},
                        {lat: 42.66361, lon: 23.37786},
                        {lat: 42.6633, lon: 23.37789},
                        {lat: 42.66246, lon: 23.37807},
                        {lat: 42.66232, lon: 23.37815},
                        {lat: 42.66212, lon: 23.37832},
                        {lat: 42.66199, lon: 23.37846},
                        {lat: 42.6617, lon: 23.37882},
                        {lat: 42.66164, lon: 23.37892},
                        {lat: 42.66192, lon: 23.37925},
                        {lat: 42.66227, lon: 23.3797},
                        {lat: 42.66283, lon: 23.38041},
                        {lat: 42.66358, lon: 23.3814},
                        {lat: 42.66386, lon: 23.38175},
                        {lat: 42.66396, lon: 23.38183},
                        {lat: 42.66406, lon: 23.382},
                        {lat: 42.66428, lon: 23.38228},
                        {lat: 42.6646, lon: 23.38265},
                        {lat: 42.66464, lon: 23.38269},
                        {lat: 42.66466, lon: 23.38269},
                        {lat: 42.66539, lon: 23.38166}
                    ], 
                    pics : []}
            ]
        },
    	{
            username : "vlao85", 
            password : "123",
            following: ["ikivanov"],
            posts: 
            [
            	{id: "daa56fd5-cab7-4444-9913-25f0af580a74", date : new Date(2014, 4, 1), title : "My First Ride", description: "Sf - Elin Pelin - Sf", route: {}, pics : []},
            	{id: "46469e35-9dda-4200-9330-050a54ba97c0", date : new Date(2014, 4, 2), title : "My Second Ride", description: "Sf - Svoge - Sf", route: {}, pics : []},
            	{id: "b2369010-3b7e-4b8a-83a7-21ae862dc3d1", date : new Date(2014, 4, 3), title : "My Thrid Ride", description: "Sf - PB - Sf", route: {}, pics : []}
            ]
        },
    	{
            username : "bloodymirova", 
            password : "123",
            following: ["ikivanov"],
            posts: 
            [
            	{id: "729a872d-569e-47ac-bf79-f8b043a82a3d", date : new Date(2014, 4, 1), title : "My First Ride", description: "Sf - Elin Pelin - Sf", route: {}, pics : []},
            	{id: "97e35fc5-6629-4709-aaaf-e0e3940c274e", date : new Date(2014, 4, 2), title : "My Second Ride", description: "Sf - Svoge - Sf", route: {}, pics : []},
            	{id: "e695bfe2-dd9c-438c-8158-011601862ed9", date : new Date(2014, 4, 3), title : "My Thrid Ride", description: "Sf - PB - Sf", route: {}, pics : []}
            ]
        },
    	{
            username : "kolevstefan", 
            password : "123",
            following: ["ikivanov"],
            posts: 
            [
            	{id: "941f1864-1bf5-4643-910d-a08aaad3ce0a", date : new Date(2014, 4, 1), title : "My First Ride", description: "Sf - Elin Pelin - Sf", route: {}, pics : []},
            	{id: "76aa65f3-4269-48a1-b719-3d924769f311", date : new Date(2014, 4, 2), title : "My Second Ride", description: "Sf - Svoge - Sf", route: {}, pics : []},
            	{id: "4d57a640-af17-47d5-ad7e-d048f0c56b32", date : new Date(2014, 4, 3), title : "My Thrid Ride", description: "Sf - PB - Sf", route: {}, pics : []}
            ]
        }
    ];
}
)(window);