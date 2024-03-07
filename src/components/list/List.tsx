import "./List.css";
import { Link } from "react-router-dom";
import { PostExtended } from "services/type-defs/type-defs";
import { PostCard } from "components/post-card/PostCard";
import withLogger from "services/hoc/withLogger";
import { LOG_MESSAGE } from "config";

interface ListProps {
  items: PostExtended[];
}
const ListBase = ({ items }: ListProps) => {
  return (
    <div className="List" data-testid="List">
      {items?.length > 0
        ? items.map((item) => (
            <Link
              key={item.id}
              to={item.id.toString()}
              className="d-flex w-50-with-margin"
            >
              <PostCard post={item} logMessage={LOG_MESSAGE} />
            </Link>
          ))
        : "No items"}
    </div>
  );
};

export const List = withLogger(ListBase);
