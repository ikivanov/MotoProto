(function (global) {
    var app = global.app = global.app || {};
    var mockBackend = false;

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();

        app.changeSkin = function (e) {
            var mobileSkin = "";

            if (e.sender.element.text() === "Flat") {
                e.sender.element.text("Native");
                mobileSkin = "flat";
            } else {
                e.sender.element.text("Flat");
                mobileSkin = "";
            }

            app.application.skin(mobileSkin);
        };

        if (mockBackend) {
            app.backendService = app.backendServiceMock;
        }
        
        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
        
        app.application.navigate("views/register.html");
        //app.application.navigate("views/main.html");
    }, false);
})(window);