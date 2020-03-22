var db;
window.onload = function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            alert("you are not logged in...");
            location.replace("main_content.html");
        } else {
            UID = user.uid;
            db = firebase.firestore();
            loadData();
        }
    });
}



function addBus() {
    var des = document.getElementById("destination").value;
    var fee = document.getElementById("busFee").value;
    db.collection("busFees").add({
        destination: des,
        feePerMonth: fee
    });
}


function loadData() {
    db.collection("busFees").onSnapshot(function (querySnapshot) {
        var buses = [];
        buses.push({
            feePerMonth: "Bus Fees",
            destination: "Destination"
        });
        querySnapshot.forEach(function (doc) {
            let d = doc.data();
            buses.push({
                feePerMonth: d.feePerMonth,
                destination: d.destination
            });
            updateTable(buses)
        });
    });
}
function updateTable(data) {
    var table = document.getElementById("students");
    table.innerHTML="";
    for (a = 0; a < data.length; a++) {
        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(table.rows.length);
        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell2.innerHTML = data[a].feePerMonth;
        cell1.innerHTML = data[a].destination;
        console.log(data[1]);
    }

}

function deleteRow(a) {
    document.getElementById("students").deleteRow(a);
}
