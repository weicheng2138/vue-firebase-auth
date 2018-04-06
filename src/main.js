// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false;

// Initialize Firebase
let app;
let config = {
  apiKey: "AIzaSyAwWE91YZ00E0fDMpLYBOa7pm27rf8093A",
  authDomain: "vue-firebase-auth-d94a7.firebaseapp.com",
  databaseURL: "https://vue-firebase-auth-d94a7.firebaseio.com",
  projectId: "vue-firebase-auth-d94a7",
  storageBucket: "",
  messagingSenderId: "60440177176"
};
firebase.initializeApp(config);

//Redirect the routes if user is authenticated (onAuthStateChanged)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    });
  }
});
