const pqOptions1 = {
    width: "auto",
    height: 350,
    showTitle: false,
    showHeader: true,
    showTop: false,
    showToolbar: true,
    showBottom: true,
    wrap: true,
    hwrap: false,
    sortable: false,
    editable: false,
    resizable: true,
    collapsible: false,
    draggable: true, dragColumns: { enabled: true },
    scrollModel: { autoFit: true },
    numberCell: { show: true, resizable: true, title: "S.N.", minWidth: 30 },
    pageModel: { curPage: 1, rPP: 10, type: "local" },
    columnTemplate: { wrap: true, editable: false, dataType: "string", halign: "center", hvalign: "center", resizable: true, styleHead: { 'font-weight': "bold" } },
};

function IndexVM() {
    const self = this;

    var isNullOrEmpty = function (str) {
        if (str === undefined || str === null) {
            return true;
        } else if (typeof str === "string") {
            return (str.trim() === "");
        } else {
            return false;
        }
    };

    const models = {
        MyModel: function (item) {
            item = item || {};



        },
        UiElements: function () {
            self.MyModel = ko.observable(new models.MyModel());
            self.DataList = ko.observableArray([]);
            /* self.btnshow = ko.observable(true);*/

        },
    };

    //self.SaveInformation = function () {

    //    if (UiEvents.validate.SaveValidation()) {
    //        UiEvents.functions.Savegrid("InfoGrid");
    //        alert("data fetched Success")
    //    }
    //};
    self.Edit = function (customerId) {
        UiEvents.functions.Edit(customerId);
    };
    self.Delete = function (customerId) {
        UiEvents.functions.Delete(customerId);
    };
    //self.Delete = function Deleteinfo(CustomerId) {
      
    //    $.ajax({
    //        type: "POST",
    //        url: '/Home/DeleteData',
    //        data: JSON.stringify({ "id": CustomerId }),
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
            
    //        success: function (result) {
    //            alert("info deleted");
    //            //self.DataList([]);
    //            //self.DataList(result.Data);
    //            //UiEvents.functions.Savegrid("InfoGrid");

    //        }
    //    });
        
    //}

    


    const UiEvents = {
        validate: {
            SaveValidation: function () {


            }
        },
        clear: {
            ResetAll: function () {
                self.MyModel(new models.MyModel());
                self.DataList([]);
            },
        },
        functions: {
            GetAll: function () {
                
                $.ajax({
                    type: "POST",
                    url: "/Home/GetData",                  
                    /*data: JSON.stringify({ "data": jsondata }),*/
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",                   
                    success: function (result) {                       
                        self.DataList([]);
                        self.DataList(result.Data);
                        UiEvents.functions.Savegrid("InfoGrid");

                    }
                });
            },
           

            Edit: function (CustomerId) {
                $.ajax({
                    type: "POST",
                    url: "/Home/EditData",
                    data: JSON.stringify({ "Id": CustomerId }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        alert("info Edited");

                    }
                });
            },

            Delete: function (CustomerId) {
                $.ajax({
                    type: "POST",
                    url: '/Home/DeleteData',
                    data: JSON.stringify({ "id": CustomerId }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",

                    success: function (result) {
                        alert("info deleted");                       
                        UiEvents.functions.GetAll();
                    }
                });
            },
            Savegrid: function (control) {
                if ($("#" + control).pqGrid("instance")) {
                    // $("#" + control).pqGrid("destroy");
                    $("#" + control).pqGrid('option', 'dataModel.data', ko.toJS(self.DataList()));
                    $("#" + control).pqGrid('refreshDataAndView');
                } else {
                    const options = Object.assign({}, pqOptions1);
                    options.colModel = [
                        { title: "Id", align: "center", dataIndx: "CustomerId", width: "5%" },
                        { title: "Salutation", align: "center", dataIndx: "Salutation", width: "10%" },
                        { title: "FirstName", align: "center", dataIndx: "FirstName", width: "10%" },
                        { title: "LastName", align: "center", dataIndx: "LastName", width: "10%" },
                        { title: "PhoneNumber", align: "Center", dataIndx: "PhoneNumber", width: "10%" },
                        { title: "Email", align: "Center", dataIndx: "Email", width: "12%" },
                        { title: "Age", align: "Center", dataIndx: "Age", width: "8%" },
                        { title: "Gender", align: "Center", dataIndx: "Gender", width: "10%" },
                        { title: "Nationality", align: "Center", dataIndx: "Nationality", width: "10%" },
                        {
                            title: "Action", align: "center", width: "15%", render: function (ui) {
                                
                                return `<button class="btn btn-danger" onclick="obj.Delete(${ui.rowData.CustomerId});" type="button">delete</button> <button class="button button3 " onclick="obj.Edit(${ui.rowData.CustomerId});" type="button">Edit</button>`;
                            }
                        }


                    ];

                    options.dataModel = { data: ko.toJS(self.DataList()) };
                    options.showBottom = true;
                    $("#" + control).pqGrid(options);


                }
            },
           
           
        },


    };
    self.Clear = function () {
        self.MyModel(new models.MyModel());
    };

    


    function Init() {
        models.UiElements();

        UiEvents.clear.ResetAll();

        $("#tabs").tabs();
        UiEvents.functions.GetAll();

    }
    Init();
}

var obj;

$(document).ready(function () {
    obj = new IndexVM();
    ko.applyBindings(obj);

});