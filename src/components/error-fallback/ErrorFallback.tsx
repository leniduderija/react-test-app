import React from "react";
import "./ErrorFallback.css";
import { Button } from "components/ui/button/Button";
import withLogger from "services/hoc/withLogger";
import { LOG_MESSAGE } from "config";

const ErrorFallbackBase = () => {
  return (
    <div className="ErrorFallback" role="alert" data-testid="ErrorFallback">
      <h2 className="text-lg font-semibold">Something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
        logMessage={LOG_MESSAGE}
      >
        Refresh
      </Button>
    </div>
  );
};

export const ErrorFallback = withLogger(ErrorFallbackBase);
