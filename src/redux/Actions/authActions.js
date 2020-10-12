export const signIn = (newUser) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(newUser.email, newUser.password)
      .then(() => {
        dispatch({type: 'SIGNIN_SUCCESS'});
      })
      .catch((err) => {
        dispatch({type: 'SIGNIN_ERROR', err});
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase.auth().signOut();
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    db.collection('Usuarios')
      .where('email', '==', newUser.email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((resp) => {
              return db.collection('Usuarios').doc(resp.user.uid).set({
                email: newUser.email,
                userID: resp.user.uid,
                rol: 'Main',
                firstName: newUser.firstName,
                lastName: newUser.lastName,
              });
            })
            .then(() => {
              dispatch({type: 'SIGNUP_SUCCESS'});
            })
            .catch((err) => {
              dispatch({type: 'SIGNUP_ERROR', err});
            });
        }
        snapshot.forEach((doc) => {
          dispatch({type: 'USER_ALREADY_EXISTS', doc});
        });
      })
      .catch((err) => {
        dispatch({type: 'SIGNUP_ERROR', err});
      });
  };
};
