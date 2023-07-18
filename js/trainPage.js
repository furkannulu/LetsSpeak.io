import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
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

window.logout = () => {
  console.log("Çıkış");
  signOut(auth)
    .then(() => {
      window.location.href = "/html/LetsSpeak.html";
    })
    .catch((error) => {
      alert("hata" + error);
    });
};

// ############################### Alıştırma Sayfaları ###############################


async function setLevelStar(userLevel) {
  console.log("userlevel" + userLevel);
  try {
    // Bu kısımda ekranda bulunan yıldızlar puana göre düzenleniyor.
    if (userLevel == "A1") {
      document.getElementById("A1").checked = true;
    } else if (userLevel == "A2") {
      document.getElementById("A2").checked = true;
    } else if (userLevel == "B1") {
      console.log("tmtmtmtm");
      document.getElementById("B1").checked = true;
    } else if (userLevel == "B2") {
      console.log("tmtmtmtm");
      document.getElementById("B2").checked = true;
    } else if (userLevel == "C1") {
      console.log("tmtmtmtm");
      document.getElementById("C1").checked = true;
    } else if (userLevel == "C2") {
      console.log("tmtmtmtm");
      document.getElementById("C2").checked = true;
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + errorMessage);
  }
}
async function getLevel() {
    const auth = getAuth();
    if (auth.currentUser) {
      const username = auth.currentUser.email.split("@")[0];
      const dbRef = ref(getDatabase());
      try {
        const snapshot = await get(child(dbRef, "users/" + username));
        if (snapshot.exists()) {
          const userLevel = snapshot.val().level;
          await setLevelStar(userLevel);
          return userLevel;
        } else {
          console.log("Data Not Found");
          return 0;
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("User is not signed in");
      return 0;
    }
  }
  

async function setLevel(canJumpPoint) {
    console.log("setLevel'e girdim");
    getLevel().then(currentLevel => {
      console.log("currentLevel bu " + currentLevel);
  
      try {
        console.log(canJumpPoint);
        if (canJumpPoint >= 85) {
          if (currentLevel == "A1") {
            currentLevel = "A2";
          } else if (currentLevel == "A2") {
            currentLevel = "B1";
          } else if (currentLevel == "B1") {
            currentLevel = "B2";
          } else if (currentLevel == "C1") {
            currentLevel = "C2";
          } else if (currentLevel == "C2") {
            currentLevel = "C2";
          }
          const auth = getAuth();
          const username = auth.currentUser.email.split("@")[0];
          const userCredential = get(child(ref(db), "users/" + username));
          const user = userCredential.user;
  
          update(ref(db, "users/" + username), {
            level: currentLevel,
          });
        }
        setLevelStar(currentLevel);
        setTimeout(() => {
            location.reload();
          }, 5000); // 5 saniye
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + errorMessage);
      }
    });
  }
  

async function updatePoint() {
  try {
    // Signed in
    const auth = getAuth();
    const username = auth.currentUser.email.split("@")[0];
    const userCredential = await get(child(ref(db), "users/" + username));
    const user = userCredential.user;
    update(ref(db, "users/" + username), {
      canJump: parseInt(displayPointForm.textContent),
    });
    var canJumpPoint = parseInt(displayPointForm.textContent);
    console.log("cjpoint bu" + canJumpPoint);
    await setLevel(canJumpPoint);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + errorMessage);
  }
}

//Kullanıcı Puanı Alma :
async function getPoint() {
  try {
    const auth = getAuth();
    const username = auth.currentUser.email.split("@")[0];
    const dbRef = ref(getDatabase());
    const snapshot = get(child(dbRef, "users/" + username));
    console.log("gerpoint içine girdim");

    if (snapshot.exists()) {
      const userPoint = snapshot.val().testPoint;
      console.log("gerpoint içindeki userPoint" + userPoint);
      return parseInt(userPoint);
    } else {
      console.log("Data Not Found");
      return 0;
    }
  } catch (error) {
    console.error(error);
  }
}

// ############################### Cümlelerin Temini ve Ekrana Verilmesi ###############################

// Cloud FireStore -----------------------------
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  setDoc,
  query,
  where,
  getCountFromServer,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

//#####################################################################

// HTML ITEMS for Form Page
const sentenceItemForm = document.getElementById("sentenceForm");
const startButtonForm = document.getElementById("startForm");
const outputForm = document.getElementById("outputForm");
const resultsForm = document.getElementById("resultsForm");
const displayPointForm = document.getElementById("displayPointForm");
// Sentence Repositories for each Level
const sentencesA1 = [];
const sentencesA2 = [];
const sentencesB1 = [];
const sentencesB2 = [];
const sentencesC1 = [];
const sentencesC2 = [];
let sentencesForm = [];

const firestore = getFirestore(app);

