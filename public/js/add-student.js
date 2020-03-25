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

    db.collection("students").add({
        class: cls,
        contact: cnt,
        village: vlg,
        fathername: fname,
        name: n

    });
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
    });
}