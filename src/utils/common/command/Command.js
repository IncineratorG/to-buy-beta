const Command = ({executable, isAsync = false}) => {
  const execute = (params) => {
    if (executable) {
      executable(params);
    }
  };

  return {
    execute,
    isAsync,
  };
};

export default Command;
