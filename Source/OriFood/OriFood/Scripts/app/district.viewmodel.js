function DistrictViewModel(app, dataModel) {
    // Assign this to variable self to be accessable from nested methods
    var self = this;

    // Api controller for this model
    self.apiController = "account";

    /***************** Model ********************/
    function DistrictModel(data) {
        var self = this;
        data = data || {};

        // Declare model's properties and validations
        self.Id = data.Id;
        self.Name = ko.observable(data.Name);
        self.ProvinceId = ko.observable(data.ProvinceId);
        self.IsDeleted = ko.observable(data.IsDeleted);

        // Create validation group
        self.errors = ko.validation.group(self);
    }
    // Current user, use for individual action (CRU for Ex)
    self.currentDistrict = ko.observable(new DistrictModel());

    /********************************************/

    /**************** Operations ****************/

    // Refresh current user to add new 
    self.addNew = function () {
        self.currentDistrict(new DistrictModel());
        self.currentDistrict().errors.showAllMessages(false);
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
        self.currentDistrict(new DistrictModel(data));
    }
    // Set current user in delete mode
    self.delete = function (data) {
        self.currentDistrict(new DistrictModel(data));
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
            //self.currentDistrict(returnData);
            self.currentDistrict(new DistrictModel(returnData));
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
    name: "District",
    bindingMemberName: "district",
    factory: DistrictViewModel
});