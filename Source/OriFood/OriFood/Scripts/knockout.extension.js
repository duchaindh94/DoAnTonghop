//Add binding-handler datepicker
ko.bindingHandlers.datepicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        //initialize datepicker with some optional options
        var options = allBindingsAccessor().datepickerOptions || { autoclose: true, language: 'vi', forceParse: false };

        $(element).datepicker(options);
        $(element).attr("placeHolder", "dd/mm/yyyy");

        //when a user changes the date, update the view model
        $(element).change(function () {
            var value = valueAccessor();
            if (ko.isObservable(value)) {
                var date = moment($(this).val(), "D/M/YYYY", true);
                if (date.isValid()) {
                    var formatedDate = formatDate(date);
                    if (formatedDate != value()) {
                        value(formatedDate);
                    }
                } else {
                    value(null);
                    $(element).val(null);
                }
            }
        });
        //ko.utils.registerEventHandler(element, "changeDate", function (event) {
        //    var value = valueAccessor();
        //    if (ko.isObservable(value)) {
        //		if (event.date){
        //			value(moment(event.date).format('YYYY-MM-DD'));
        //		} else {
        //			value(null);
        //		}
        //    }
        //});
    },
    update: function (element, valueAccessor) {
        //var widget = $(element).data("datepicker");
        ////when the view model is updated, update the widget
        //if (widget) {
        //    widget.date = ko.utils.unwrapObservable(valueAccessor());
        //    if (widget.date) {
        //        widget.setValue();
        //    }
        //}
        var value = valueAccessor();
        if (ko.isObservable(value)) {

            if (value()) {
                var date = formatDate(value(), 'L');
                if ($(element).val() != date) {
                    $(element).datepicker('setDate', date);
                }
            } else {
                $(element).datepicker('setDate', null);
            }
        }

    }
};
ko.bindingHandlers.datepickerMinDate = {
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
        current = $(element).datepicker("option", "minDate", value);
    }
};

ko.bindingHandlers.datepickerMaxDate = {
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
        current = $(element).datepicker("option", "maxDate", value);
    }
};




//Add binding-handler timepicker
ko.bindingHandlers.clockpicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = {
            
            //donetext: 'OK',
            autoclose: true,
            twelvehour: false,
            default: valueAccessor() || 'now'
        };

        $(element).clockpicker(options);
    }
};

// text-editor binding handler
ko.bindingHandlers.textEditor = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        //initialize datepicker with some optional options
        var options = allBindingsAccessor().textEditorOptions || {
            height: 300,
            onChange: function (newValue) {
                valueAccessor()(newValue);
            }
        };

        $(element).summernote(options);
        var value = valueAccessor();
        if (ko.isObservable(value)) {
            if (value()) {
                $(element).code(value());
            }
        }
    }
};

