function AppDataModel() {
    var self = this;
    // Routes
    self.userInfoUrl = "/api/Me";
    self.siteUrl = "/";

    self.apiUrl = window.serviceUrl + "/api/";
    self.apiTokenUrl = window.serviceUrl + "/token";
    self.signalrUrl = window.serviceUrl + "/signalr";

    // Route operations

    // Other private operations

    // Operations

    // Data
    self.returnUrl = self.siteUrl;

    self.clearData = function () {
        localStorage.removeItem(location.host + "_menu");
        localStorage.removeItem(location.host + "_accessToken");
    }

    // Data access operations
    self.setAccessToken = function (accessToken) {
        // Clear all data
        self.clearData();

        localStorage.setItem(location.host + "_accessToken", accessToken);
    };

    self.getAccessToken = function () {
        return localStorage.getItem(location.host + "_accessToken");
    };

    self.ajaxRequests = new Array();

    // This object is just for simple performance test
    self.ajaxResult = {
        all: [],
        max: function (async) {
            var request;
            $.each(this.all, function (index, item) {
                if (async == null || item.async == async) {
                    if (!request || item.time > request.time) {
                        request = item;
                    }
                }
            });
            return request;
        },
        min: function (async) {
            var request;
            $.each(this.all, function (index, item) {
                if (async == null || item.async == async) {
                    if (!request || item.time < request.time) {
                        request = item;
                    }
                }
            });
            return request;
        },
        above: function (time, async) {
            var requests = [];
            $.each(this.all, function (index, item) {
                if (async == null || item.async == async) {
                    if (item.time >= time) {
                        requests.push(item);
                    }
                }
            });
            return requests;
        },
        below: function (time, async) {
            var requests = [];
            $.each(this.all, function (index, item) {
                if (async == null || item.async == async) {
                    if (item.time <= time) {
                        requests.push(item);
                    }
                }
            });
            return requests;
        },
        average: function (async) {
            var times = $.map(this.all, function (item) {
                if (async == null || item.async == async) {
                    return item.time;
                }
            });
            return times.reduce(function (a, b) { return a + b; }) / times.length;
        },
    }

    // Issue an Api request using HTTP REST method
    // *type : REST method. Common request type corresponding to CRUD action : GET (Read), POST (Create), PUT (Update), DELETE (Delete)
    // *action : combine with the Api's url to be request's url. The url should match the one described on the Api's documentation
    // *data: the POST data need to submit. It will be convert to Json data
    // *async: specify wether current thread should wait for the request to be completed or not. Default is false. *** It is recommended to set async to true for requests that does not affect the application process to speed up performance. For example, if you need to load a few grids, you should set async if grids' data do not affect other processes/functions (this is usually the case)
    self.apiRequest = function (requestType, action, data, async, showLoadingIcon, loadingContainer) {
        var startTime = moment();
        var requestObj = action;
        if (showLoadingIcon == undefined) {
            showLoadingIcon = true;
        }
        if (showLoadingIcon) {
            if (!loadingContainer) {
                self.ajaxRequests.push(requestObj);
                $("#loadingIcon").show();
            } else {
                $(loadingContainer).wrap('<div class="loadingContainer" style="position: relative; width: 100%; height: 100%; z-index: 1000; opacity: 0.8"></div>');
                $(loadingContainer).each(function () {
                    $(this).children().first().append('<img class="loadingImg" src="/Content/images/big_spinning_icon.gif" alt="loading" style="position: absolute; top: 50%; left: 50%; margin-left: -20px; margin-top: -20px; width: 40px; height:40px; z-index: 1000;" />');
                });
            }
        }

        var options = {
            url: self.apiUrl + action,
            dataType: "json",
            contentType: "application/json",
            cache: false,
            type: requestType,
            data: data ? ko.toJSON(data) : null,
            crossDomain: true,
            headers: {
                'Authorization': 'Bearer ' + self.getAccessToken()
            },
            async: async,
            timeout: 30000
        };
        return $.ajax(options)
            .always(function () {
                var endTime = moment();
                var executedTime = (endTime - startTime);
                self.ajaxResult.all.push({
                    url: self.apiUrl + action,
                    async: async == null ? false : async,
                    time: executedTime
                });
                if (showLoadingIcon) {
                    if (!loadingContainer) {
                        self.ajaxRequests.pop();
                        //self.ajaxRequests.splice(self.ajaxRequests.indexOf(requestObj), 1);
                        // Only hide loading icon if there is no pending request
                        if (self.ajaxRequests.length == 0) {
                            $("#loadingIcon").hide();
                        }
                    } else {
                        $(loadingContainer).unwrap().find(".loadingImg").remove();
                    }
                }
            })
            .error(function (error, abc, xyz) {
                if (error.statusText == "timeout") {

                } else {

                }
            });
    };


    if (window.isAuthenticated != undefined && !window.isAuthenticated) {
        self.clearData();
    } else {
        // Signalr initialization

        var hubApiConnection = $.hubConnection();
        hubApiConnection.url = self.signalrUrl;
        self.hubApiProxy = hubApiConnection.createHubProxy('notification');

        $.signalR.ajaxDefaults.headers = { Authorization: "Bearer " + self.getAccessToken() };

        self.hubApiProxy.on("notifyAdmin", function (msg) {
            alert(msg);
        });

        hubApiConnection.start()
                .done(function () {
                    self.hubApiProxy.isConnected = true;
                    //console.log('Now connected, connection ID=' + hubApiConnection.id);
                })
                .fail(function () {
                    //console.log('Could not connect');
                });

        var hubWebConnection = $.hubConnection();
        self.hubWebProxy = hubWebConnection.createHubProxy('notification');

        self.hubWebProxy.on("logout", function (msg) {
            $("#returnUrl").val(location.pathname + location.hash);
            if (msg) {
                $("#logoutMessage").text(msg);
                $('#logout-modal').on('hidden.bs.modal', function () {
                    $('#logoutForm').submit();
                })
                $("#logout-modal").modal('show');
                setTimeout(function () {
                    $("#logout-modal").modal('hide');
                }, 5000);
            } else {
                $('#logoutForm').submit();
            }
        });

        hubWebConnection.start()
                .done(function () {
                    self.hubWebProxy.isConnected = true;
                    //console.log('Now connected, connection ID=' + hubWebConnection.id);
                })
                .fail(function () {
                    //console.log('Could not connect');
                });

        self.hubApiProxy.on("onNewRequestReply", function (taskId, replierName, requestType, isApproved) {
            if (isApproved) {
                toastr.info(String.format("{0} trong việc #{1} của bạn đã được chấp thuận", requestType, taskId));
            } else {
                toastr.info(String.format("{0} trong việc #{1} của bạn đã bị từ chối", requestType, taskId));
            }
        });
    }
}