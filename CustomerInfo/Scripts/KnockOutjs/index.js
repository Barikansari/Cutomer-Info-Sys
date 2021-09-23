

const pqOptions = {
    width: "auto",
    height: 350,
    showTitle: false,
    showHeader: true,
    showTop: false,
    showToolbar: true,
    showBottom: false,
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

function InfoVM() {
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

    var isNumeric = function (str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail

    }

    const models = {
        // Creating a model named MyModel for first tab
        MyModel: function (item) {
            item = item || {};
            //customer details
            
            this.SalutationId = ko.observable(item.SalutationId || "");
            this.SalutationName = ko.observable(item.SalutationName || "");
            this.firstname = ko.observable(item.firstname || "");
            this.lastname = ko.observable(item.lastname || "");
            this.phoneNumber = ko.observable(item.phoneNumber || "");
            this.email = ko.observable(item.email || "");
            this.age = ko.observable(item.age || "");

            this.SelectedGender = ko.observable();
            this.Male = ko.computed({
                read: function () {
                    return this.SelectedGender() == "Male";
                },
                write: function (value) {
                    if (value)
                        this.SelectedGender("Male");
                }
            }, this);

            this.SelectedEducation = ko.observableArray([]);

            this.nationId = ko.observable(item.nationId || "");
            this.nationality = ko.observable(item.nationality || "");

        },
        //creating new model name MyAddress for second tab
        MyAddress: function (item) {
            item = item || {};
            // Temporary Address
            this.addtypeId = ko.observable(item.addtypeId || "");
            this.addtypeName = ko.observable(item.addtypeName || "");
            /*this.Address_Type = ko.observable(item.Address_Type || "");*/
            this.address = ko.observable(item.address || "");
            this.cityId = ko.observable(item.cityId || "");
            this.cityName = ko.observable(item.cityName || "");
            /*this.City_Name = ko.observable(item.City_Name || "");*/
            this.zip = ko.observable(item.zip || "");
            this.countryId = ko.observable(item.countryId || "");
            this.countryName = ko.observable(item.countryName || "");
            /*this.Country_Name = ko.observable(item.Country_Name || "");*/
            this.contact = ko.observable(item.contact || "");
        },

        UiElements: function () {
            self.hiddenId = ko.observable('');
            self.CustomerId = ko.observable('');
            self.MyModel = ko.observable(new models.MyModel());
            self.MyAddress = ko.observable(new models.MyAddress());
            self.DataList = ko.observableArray([]);
            self.DetailList = ko.observableArray([]);
            self.EduList = ko.observableArray([]);
            self.btnsavenew = ko.observable(true);
            self.btnsavesubmit = ko.observable(false);
            self.btnajaxUpdate = ko.observable(false);
            self.btnclearsubmit = ko.observable(false);
            self.btnaddresssubmit = ko.observable(false);
            self.btnupdatesubmit = ko.observable(false);
            self.enabledisable = ko.observable(false);
            self.SalutationList = ko.observableArray([
                { Text: 'Mr.', Value: '0' },
                { Text: 'Ms.', Value: '1' },
                { Text: 'Mrs.', Value: '2' },
            ]);

            self.NationList = ko.observableArray([
                { Text: 'Nepalese', Value: '0' },
                { Text: 'Chinese', Value: '1' },
                { Text: 'Indian', Value: '2' },
            ]);
            self.AddressTypeList = ko.observableArray([
                { Text: 'Temporary', Value: '0' },
                { Text: 'Permanent', Value: '1' },

            ]);
            self.CityList = ko.observableArray([
                { Text: 'Kathmandu', Value: '0' },
                { Text: 'Lalitpur', Value: '1' },
                { Text: 'Pokhara', Value: '2' },
                { Text: 'Bhartpur', Value: '3' },
                { Text: 'Biratnagar', Value: '4' },
                { Text: 'Nepaljung', Value: '5' },
            ]);
            self.CountryList = ko.observableArray([
                { Text: 'Nepal', Value: '0' },
                { Text: 'China', Value: '1' },
                { Text: 'India', Value: '2' },
                { Text: 'Australia', Value: '3' },
                { Text: 'Japan', Value: '4' },
                { Text: 'England', Value: '5' },
            ]);


        },
    };


    const UiEvents = {
        validate: {
            SaveValidation: function () {
                if (isNullOrEmpty(self.MyModel().SalutationId())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#salutation").focus();
                    alert("Warning! - Salutation cannot be empty...!!!");
                    return;
                }

                else if (isNullOrEmpty(self.MyModel().firstname())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#firstname").focus();
                    alert("Warning! - Name cannot be empty...!!!");
                    // $("#errorMessage").html('FirstName is required');
                    // $("#d1").dialog("open");
                    return false;
                }

                else if (isNullOrEmpty(self.MyModel().lastname())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#lname").focus();
                    alert("Warning! - LastName cannot be empty...!!!");
                    return;
                }
                else if (isNullOrEmpty(self.MyModel().phoneNumber())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#cont").focus();
                    alert("Warning! - PhoneNumber cannot be empty...!!!");
                    return;
                }
                else if (!(isNumeric(self.MyModel().phoneNumber()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#cont").focus();
                    alert("Warning! - Enter Numeric Value...!!!");
                    return;
                }

                else if (isNullOrEmpty(self.MyModel().email())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#email").focus();
                    alert("Warning! - Email cannot be empty...!!!");
                    return;
                }
                else if ((!(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i).test(self.MyModel().email()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#email").focus();
                    alert("Warning! - Invalid Email...!!!");
                    return;
                }
                else if (isNullOrEmpty(self.MyModel().age())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#age").focus();
                    alert("Warning! - Age cannot be empty...!!!");
                    return;
                }
                else if (!(isNumeric(self.MyModel().age()))) {
                    $("#age").focus();
                    alert("Warning! - Enter Numeric Age...!!!");
                    return;
                }
                else if (!((self.MyModel().age() < 100) && (self.MyModel().age() > 0))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#age").focus();
                    alert("Age must be Above 0 and below 100");
                }

                else if (!(self.MyModel().SelectedGender() == "Male" || self.MyModel().SelectedGender() == "Female")) {
                    $("#tabs").tabs({ active: 0 });
                    // $("#gender1").focus();
                    alert("Warning! - Choose your Gender...!!!");
                    return;
                }
                //else if (!(self.MyModel().SelectedEducation() == "SLC" || self.MyModel().SelectedEducation() == "+2" || self.MyModel().SelectedEducation() == "Bachelor")) {
                //    $("#tabs").tabs({ active: 0 });
                //    // $("#gender1").focus();
                //    alert("Warning! - Choose your Eduction...!!!");
                //    return;
                //}

                else if (self.MyModel().SelectedEducation() == "") {
                    $("#tabs").tabs({ active: 0 });
                    $("#s1").focus();
                    alert("Warning! - select your education..!!!");
                    return;

                }
                else if (isNullOrEmpty(self.MyModel().nationId())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#Nationality").focus();
                    alert("Warning! - Select your nation...!!!");
                    return;
                }

                else if (obj.DataList() == "") {
                    $("#tabs").tabs({ active: 1 });
                    $("#addtype").focus();
                    alert("Address is required");

                }
                else {
                    self.MyModel().SalutationName((self.SalutationList().find(X => X.Value == self.MyModel().SalutationId()) || {}).Text);
                    self.MyModel().nationality((self.NationList().find(X => X.Value == self.MyModel().nationId()) || {}).Text);
                    self.MyAddress().addtypeName((self.AddressTypeList().find(X => X.Value == self.MyAddress().addtypeId()) || {}).Text);
                    self.MyAddress().cityName((self.CityList().find(X => X.Value == self.MyAddress().cityId()) || {}).Text);
                    self.MyAddress().countryName((self.CountryList().find(X => X.Value == self.MyAddress().countryId()) || {}).Text);
 
                        
                        /*self.DataList.push(ko.toJS(self.MyAddress()));*/
                        /*self.EduList.push(ko.toJS(obj.MyModel().SelectedEducation()));*/

                        var a = ko.toJS(obj.MyModel().SelectedEducation());
                        for (let i = 0; i < a.length; i++) {
                            self.EduList.push({
                                "SelectedEducation": a[i]
                            });
                        }

                        let jsondata = {
                            Salutation: self.MyModel().SalutationName(),
                            First_Name: self.MyModel().firstname(),
                            Last_Name: self.MyModel().lastname(),
                            Phone_Number: self.MyModel().phoneNumber(),
                            Email: self.MyModel().email(),
                            Age: self.MyModel().age(),
                            Gender: obj.MyModel().SelectedGender(),
                            Nationality: self.MyModel().nationality(),
                            EducationList: ko.toJS(self.EduList()),
                            AddressList: self.DataList()

                        }
                        console.log(jsondata);

                        $.ajax({
                            type: "POST",
                            url: "/Home/GetJsonData",
                            data: JSON.stringify({ "data": jsondata }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {

                                alert("Congratulations! Data Inserted successfully.");
                            }
                        });
                        self.DataList([]);
                        UiEvents.clear.clearfield1();
                    
                }
            },

            ajaxUpdateValidation: function () {
                if (isNullOrEmpty(self.MyModel().SalutationId())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#salutation").focus();
                    alert("Warning! - Salutation cannot be empty...!!!");
                    return;
                }

                else if (isNullOrEmpty(self.MyModel().firstname())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#firstname").focus();
                    alert("Warning! - Name cannot be empty...!!!");
                    // $("#errorMessage").html('FirstName is required');
                    // $("#d1").dialog("open");
                    return false;
                }

                else if (isNullOrEmpty(self.MyModel().lastname())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#lname").focus();
                    alert("Warning! - LastName cannot be empty...!!!");
                    return;
                }
                else if (isNullOrEmpty(self.MyModel().phoneNumber())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#cont").focus();
                    alert("Warning! - PhoneNumber cannot be empty...!!!");
                    return;
                }
                else if (!(isNumeric(self.MyModel().phoneNumber()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#cont").focus();
                    alert("Warning! - Enter Numeric Value...!!!");
                    return;
                }

                else if (isNullOrEmpty(self.MyModel().email())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#email").focus();
                    alert("Warning! - Email cannot be empty...!!!");
                    return;
                }
                else if ((!(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i).test(self.MyModel().email()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#email").focus();
                    alert("Warning! - Invalid Email...!!!");
                    return;
                }
                else if (isNullOrEmpty(self.MyModel().age())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#age").focus();
                    alert("Warning! - Age cannot be empty...!!!");
                    return;
                }
                else if (!(isNumeric(self.MyModel().age()))) {
                    $("#age").focus();
                    alert("Warning! - Enter Numeric Age...!!!");
                    return;
                }
                
                else if (!((self.MyModel().age() < 100) && (self.MyModel().age() > 0))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#age").focus();
                    alert("Age must be Above 0 and below 100");
                }

                else if (!(self.MyModel().SelectedGender() == "Male" || self.MyModel().SelectedGender() == "Female")) {
                    $("#tabs").tabs({ active: 0 });
                    // $("#gender1").focus();
                    alert("Warning! - Choose your Gender...!!!");
                    return;
                }
                //else if (!(self.MyModel().SelectedEducation() == "SLC" || self.MyModel().SelectedEducation() == "+2" || self.MyModel().SelectedEducation() == "Bachelor")) {
                //    $("#tabs").tabs({ active: 0 });
                //    // $("#gender1").focus();
                //    alert("Warning! - Choose your Eduction...!!!");
                //    return;
                //}

                else if (self.MyModel().SelectedEducation() == "") {
                    $("#tabs").tabs({ active: 0 });
                    $("#s1").focus();
                    alert("Warning! - select your education..!!!");
                    return;

                }
                else if (isNullOrEmpty(self.MyModel().nationId())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#Nationality").focus();
                    alert("Warning! - Select your nation...!!!");
                    return;
                }

                else if (obj.DataList() == "") {
                    $("#tabs").tabs({ active: 1 });
                    $("#addtype").focus();
                    alert("Address is required");

                }
                else {
                    self.MyModel().SalutationName((self.SalutationList().find(X => X.Value == self.MyModel().SalutationId()) || {}).Text);
                    self.MyModel().nationality((self.NationList().find(X => X.Value == self.MyModel().nationId()) || {}).Text);
                    self.MyAddress().addtypeName((self.AddressTypeList().find(X => X.Value == self.MyAddress().addtypeId()) || {}).Text);
                    self.MyAddress().cityName((self.CityList().find(X => X.Value == self.MyAddress().cityId()) || {}).Text);
                    self.MyAddress().countryName((self.CountryList().find(X => X.Value == self.MyAddress().countryId()) || {}).Text);


                    /*self.DataList.push(ko.toJS(self.MyAddress()));*/
                    /*self.EduList.push(ko.toJS(obj.MyModel().SelectedEducation()));*/

                    var c = ko.toJS(obj.MyModel().SelectedEducation());
                    for (let i = 0; i < c.length; i++) {
                        self.EduList.push({
                            "SelectedEducation": c[i]
                        });
                    }

                    let updatejsondata = {
                        CustomerId: self.CustomerId(),
                        Salutation: self.MyModel().SalutationName(),
                        First_Name: self.MyModel().firstname(),
                        Last_Name: self.MyModel().lastname(),
                        Phone_Number: self.MyModel().phoneNumber(),
                        Email: self.MyModel().email(),
                        Age: self.MyModel().age(),
                        Gender: obj.MyModel().SelectedGender(),
                        Nationality: self.MyModel().nationality(),
                        EducationList: ko.toJS(self.EduList()),
                        AddressList: self.DataList()

                    }
                    console.log(updatejsondata);
                    
                        
                        $.ajax({
                            type: "POST",
                            url: "/Home/UpdateAllData",
                            data: JSON.stringify({ "data": updatejsondata }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {

                                alert("Congratulations! Data Updated successfully.");
                            }
                        });
                    self.btnsavesubmit(true);
                    self.btnajaxUpdate(false);
                    self.btnclearsubmit(true);
                    self.DataList([]);
                    UiEvents.clear.clearfield1();

                }
            },

            UpdateValidation: function () {
                if (isNullOrEmpty(self.MyAddress().addtypeId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#addtype").focus();
                    alert("Warning! - address Type cannot be empty...!!!");
                    // $("#errorMessage").html('FirstName is required');
                    // $("#d1").dialog("open");
                    return false;
                }
                else if (isNullOrEmpty(self.MyAddress().address())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#address").focus();
                    alert("Warning! - address cannot be empty...!!!");
                    // $("#errorMessage").html('FirstName is required');
                    // $("#d1").dialog("open");
                    return false;
                }

                else if (isNullOrEmpty(self.MyAddress().cityId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#city").focus();
                    alert("City is required");
                }

                else if (isNullOrEmpty(self.MyAddress().zip())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#zip").focus();
                    alert(" Please enter Zip code");
                }

                else if (isNullOrEmpty(self.MyAddress().countryId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#country1").focus();
                    alert("Please select your Country ");
                }

                else if (isNullOrEmpty(self.MyAddress().contact())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#contact1").focus();
                    alert("Enter your Phone Number ! ");
                }
                
                else {
                    return true;
                }
            },

            SaveAddressValidation: function () {
                if (isNullOrEmpty(self.MyAddress().addtypeId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#addtype").focus();
                    alert("Warning! - address Type cannot be empty...!!!");
                    // $("#errorMessage").html('FirstName is required');
                    // $("#d1").dialog("open");
                    return false;
                }
               

                else if (isNullOrEmpty(self.MyAddress().address())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#address").focus();
                    alert("Warning! - address cannot be empty...!!!");
                    // $("#errorMessage").html('FirstName is required');
                    // $("#d1").dialog("open");
                    return false;
                }
                

                else if (isNullOrEmpty(self.MyAddress().cityId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#city").focus();
                    alert("City is required");
                }

                else if (isNullOrEmpty(self.MyAddress().zip())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#zip").focus();
                    alert(" Please enter Zip code");
                }

                else if (isNullOrEmpty(self.MyAddress().countryId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#country1").focus();
                    alert("Please select your Country ");
                }

                else if (isNullOrEmpty(self.MyAddress().contact())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#contact1").focus();
                    alert("Enter your Phone Number ! ");
                }
                    
                else {
                    /*debugger*/
                    if ((ko.toJS(obj.DataList)).find(x => (x.addtypeId == self.MyAddress().addtypeId()))) {
                        /*debugger*/
                        alert("Warning! - Information Already Exists!!....");
                        UiEvents.clear.clearfield2();
                    }
                    else {
                        self.MyAddress().addtypeName((self.AddressTypeList().find(X => X.Value == self.MyAddress().addtypeId()) || {}).Text);
                        self.MyAddress().cityName((self.CityList().find(X => X.Value == self.MyAddress().cityId()) || {}).Text);
                        self.MyAddress().countryName((self.CountryList().find(X => X.Value == self.MyAddress().countryId()) || {}).Text);

                        self.DataList.push(ko.toJS(self.MyAddress()));
                        //self.DataList.push(ko.toJS(self.MyModel()));
                        UiEvents.clear.clearfield2();

                    }
                }
            }
        },
        clear: {
            ResetAll: function () {
                self.MyModel(new models.MyModel());
                self.MyAddress(new models.MyAddress());
                self.DataList([]);
            },
            clearfield1: function () {
                self.MyModel(new models.MyModel());
                $("#tabs").tabs();
            },
            clearfield2: function () {
                self.MyAddress(new models.MyAddress());
                $("#tabs").tabs();
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
                        
                        self.DetailList([]);
                        self.DetailList(result.Data);
                        UiEvents.functions.Savegrid("InfoGrid");

                    }
                });
            },
            ajaxEdit: function (CustomerId) {
                $.ajax({
                    type: "POST",
                    url: "/Home/EditData",
                    data: JSON.stringify({ "Id": CustomerId }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (editdata) {
                        
                        $("#tabs").tabs({ active: 0 });                  
                        self.MyModel().firstname(editdata.Data.First_Name);
                        self.MyModel().lastname(editdata.Data.Last_Name);
                        self.MyModel().phoneNumber(editdata.Data.Phone_Number);
                        self.MyModel().email(editdata.Data.Email);
                        self.MyModel().age(editdata.Data.Age);
                        self.MyModel().SelectedGender(editdata.Data.Gender);
                        self.MyModel().nationality(editdata.Data.nationality);
                        self.MyModel().SalutationId((self.SalutationList().find(x => x.Text == editdata.Data.Salutation)).Value);
                        self.MyModel().nationId((self.NationList().find(x => x.Text == editdata.Data.Nationality)).Value);
                        self.CustomerId(editdata.Data.CustomerId);

                        var b = editdata.Data.EducationList;
                        let EduList = [];
                        for (let i = 0; i < b.length; i++) {
                            EduList.push(b[i].SelectedEducation);
                            }
                        self.MyModel().SelectedEducation(EduList);                                       
  
                        self.DataList([]);
                        self.DataList(editdata.Data.AddressList);
                        UiEvents.functions.Save("demoGrid");
                        
                                                  
                    }
                });
            },

            ajaxDelete: function (CustomerId) {
                $.ajax({
                    type: "POST",
                    url: '/Home/DeleteData',
                    data: JSON.stringify({ "id": CustomerId }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",

                    success: function (deletedata) {
                        alert("info deleted");
                        UiEvents.functions.GetAll();
                    }
                });
            },
            Save: function (control) {
                if ($("#" + control).pqGrid("instance")) {
                    // $("#" + control).pqGrid("destroy");
                    $("#" + control).pqGrid('option', 'dataModel.data', ko.toJS(self.DataList()));
                    $("#" + control).pqGrid('refreshDataAndView');
                } else {
                    const options = Object.assign({}, pqOptions);
                    options.colModel = [
                        /*{ title: "Name", align: "center", dataIndx: "firstname", width: "20%" },*/
                        /*{ title: "Age", align: "center", dataIndx: "age", width: "15%" },*/
                        /*{ title: "PhoneNumber", align: "center", dataIndx: "phoneNumber", width: "20%" },*/
                        /*{ title: "Address", align: "center", dataIndx: "address", width: "15%" },*/
                        { title: "Address Type", align: "Center", dataIndx: "addtypeName", width: "10%" },
                        { title: "Address", align: "Center", dataIndx: "address", width: "15%" },
                        { title: "City", align: "Center", dataIndx: "cityName", width: "15%" },
                        { title: "ZipCode", align: "Center", dataIndx: "zip", width: "15%" },
                        { title: "Country", align: "Center", dataIndx: "countryName", width: "15%" },
                        { title: "Contact", align: "Center", dataIndx: "contact", width: "15%" },
                        {
                            title: "Action", align: "center", width: "15%", render: function (ui) {

                                return `<button class="btn btn-danger" style="color:black" onclick="obj.delete(${ui.rowIndx});" type="button">delete</button> <button class="btn btn-info " style="color:black" onclick="obj.edit(${ui.rowIndx});" type="button">Edit</button>`;
                            }
                        }


                    ];

                    options.dataModel = { data: ko.toJS(self.DataList()) };
                    options.showBottom = true;
                    $("#" + control).pqGrid(options);

                    // self.MyModel().Name('');
                    // self.MyModel().Age('');
                }
            },

            Savegrid: function (control) {
                if ($("#" + control).pqGrid("instance")) {
                    // $("#" + control).pqGrid("destroy");
                    $("#" + control).pqGrid('option', 'dataModel.data', ko.toJS(self.DetailList()));
                    $("#" + control).pqGrid('refreshDataAndView');
                } else {
                    const options = Object.assign({}, pqOptions);
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

                                return `<button class="btn btn-danger" onclick="obj.infoDelete(${ui.rowData.CustomerId});" type="button">delete</button> <button class="button button3 " onclick="obj.infoEdit(${ui.rowData.CustomerId});" type="button">Edit</button>`;
                            }
                        }


                    ];

                    options.dataModel = { data: ko.toJS(self.DetailList()) };
                    options.showBottom = true;
                    $("#" + control).pqGrid(options);


                }
            }


        }
    };

    self.New = function () {
       
        self.btnsavenew(false);
        self.btnsavesubmit(true);
        self.btnajaxUpdate(false);
        self.btnclearsubmit(true);
        self.btnaddresssubmit(true);
        self.btnupdatesubmit(false);
        self.enabledisable(true);
    }

    self.SaveInformation = function () {

        if (UiEvents.validate.SaveValidation()) {
   
        }
    };

    self.SaveAddress = function () {
        if (UiEvents.validate.SaveAddressValidation()) {
            UiEvents.functions.Save("demoGrid");
            UiEvents.clear.clearfield2();
        }
    }

    self.delete = function deleteRow(index) {
        self.DataList.splice(index, 1);
        UiEvents.functions.Save("demoGrid");
        alert("Deleted Successfully !.");

    }
    self.edit = function editRow(index) {
        var a = $('#demoGrid').pqGrid("getRowData", { rowIndx: index });
        // $('#demoGrid').pqGrid('getData', {dataIndx: ['pq_ri']});
        // $("#demoGrid").pqGrid('option','dataModel.data');
        let addtypeId = (self.AddressTypeList().find(x => x.Text == a.addtypeName)).Value;
        let cityId = (self.CityList().find(x => x.Text == a.cityName)).Value;
        let countryId = (self.CountryList().find(x => x.Text == a.countryName)).Value;

        self.MyAddress().addtypeId(addtypeId);
        self.MyAddress().address(a.address);
        self.MyAddress().cityId(cityId);
        self.MyAddress().zip(a.zip);
        self.MyAddress().countryId(countryId);
        self.MyAddress().contact(a.contact);
        self.btnsavesubmit(false);
        self.btnajaxUpdate(false);
        self.btnclearsubmit(false);
        self.btnaddresssubmit(false);
        self.btnupdatesubmit(true);
        self.btnclearsubmit(false);
        self.hiddenId(index);

    };
    self.Update = function updateRow() {

        if (isNullOrEmpty(self.hiddenId())) {
            alert('error');
        }
        else {
            self.MyAddress().addtypeName((self.AddressTypeList().find(X => X.Value == self.MyAddress().addtypeId()) || {}).Text);
            self.MyAddress().cityName((self.CityList().find(X => X.Value == self.MyAddress().cityId()) || {}).Text);
            self.MyAddress().countryName((self.CountryList().find(X => X.Value == self.MyAddress().countryId()) || {}).Text);
            let list = ko.toJS(self.DataList());
            list[self.hiddenId()].addtypeName = self.MyAddress().addtypeName();
            list[self.hiddenId()].address = self.MyAddress().address();
            list[self.hiddenId()].cityName = self.MyAddress().cityName();
            list[self.hiddenId()].zip = self.MyAddress().zip();
            list[self.hiddenId()].countryName = self.MyAddress().countryName();
            list[self.hiddenId()].contact = self.MyAddress().contact();



            if (UiEvents.validate.UpdateValidation()) {
                self.DataList([]);
                self.DataList(list);
                self.hiddenId('');
                UiEvents.functions.Save("demoGrid");
                alert("Updated Successfully !.");
                UiEvents.clear.clearfield2();
                /*self.btnupdatesubmit(true);*/

                self.btnsavesubmit(true);
                self.btnajaxUpdate(true);
                self.btnaddresssubmit(true);
                self.btnupdatesubmit(false);
                self.btnclearsubmit(true);
            }

        }

    };

    self.ajaxUpdate = function (CustomerId) {
        UiEvents.validate.ajaxUpdateValidation(CustomerId)        
    };

    self.infoEdit = function (CustomerId) {
        self.btnsavesubmit(false);
        self.btnajaxUpdate(true);
        self.btnclearsubmit(false);
        self.btnaddresssubmit(true);
        self.btnupdatesubmit(false);
        UiEvents.functions.ajaxEdit(CustomerId);
        
        

    };
    self.infoDelete = function (CustomerId) {
        UiEvents.functions.ajaxDelete(CustomerId);
    };

    self.Clear = function () {
        UiEvents.clear.clearfield1();
        UiEvents.clear.clearfield2();
        self.DataList([]);

    };

    self.onChangeOfSalutation = function () {
        if (self.MyModel().SalutationId() == "0") {
            self.MyModel().SelectedGender("Male");
            // self.enableDisableGender(false);
        }
        else if (self.MyModel().SalutationId() == "1" || self.MyModel().SalutationId() == "2") {
            self.MyModel().SelectedGender("Female");
            // self.enableDisableGender(false);
        }
        else {
            self.enableDisableGender(true);
            return;
        }

    };




    function Init() {
        models.UiElements();
        $("#tabs").tabs();
        UiEvents.clear.ResetAll();
        /*UiEvents.functions.Save("demoGrid");*/

        $(" #tabs, #tabs-2").click(function () {
            UiEvents.functions.Save("demoGrid");
        });

        $(" #tabs, #tabs-3").click(function () {

            UiEvents.functions.GetAll();
            /*UiEvents.functions.Savegrid("InfoGrid");*/
        });
        
        
    }
    Init();
}

var obj;

$(document).ready(function () {
    obj = new InfoVM();
    ko.applyBindings(obj);

});