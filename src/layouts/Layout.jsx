import React, { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet, useNavigation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import SwitchSpinner from "../components/SwitchSpinner";
import { ThreeDots } from 'react-loader-spinner'


function Layout() {
  const { state } = useNavigation();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <main className={`${loading ? "overflow-hidden" : ""}`}>
        {state === "loading" && <SwitchSpinner />}

        <Navbar />
        <Outlet />
        <Footer />
        <ScrollToTop />
        {loading && (
          <div
            className="vh-100 w-100 top-0 end-0 position-fixed d-flex align-items-center justify-content-center"
            style={{ zIndex: "1000" , backgroundColor:"#333" }}
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
