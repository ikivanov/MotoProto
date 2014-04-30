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
					that.token2username[currentToken] = username;
                    
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
            var that, 
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
        }
    });

    app.backendServiceMock = new BackendServiceMock();

    var users = [
    	{
            username : "ikivanov", 
            password : "123", 
            following: ["vlao85", "bloodymirova", "kolevstefan"],
            posts: 
            [
            	{date : new Date(2014, 4, 1), title : "My First Ride", description: "Sf - Elin Pelin - Sf", route: {}, pics : []},
            	{date : new Date(2014, 4, 2), title : "My Second Ride", description: "Sf - Svoge - Sf", route: {}, pics : []},
            	{date : new Date(2014, 4, 3), title : "My Thrid Ride", description: "Sf - PB - Sf", route: {}, pics : []}
            ]
        },
    	{
            username : "vlao85", 
            password : "123",
            following: ["ikivanov"],
            posts: 
            [
            	{date : new Date(2014, 4, 1), title : "My First Ride", description: "Sf - Elin Pelin - Sf", route: {}, pics : []},
            	{date : new Date(2014, 4, 2), title : "My Second Ride", description: "Sf - Svoge - Sf", route: {}, pics : []},
            	{date : new Date(2014, 4, 3), title : "My Thrid Ride", description: "Sf - PB - Sf", route: {}, pics : []}
            ]
        },
    	{
            username : "bloodymirova", 
            password : "123",
            following: ["ikivanov"],
            posts: 
            [
            	{date : new Date(2014, 4, 1), title : "My First Ride", description: "Sf - Elin Pelin - Sf", route: {}, pics : []},
            	{date : new Date(2014, 4, 2), title : "My Second Ride", description: "Sf - Svoge - Sf", route: {}, pics : []},
            	{date : new Date(2014, 4, 3), title : "My Thrid Ride", description: "Sf - PB - Sf", route: {}, pics : []}
            ]
        },
    	{
            username : "kolevstefan", 
            password : "123",
            following: ["ikivanov"],
            posts: 
            [
            	{date : new Date(2014, 4, 1), title : "My First Ride", description: "Sf - Elin Pelin - Sf", route: {}, pics : []},
            	{date : new Date(2014, 4, 2), title : "My Second Ride", description: "Sf - Svoge - Sf", route: {}, pics : []},
            	{date : new Date(2014, 4, 3), title : "My Thrid Ride", description: "Sf - PB - Sf", route: {}, pics : []}
            ]
        }
    ];
}
)(window);