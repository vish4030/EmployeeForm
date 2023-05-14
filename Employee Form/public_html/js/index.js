/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


var dbBaseURL = "http://api.login2explore.com:5577";
var connToken = "90932918|-31949280487320989|90947598";
var dbName = "EMPOLYEE-TABLE";
var relName = "EMP-DB";

//To insert, update and delete Json data.

var apiEndPointIML = "/api/iml";

// To retrieve Json data.
var apiEndPointIRL = "/api/irl";
// put request

// number of entries
var count = 3;

function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"PUT\",\n"
            + "\"rel\" : \""
            + relName + "\","
            + "\"jsonStr\": \n"
            + jsonObj
            + "\n"
            + "}";
    return putRequest;
}

// update request
function createUPDATERequest(connToken, jsonObj, dbName, relName) {
    var updateRequest = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"UPDATE\",\n"
            + "\"rel\" : \""
            + relName + "\","
            + "\"jsonStr\": \n"
            + jsonObj
            + "\n"
            + "}";
    return updateRequest;
}

// retrive request
function createRETRIVERequest(connToken, jsonObj, dbName, relName) {
    var retriveRequest = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"GET_BY_KEY\",\n"
            + "\"rel\" : \""
            + relName + "\","
            + "\"jsonStr\": \n"
            + jsonObj
            + "\n"
            + "}";
    return retriveRequest;
}

function retriveLast(connToken, dbName, relName)
{
    var retriveRequest = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"LAST_RECORD\",\n"
            + "\"rel\" : \""
            + relName + "\""
            + "\n"
            + "}";
    return retriveRequest;
}



// command Execute Fuction
function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}


function disableNav(ctrl)
{
    $("#firstBtn").prop({"disabled": ctrl, "color": "lightblue"});
    $("#preBtn").prop({"disabled": ctrl, "color": "lightblue"});
    $("#nextBtn").prop({"disabled": ctrl, "color": "lightblue"});
    $("#lastBtn").prop({"disabled": ctrl, "color": "lightblue"});
}


function disableCtrl(ctrl)
{
    $("#newBtn").prop({"disabled": ctrl, "color": "lightblue"});
    $("#saveBtn").prop({"disabled": ctrl, "color": "lightblue"});
    $("#editBtn").prop({"disabled": ctrl, "color": "lightblue"});
    $("#changeBtn").prop({"disabled": ctrl, "color": "lightblue"});
    $("#resetBtn").prop({"disabled": ctrl, "color": "lightblue"});
}

function blankForm()
{
    $("#employee").val("");
    $("#empName").val("");
    $("#salary").val("");
    $("#hra").val("");
    $("#da").val("");
    $("#deduction").val("");

}

function disableForm(ctrl)
{
    $("#employee").prop("disabled", ctrl);
    $("#empName").prop("disabled", ctrl);
    $("#salary").prop("disabled", ctrl);
    $("#hra").prop("disabled", ctrl);
    $("#da").prop("disabled", ctrl);
    $("#deduction").prop("disabled", ctrl);
}
;


function resetForm()
{
    blankForm();
}


function newForm()
{
    blankForm();
    disableCtrl(true);
    disableNav(true);
    $("#saveBtn").prop({"disabled": false, "color": "lightblue"});
    $("#resetBtn").prop({"disabled": false, "color": "lightblue"});
    //disableForm(false);

}

function editForm()
{
    disableNav(true);
    disableCtrl(true);
    $("#changeBtn").prop({"disabled": false, "color": "lightblue"});
    $("#resetBtn").prop({"disabled": false, "color": "lightblue"});
    disableForm(false);

}
function refillForm(record)
{
    $("#employee").val(record.empId);
    $("#empName").val(record.empName);
    $("#salary").val(record.empSalary);
    $("#hra").val(record.empHRA);
    $("#da").val(record.empDA);
    $("#deduction").val(record.empDeduction);
}


function setCurrRecLS(id)
{
    window.localStorage.setItem("curr_r_Id", id.toString());
    console.log("setRec", localStorage);
}


function getCurrRecLS()
{
    return localStorage.getItem("curr_r_Id");
}


function saveForm()
{
    var jsonStr = formValidation("insert");
    var id = $("#employee").val();
    if (jsonStr === " ")
        return;

    var putRequest = createPUTRequest(connToken, jsonStr, dbName, relName);

    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommand(putRequest, dbBaseURL, apiEndPointIML);
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    count = count + 1;
    blankForm();
    disableCtrl(false);
    disableNav(false);

}

function updateForm()
{
    var jsonStr = formValidation("update");
    if (jsonStr === " ")
        return;

    var updateRequest = createUPDATERequest(connToken, jsonStr, dbName, relName);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommand(updateRequest, dbBaseURL, apiEndPointIML);
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    blankForm();
}


function initForm()
{
    localStorage.removeItem("first_r_Id");
    localStorage.removeItem("curr_r_Id");
    localStorage.removeItem("last_r_Id");
    

}



