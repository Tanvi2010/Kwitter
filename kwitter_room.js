// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyD0dlzMz25rqIw_a125awowS6hFqqy4rW8",
    authDomain: "kwitter-20b15.firebaseapp.com",
    databaseURL: "https://kwitter-20b15-default-rtdb.firebaseio.com",
    projectId: "kwitter-20b15",
    storageBucket: "kwitter-20b15.appspot.com",
    messagingSenderId: "603767018905",
    appId: "1:603767018905:web:f660612325cdc37fd0ef08",
    measurementId: "G-33G59FK4K9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



user_name=localStorage.getItem("user name");
document.getElementById("user_name").innerHTML="<div id='welcome'> Welcome " + user_name + "! </div>";

function addroom() {
    room_name=document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
          purpose:"adding room name"
    });
    localStorage.setItem("roomname",room_name);
    window.location="kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
     Room_names = childKey;
    //Start code
console.log("roomname=" + Room_names);
row="<div class='room_name' id=" + Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names+"</div> <hr>";
document.getElementById("output").innerHTML+=row;
    //End code
    });});}
getData();
function redirectToRoomName(name) {
   localStorage.setItem("roomname" ,name);
   window.location="kwitter_page.html";
}
function logout() {
    localStorage.removeItem("user name");
    localStorage.removeItem("roomname");
    window.location.replace("index.html");
  }