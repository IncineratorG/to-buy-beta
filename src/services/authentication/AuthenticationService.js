import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';

const AuthenticationService = () => {
  GoogleSignin.configure({
    webClientId:
      '226612399906-eub2c19q837sh9jcru2erb1hqudq4oqv.apps.googleusercontent.com',
  });

  const init = async () => {
    // const onAuthStateChanged = (user) => {
    //   SystemEventsHandler.onInfo({
    //     info:
    //       'AuthenticationService->onAuthStateChanged(): ' +
    //       JSON.stringify(user),
    //   });
    // };
    //
    // auth().onAuthStateChanged(onAuthStateChanged);
  };

  const signIn = async () => {
    // // Get the users ID token
    // const {idToken} = await GoogleSignin.signIn();
    // SystemEventsHandler.onInfo({
    //   info: 'AuthenticationService->signIn(): ' + idToken,
    // });
    //
    // // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    //
    // // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
  };

  return {
    init,
    signIn,
  };
};

export default AuthenticationService;
