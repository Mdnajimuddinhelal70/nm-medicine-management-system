<<<<<<< HEAD
=======

>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
<<<<<<< HEAD
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

const app = initializeApp(firebaseConfig);

export default app;
=======
  appId: import.meta.env.VITE_appId
};

const app = initializeApp(firebaseConfig);
export default app;
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
