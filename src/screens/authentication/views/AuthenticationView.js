import React from 'react';
import {View, StyleSheet} from 'react-native';
import AddButton from '../../../components/common/add-button/AddButton';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../services/Services';

const AuthenticationView = () => {
  const signInButtonClickHandler = async () => {
    SystemEventsHandler.onInfo({info: 'signInButtonClickHandler()'});

    const authenticationService = Services.get(
      Services.serviceTypes.AUTHENTICATION,
    );

    let result = null;
    try {
      result = await authenticationService.signIn();
    } catch (e) {
      SystemEventsHandler.onError({
        err: 'signInButtonClickHandler()->ERROR: ' + JSON.stringify(e),
      });
    }
    SystemEventsHandler.onInfo({
      info: 'signInButtonClickHandler(): ' + JSON.stringify(result),
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <AddButton visible={true} onClick={signInButtonClickHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthenticationView;
