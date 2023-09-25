import Nav from "components/Nav";
import Spinner from "components/Spinner";
import { Helmet } from "react-helmet-async";

const Layout = ({ children, title, loading }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title || "Home"} | The Sleeper Store </title>
        <meta
          name="description"
          content="E-commerce store built with React, Node, Express and Postgres"
        />
        <meta
          name="robots"
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <style type="text/css">{`
        html,body{
          height: 100%;
        }
    `}</style>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Nav />
        {loading ? (
          <>
            <Spinner size={100} loading />
          </>
        ) : (
          <div className="text-gray-700 mt-16 mx-auto px-2 lg:px-56 flex-grow h-full w-full">
            <main className="h-full">{children}</main>
          </div>
        )}

        <footer className="mt-auto flex justify-center py-2">
          <p className="text-sm text-gray-600 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 mt-4">
            &copy; {new Date().getFullYear()} The Sleeper Art
          </p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
