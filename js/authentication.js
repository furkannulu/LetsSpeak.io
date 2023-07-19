// Firebase Configurations
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  update,
  push,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVfmqVa1rjyzOSniwMFDq9ub3OJ3zdoCQ",
  authDomain: "login-with-firebase-data-d62bc.firebaseapp.com",
  databaseURL:
    "https://login-with-firebase-data-d62bc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "login-with-firebase-data-d62bc",
  storageBucket: "login-with-firebase-data-d62bc.appspot.com",
  messagingSenderId: "959934887248",
  appId: "1:959934887248:web:95452c017f1f9bc4856855",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// ############################### Auth Sayfası (Login, Register, LogOut)###############################

function validate_email(email) {
  let expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}
function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}
function validate_field(field) {
  if (field == null) {
    return false;
  }
  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

// Auth...
window.register = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is Outta Line!!");
    return;
    // Don't continue running the code
  }
  if (validate_field(email) == false || validate_field(password) == false) {
    alert("One or More Extra Fields is Outta Line!!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      alert("user created");
      var point = 0;
      var dt = getDate();
      // writeUserData(email, point, dt);
      set(ref(db, "users/" + user.email.split("@")[0]), {
        email: email,
        testPoint: point,
        canJump: 0,
        last_login: dt,
        level: "A1",
      }).then(() => {
        console.log("Veritabanına kayıt başarılı.");
        window.location.href = "../pages/new.html";
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorCode + errorMessage);
      });
    })

};

function getDate() {
  // Tarih nesnesini oluştur
  var tarih = new Date();
  // Tarih değerlerini al
  var saat = tarih.getHours();
  var dakika = tarih.getMinutes();
  var saniye = tarih.getSeconds();
  var gun = tarih.getDate();
  var ay = tarih.getMonth() + 1; // Aylar 0'dan başlar, bu yüzden +1 ekliyoruz
  var yil = tarih.getFullYear();

  // Firebase'e kaydetmek için bir nesne oluştur
  var dt =
    saat + ":" + dakika + ":" + saniye + " " + gun + "/" + ay + "/" + yil;
  return dt;
}

window.login = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const auth = getAuth();


  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is Outta Line!!");
    return;
  }
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Kullanıcı oturum açtığında
      const user = userCredential.user;
      var dt = getDate();
      update(ref(db, "users/" + user.email.split("@")[0]), {
        last_login: dt,
      });
      window.location.href = "../pages/trainPage.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + errorMessage);
    });
};

// ############################### Alıştırma Sayfaları ###############################
