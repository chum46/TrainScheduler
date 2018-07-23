// Initialize Firebase
var config = {
    apiKey: "AIzaSyDA2rTX2TX5YGJjEbtuoYpaOsrgc_EPssc",
    authDomain: "trainhomework-347ec.firebaseapp.com",
    databaseURL: "https://trainhomework-347ec.firebaseio.com",
    projectId: "trainhomework-347ec",
    storageBucket: "",
    messagingSenderId: "145346335563"
};

firebase.initializeApp(config);
var trainData = firebase.database();

// Click Event
$("#submitBtn").on("click", function () {
    var trainName = $("#nameInput").val().trim();
    // convert using node.js
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var destination = $("#destinationInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    var addTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }
    trainData.ref().push(addTrain);
    $("#nameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
    return false;
})

// Append Train Data
trainData.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable").children("tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" +
        arrival + "</td><td>" + minutes + "</td><td>");
})
