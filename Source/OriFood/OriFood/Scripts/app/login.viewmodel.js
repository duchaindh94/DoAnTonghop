function UserViewModel(app, dataModel) {
    // Assign this to variable self to be accessable from nested methods
    var self = this;

    // Api controller for this model
    self.apiController = "account";

    /***************** Model ********************/
    function UserModel(data) {
        var self = this;
        data = data || {};

        // Declare model's properties and validations
        self.Id = data.Id;
        self.UserName = ko.observable().extend({
            required: {
                params: true,
                message: 'Vui lòng nhập tên đăng nhập'
            }
        });
        self.PasswordHash = ko.observable().extend({
            required: {
                params: true,
                message: 'Vui lòng nhập mật khẩu'
            }
        });
        self.Status = ko.observable();


        // Create validation group
        self.errors = ko.validation.group(self);
    }
    // Current user, use for individual action (CRU for Ex)
    self.currentUser = ko.observable(new UserModel());

    /********************************************/

    /**************** Operations ****************/

    // Refresh current user to add new 
    self.addNew = function () {
    }
    // Set current user in view mode
    self.view = function (data) {
    }
    // Set current user in edit mode
    self.edit = function (data) {
    }
    // Set current user in delete mode
    self.delete = function (data) {
    }

    // Submit changes in Add or Edit form

    self.submit = function (form, action, refreshGrid) {
        getLogin();
    }


    /********************************************/
    // To save what search
    self.whatSearch = ko.observable();

    // QuickSearch
    self.keyword = ko.observable();
    self.search = function () {

    };

    function getLogin() {
        var userModel = self.currentUser();
        // Check for validation errors
        if (userModel.errors().length > 0) {
            userModel.errors.showAllMessages();
            toastr.warning("Vui lòng điền tên đăng nhập và mật khẩu!");
        }
        var userName = userModel.UserName();
        var password = userModel.PasswordHash();
        var pass = userModel.PasswordHash;
        debugger;
        dataModel.apiRequest('GET', self.apiController + '/LoginJson?userName=' + userName + '&password=' + password)
            .success(function (data) {
                if (data) {
                    toastr.success("Đăng nhập thành công!");
                    window.location = "/Account";
                } else {
                    toastr.warning("Sai tên đăng nhập hoặc mật khẩu!");
                }
            })
            .error(function (error) {
                toastr.error("Có lỗi xảy ra!");
            });
    };



    // Routing operations - use this to call function using Url's hash instead of click event
    Sammy(function () {

    });

    /************** Initialize ***************/
    function Initialize() {
        // Do the initial loading here
    }

    Initialize();

    return self;
}

// Add view model to the App's view model
app.addViewModel({
    name: "User",
    bindingMemberName: "user",
    factory: UserViewModel
});