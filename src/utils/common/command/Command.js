const Command = ({executable, isAsync = false, runOnce = true}) => {
  let executed = false;

  const execute = (params) => {
    if (runOnce && executed) {
      return;
    }
    if (executable) {
      executable(params);
      executed = true;
    }
  };

  return {
    execute,
    isAsync,
  };
};

export default Command;
