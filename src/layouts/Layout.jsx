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
  const [progress, setProgress] = useState(0);

  const prevState = useGetPrevState(state);

  useLayoutEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (prevState) {
      let progressInterval;
      if (state === "loading") {
        setProgress(10);
        progressInterval = setInterval(() => {
          setProgress((progress) => {
            if (progress <= 90) {
              return progress + 5;
            } else {
              clearInterval(progressInterval);
              return progress;
            }
          });
        }, 1000);
      } else {
        setProgress(100);
        // clearInterval(progressInterval);
        return () => {
          clearInterval(progressInterval);
        }
      }
      
    }    
  }, [state, setProgress]);


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
          progress={progress}
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





// Direct Value Update:
// setProgress(progress + 5);
// In this approach, you directly update the state of progress by adding 5 to its current value. However, this method might cause issues if there are multiple state updates queued up simultaneously. React's state updates are asynchronous and may be batched together. When you rely on the current state's value directly, you might inadvertently use a stale state.



// Functional Update:
// setProgress(progress => progress + 5);
// Here, you pass a function to setProgress that receives the current state (progress) as an argument and returns the new state value by adding 5 to it. React guarantees that the function you provide to setProgress will receive the most up-to-date state value. This method is recommended when the new state depends on the previous state.

// The difference lies in how React handles state updates and ensures the correctness of the updated state. The functional update form (setProgress(progress => progress + 5)) is safer, especially when dealing with asynchronous updates or relying on the current state value. It helps prevent issues like stale state or race conditions that might occur with direct value updates (setProgress(progress + 5)).