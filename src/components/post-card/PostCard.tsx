import React, { ChangeEvent } from "react";
import "./PostCard.css";
import cn from "classnames";
import { Divider, Button, Card } from "components";
import { useDisclosure } from "hooks/use-disclosure";
import { PostExtended } from "services/type-defs/type-defs";
import withLogger from "services/hoc/withLogger";
import { LOG_MESSAGE } from "config";

interface PostCardProps {
  post: PostExtended;
  className?: string;
  defaultShowComments?: boolean;
}
const PostCardBase = ({
  post,
  className,
  defaultShowComments = false,
}: PostCardProps) => {
  const { isOpen, toggle } = useDisclosure();

  const postHasComments = !!post.comments?.length && post.comments?.length > 0;
  const showComments =
    (defaultShowComments && postHasComments) || (isOpen && postHasComments);

  return (
    <Card className={cn("PostCard", className)} logMessage={LOG_MESSAGE}>
      <header className="PostCard__header">
        <div className="PostCard__title">{post.title}</div>
        <div className="PostCard__author">
          By {post.user?.name || "Unknown"}
        </div>
        <Divider logMessage={LOG_MESSAGE} />
      </header>
      <main className="PostCard__body">
        <div className="PostCard__description">{post.body}</div>
        <Divider logMessage={LOG_MESSAGE} />
      </main>
      <footer className="PostCard__footer">
        <div className="PostCard__comments-count">
          Comments: {post.comments?.length || 0}
        </div>
        {!defaultShowComments &&
          !!post.comments?.length &&
          post.comments?.length > 0 && (
            <div className="w-100 d-flex justify-end">
              <Button
                onClick={(e: ChangeEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  toggle();
                }}
                logMessage={LOG_MESSAGE}
              >
                {isOpen ? "Hide" : "Show"} Comments
              </Button>
            </div>
          )}
      </footer>
      {!!post.comments?.length && post.comments?.length > 0 && (
        <div className="PostCard__comments-container">
          {showComments && (
            <div className="PostCard__comments">
              {post.comments?.map((comment) => (
                <div key={comment.id} className="PostCard__comment">
                  <div className="PostCard__comment-name">{comment.name}</div>
                  <div className="PostCard__comment-email">{comment.email}</div>
                  <div className="PostCard__comment-body">{comment.body}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export const PostCard = withLogger(PostCardBase);
