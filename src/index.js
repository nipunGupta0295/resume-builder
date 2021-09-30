import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { composeWithDevTools} from 'redux-devtools-extension'

var firebaseConfig = {
  apiKey: "AIzaSyDXgI5PnKDE2tlsi1C4l1KnjiDZKyh17GE",
  authDomain: "resume-7002c.firebaseapp.com",
  projectId: "resume-7002c",
  storageBucket: "resume-7002c.appspot.com",
  messagingSenderId: "532662736619",
  appId: "1:532662736619:web:6e580811545a4e9c77d0ae"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore()

const reduxStore = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})), 
    reduxFirestore(firebase) // redux bindings for firestore,  
  )
);


ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={firebaseConfig}
      dispatch={reduxStore.dispatch}
      createFirestoreInstance={createFirestoreInstance}
      >
      <App />
    </ReactReduxFirebaseProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);