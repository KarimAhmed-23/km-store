import React, { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet, useNavigation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import SwitchSpinner from "../components/SwitchSpinner";
import { ThreeDots } from "react-loader-spinner";
import LoadingBar from "react-top-loading-bar";
import useGetPrevState from "../customHooks/UseGetPrevState";

function Layout() {
  const { state } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [process, setProgress] = useState(0);

  const prevState = useGetPrevState(state);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (prevState) {
      setProgress(10);
      if (state === "loading") {
        setProgress(25);
      } else {
        setProgress(100);
      }
    }
  }, [state]);

  return (
    <>
      <main className={`${loading ? "overflow-hidden" : ""}`}>
        {/* {state === "loading" && (
          <>
            <SwitchSpinner />
          </>
        )} */}

        <LoadingBar
          color="#0aad0a"
          progress={process}
          height={4}
          loaderSpeed={500}
          waitingTime={300}
        />

        <Navbar />
        <Outlet />
        <Footer />
        <ScrollToTop />
        {loading && (
          <div
            className="vh-100 w-100 top-0 end-0 position-fixed d-flex align-items-center justify-content-center"
            style={{ zIndex: "1000", backgroundColor: "#f0f3f2" }}
          >
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </main>
    </>
  );
}

export default Layout;