function formValidation(operation)
{
    var empId = $("#employee").val();
    if (empId === "") {
        alert("Employee ID Required Value");
        $("#employee").focus();
        return "";
    }
    var empName = $("#empName").val();
    if (empName === "") {
        alert("Employee Name Required Value");
        $("#empName").focus();
        return "";
    }
    var empSalary = $("#salary").val();
    if (empSalary === "") {
        alert("Employee Salary Required Value");
        $("#salary").focus();
        return "";
    }
    var empHRA = $("#hra").val();
    if (empHRA === "") {
        alert("Employee HRA Required Value");
        $("#hra").focus();
        return "";
    }
    var empDA = $("#da").val();
    if (empDA === "") {
        alert("Employee DA Required Value");
        $("#da").focus();
        return "";
    }
    var empDeduction = $("#deduction").val();
    if (empDeduction === "") {
        alert("Employee Deduction value Required ");
        $("#deduction").focus();
        return "";
    }

    var jsonStrObj = {
        empId: empId,
        empName: empName,
        empSalary: empSalary,
        empHRA: empHRA,
        empDA: empDA,
        empDeduction: empDeduction
    };

    var jsonStrObj1 = {
        [empId]: {
            empName: empName,
            empSalary: empSalary,
            empHRA: empHRA,
            empDA: empDA,
            empDeduction: empDeduction
        }
    };

    if (operation === "insert")
        return JSON.stringify(jsonStrObj);
    else if (operation === "update")
    {
        const data = JSON.stringify(jsonStrObj1);
        return data;
    }

}



function firstRec()
{
    jsonObj = JSON.stringify({empId: "1"});
    var retriveRequest = createRETRIVERequest(connToken, jsonObj, dbName, relName);
   
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommand(retriveRequest, dbBaseURL, apiEndPointIRL);

    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});

    var record = JSON.parse(resultObj.data).record;
    /// refill form
    refillForm(record);
    disableForm("true");
    disableNav(false);
    $("#preBtn").prop({"disabled": true, "color": "lightblue"});
    setCurrRecLS(1);
}

function lastRec()
{

    var retriveRequest = retriveLast(connToken, dbName, relName);

    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommand(retriveRequest, dbBaseURL, apiEndPointIRL);

    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});

    var record = JSON.parse(resultObj.data).record;
    /// refill form
    refillForm(record);
    disableForm(true);
    disableNav(false);
    $("#nextBtn").prop({"disabled": true, "color": "lightblue"});

    setCurrRecLS(record.empId);
}

function prevRec()
{
    var rec = parseInt(getCurrRecLS()) - 1;

    if (rec === 1)
    {
        firstRec();
        disableNav(false);
        $("#prevBtn").prop({"disabled": true, "color": "lightblue"});

    } else
    {
        jsonObj = JSON.stringify({empId: rec.toString()});
        var retriveRequest = createRETRIVERequest(connToken, jsonObj, dbName, relName);

        jQuery.ajaxSetup({async: false});
        var resultObj = executeCommand(retriveRequest, dbBaseURL, apiEndPointIRL);

        alert(JSON.stringify(resultObj));
        jQuery.ajaxSetup({async: true});

        var record = JSON.parse(resultObj.data).record;
        /// refill form
        refillForm(record);
        disableForm(true);
        disableNav(false);
        setCurrRecLS(rec);
    }

}


function nextRec()
{
    var rec = parseInt(getCurrRecLS()) + 1;
    
    jsonObj = JSON.stringify({empId: rec.toString()});
    var retriveRequest = createRETRIVERequest(connToken, jsonObj, dbName, relName);
    console.log(rec, retriveRequest);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommand(retriveRequest, dbBaseURL, apiEndPointIRL);

    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});

    var record = JSON.parse(resultObj.data).record;
    /// refill form
    refillForm(record);
    disableForm(true);
    disableNav(false);
    setCurrRecLS(rec);

}
initForm();
console.log("init", localStorage);




//function retrive(item)
//{
//    var rec = getCurrRonLS();
//    var last = grtLastRonLS();
//    console.log(rec);
//    var jsonObj;
//    if (item === "first")
//    {
//        jsonObj = JSON.stringify({empId: "1"});
//        id = 1;
//    } else if (item === "last")
//    {
//        jsonObj = JSON.stringify({empId: last.toString()});
//    } else if (item === "next" && id !== count)
//    {
//
//        jsonObj = JSON.stringify({empId: (id + 1).toString()});
//    } else if (item === "prev" && id !== 1)
//    {
//        jsonObj = JSON.stringify({empId: (id - 1).toString()});
//    }
//    console.log(jsonObj);
//
//    var retriveRequest = createRETRIVERequest(connToken, jsonObj, dbName, relName);
//
//    jQuery.ajaxSetup({async: false});
//    var resultObj = executeCommand(retriveRequest, dbBaseURL, apiEndPointIRL);
//
//    alert(JSON.stringify(resultObj));
//    jQuery.ajaxSetup({async: true});
//
//    var record = JSON.parse(resultObj.data).record;
//    /// refill form
//    refillForm(record);
//
//
//}