$(function() {
    //-----------------------------------
    // استفاده از dropdown
    $('#datepicker5').datepicker({
        changeMonth: true,
        changeYear: true
    });
    //-----------------------------------

});



var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["starttime"] = document.getElementById("starttime").value;
    formData["endtime"] = document.getElementById("endtime").value;
    formData["finalTime"] = document.getElementById("finalTime").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("timeDuration").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = "";
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.starttime;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.endtime;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.finalTime;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<button type="button" class="btn edit-btn" onClick="onEdit(this)"><i class="fas fa-edit"></i></button>
                           <button type="button" class="btn delete-btn" onClick="onDelete(this)"><i class="fa fa-trash"></i></button>`;
}

function resetForm() {
    document.getElementById("starttime").value = "";
    document.getElementById("endtime").value = "";
    document.getElementById("finalTime").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("starttime").value = selectedRow.cells[1].innerHTML;
    document.getElementById("endtime").value = selectedRow.cells[2].innerHTML;
    document.getElementById("finalTime").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[1].innerHTML = formData.starttime;
    selectedRow.cells[2].innerHTML = formData.endtime;
    selectedRow.cells[3].innerHTML = formData.finalTime;
}

function onDelete(td) {
    row = td.parentElement.parentElement;
    document.getElementById("timeDuration").deleteRow(row.rowIndex);
    resetForm();

}

function validate() {
    isValid = true;
    return isValid;
}


function validate() {
    isValid = true;
    if (document.getElementById("starttime").value == "") {
        isValid = false;
        document.getElementById("starttime").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("starttime").classList.contains("hide"))
            document.getElementById("starttime").classList.add("hide");
    }
    return isValid;
}







function sum() {
    var startTime = document.getElementById('starttime').value;
    var endTime = document.getElementById('endtime').value;

    var result = fromTime(endTime) - fromTime(startTime);

    if (!isNaN(result)) {
        document.getElementById('finalTime').value = toTime(result);
    }
    // var finalResult = totalSum(result);

    // document.getElementById('totaltime').value = toTime(finalResult);

}

function fromTime(time) {
    var timeArray = time.split(':');
    var hours = parseInt(timeArray[0]);
    var minutes = parseInt(timeArray[1]);

    return (hours * 60) + minutes;
}

function toTime(number) {
    var hours = Math.floor(number / 60);
    var minutes = number % 60;

    return hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
}

// function totalSum(totalTime) {
//     finalTotal += totalTime;
//     return finalTotal;
// }






// function addNumbers() {
//     var val1 = parseInt(document.getElementById("timeDuration").rows[3].cells.value);
//     var val2 = parseInt(document.getElementById("timeDuration").rows[4].value);
//     var ansD = document.getElementById("answer");
//     ansD.value = val1 + val2;
// }