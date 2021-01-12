const Command = ({executable, isAsync = false}) => {
  let executed = false;

  const execute = (params) => {
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
