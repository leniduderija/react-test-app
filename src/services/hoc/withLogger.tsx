import React, { useEffect } from "react";

type WithLoggerProps = any;

const withLogger = (WrappedComponent: any) => {
  return (props: WithLoggerProps) => {
    useEffect(() => {
      // Logging message on component mount
      console.log(`${props?.logMessage} ${WrappedComponent.name}`);
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return <WrappedComponent {...props} />;
  };
};

export default withLogger;
