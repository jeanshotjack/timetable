var firebaseConfig = {
    apiKey: "AIzaSyCgb7TVh4WZgMtLy8rYygN4jcj9ARrb714",
    authDomain: "test-app-26410.firebaseapp.com",
    databaseURL: "https://test-app-26410.firebaseio.com",
    projectId: "test-app-26410",
    storageBucket: "test-app-26410.appspot.com",
    messagingSenderId: "362716079969",
    appId: "1:362716079969:web:6ec054bc430e9e40e3c720"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


//-----------------------------------------------------------------------------------

var database = firebase.database();

var name = "";
var role = "";
var date = "";
var month = moment(date).diff(moment(), "months");
var rate = "";
var total = "";

$("#add-emp").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#name").val().trim();
    role = $("#role").val().trim();
    date = $("#date").val().trim();
    rate = $("#rate").val().trim();

    // Code for handling the push
    database.ref().push({
        name: name,
        role: role,
        date: date,
        month: month,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    console.log(name, role, date);
});

database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.role);
    console.log(sv.date);
    console.log(sv.rate);
    console.log(sv.month);

    // Change the HTML to reflect
    var newRow = $("<tr>");

    var nameTD = $("<td>").text(sv.name);
    var roleTD = $("<td>").text(sv.role);
    var dateTD = $("<td>").text(sv.date);
    var monthTD = $("<td>").text(sv.month);
    var rateTD = $("<td>").text(sv.rate);
    var totalTD = $("<td>").text(sv.total);

    newRow.append(nameTD);
    newRow.append(roleTD);
    newRow.append(dateTD);
    newRow.append(monthTD);
    newRow.append(rateTD);
    newRow.append(totalTD);
    $("#newNew").append(newRow);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});