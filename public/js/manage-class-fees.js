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



function addClass() {
    var des = document.getElementById("selectClass").value;
    var fee = document.getElementById("classFee").value;
    var fpy = document.getElementById("classFeeyear").value;
    if(des==""||fee==""){
        alert("Enter data properly");
    }else{
    db.collection("classFees").add({
        class: des,
        feesperMonth: fee,
        feesperyear:fpy
    });
    document.getElementById("selectClass").value="";
    document.getElementById("classFee").value="";
    document.getElementById("classFeeyear").value="";
    alert("Data saved successfully");
    }
}


function loadData() {
    db.collection("classFees").onSnapshot(function (querySnapshot) {
        var buses = [];
        buses.push({
            Monthly: "Monthly",
            Class: "Class",
            Yearlys:"Yearly"
        });
        querySnapshot.forEach(function (doc) {
            let d = doc.data();
            buses.push({
                Monthly: d.feesperMonth,
                Class: d.class,
                Yearly:d.feesperyear
            });
            //console.log(buses);
            updateTable(buses);
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
        var cell3=row.insertCell(2);
        cell2.innerHTML = data[a].Monthly;
        cell1.innerHTML = data[a].Class;
        cell3.innerHTML = data[a].Yearly;
    }

}
