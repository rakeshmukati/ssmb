var db;
window.onload = function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            alert("you are not logged in...");
            location.replace("main_content.html");
        } else {
            UID = user.uid;
            db = firebase.firestore();
        }
    });
}



    function addBus() {
        var des = document.getElementById("destination").value;
        var fee = document.getElementById("busFee").value;
        db.collection("busFees").add({
            destination: des,
            fees: fee
        });
    }


    function addRow() {
        var table = document.getElementById("students");

        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(table.rows.length);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        // Add some text to the new cells:
        cell1.setAttribute("contenteditable", true);
        cell2.setAttribute("contenteditable", true);
        cell3.innerHTML = "remove";
        resetDeleteindex();
    }

    function deleteRow(a) {
        document.getElementById("students").deleteRow(a);
        resetDeleteindex();
    }

    function resetDeleteindex() {
        var rows = document.getElementById("students").rows;
        console.log("row length = " + rows.length);
        for (a = 1; a < rows.length; a++) {
            rows[a].cells[2].setAttribute("onclick", "deleteRow(" + a + ")");
        }
    }
