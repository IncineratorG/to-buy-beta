import React from 'react';
import {voiceInputTestStyles} from './styles/voiceInputTestStyles';
import VoiceInputTestView from './views/VoiceInputTestView';

const VoiceInputTest = () => {
  const styles = voiceInputTestStyles;

  return <VoiceInputTestView styles={styles} />;
};

export default VoiceInputTest;