// Query for each Level
const qA1 = query(
  collection(firestore, "Sentence"),
  where("level", "==", "A1")
);
const qA2 = query(
  collection(firestore, "Sentence"),
  where("level", "==", "A2")
);
const qB1 = query(
  collection(firestore, "Sentence"),
  where("level", "==", "B1")
);
const qB2 = query(
  collection(firestore, "Sentence"),
  where("level", "==", "B2")
);
const qC1 = query(
  collection(firestore, "Sentence"),
  where("level", "==", "C1")
);
const qC2 = query(
  collection(firestore, "Sentence"),
  where("level", "==", "C2")
);

// Content for each Query
const querySnapshotA1 = await getDocs(qA1);
const querySnapshotA2 = await getDocs(qA2);
const querySnapshotB1 = await getDocs(qB1);
const querySnapshotB2 = await getDocs(qB2);
const querySnapshotC1 = await getDocs(qC1);
const querySnapshotC2 = await getDocs(qC2);

var totalPoint = 0;
var formIndex = 0;

function getSentenceforTrainForm() {
  if (sentencesForm && formIndex < sentencesForm.length) {
    const sentence = sentencesForm[formIndex];
    formIndex++;
    return sentence;
  } else if (formIndex >= sentencesForm.length) {
    sentencesForm = [];
    var average = totalPoint / formIndex;
    displayPointForm.textContent = Math.round(average);
    updatePoint();
    return (sentencesForm = ["END..."]);
  }
  return 0;
}

//#####################################################################

