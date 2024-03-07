import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostDto, PostExtended } from "services/type-defs/type-defs";
import { postsService, usersService } from "services/api";
import {
  Button,
  PostCard,
  FetchingDataComponent,
  FetchingFailedComponent,
} from "components";
import { useBoolean } from "hooks/use-boolean";
import withLogger from "services/hoc/withLogger";
import { LOG_MESSAGE } from "config";

const SinglePost = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const [post, setPost] = useState<PostDto | null>(null);

  const [isFetching, setIsFetching] = useBoolean(false);
  const [isError, setIsError] = useBoolean(false);

  useEffect(() => {
    const fetchData = async () => {
      const postPromise = await postsService.getPost(Number(id));
      const commentsPromise = await postsService.getPostComments(Number(id));

      const [post, comments] = await Promise.all([
        postPromise,
        commentsPromise,
      ]);

      const userPromise = await usersService.getUser(Number(post.userId));

      const postWithUser: PostExtended = {
        ...post,
        comments,
        user: userPromise,
      };

      setPost(postWithUser);
    };

    fetchData()
      .catch((error) => {
        setIsError.on();
        console.error("Error fetching post data", error);
      })
      .finally(setIsFetching.off);

    return () => {
      if (isFetching) {
        setPost(null);
        setIsFetching.off();
      }
    };
  }, [setIsFetching, setIsError, id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isFetching) {
    return <FetchingDataComponent />;
  }

  if (isError) {
    return <FetchingFailedComponent />;
  }

  return (
    <div className="Post">
      {post ? (
        <PostCard
          post={post}
          defaultShowComments={true}
          logMessage={LOG_MESSAGE}
        />
      ) : (
        <p>Loading...</p>
      )}
      <br />
      <br />
      <Button onClick={() => navigate("/posts")} logMessage={LOG_MESSAGE}>
        Back
      </Button>
    </div>
  );
};

export default withLogger(SinglePost);
