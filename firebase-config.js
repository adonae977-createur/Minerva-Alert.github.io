// ============================================================
// firebase-config.js
// Initialisation Firebase partagée pour tout le site Minerva
// ============================================================

import { initializeApp }                    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged }      from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore }                     from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ── Remplace ces valeurs par celles de ta console Firebase ──
// Console Firebase → Paramètres ⚙️ → Général → Tes applications
const firebaseConfig = {
  apiKey:            "COLLE_TON_API_KEY",
  authDomain:        "COLLE_TON_AUTH_DOMAIN",
  projectId:         "COLLE_TON_PROJECT_ID",
  storageBucket:     "COLLE_TON_STORAGE_BUCKET",
  messagingSenderId: "COLLE_TON_MESSAGING_SENDER_ID",
  appId:             "COLLE_TON_APP_ID"
};

// Initialisation unique
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

export { app, auth, db, onAuthStateChanged };
