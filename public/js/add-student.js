var db;
var ADMIN = {};
var UID;
window.onload = function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            alert("you are not logged in...");
            // location.replace("main_content.html");
        } else {
            UID = user.uid;
            db = firebase.firestore();
            //location.replace("add-student.html");
            fetchAdminData();
        }
    });

}
function upload() {
    var n = document.getElementById("studentName").value;
    var fname = document.getElementById("fatherName").value;
    var vlg = document.getElementById("selectVillage").value;
    var cnt = document.getElementById("contact").value;
    var cls = document.getElementById("selectClass").value;
    if(n==""||fname==""||vlg=="select village"||cnt==""||cls=="select class"){
        alert("Fill data properly");
        
    }else{
    db.collection("students").add({
        class: cls,
        contact: cnt,
        village: vlg,
        fathername: fname,
        name: n

    });
    document.getElementById("studentName").value="";
    document.getElementById("fatherName").value="";
    document.getElementById("selectVillage").value="select village";
    document.getElementById("contact").value="";
    document.getElementById("selectClass").value="select class";
    alert("Data saved successfully");
    
    }
}
function prepareOption(id, values) {
    var select = document.getElementById(id);
    for (a = 0; a < values.length; a++) {
        var node = document.createTextNode(values[a]);
        var opt = document.createElement("option");
        opt.appendChild(node);
        select.appendChild(opt);
    }
}
function fetchAdminData() {
    db = firebase.firestore();
    UID="tsDudUFG6JwgLMWaYtcU";
    db.collection("admin").doc(UID).get().then(function (doc) {
        ADMIN = doc.data();
        console.log("data",ADMIN);
        prepareOption("selectClass", ADMIN.class);
        // prepareOption("selectVillage", ADMIN.destination);
        db.collection("busFees").onSnapshot(function (querySnapshot) {
            var buses = [];
            querySnapshot.forEach(function (doc) {
                let d = doc.data();
                buses.push(d.destination);
            });
            console.log(buses);
            prepareOption("selectVillage",buses);
        });
    });
}