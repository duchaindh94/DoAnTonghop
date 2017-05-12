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
        self.UserName = ko.observable(data.UserName);
        self.Email = ko.observable(data.Email);
        self.PasswordHash = ko.observable(data.PasswordHash);
        self.FullName = ko.observable(data.FullName);
        self.RoleName = ko.observable(data.RoleName);
        self.GenderName = ko.observable(data.GenderName);
        self.IsLock = ko.observable(data.IsLock);
        self.PhoneNumber = ko.observable(data.PhoneNumber);
        self.Avatar = ko.observable(data.Avatar);
        self.Cover = ko.observable(data.Cover);
        self.SecurityStamp = ko.observable(data.SecurityStamp);
        self.IsDeleted = ko.observable(data.IsDeleted);
        self.CreatedDate = ko.observable(data.CreatedDate);

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
        toastr.success("Hiển thị thông tin chi tiết người dùng");
        console.log("adddd");
        //Get user info
        loadUserInfo();
    }
    // Set current user in edit mode
    self.edit = function (data) {
    }
    // Set current user in delete mode
    self.delete = function (data) {
    }


    // Submit changes in Add or Edit form

    /********************************************/
    // To save what search
    self.whatSearch = ko.observable();

    // QuickSearch
    self.keyword = ko.observable();
    self.search = function () {
        
    };

    function loadUserInfo() {
        debugger;
        dataModel.apiRequest('GET', self.apiController + '/GetInfoCurrentUser').success(function (returnData) {
            //self.currentUser(returnData);
            self.currentUser(new UserModel(returnData));
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