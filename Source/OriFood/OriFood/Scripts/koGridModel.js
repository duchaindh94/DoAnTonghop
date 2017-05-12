function koGridModel(dataModel, apiController, options) {
    var self = this;

    self.grid = ko.observable();
    self.gridName = options.gridName;
    self.allData = ko.observableArray(options.data || []);
    self.myData = ko.observableArray([]);
    self.apiController = apiController;
    self.ajaxSource = options.ajaxSource == undefined ? true : options.ajaxSource;
    self.searchUrl = null;
    self.ajaxMethod = options.ajaxMethod || 'GET';
    self.asyncAjaxCall = options.asyncAjaxCall == undefined ? true : options.asyncAjaxCall;
    self.showLoadingIcon = options.showLoadingIcon == undefined ? true : options.showLoadingIcon;
    self.postData = options.postData;
    self.sourceUrl = options.sourceUrl || '{0}/get?sortfield={1}&sortdirection={2}&page={3}&pagesize={4}&filterText={5}';
    self.searchOnly = options.searchOnly == undefined ? false : options.searchOnly;
    self.childrenUrl = options.childrenUrl || '{0}/getByParentId/{1}?sortfield={2}&sortdirection={3}';
    self.parentField = options.parentField || 'Id';
    self.loadChildren = function (parent) {
        var sortCol = self.sortInfo() == undefined ? null : self.sortInfo().column.field,
               sortDir = self.sortInfo() == undefined ? null : self.sortInfo().direction;
        var parentFields = self.parentField.split('|');
        var params = [];
        params.push(self.childrenUrl);
        params.push(self.apiController);
        for (i = 0; i < parentFields.length; i++) {
            params.push(parent[parentFields[i]]);
        }
        params.push(sortCol);
        params.push(sortDir);

        dataModel.apiRequest(self.ajaxMethod, String.format.apply(this, params), self.ajaxMethod == 'GET' ? null : self.postData, self.asyncAjaxCall)
            .success(function (data) {
                self.grid().pushArray(data.Rows, parent);
            })
            .error(function (err) {
                console.error(err);
                alert('Không thể tải dữ liệu con.')
            });
    }
    self.isLoaded = ko.observable(false);

    self.allData.subscribe(function () {
        self.getPagedDataAsync();
    });

    self.filterOptions = {
        filterText: ko.observable(""),
        useExternalFilter: true
    };

    self.sortInfo = ko.observable();
   
    self.pagingOptions = {
        pageSizes: options.pageSizes || ko.observableArray([10, 50, 100]),
        pageSize: options.pageSize || ko.observable(10),
        totalServerItems: ko.observable(0),
        currentPage: ko.observable(1)
    };

    self.pagingOptions.pageSize.subscribe(function () {
        self.pagingOptions.currentPage(1);
    });

    self.setPagingData = function (data) {
        self.myData(data.Rows);
        self.pagingOptions.totalServerItems(data.TotalRows);
        $(window).trigger("resize");
    };


    self.getPagedDataAsync = function () {
        setTimeout(function () {
            var sortCol = self.sortInfo() == undefined ? null : self.sortInfo().column.field,
                sortDir = self.sortInfo() == undefined ? null : self.sortInfo().direction,
                page = self.pagingOptions.currentPage(),
                pageSize = self.pagingOptions.pageSize(),
                searchText = self.filterOptions.filterText();
            self.isLoaded(true);
            if (self.ajaxSource) {
                if (self.searchOnly && self.searchUrl == null) {
                    // Do nothing
                } else {
                    dataModel.apiRequest(self.ajaxMethod, String.format(self.searchUrl || self.sourceUrl, self.apiController, sortCol, sortDir, page, pageSize, searchText), self.postData, self.asyncAjaxCall, self.showLoadingIcon, self.grid() ? self.grid().$root : null)
                        .success(function (data) {
                            self.setPagingData(data);
                        });
                }
            } else {
                var pagedData = self.allData().slice((page - 1) * pageSize, page * pageSize);
                self.myData(pagedData);
                self.pagingOptions.totalServerItems(self.allData().length);
            }
        }, 100);
    };

    // QuickSearch
    self.search = function (url, type, data) {
        self.pagingOptions.currentPage(1);
        self.searchUrl = url;
        self.ajaxMethod = type || 'GET';
        self.postData = data;
        self.getPagedDataAsync();
    };

    self.resetSearch = function () {
        self.pagingOptions.currentPage(1);
        self.searchUrl = null;
        self.ajaxMethod = 'GET';
        self.postData = null;
        self.getPagedDataAsync();
    };

    // End AdvanceSearch

    var doFilterTimeout;
    self.filterOptions.filterText.subscribe(function (data) {
        clearTimeout(doFilterTimeout);
        doFilterTimeout = setTimeout(function () { self.getPagedDataAsync() }, 500);
    });

    if (options.autoLoad == undefined ? true : false) {
        self.getPagedDataAsync();
    }

    // Exporting
    self.exportToExcel = function (exportAll) {
        require(['scripts/excel-builder/excel-builder', 'scripts/downloadify.min'], function (EB, downloader) {
            var workBook = EB.createWorkbook();

            var workBookName = self.gridName || 'download';

            // Create Styles
            var stylesheet = workBook.getStyleSheet();
            var captionFormat = stylesheet.createFormat({
                font: {
                    bold: true,
                    color: '000000',
                    size: 20
                },
                alignment: {
                    horizontal: "center"
                }
            });
            var defaultHeaderTheme = stylesheet.createFormat({
                font: {
                    bold: true,
                    color: '925019',
                },
                fill: {
                    type: 'pattern',
                    patternType: 'solid',
                    fgColor: 'D4D4D4'
                },
                alignment: {
                    horizontal: "center"
                }
            });

            var defaultCellFormat = stylesheet.createSimpleFormatter('general');
            defaultCellFormat.alignment = { wrapText: true };
            var dateFormat = stylesheet.createSimpleFormatter('date');
            var datetimeFormat = stylesheet.createSimpleFormatter('datetime');
            var timeFormat = stylesheet.createSimpleFormatter('datetime');
            var currencyFormat = stylesheet.createFormat({
                format: '#,##0.00'
            });
            var decimalFormat = stylesheet.createFormat({
                format: '#,##0.00'
            });
            var numberFormat = stylesheet.createFormat({
                format: '#,##0'
            });

            // Create worksheet
            var workSheet = workBook.createWorksheet({ name: self.gridName.substr(0, 30) });

            // Headers
            var headers = $.map(self.grid().exportableColumns(), function (col) {
                return { value: col.displayName(), metadata: { style: defaultHeaderTheme.id } };
            });

            // Data
            if (exportAll) {
                var sortCol = self.sortInfo() == undefined ? null : self.sortInfo().column.field,
                    sortDir = self.sortInfo() == undefined ? null : self.sortInfo().direction,
                    page = 0,
                    pageSize = 0,
                    searchText = self.filterOptions.filterText();

                if (self.ajaxSource) {
                    if (self.searchOnly && self.searchUrl == null) {
                        convertToExcel([]);
                    } else {
                        dataModel.apiRequest(self.ajaxMethod, String.format(self.searchUrl || self.sourceUrl, self.apiController, sortCol, sortDir, page, pageSize, searchText), self.postData, self.asyncAjaxCall, self.showLoadingIcon)
                            .success(function (data) {
                                convertToExcel(data.Rows);
                            });
                    }
                } else {
                    convertToExcel(self.allData());
                }
            } else {
                //convertToExcel(self.grid().selectedItems() == undefined || self.grid().selectedItems().length == 0 ? self.myData() : self.grid().selectedItems());
                convertToExcel(self.myData());
            }

            function convertToExcel(gridData) {
                var rowDepths = $.map(gridData, function (row) { return row._kg_row_depth_ || 0; }) || [];
                rowDepths.push(self.grid().maximumRowDepth());
                var maximumRowDepth = Math.max.apply(this, rowDepths);

                for (var i = 0 ; i < maximumRowDepth ; i++) {
                    headers.splice(0, 0, '');
                }
                headers.splice(0, 0, { value: 'STT', metadata: { style: defaultHeaderTheme.id } })

                var data = $.map(gridData, function (row, index) {
                    var rowData = [];
                    var rowDepth = row._kg_row_depth_ || 0;

                    for (var i = 0 ; i <= maximumRowDepth ; i++) {
                        if (rowDepth == i) {
                            rowData.push(index + 1);
                        } else {
                            rowData.push('');
                        }
                    }
                    $.each(self.grid().exportableColumns(), function (index, col) {
                        var value = row[col.field];
                        var format = defaultCellFormat;
                        if (col.dataType() && value) {
                            switch (col.dataType().toLowerCase()) {
                                case 'currency':
                                    value = parseFloat(value);
                                    format = currencyFormat;
                                    break;
                                case 'number':
                                    value = parseInt(value);
                                    format = numberFormat;
                                    break;
                                case 'decimal':
                                    value = parseFloat(value);
                                    format = decimalFormat;
                                    break;
                                case 'date':
                                    value = (new Date(row[col.field] + 'Z') - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000); // OLE Automation date
                                    format = dateFormat;
                                    break;
                                case 'time':
                                    value = (new Date(row[col.field] + 'Z') - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000); // OLE Automation date
                                    format = timeFormat;
                                    break;
                                case 'datetime':
                                    value = (new Date(row[col.field] + 'Z') - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000); // OLE Automation date
                                    format = datetimeFormat;
                                    break;
                                default:
                                    break;
                            }
                        }
                        rowData.push({ value: value, metadata: { style: format.id } });
                    });
                    return [rowData];
                });

                data.splice(0, 0, headers);

                // Caption
                data.splice(0, 0, []);
                data.splice(0, 0, [{ value: workBookName, metadata: { style: captionFormat.id } }]);
                data.splice(0, 0, []);

                if (headers.length > 1) {
                    workSheet.mergeCells('A2', colName(headers.length - 1) + '2');
                }

                // Set Column Width
                var columnWidths = $.map(self.grid().exportableColumns(), function (col) {
                    return { width: (col.width - 12 + 5) / 7 + 1 };
                });

                if (maximumRowDepth > 0) {
                    for (var i = 0 ; i <= maximumRowDepth ; i++) {
                        columnWidths.splice(0, 0, { width: 3 });
                    }
                    workSheet.mergeCells('A4', colName(maximumRowDepth) + '4');
                } else {
                    columnWidths.splice(0, 0, { width: 5 });
                }
                workSheet.setColumns(columnWidths);

                // Set data
                workSheet.setData(data);
                // Add work sheet
                workBook.addWorksheet(workSheet);

                // Create the file
                var data = EB.createFile(workBook);

                // Download
                var file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                var fileURL = URL.createObjectURL(file);
                saveAs(fileURL, workBookName + '.xlsx');

                function saveAs(uri, filename) {
                    var link = document.createElement('a');
                    if (typeof link.download === 'string') {
                        document.body.appendChild(link); // Firefox requires the link to be in the body
                        link.download = filename;
                        link.href = uri;
                        link.click();
                        document.body.removeChild(link); // remove the link when done
                    } else {
                        location.replace(uri);
                    }
                }

                function colName(n) {
                    var ordA = 'a'.charCodeAt(0);
                    var ordZ = 'z'.charCodeAt(0);
                    var len = ordZ - ordA + 1;

                    var s = "";
                    while (n >= 0) {
                        s = String.fromCharCode(n % len + ordA) + s;
                        n = Math.floor(n / len) - 1;
                    }
                    return s.toUpperCase();
                }

            }

        });
    };

    // Use cookies to display columns according to user preference
    if (options.gridId && options.columnDefs) {
        if (window.localStorage) {
            var columnsCookieName = 'DMCV-GRID-COLUMNS-' + options.gridId + '-FOR-USER-' + window.userId;
            var pageSizeCookieName = 'DMCV-GRID-PAGE-SIZE-' + options.gridId + '-FOR-USER-' + window.userId;
            var columnsCookie = /*$.cookie*/localStorage.getItem(columnsCookieName);
            var pageSizeCookie = /*$.cookie*/localStorage.getItem(pageSizeCookieName);
            if (columnsCookie) {
                var displayColumns = JSON.parse(columnsCookie);
                if (Array.isArray(displayColumns)) {
                    ko.utils.arrayForEach(options.columnDefs, function (colDef) {
                        if (colDef.displayName && displayColumns.indexOf(colDef.displayName) > -1) {
                            colDef.visible = true;
                        } else {
                            colDef.visible = false;
                        }
                    });
                }
            }
            if (pageSizeCookie) {
                var pageSize = parseInt(pageSizeCookie);
                if (!isNaN(pageSize) && self.pagingOptions.pageSizes.indexOf(pageSize) != -1) {
                    self.pagingOptions.pageSize(pageSize);
                }
            }

            // Hook event to udpate columns preference
            self.toggleVisible = function (colDef, visible) {
                var displayColumns = ko.utils.arrayMap(self.grid().visibleColumns(), function (col) {
                    return col.displayName();
                });
                /*$.cookie*/localStorage.setItem(columnsCookieName, JSON.stringify(displayColumns));
            }
            self.pagingOptions.pageSize.subscribe(function (val) {
                /*$.cookie*/localStorage.setItem(pageSizeCookieName, JSON.stringify(val));
            });
        }
    }

    self.pagingOptions.pageSizes.subscribe(function (data) {
        self.getPagedDataAsync();
    });
    self.pagingOptions.pageSize.subscribe(function (data) {
        self.getPagedDataAsync();
    });
    self.pagingOptions.currentPage.subscribe(function (data) {
        self.getPagedDataAsync();
    });
    self.sortInfo.subscribe(function (data) {
        self.getPagedDataAsync();
    });

    self.gridOptions = {
        grid: self.grid,
        data: self.myData,
        displaySelectionCheckbox: options.displaySelectionCheckbox == undefined ? true : options.displaySelectionCheckbox,
        enablePaging: options.enablePaging == undefined ? true : options.enablePaging,
        pagingOptions: self.pagingOptions,
        filterOptions: self.filterOptions,
        filterOptions2: self.filterOptions2,
        useExternalSorting: true,
        sortInfo: self.sortInfo,
        columnDefs: options.columnDefs,
        selectedItems: options.selectedItems,     
        loadChildren: self.loadChildren,
        multiSelect: options.multiSelect == undefined ? (options.displaySelectionCheckbox == undefined ? true : options.displaySelectionCheckbox) : options.multiSelect,
        showFilter: options.showFilter,
        isExpandable: options.isExpandable == undefined ? false : options.isExpandable,
        enableExcelExporting: options.enableExcelExporting == undefined ? false : options.enableExcelExporting,
        exportToExcel: self.exportToExcel,
        disableTextSelection: options.disableTextSelection == undefined ? false : options.disableTextSelection,
        toggleVisible: self.toggleVisible,
        showGroupPanel: options.showGroupPanel
    };


}