// Train Sayfası için Cümleler
getLevel()
  .then((userLevel) => {
    // Fonksiyon tamamlandığında burası çalışacak
    console.log("getlevel içindeki level " + userLevel); // Kullanıcı seviyesini kullanabilirsiniz
    // Diğer işlemleri burada devam ettirebilirsiniz
    var counter = 0;
    if (userLevel == "A1") {
      let counter = 0;
      querySnapshotA1.forEach((doc) => {
        if (counter < 10) {
          sentencesForm.push(doc.data().sentence);
          sentencesA1.push(doc.data().sentence);
        } else {
          sentencesA1.push(doc.data().sentence);
        }
        counter++;
      });
    } else if (userLevel == "A2") {
      counter = 0;
      querySnapshotA2.forEach((doc) => {
        if (counter < 10) {
          sentencesForm.push(doc.data().sentence);
          sentencesA2.push(doc.data().sentence);
        } else {
          sentencesA2.push(doc.data().sentence);
        }
        counter++;
      });
    } else if (userLevel == "B1") {
      counter = 0;
      querySnapshotB1.forEach((doc) => {
        if (counter < 10) {
          sentencesForm.push(doc.data().sentence);
          sentencesB1.push(doc.data().sentence);
        } else {
          sentencesB1.push(doc.data().sentence);
        }
        counter++;
      });
    } else if (userLevel == "B2") {
      counter = 0;
      querySnapshotB2.forEach((doc) => {
        if (counter < 10) {
          sentencesForm.push(doc.data().sentence);
          sentencesB2.push(doc.data().sentence);
        } else {
          sentencesB2.push(doc.data().sentence);
        }
        counter++;
      });
    } else if (userLevel == "C1") {
      counter = 0;
      querySnapshotC1.forEach((doc) => {
        if (counter < 10) {
          sentencesForm.push(doc.data().sentence);
          sentencesC1.push(doc.data().sentence);
        } else {
          sentencesC2.push(doc.data().sentence);
        }
        counter++;
      });
    } else if (userLevel == "C2") {
      counter = 0;
      querySnapshotC2.forEach((doc) => {
        if (counter < 10) {
          sentencesForm.push(doc.data().sentence);
          sentencesC2.push(doc.data().sentence);
        } else {
          sentencesC2.push(doc.data().sentence);
        }
        counter++;
      });
    } else {
      alert("Level'da hata var");
    }

    //Cümlenin ekrana verilmesi
    sentenceItemForm.textContent = getSentenceforTrainForm();

    // ############################### Recognizer Kısmı ###############################

    //-------------
    // Timer For Fluency
    let startTime, endTime;
    let speechDuration = 0;
    let pauseCount = 0;

    const recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognizer = new recognition();
    recognizer.lang = "en-US";

    startButtonForm.addEventListener("click", () => {
      outputForm.value = "";
      resultsForm.value = "";
      recognizer.start();
    });

    recognizer.onstart = () => {
      startTime = new Date().getTime(); // Kaydın başlama zamanını al
      console.log("Speech recognition service has started at : " + startTime);
      startButtonForm.disabled = true;
    };

    recognition.onspeechstart = () => {
      if (pauseCount > 0) {
        const pauseDuration = new Date().getTime() - endTime; // Duraklama süresini hesapla
        speechDuration += pauseDuration; // Duraklama süresini toplam süreye ekle
      }
    };

    recognizer.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      outputForm.value += speechToText;
    };

    recognizer.onerror = (event) => {
      console.log("Speech recognition error detected: " + event.error);
      outputForm.value += "Hata: " + event.error;
    };

    recognizer.onend = () => {
      endTime = new Date().getTime(); // Kaydın bitiş zamanını al
      console.log("Speech recognition service has stopped at : " + endTime);
      Correction();
      startButtonForm.disabled = false;
    };

    outputForm.addEventListener("click", () => {
      outputForm.blur();
    });

    // ############################### Puan Hesabı ve Accuracy Kısmı ###############################

    function Correction() {
      // Karşılaştırma işlemi
      const outputWords = outputForm.value
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ")
        .split(" ");
      const sentenceWords = sentenceItemForm.innerText
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ")
        .split(" ");

      let correctWords = [];
      let incorrectWords = [];
      let missingWords = [];
      let extraWords = [];

      // Doğru kelimeleri tespit etmek için her bir kullanıcı kelimesi üzerinde dönülür
      for (let i = 0; i < outputWords.length; i++) {
        let word = outputWords[i];
        let correctIndex = sentenceWords.indexOf(word);

        if (correctIndex !== -1) {
          // Kelime doğru bir şekilde tespit edildi
          correctWords.push(word);
          sentenceWords[correctIndex] = null; // Doğru kelimeye işaret etmek için null değeri atanır
        } else {
          // Yanlış kelime
          incorrectWords.push(word);
        }
      }

      // Doğru kelimeleri göstermek için aşağıdaki satırı ekleyebilirsiniz
      if (correctWords.length > 0) {
        resultsForm.value +=
          "Doğru kelimeler: " + correctWords.join(", ") + "\n";
      }

      // Eksik kelimeleri tespit etmek için doğru kelimeler kontrol edilir
      for (let i = 0; i < sentenceWords.length; i++) {
        let word = sentenceWords[i];

        if (word !== null) {
          missingWords.push(word);
        }
      }

      // Fazla kelimeleri tespit etmek için her bir kullanıcı kelimesi kontrol edilir
      for (let i = 0; i < outputWords.length; i++) {
        let word = outputWords[i];

        if (!correctWords.includes(word)) {
          extraWords.push(word);
        }
      }

      let isTrue =
        incorrectWords.length === 0 &&
        missingWords.length === 0 &&
        extraWords.length === 0;

      if (isTrue) {
        resultsForm.value = "Cevap doğru!";
      } else {
        if (incorrectWords.length > 0) {
          resultsForm.value +=
            "Yanlış kelimeler: " + incorrectWords.join(", ") + "\n";
        }
        if (missingWords.length > 0) {
          resultsForm.value +=
            "Eksik kelimeler: " + missingWords.join(", ") + "\n";
        }
        if (extraWords.length > 0) {
          resultsForm.value +=
            "Fazla kelimeler: " + extraWords.join(", ") + "\n";
        }
      }

      let wordScore = wordAccuracyPoint(incorrectWords, correctWords);
      let fluencyScore = calculateFluency(sentenceWords);

      if (correctWords == 0) {
        wordScore = 0;
        fluencyScore = 0;
      } else if (wordScore <= 25) {
        fluencyScore /= 2;
      } //Word Accuracy yeterince düşükse Flueny Score da yarılanır.

      resultsForm.value += "\nKelime Doğruluk Puanı: " + wordScore + "\n";
      resultsForm.value += "Akıcılık Puanı: " + fluencyScore + "\n";

      totalPoint += fluencyScore + wordScore;

      sentenceItemForm.textContent = getSentenceforTrainForm();
    }

    function wordAccuracyPoint(incorrectWords, correctWords) {
      let maxScore = 4;
      let score = maxScore;
      const minScore = 0;
      const sentenceWords = sentenceItemForm.innerText
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
        .split(" ");

      const wordCount = sentenceWords.length;
      const scorePerWord = maxScore / wordCount;
      if (incorrectWords.length >= wordCount) {
        score = 0;
        correctWords.forEach((word) => {
          score += scorePerWord / 2;
        });
        return score * 12, 5;
      } else if (incorrectWords.length < wordCount) {
        incorrectWords.forEach((word) => {
          score -= scorePerWord;
        });

        score = Math.max(score, minScore);
        score = Math.round(score);
        return score * 12.5;
      }
    }

    //-------------
    // Fluency Score
    function calculateFluency(sentenceWords) {
      const totalDuration = (endTime - startTime) / 1000; // Toplam süreyi hesapla
      const speechLength = sentenceWords.length; // Cümlenin kelime sayısını al

      // Beklenen süreyi hesapla
      const expectedSentenceDuration = speechLength / 3; // Beklenen okuma süresini belirle

      // Puanı hesapla
      let score = 4; // Başlangıç puanı
      if (totalDuration > expectedSentenceDuration) {
        const durationExceeded = totalDuration - expectedSentenceDuration;
        const scoreReduction = Math.ceil(durationExceeded / 2) * 0.6;
        score -= scoreReduction;
      }
      score = Math.max(score, 0);

      return score * 12.5;
    }
  })
  .catch((error) => {
    // Hata durumunda burası çalışacak
    console.error(error);
  });
