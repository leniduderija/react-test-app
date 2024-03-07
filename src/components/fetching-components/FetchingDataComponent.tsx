import withLogger from "services/hoc/withLogger";

export const FetchingDataComponentBase = () => {
  return <div>Loading...</div>;
};

export const FetchingDataComponent = withLogger(FetchingDataComponentBase);