ko.bindingHandlers.fileUpload = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var fileUploadOptions = allBindingsAccessor().fileUploadOptions || {};

        var options = {
            fileId: valueAccessor().fileId || ko.observable(),
            fileValue: valueAccessor().fileValue || ko.observable(),
            fileName: valueAccessor().fileName || ko.observable(),
            uploadStatus: fileUploadOptions.uploadStatus || ko.observable(),
            getUrl: fileUploadOptions.getUrl || ko.observable(window.serviceUrl + '/API/Attachment/Get/{0}'),
            postUrl: fileUploadOptions.postUrl || ko.observable(window.serviceUrl + '/API/Attachment/Post'),
            putUrl: fileUploadOptions.putUrl || ko.observable(window.serviceUrl + '/API/Attachment/Put/{0}'),
            maxFileSize: fileUploadOptions.maxFileSize || ko.observable(52428800),
            acceptFileTypes: fileUploadOptions.acceptFileTypes || ko.observable(/(\.|\/)(rar|zip|7z|jpe?g|png|gif|pdf|doc|docx|xls|xlsx)$/i),
            removeable: fileUploadOptions.removeable == undefined ? true : fileUploadOptions.removeable
        };

        function loadProgressBar(e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);

            $('.bar', $(e.target).parent().next('.fileupload-progress')).css(
                'width',
                progress + '%'
            ).css(
                'display',
                'block'
            );
        }

        function finishUploading(e, data) {
            $('.bar', $(e.target).parent().next('.fileupload-progress')).css(
                'display',
                'none'
            );
        }

        function uploadSuccess(e, data) {
            var fileName = data.files[0].name;

            //if (options.fileValue() == null) {
            options.fileValue(data.result.Guid);
            options.fileId(data.result.Id)

            $(e.target).fileupload({
                url: options.postUrl(), //options.fileValue() == null ? options.postUrl() : String.format(options.putUrl(), options.fileValue()),
                type: 'POST' //options.fileValue() == null ? 'POST' : 'PUT'
            });
            //}
            options.fileName(fileName);

            addFileResult(e.target, options);
        }

        function uploadFail(e, data) {
            alert('Unexpected error. Cannot upload the file.')
            console.log(data.responseText);
        }

        function validationError(file, data) {
            alert(file.error);
        }

        function addFileResult(element, options) {
            var fileResult = String.format('<a href="' + String.format(options.getUrl(), options.fileValue()) + '" title="{0}" ;download="{0}">{0}</a>', options.fileName());
            $(element).parent().siblings('.fileupload-result').html(fileResult);

            if (options.removeable && options.fileName()) {
                $(element).parent().siblings(".fileupload-result").children().first().after(' | <a href="javascript:void(0)" class="removeFileUpload"> Xóa</a>');
                $(element).parent().siblings(".fileupload-result").find('.removeFileUpload').click(function () {
                    options.fileValue(null);
                    options.fileId(null);
                    $(element).fileupload({
                        url: options.postUrl(),
                        type: 'POST'
                    });
                    options.fileName('');
                    $(element).parent().siblings(".fileupload-result").empty();
                });
            }
        }


        $(element).wrap('<span class="btn btn-primary btn-file">Chọn File</span>');
        $(element).parent().after('<div class="fileupload-progress"><div class="bar" style="width: 0%;display:none"></div></div><div class="fileupload-result"></div>')

        addFileResult(element, options);

        $(element).fileupload({
            url: options.postUrl(), //options.fileValue() == null ? options.postUrl() : String.format(options.putUrl(), options.fileValue()),
            type: 'POST', //options.fileValue() == undefined ? 'POST' : 'PUT',
            maxFileSize: options.maxFileSize(),
            //acceptFileTypes: options.acceptFileTypes(),
            progressall: loadProgressBar,
            always: finishUploading,
            done: uploadSuccess,
            fail: uploadFail,
            validationError: validationError,
            messages: {
                maxNumberOfFiles: 'Số lượng files vượt quá giới hạn.',
                acceptFileTypes: 'Định dạng file không được phép.',
                maxFileSize: 'Dung lượng file quá lớn.',
                minFileSize: 'Dung lượng file quá nhỏ.'
            },
        });
    }
};
//Hàm upload này Tiến làm nhé
ko.bindingHandlers.fileUploadByTien = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var fileUploadOptions = allBindingsAccessor().fileUploadOptions || {};

        var options = {
            fileId: valueAccessor().fileId || ko.observable(),
            fileValue: valueAccessor().fileValue || ko.observable(),
            fileName: valueAccessor().fileName || ko.observable(),
            uploadStatus: fileUploadOptions.uploadStatus || ko.observable(),
            getUrl: fileUploadOptions.getUrl || ko.observable(window.serviceUrl + '/API/AttachmentHTV/Get/{0}'),
            postUrl: fileUploadOptions.postUrl || ko.observable(window.serviceUrl + '/API/AttachmentHTV/Post'),
            putUrl: fileUploadOptions.putUrl || ko.observable(window.serviceUrl + '/API/AttachmentHTV/Put/{0}'),
            maxFileSize: fileUploadOptions.maxFileSize || ko.observable(104857600),
            acceptFileTypes: fileUploadOptions.acceptFileTypes || ko.observable(/(\.|\/)(rar|zip|7z|jpe?g|png|gif|pdf|doc|docx|xls|xlsx|tif|ppt|pptx|txt)$/i),
            removeable: fileUploadOptions.removeable == undefined ? true : fileUploadOptions.removeable
        };

        function loadProgressBar(e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);

            $('.bar', $(e.target).parent().next('.fileupload-progress')).css(
                'width',
                progress + '%'
            ).css(
                'display',
                'block'
            );
        }

        function finishUploading(e, data) {
            $('.bar', $(e.target).parent().next('.fileupload-progress')).css(
                'display',
                'none'
            );
        }

        function uploadSuccess(e, data) {
            var fileName = data.files[0].name;

            //if (options.fileValue() == null) {
            options.fileValue(data.result.Guid);
            options.fileId(data.result.Id)

            $(e.target).fileupload({
                url: options.postUrl(), //options.fileValue() == null ? options.postUrl() : String.format(options.putUrl(), options.fileValue()),
                type: 'POST' //options.fileValue() == null ? 'POST' : 'PUT'
            });
            //}
            options.fileName(fileName);

            addFileResult(e.target, options);
        }

        function uploadFail(e, data) {
            alert('Unexpected error. Cannot upload the file.')
            console.log(data.responseText);
        }

        function validationError(file, data) {
            alert(file.error);
        }

        function addFileResult(element, options) {
            var fileResult = String.format('<a href="' + String.format(options.getUrl(), options.fileValue()) + '" title="{0}" ;download="{0}">{0}</a>', options.fileName());
            $(element).parent().siblings('.fileupload-result').html(fileResult);

            if (options.removeable && options.fileName()) {
                $(element).parent().siblings(".fileupload-result").children().first().after(' | <a href="javascript:void(0)" class="removeFileUpload"> Xóa</a>');
                $(element).parent().siblings(".fileupload-result").find('.removeFileUpload').click(function () {
                    options.fileValue(null);
                    options.fileId(null);
                    $(element).fileupload({
                        url: options.postUrl(),
                        type: 'POST'
                    });
                    options.fileName('');
                    $(element).parent().siblings(".fileupload-result").empty();
                });
            }
        }


        $(element).wrap('<span class="btn btn-primary btn-file">Chọn File</span>');
        $(element).parent().after('<div class="fileupload-progress"><div class="bar" style="width: 0%;display:none"></div></div><div class="fileupload-result"></div>')

        addFileResult(element, options);

        $(element).fileupload({
            url: options.postUrl(), //options.fileValue() == null ? options.postUrl() : String.format(options.putUrl(), options.fileValue()),
            type: 'POST', //options.fileValue() == undefined ? 'POST' : 'PUT',
            maxFileSize: options.maxFileSize(),
            //acceptFileTypes: options.acceptFileTypes(),
            progressall: loadProgressBar,
            always: finishUploading,
            done: uploadSuccess,
            fail: uploadFail,
            validationError: validationError,
            messages: {
                maxNumberOfFiles: 'Số lượng files vượt quá giới hạn.',
                acceptFileTypes: 'Định dạng file không được phép.',
                maxFileSize: 'Dung lượng file quá lớn.',
                minFileSize: 'Dung lượng file quá nhỏ.'
            },
        });
    }
};
//Add binding-handler to subcribe changes
ko.subscribable.fn.subscribeChanged = function (callback) {
    var previousValue;
    this.subscribe(function (_previousValue) {
        previousValue = _previousValue;
    }, undefined, 'beforeChange');
    this.subscribe(function (latestValue) {
        callback(latestValue, previousValue);
    });
};

