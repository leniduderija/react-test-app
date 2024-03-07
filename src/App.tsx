import React, { lazy, Suspense } from "react";
import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { MainLayout, Container } from "components/layout";
import { LOG_MESSAGE } from "config";
import withLogger from "services/hoc/withLogger";

const Posts = lazy(() => import("pages/posts/Posts"));
const Post = lazy(() => import("pages/posts/[id]/SinglePost"));
const NotFound = lazy(() => import("components/not-found/NotFound"));

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <MainLayout>
            <div>Loading...</div>
          </MainLayout>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout logMessage={LOG_MESSAGE}>
                <Container logMessage={LOG_MESSAGE}>
                  <Outlet />
                </Container>
              </MainLayout>
            }
          >
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route
              path="/posts"
              index
              element={<Posts logMessage={LOG_MESSAGE} />}
            />
            <Route
              path="/posts/:id"
              element={<Post logMessage={LOG_MESSAGE} />}
            />

            <Route path="*" element={<NotFound logMessage={LOG_MESSAGE} />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default withLogger(App);
