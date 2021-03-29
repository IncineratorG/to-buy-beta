import React from 'react';
import ReadListFromMessageView from './views/ReadListFromMessageView';
import {useReadListFromMessageController} from './controllers/readListFromMessageController';

const ReadListFromMessage = () => {
  const controller = useReadListFromMessageController(null);

  return <ReadListFromMessageView controller={controller} />;
};

export default ReadListFromMessage;