// Prevent the submit behavior
var _submit = ko.bindingHandlers.submit;
ko.bindingHandlers.submit = {
    init: function (el, accessor, allbindings, viewModel, bindingContext) {
        _submit.init(el, accessor, allbindings, viewModel, bindingContext);
        $(el).submit(function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    }
};

// Custom validation
ko.validation.rules['existed'] = {
    validator: function (val, existCheck) {
        return val == null || val == undefined ? true : existCheck(val);
    },
    message: 'The field value already existed.'
};

ko.validation.rules['listRequired'] = {
    validator: function (val, required) {
        return val && val.length > 0;
    },
    message: 'Please select at least one item.'
};

ko.validation.rules['isNumber'] = {
    validator: function (val) {
        if (val == null) {
            return true;
        }
        else {
            var check = isNaN(val);
            if (check == true) {
                return false;
            }
            else {
                return true;
            }
        }
    },
    message: 'Vui lòng nhập số!'
};

//ko.validation.rules['date'] = {
//    validator: function (value, validate) {
//        return utils.isEmptyVal(value) || (validate && !/Invalid|NaN/.test(moment(value)));
//    },
//    message: 'Vui lòng nhập đúng định dạng ngày tháng'
//};

ko.validation.rules['areEqual'] = {
    getValue: function (o) {
        return (typeof o === 'function' ? o() : o);
    },
    validator: function (val, otherField) {
        return val === this.getValue(otherField);
    },
    message: 'The fields must have the same value'
};

jQuery(function ($) {

    var _oldShow = $.fn.show;

    $.fn.show = function (speed, oldCallback) {
        return $(this).each(function () {
            var obj = $(this),
                newCallback = function () {
                    if ($.isFunction(oldCallback)) {
                        oldCallback.apply(obj);
                    }
                    obj.trigger('afterShow');
                };

            // you can trigger a before show if you want
            obj.trigger('beforeShow');

            // now use the old function to show the element passing the new callback
            _oldShow.apply(obj, [speed, newCallback]);

            // Trigger resize event to fix grid's size bug (100px width when display:none)
            $(window).trigger('resize');
        });
    }

    var _oldtab = $.fn.tab;

    $.fn.tab = function (option, oldCallback) {
        return $(this).each(function () {
            var obj = $(this),
                newCallback = function () {
                    if ($.isFunction(oldCallback)) {
                        oldCallback.apply(obj);
                    }
                    obj.trigger('afterShow');
                };

            // you can trigger a before tab if you want
            obj.trigger('beforeShow');

            // now use the old function to tab the element passing the new callback
            _oldtab.apply(obj, [option, newCallback]);

            // Trigger resize event to fix grid's size bug (100px width when display:none)
            $(window).trigger('resize');
        });
    }
});

// Force refresh array
ko.observableArray.fn.refresh = function () {
    var data = this();
    this([]);
    this(data);
};


// Use this to group foreach
ko.observableArray.fn.distinct = function (prop) {
    var target = this;
    target.index = {};
    target.index[prop] = ko.observable({});

    ko.computed(function () {
        //rebuild index
        var propIndex = {};

        ko.utils.arrayForEach(target(), function (item) {
            var key = ko.utils.unwrapObservable(item[prop]);
            if (key) {
                propIndex[key] = propIndex[key] || [];
                propIndex[key].push(item);
            }
        });

        target.index[prop](propIndex);
    });

    return target;
};

// Convert date to string with moment
function formatDate(date, format) {
    if (moment(date, 'DD/MM/YYYY').isValid()) {
        date = moment(date, 'DD/MM/YYYY');
    }
    return moment(date).isValid() ? moment(date).format(format || 'YYYY-MM-DD') : date;

}

ko.bindingHandlers.title = {
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        var d = document.createElement('div');
        d.innerHTML = value;
        element.title = d.innerText || d.textContent; // Some browser doesn't support innerText, use textContent instead though they are slightly different
    }
};

ko.bindingHandlers.currencyMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().currencyMaskOptions || { showSymbol: false, thousands: ',', decimal: '.', precision: 0 };
        var unmaskValue = allBindingsAccessor().unmaskValue || ko.observable();
        $(element).maskMoney(options);

        ko.utils.registerEventHandler(element, 'focusout', function () {
            valueAccessor()($(element).val());

            var unmaskPattern = '[^' + options.decimal + '\\d]';
            unmaskValue($(element).val().replace(new RegExp(unmaskPattern, 'g'), ''));
        });
    },

    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());

        $(element).val(value);
        $(element).trigger("mask.maskMoney");
    }
};