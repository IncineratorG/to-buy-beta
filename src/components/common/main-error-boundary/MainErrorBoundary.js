import React from 'react';
import {View, Text} from 'react-native';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';

class MainErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    SystemEventsHandler.onError({
      err:
        'MainErrorBoundary->ERROR: ' +
        error.toString() +
        ' - ' +
        errorInfo.toString(),
    });
    // console.log(
    //   'MainErrorBoundary->ERROR: ' +
    //     error.toString() +
    //     ' - ' +
    //     errorInfo.toString(),
    // );
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 20}}>Error occurred</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default MainErrorBoundary;
