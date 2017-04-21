function AppViewModel(dataModel) {
    // Private state
    var self = this;

    // Private operations
    function cleanUpLocation() {
        window.location.hash = "";

        if (typeof (history.pushState) !== "undefined") {
            history.pushState("", document.title, location.pathname);
        }
    }
    // Data
    self.Views = {
        Loading: {} // Other views are added dynamically by app.addViewModel(...).
    };
    self.dataModel = dataModel;

    // UI state
    self.view = ko.observable(self.Views.Loading);

    self.loading = ko.computed(function () {
        return self.view() === self.Views.Loading;
    });

    self.permissions = ko.observable();
    self.permissions.subscribe(function (value) {
        if (typeof (setScrollHome) == 'function') {
            setScrollHome(value);
        }
    });

    // UI operations

    // Other navigateToX functions are added dynamically by app.addViewModel(...).

    // Other operations
    self.addViewModel = function (options) {
        var viewItem = new options.factory(self, dataModel),
            navigator;

        // Add view to AppViewModel.Views enum (for example, app.Views.Home).
        self.Views[options.name] = viewItem;

        // Add binding member to AppViewModel (for example, app.home);
        self[options.bindingMemberName] = ko.computed(function () {
            if (!dataModel.getAccessToken()) {
                // The following code looks for a fragment in the URL to get the access token which will be
                // used to call the protected Web API resource
                var fragment = common.getFragment();

                if (fragment.access_token) {
                    // returning with access token, restore old hash, or at least hide token
                    //window.location.hash = fragment.state || '';
                    //dataModel.setAccessToken(fragment.access_token);
                } else {
                    // no token - so bounce to Authorize endpoint in AccountController to sign in or register
                    //window.location = "/Account/Login?returnUrl=" + encodeURIComponent(window.location) + "&forceLogout=true";
                    //window.location = "/Account/Authorize?client_id=web&response_type=token&state=" + encodeURIComponent(window.location.hash);
                }
            }

            return self.Views[options.name];
        });

        if (typeof (options.navigatorFactory) !== "undefined") {
            navigator = options.navigatorFactory(self, dataModel);
        } else {
            navigator = function () {
                window.location.hash = options.bindingMemberName;
            };
        }

        // Add navigation member to AppViewModel (for example, app.NavigateToHome());
        self["navigateTo" + options.name] = navigator;
    };

    self.showAlert = function (msg) {
        if (msg) {
            $("#alertMessage").text(msg);
            $("#showalert-modal").modal('show');
        }
    };
    self.reloadWindowParam = ko.observable(false);
    self.reloadWindow = function () {
        if (self.reloadWindowParam()) {
            self.reloadWindowParam(false);
            window.location.reload();
        }
    }

    Sammy(function () {
        this.notFound = function (verb, path) {
            return true;
        };
    });

    self.initialize = function () {
        Sammy().run();
    }
}

var app = new AppViewModel(new AppDataModel());
