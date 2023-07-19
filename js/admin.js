import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  setDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

//Variable to access database collection
const db = collection(firestore, "Sentence");

//Get Submit Form
let submitButton = document.getElementById("submit");

//Create Event Listener To Allow Form Submission
submitButton.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  //Get Form Values
  let sentence = document.getElementById("sentence").value;
  let levelSelect = document.getElementById("level");
  let selectedLevel = levelSelect.options[levelSelect.selectedIndex].value;

  const sentenceRef = doc(db); // Yeni bir belge referansı oluşturun

  getDoc(sentenceRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        console.log("Already Exists");
      } else {
        //Save Form Data To Firebase
        setDoc(sentenceRef, {
          sentence: sentence,
          level: selectedLevel,
        })
          .then(() => {
            //alert
            alert("Your Form Has Been Submitted Successfully");

            //clear form after submission
            document.getElementById("clearForm").reset();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const A1 = [
  "Hello, how are you?",
  "My name is John.",
  "Nice to meet you.",
  "Today is a beautiful day.",
  "What language do you speak?",
  "I live in a small apartment.",
  "I am learning English.",
  "This book looks interesting.",
  "Where do you live?",
  "When will you arrive?",
  "Where is the nearest train station?",
  "Can you recommend a good restaurant?",
  "What's your name?",
  "How old are you?",
  "Where do you live?",
  "Do you have any pets?",
  "What is your favorite color?",
  "Can you play a musical instrument?",
  "What is your favorite food?",
];

const A2 = [
  "I have a dog.",
  "What would you like to do today?",
  "This place is very crowded.",
  "I need to work.",
  "I went to Istanbul last week.",
  "My favorite color is blue.",
  "I have seen this movie before.",
  "I like to wake up early in the mornings.",
  "What sport do you play?",
  "What are you doing right now?",
  "Do you like to read books?",
  "What time do you wake up in the morning?",
  "What is your favorite movie?",
  "Can you swim?",
  "Do you have any siblings?",
  "What do you do in your free time?",
  "What is your favorite sport?",
  "Can you ride a bicycle?",
  "Do you like to travel?",
  "What is your favorite subject in school?",
  "Do you have any hobbies?",
  "What is your favorite season?",
  "Can you speak any other languages?",
];

const B1 = [
  "I enjoy listening to music.",
  "Could you please help me with my homework?",
  "I will visit my grandparents next month.",
  "She speaks French fluently.",
  "It's important to eat healthy food.",
  "He plays the guitar very well.",
  "We went camping last summer.",
  "Can you recommend a good restaurant?",
  "They are planning a trip to Europe.",
  "I am studying for my exams.",
  "I have a job interview tomorrow.",
  "She is studying medicine at university.",
  "We went hiking in the mountains.",
  "What are your future plans?",
  "Describe your favorite book.",
  "Have you ever been to a concert?",
  "What is your dream job?",
  "Do you enjoy cooking?",
  "Describe your best friend.",
  "Have you ever traveled abroad?",
  "What is your favorite type of music?",
  "Do you like to do DIY projects?",
  "Describe your favorite holiday.",
  "Have you ever ridden a motorcycle?",
];

const B2 = [
  "The concert was amazing!",
  "I'm really looking forward to the weekend.",
  "She is a talented artist.",
  "I have a strong interest in photography.",
  "The film received rave reviews from critics.",
  "We had a heated debate about politics.",
  "He speaks multiple languages fluently.",
  "They are organizing a charity event.",
  "I'm considering studying abroad next year.",
  "The novel has an unexpected plot twist.",
  "What is your opinion on social media?",
  "Do you enjoy going to museums?",
  "Describe your ideal vacation.",
  "Have you ever participated in a marathon?",
  "What is your favorite type of cuisine?",
  "Do you like to dance?",
  "Describe your favorite TV show.",
  "Have you ever tried skydiving?",
  "What is your opinion on climate change?",
  "I saw Susie sitting in a shoeshine shop.",
  "Red lorry, yellow lorry.",
  "I scream, you scream, we all scream for ice cream.",
  "Unique New York, unique New York.",
  "Can you can a can as a canner can can a can?",
  "I saw a kitten eating chicken in the kitchen.",
  "Crisp crusts crackle and crunch.",
];

const C1 = [
  "The economy is experiencing steady growth.",
  "The research findings are statistically significant.",
  "She delivered a compelling presentation.",
  "They implemented a new strategy to increase sales.",
  "I have a deep understanding of the subject matter.",
  "The company achieved record-breaking profits this year.",
  "He is a renowned expert in his field.",
  "We conducted a comprehensive analysis of the data.",
  "The project requires meticulous attention to detail.",
  "The negotiations resulted in a mutually beneficial agreement.",
  "I attended a conference on artificial intelligence.",
  "She is fluent in five different languages.",
  "We traveled to Japan and experienced the culture.",
  "Discuss the impact of technology on society.",
  "Describe a memorable travel experience.",
  "What are the advantages and disadvantages of social media?",
  "Discuss the importance of environmental conservation.",
  "Describe a challenging project you have worked on.",
  "What are your thoughts on globalization?",
  "Discuss the benefits of learning a second language.",
  "Describe a significant historical event.",
  "What are the ethical implications of genetic engineering?",
  "Discuss the role of media in shaping public opinion.",
  "Describe a time when you had to make a difficult decision.",
  "What are the effects of climate change on ecosystems?",
  "Discuss the importance of teamwork in the workplace.",
  "Describe a book or movie that had a profound impact on you.",
  "What are the challenges and opportunities of renewable energy?",
];

const C2 = [
  "The symphony orchestra performed a flawless concert.",
  "She eloquently articulated her views on the matter.",
  "The novel is a literary masterpiece.",
  "The scientific discovery has groundbreaking implications.",
  "The team demonstrated exceptional teamwork and coordination.",
  "He is a leading authority in the scientific community.",
  "The artwork exhibits profound artistic expression.",
  "The court ruled in favor of the defendant based on compelling evidence.",
  "The project involved intricate problem-solving and innovative solutions.",
  "Her profound insights revolutionized the field of psychology.",
  "Discuss the impact of social media on personal relationships.",
  "Describe a cultural tradition that is important to you.",
  "What are the causes and consequences of income inequality?",
  "Discuss the role of education in shaping society.",
  "Describe a time when you had to overcome a major obstacle.",
  "The sixth sick sheik's sixth sheep's sick.",
  "She sells seashells by the seashore.",
  "I wish to wish the wish you wish to wish, but if you wish the wish the witch wishes, I won't wish the wish you wish to wish.",
  "Irish wristwatch, Swiss wristwatch.",
  "The seething sea ceaseth and thus the seething sea sufficeth us.",
  "Wayne went to Wales to watch walruses.",
  "Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn't very fuzzy, was he?",
  "How much wood would a woodchuck chuck, if the woodchuck could chuck wood?",
  "Peter Piper picked a peck of pickled peppers.",
  "She saw Sherif's shoes on the sofa. But was she so sure those were Sherif's shoes she saw?",
  "To sit in solemn silence in a dull, dark dock, In a pestilential prison, with a life-long lock, Awaiting the sensation of a short, sharp shock, From a cheap and chippy chopper on a big black block!",
  "The seething sea ceaseth and thus the seething sea sufficeth us.",
  "Denise sees the fleece, Denise sees the fleas. At least Denise could sneeze and feed and freeze the fleas.",
  "I thought a thought. But the thought I thought wasn't the thought I thought I thought.",
  "She stood on the balcony, inexplicably mimicking him hiccoughing, and amicably welcoming him home.",
  "I wish to wish the wish you wish to wish, but if you wish the wish the witch wishes, I won't wish the wish you wish to wish.",
  "The thirty-three thieves thought that they thrilled the throne throughout Thursday.",
  "Six sick hicks nick six slick bricks with picks and sticks.",
];

//------------Cümleleri Eklemek İçin---------------------
// window.onload = (e) => {
//   e.preventDefault();
//   const sentencesByLevel = {
//     A1: A1,
//     A2: A2,
//     B1: B1,
//     B2: B2,
//     C1: C1,
//     C2: C2,
//   };
//   for (const level in sentencesByLevel) {
//     for (const sentence of sentencesByLevel[level]) {
//       const sentenceRef = doc(db); // Yeni bir belge referansı oluşturun
//       getDoc(sentenceRef)
//         .then((docSnapshot) => {
//           if (docSnapshot.exists()) {
//             console.log(`"${sentence}" already exists for level ${level}`);
//           } else {
//             //Save Form Data To Firebase
//             setDoc(sentenceRef, {
//               sentence: sentence,
//               level: level,
//             })
//               .then(() => {
//                 console.log(`done`);
//                 //alert
//                 //clear form after submission
//                 document.getElementById("clearForm").reset();
//               })
//               .catch((error) => {
//                 console.log(
//                   `Error uploading "${sentence}" for level ${level}:`,
//                   error
//                 );
//               });
//           }
//         })
//         .catch((error) => {
//           console.log(
//             `Error checking "${sentence}" for level ${level}:`,
//             error
//           );
//         });
//     }
//   }
// };

//----------------------Silme-------------------- !!!

// const level = "B2";

// const sentenceRef = doc(db, "Sentence");
// const sentenceQuery = query(collection(db, "Sentence"), where("sentence", "==", sentence), where("level", "==", level));
// getDoc(sentenceRef)
//   .then((docSnapshot) => {
//     if (docSnapshot.exists()) {
//       console.log("Already Exists");
//     } else {
//       // Firestore'a Form Verilerini Kaydet
//       setDoc(sentenceRef, {
//         sentence: sentence,
//         level: level,
//       })
//         .then(() => {
//           // Başarılı bir şekilde gönderildiğine dair bildirim
//           console.log("Form Submitted Successfully");
//           // Formu temizle
//           document.getElementById("clearForm").reset();
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });
