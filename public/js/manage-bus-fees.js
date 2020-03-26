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
    if(des==""||fee==""){
        alert("Enter data properly");
    }else{
    db.collection("busFees").add({
        destination: des,
        feePerMonth: fee
    });
    document.getElementById("destination").value="";
    document.getElementById("busFee").value="";
    alert("Data saved successfully");
    }
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
        cell1.setAttribute("contenteditable", true);
        cell2.setAttribute("contenteditable", true);
    }

}
function submit(){
    var oTable = document.getElementById('students');

    //gets rows of table
    var rowLength = oTable.rows.length;

    //loops through rows    
    for (i = 1; i < rowLength; i++){

      //gets cells of current row  
       var oCells = oTable.rows.item(i).cells;

       //gets amount of cells of current row
       var cellLength = oCells.length;

       //loops through each cell in current row
       for(var j = 0; j < cellLength; j++){

              // get your cell info here

              var cellVal = oCells.item(j).innerHTML;
              console.log(cellVal);
           }
    }
}
