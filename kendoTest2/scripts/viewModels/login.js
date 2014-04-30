(function (global) {
    var LoginViewModel,
        app = global.app = global.app || {};
    
    LoginViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        username: "",
        password: "",

        onLogin: function () {
            var that = this,
                username = that.get("username").trim(),
                password = that.get("password").trim();

            if (username === "" || password === "") {
                navigator.notification.alert("Both fields are required!",
                    function () { }, "Login failed", 'OK');

                return;
            }
            
            app.backendService.login(username, password).done(function(result) {
                if (result.success) {
		            that.set("isLoggedIn", true);
        		    app.application.navigate("views/main.html");
                    
                } else {
	                navigator.notification.alert(result.msg,
    	                function () { }, "Login failed", 'OK');
                }
            });
        },

        onLogout: function () {
            var that = this;

            that.clearForm();
            that.set("isLoggedIn", false);
        },

        clearForm: function () {
            var that = this;

            that.set("username", "");
            that.set("password", "");
        },

        checkEnter: function (e) {
            var that = this;

            if (e.keyCode == 13) {
                $(e.target).blur();
                that.onLogin();
            }
        }
    });

    app.loginService = {
        viewModel: new LoginViewModel()
    };
})(window);