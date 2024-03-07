import { Button } from "components/ui/button/Button";
import withLogger from "services/hoc/withLogger";
import { LOG_MESSAGE } from "config";

export const FetchingFailedComponentBase = () => {
  return (
    <div>
      Failed to fetch posts, try again.
      <br />
      <br />
      <Button
        onClick={() => window.location.assign(window.location.origin)}
        className="margin-y-10"
        logMessage={LOG_MESSAGE}
      >
        Refresh
      </Button>
    </div>
  );
};

export const FetchingFailedComponent = withLogger(FetchingFailedComponentBase);
