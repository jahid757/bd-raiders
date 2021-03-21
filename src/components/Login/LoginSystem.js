import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";

export const firebaseAuth = () => {

    if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);

}}

export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            return user;

        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}
//FaceBook Sign In
export const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
   return firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const user = result.user;
    return user
  })
  .catch((error) => {
    const errorMessage = error.message;
    return errorMessage
  });
}

// Email Sign in

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword( email, password)
    .then((response) => {
        const newUserInfo = response.user
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name)
        return newUserInfo;
      })
     .catch((error) => {
       const newUserInfo = {};
       newUserInfo.error = error.message
       newUserInfo.success = false;
       return newUserInfo;
     });
   }

   export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
      const newUserInfo = response.user
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo
    //   console.log('sign in info', response.user);
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }


   const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function() {
      console.log('user name Updated successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }
