import React from "react";
import "./NotFound.css";
import withLogger from "services/hoc/withLogger";

const NotFound = () => {
  return (
    <div className="NotFound" data-testid="NotFound">
      NotFound
    </div>
  );
};

export default withLogger(NotFound);
