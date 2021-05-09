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



user_name = localStorage.getItem("user name");
room_name = localStorage.getItem("roomname");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                show_name = "<h4> " + name + "<img class='user_name' src='tick.png'> </h4>";
                show_message = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updatelike(this.id)'>";
                thumbsup = "<span class='glyphicon glyphicon-thumbs-up'> like: " + like + "</span></button><hr>";
                row = show_name + show_message + like_button + thumbsup;
                document.getElementById("output").innerHTML += row;

                //End code
            }
        });
    });
}
getData();

function updatelike(message_id) {
 button_id= message_id;
 likes=document.getElementById(button_id).value;
 updated_likes=Number(likes)+1;
 console.log(updated_likes);
 firebase.database().ref(room_name).child(message_id).update(
     {
         like:updated_likes
     }
 );
 
}

function logout() {
  localStorage.removeItem("user name");
  localStorage.removeItem("roomname");
  window.location.replace("index.html");
}