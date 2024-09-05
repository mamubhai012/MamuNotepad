// Replace the following with your Firebase project's config object
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database
const database = firebase.database();
const notepadRef = database.ref('notepad');

// Get the textarea element
const textarea = document.getElementById('notepad');

// Listen for changes in the database
notepadRef.on('value', (snapshot) => {
    const text = snapshot.val();
    if (text !== null) {
        textarea.value = text;
    }
});

// Update the database when the user types
textarea.addEventListener('input', () => {
    notepadRef.set(textarea.value);
});
