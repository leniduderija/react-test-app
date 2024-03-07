import React, { useEffect, useState } from "react";
import "./Posts.css";
import { postsService, usersService, commentsService } from "services/api";
import { PostDto, PostExtended } from "services/type-defs/type-defs";
import {
  Search,
  List,
  FetchingDataComponent,
  FetchingFailedComponent,
} from "components";
import { useBoolean } from "hooks/use-boolean";
import withLogger from "services/hoc/withLogger";
import { LOG_MESSAGE } from "config";

function Posts() {
  const [posts, setPosts] = useState<PostExtended[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostExtended[]>(posts);

  const [isLoading, setIsLoading] = useBoolean(false);
  const [isFetching, setIsFetching] = useBoolean(false);
  const [isError, setIsError] = useBoolean(false);

  useEffect(() => {
    setIsFetching.on();
    const fetchData = async () => {
      const postsPromise = await postsService.getPosts();
      const usersPromise = await usersService.getUsers();
      const commentsPromise = await commentsService.getComments();

      const [posts, users, comments] = await Promise.all([
        postsPromise,
        usersPromise,
        commentsPromise,
      ]);

      const postsWithUsers: PostExtended[] = posts.map((post: PostDto) => {
        const user = users.find((user) => user.id === post.userId);
        const postComments = comments.filter(
          (comment) => comment.postId === post.id,
        );
        return { ...post, user, comments: postComments };
      });

      setPosts(postsWithUsers);
    };

    fetchData()
      .catch((error) => {
        setIsError.on();
        console.error("Error fetching data", error);
      })
      .finally(setIsFetching.off);

    return () => {
      if (isFetching) {
        setPosts([]);
        setIsFetching.off();
      }
    };
  }, [setIsError, setIsFetching]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm === "") return setFilteredPosts(posts);

    const filteredPosts = posts.filter((post) =>
      post.user?.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredPosts(filteredPosts);
  };

  if (isFetching) {
    return <FetchingDataComponent />;
  }

  if (isError) {
    return <FetchingFailedComponent />;
  }

  return (
    <>
      <Search
        placeholder="Search posts by author name..."
        onChange={handleSearch}
        loading={setIsLoading}
        classNames="posts-search"
        logMessage={LOG_MESSAGE}
      />
      <div className="Posts">
        {isLoading && <div className="loading-container">Loading...</div>}
        <List items={filteredPosts} logMessage={LOG_MESSAGE} />
      </div>
    </>
  );
}

export default withLogger(Posts);
