import React from "react";
import Logo from "../../assets/images/logo.svg";
import "./Footer.css";
import { Link } from "react-router-dom";
import handleUrlName from "../../utilities/handleUrlName";
import { topCategories } from "../../constant";

function Footer() {
  return (
    <>
      <section className="contact-us-banner w-mr mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <div className="contact-us-banner-text">
                <h3>Did you have a problem</h3>
                <span>Connect with us</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="contact-us-banner-email">
                <Link to="mailto:karimahmed250@gmail.com">
                  <svg width="60" height="60" viewBox="0 0 60 60">
                    <link
                      type="text/css"
                      rel="stylesheet"
                      id="dark-mode-custom-link"
                    />
                    <link
                      type="text/css"
                      rel="stylesheet"
                      id="dark-mode-general-link"
                    />
                    <style
                      lang="en"
                      type="text/css"
                      id="dark-mode-custom-style"
                    />
                    <style
                      lang="en"
                      type="text/css"
                      id="dark-mode-native-style"
                    />
                    <style
                      lang="en"
                      type="text/css"
                      id="dark-mode-native-sheet"
                    />
                    <g
                      id="Group_36"
                      data-name="Group 36"
                      transform="translate(-1002 -1429)"
                    >
                      <circle
                        id="Ellipse_66"
                        data-name="Ellipse 66"
                        cx="30"
                        cy="30"
                        r="30"
                        transform="translate(1062 1489) rotate(180)"
                        className="tst--2"
                      />
                      <path
                        id="Vector"
                        d="M15,0A15.005,15.005,0,0,1,0-15,15.005,15.005,0,0,1,15-30h7.5v3H15A12.154,12.154,0,0,0,3-15,12.154,12.154,0,0,0,15-3,12.154,12.154,0,0,0,27-15v-2.145A2.425,2.425,0,0,0,24.75-19.5a2.425,2.425,0,0,0-2.25,2.355V-15A7.5,7.5,0,0,1,15-7.5,7.5,7.5,0,0,1,7.5-15,7.5,7.5,0,0,1,15-22.5a7.456,7.456,0,0,1,5.31,2.2,5.555,5.555,0,0,1,4.44-2.2A5.269,5.269,0,0,1,30-17.145V-15A15.005,15.005,0,0,1,15,0Zm0-19.5A4.494,4.494,0,0,0,10.5-15,4.494,4.494,0,0,0,15-10.5,4.494,4.494,0,0,0,19.5-15,4.494,4.494,0,0,0,15-19.5Z"
                        transform="translate(1047 1444) rotate(180)"
                        fill="#fff"
                      />
                    </g>
                  </svg>
                  <span>karimahmed250@gmail.com</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="row ">
            <div className="col-lg-3 col-12">
              <div className="footer-menu">
                <div className="footer-about">
                  <div className="footer-about-logo">
                    <img className="img-fluid" src={Logo} />
                  </div>
                  <div className="social-media-icons">
                    <Link>
                      <i className="fab fa-facebook-f" />
                    </Link>
                    <Link>
                      <i className="fab fa-twitter" />
                    </Link>
                    <Link>
                      <i className="fab fa-instagram" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg col-md">
              <div className="footer-menu">
                <h5 className="footer-menu-title">main </h5>
                <ul className="footer-menu-ul">
                  <li className="footer-menu-item">
                    <Link
                      className="footer-menu-link hvr-icon-wobble-horizontal"
                      to={"/"}
                    >
                      <span className="footer-menu-link-text">home</span>
                      <i className="fas fa-chevron-right hvr-icon" />
                    </Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link
                      className="footer-menu-link hvr-icon-wobble-horizontal"
                      to="/about-us"
                    >
                      <span className="footer-menu-link-text">about us </span>
                      <i className="fas fa-chevron-right hvr-icon" />
                    </Link>
                  </li>

                  <li className="footer-menu-item">
                    <Link
                      className="footer-menu-link hvr-icon-wobble-horizontal"
                      to="/products"
                    >
                      <span className="footer-menu-link-text"> store</span>
                      <i className="fas fa-chevron-right hvr-icon" />
                    </Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link
                      className="footer-menu-link hvr-icon-wobble-horizontal"
                      to="/contact"
                    >
                      <span className="footer-menu-link-text"> contact us</span>
                      <i className="fas fa-chevron-right hvr-icon" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg col-md">
              <div className="footer-menu">
                <h5 className="footer-menu-title">Popular categories</h5>
                <ul className="footer-menu-ul">
                  {topCategories.slice(0,7).map((el ,index) => (
                    <li className="footer-menu-item" key={index}>
                      <Link
                        className="footer-menu-link hvr-icon-wobble-horizontal"
                        to={el.url}
                      >
                        <span className="footer-menu-link-text">
                          {el.name}
                        </span>
                        <i className="fas fa-chevron-right hvr-icon" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg col-md">
              <div className="footer-menu">
                <h5 className="footer-menu-title"> important information </h5>
                <ul className="footer-menu-ul">
                  <li className="footer-menu-item">
                    <Link
                      className="footer-menu-link hvr-icon-wobble-horizontal"
                      to="/data-security"
                    >
                      <span className="footer-menu-link-text">
                        data security{" "}
                      </span>
                      <i className="fas fa-chevron-right hvr-icon" />
                    </Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link
                      className="footer-menu-link hvr-icon-wobble-horizontal"
                      to="/shipping-policy"
                    >
                      <span className="footer-menu-link-text">
                        Shipping Policy
                      </span>
                      <i className="fas fa-chevron-right hvr-icon" />
                    </Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link
                      className="footer-menu-link hvr-icon-wobble-horizontal"
                      to="/purchase-policy"
                    >
                      <span className="footer-menu-link-text">
                        {" "}
                        Purchase Policy
                      </span>
                      <i className="fas fa-chevron-right hvr-icon" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg col-md">
              <div className="footer-menu">
                <h5 className="footer-menu-title"> Contact info</h5>
                <ul className="footer-menu-ul">
                  <li className="footer-menu-item">
                    <span className="footer-menu-text footer-menu-link">
                      99253116631
                    </span>
                  </li>
                  <li className="footer-menu-item">
                    <Link
                      className="footer-menu-link"
                      to="mailto:karimahmed250@gmail.com"
                    >
                      <span className="footer-menu-link-text">
                        karimahmed250@gmail.com
                      </span>
                    </Link>
                  </li>
                  <li className="footer-menu-item">
                    <span className="footer-menu-text footer-menu-link">
                      Saturday - Thursday
                      <br />
                      9:00 - 22:00
                      <br />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="copy-rights-area">
                <p className="copy-rights-text">All rights reserved @2021</p>
                <div className="payment-ways">
                  <div className="payment-way">
                    <svg width="44.929" height={20} viewBox="0 0 44.929 20">
                      <link
                        type="text/css"
                        rel="stylesheet"
                        id="dark-mode-custom-link"
                      />
                      <link
                        type="text/css"
                        rel="stylesheet"
                        id="dark-mode-general-link"
                      />
                      <style
                        lang="en"
                        type="text/css"
                        id="dark-mode-custom-style"
                        dangerouslySetInnerHTML={{ __html: "" }}
                      />
                      <style
                        lang="en"
                        type="text/css"
                        id="dark-mode-native-style"
                        dangerouslySetInnerHTML={{ __html: "" }}
                      />
                      <style
                        lang="en"
                        type="text/css"
                        id="dark-mode-native-sheet"
                        dangerouslySetInnerHTML={{ __html: "" }}
                      />
                      <g
                        id="Group_5063"
                        data-name="Group 5063"
                        transform="translate(-1125 -2056)"
                      >
                        <path
                          id="Vector"
                          d="M17.059.256,11.176,14.289H7.339L4.444,3.09a1.539,1.539,0,0,0-.862-1.232A15.191,15.191,0,0,0,0,.664L.085.256H6.264a1.693,1.693,0,0,1,1.674,1.43l1.53,8.121L13.244.256Zm5.188,0-3,14.033H15.614l3-14.033h3.63ZM32.1,9.708C32.11,6,26.975,5.8,27.008,4.145c.012-.5.491-1.038,1.54-1.175a6.855,6.855,0,0,1,3.58.628L32.765.62a9.787,9.787,0,0,0-3.4-.62c-3.589,0-6.114,1.906-6.134,4.638-.024,2.021,1.8,3.147,3.177,3.82,1.415.687,1.89,1.129,1.883,1.743-.01.942-1.13,1.358-2.172,1.374a7.586,7.586,0,0,1-3.729-.887l-.659,3.076a11.02,11.02,0,0,0,4.036.745c3.815,0,6.311-1.884,6.322-4.8Zm9.477,4.582h3.357L42,.256H38.9a1.652,1.652,0,0,0-1.546,1.029l-5.448,13h3.812l.756-2.1h4.658l.44,2.1ZM37.52,9.317l1.912-5.27,1.1,5.27H37.52ZM26.893,18.152H25.418v1.373h1.65v.413H24.921V16.129h2.063v.413H25.418v1.2h1.475v.407Zm.937-2.226h.5v4.012h-.5Zm1.751,2.735a.874.874,0,0,0,.938.949,1.784,1.784,0,0,0,.758-.141l.09.356a2.231,2.231,0,0,1-.916.175,1.274,1.274,0,0,1-1.345-1.385,1.323,1.323,0,0,1,1.283-1.469,1.151,1.151,0,0,1,1.13,1.283,1.2,1.2,0,0,1-.017.232H29.581Zm1.458-.356a.706.706,0,0,0-.689-.8.815.815,0,0,0-.763.8Zm3.186,1.537A1.919,1.919,0,0,1,33.44,20a1.3,1.3,0,0,1-1.362-1.4,1.394,1.394,0,0,1,1.469-1.458,1.562,1.562,0,0,1,.689.147l-.113.379a1.221,1.221,0,0,0-.577-.13.949.949,0,0,0-.966,1.035A.938.938,0,0,0,33.53,19.6a1.424,1.424,0,0,0,.61-.13l.085.373Zm1.395-3.295V17.2h.712v.378H35.62v1.475c0,.339.1.531.373.531a.918.918,0,0,0,.288-.034l.023.379a1.364,1.364,0,0,1-.441.068.71.71,0,0,1-.537-.209,1.069,1.069,0,0,1-.192-.718V17.581H34.71V17.2h.424v-.508l.486-.147Zm1.406,1.509c0-.322-.006-.6-.023-.853h.435l.023.542h.016a.828.828,0,0,1,.763-.6,1.053,1.053,0,0,1,.136.011v.469a.757.757,0,0,0-.17-.012.692.692,0,0,0-.667.633,1.5,1.5,0,0,0-.017.232v1.458h-.5V18.056Zm4.407.491A1.34,1.34,0,0,1,40.072,20a1.3,1.3,0,0,1-1.311-1.407,1.337,1.337,0,0,1,1.356-1.447,1.293,1.293,0,0,1,1.317,1.4Zm-2.165.028c0,.6.339,1.051.825,1.051s.831-.447.831-1.063c0-.463-.232-1.046-.819-1.046S39.269,18.062,39.269,18.576Zm2.927-.633c0-.288-.006-.514-.023-.74h.441l.028.452h.011a1.013,1.013,0,0,1,.9-.509c.378,0,.966.226.966,1.164v1.628h-.5V18.361c0-.441-.164-.808-.633-.808a.717.717,0,0,0-.667.509.71.71,0,0,0-.034.232v1.644h-.5Z"
                          transform="translate(1125 2056)"
                          fill="#1a1f71"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="payment-way">
                    <svg width="16.949" height={20} viewBox="0 0 16.949 20">
                      <link
                        type="text/css"
                        rel="stylesheet"
                        id="dark-mode-custom-link"
                      />
                      <link
                        type="text/css"
                        rel="stylesheet"
                        id="dark-mode-general-link"
                      />
                      <style
                        lang="en"
                        type="text/css"
                        id="dark-mode-custom-style"
                        dangerouslySetInnerHTML={{ __html: "" }}
                      />
                      <style
                        lang="en"
                        type="text/css"
                        id="dark-mode-native-style"
                        dangerouslySetInnerHTML={{ __html: "" }}
                      />
                      <style
                        lang="en"
                        type="text/css"
                        id="dark-mode-native-sheet"
                        dangerouslySetInnerHTML={{ __html: "" }}
                      />
                      <g
                        id="Group_5064"
                        data-name="Group 5064"
                        transform="translate(-1200 -2056)"
                      >
                        <path
                          id="Vector"
                          d="M14.431,1.508C13.5.453,11.831,0,9.689,0H3.474a.89.89,0,0,0-.879.751L.007,17.164a.534.534,0,0,0,.527.617H4.371l.964-6.112-.03.191a.887.887,0,0,1,.876-.751H8c3.582,0,6.387-1.455,7.206-5.664q.036-.187.064-.364h0A3.973,3.973,0,0,0,14.431,1.508Z"
                          transform="translate(1200 2056)"
                          fill="#27346a"
                        />
                        <path
                          id="Vector-2"
                          data-name="Vector"
                          d="M6.8,4.521a.78.78,0,0,1,.336-.076h4.873a10.169,10.169,0,0,1,1.607.117q.206.033.411.079.289.064.571.156a4.4,4.4,0,0,1,.674.285,3.973,3.973,0,0,0-.843-3.573C13.5.453,11.831,0,9.689,0H3.473a.89.89,0,0,0-.879.751L.007,17.164a.533.533,0,0,0,.527.617H4.371L6.37,5.1A.779.779,0,0,1,6.8,4.521Z"
                          transform="translate(1200 2056)"
                          fill="#27346a"
                        />
                        <path
                          id="Vector-3"
                          data-name="Vector"
                          d="M11.11.364C10.291,4.572,7.486,6.028,3.9,6.028H2.08a.886.886,0,0,0-.875.751l-1.2,7.6a.467.467,0,0,0,.461.54H3.7a.778.778,0,0,0,.768-.657L4.5,14.1l.61-3.864.039-.214a.778.778,0,0,1,.768-.657H6.4c3.133,0,5.587-1.273,6.3-4.955A4.22,4.22,0,0,0,12.059.683,3.09,3.09,0,0,0,11.174,0c-.019.119-.039.24-.064.364Z"
                          transform="translate(1204.1 2061.081)"
                          fill="#2790c3"
                        />
                        <path
                          id="Vector-4"
                          data-name="Vector"
                          d="M9.111.294Q8.919.238,8.724.2T8.314.117A10.112,10.112,0,0,0,6.706,0H1.834A.769.769,0,0,0,1.5.076a.776.776,0,0,0-.433.581L.03,7.223,0,7.415a.886.886,0,0,1,.875-.751H2.7C6.281,6.664,9.086,5.209,9.905,1,9.93.876,9.95.755,9.969.636A4.424,4.424,0,0,0,9.3.352Q9.2.321,9.111.294"
                          transform="translate(1205.305 2060.445)"
                          fill="#1f264f"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="payment-way">
                    <svg
                      version="1.1"
                      id="Layer_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 152.4 108"
                      style={{ enableBackground: "new 0 0 152.4 108" }}
                      xmlSpace="preserve"
                    >
                      <style
                        type="text/css"
                        dangerouslySetInnerHTML={{
                          __html:
                            "\n\t.st0{fill:none;}\n\t.st1{fill:#FF5F00;}\n\t.st2{fill:#EB001B;}\n\t.st3{fill:#F79E1B;}\n",
                        }}
                      />
                      <g>
                        <rect
                          y={0}
                          className="st0"
                          width="152.4"
                          height={108}
                        />
                        <g>
                          <rect
                            x="60.4"
                            y="25.7"
                            className="st1"
                            width="31.5"
                            height="56.6"
                          />
                          <path
                            className="st2"
                            d="M62.4,54c0-11,5.1-21.5,13.7-28.3c-15.6-12.3-38.3-9.6-50.6,6.1C13.3,47.4,16,70,31.7,82.3
			c13.1,10.3,31.4,10.3,44.5,0C67.5,75.5,62.4,65,62.4,54z"
                          />
                          <path
                            className="st3"
                            d="M134.4,54c0,19.9-16.1,36-36,36c-8.1,0-15.9-2.7-22.2-7.7c15.6-12.3,18.3-34.9,6-50.6c-1.8-2.2-3.8-4.3-6-6
			c15.6-12.3,38.3-9.6,50.5,6.1C131.7,38.1,134.4,45.9,134.4,54z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="payment-way">
                    <svg
                      version="1.1"
                      id="Capa_1"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                    >
                      <path
                        style={{ fill: "#306FC5" }}
                        d="M512,402.281c0,16.716-13.55,30.267-30.265,30.267H30.265C13.55,432.549,0,418.997,0,402.281V109.717  c0-16.715,13.55-30.266,30.265-30.266h451.47c16.716,0,30.265,13.551,30.265,30.266V402.281L512,402.281z"
                      />
                      <path
                        style={{
                          opacity: "0.15",
                          fill: "#202121",
                          enableBackground: "new",
                        }}
                        d="M21.517,402.281V109.717  c0-16.715,13.552-30.266,30.267-30.266h-21.52C13.55,79.451,0,93.001,0,109.717v292.565c0,16.716,13.55,30.267,30.265,30.267h21.52  C35.07,432.549,21.517,418.997,21.517,402.281z"
                      />
                      <g>
                        <polygon
                          style={{ fill: "#FFFFFF" }}
                          points="74.59,220.748 89.888,220.748 82.241,201.278  "
                        />
                        <polygon
                          style={{ fill: "#FFFFFF" }}
                          points="155.946,286.107 155.946,295.148 181.675,295.148 181.675,304.885 155.946,304.885    155.946,315.318 184.455,315.318 197.666,300.712 185.151,286.107  "
                        />
                        <polygon
                          style={{ fill: "#FFFFFF" }}
                          points="356.898,201.278 348.553,220.748 364.548,220.748  "
                        />
                        <polygon
                          style={{ fill: "#FFFFFF" }}
                          points="230.348,320.875 230.348,281.241 212.268,300.712  "
                        />
                        <path
                          style={{ fill: "#FFFFFF" }}
                          d="M264.42,292.368c-0.696-4.172-3.48-6.261-7.654-6.261h-14.599v12.516h15.299   C261.637,298.624,264.42,296.539,264.42,292.368z"
                        />
                        <path
                          style={{ fill: "#FFFFFF" }}
                          d="M313.09,297.236c1.391-0.697,2.089-2.785,2.089-4.867c0.696-2.779-0.698-4.172-2.089-4.868   c-1.387-0.696-3.476-0.696-5.559-0.696h-13.91v11.127h13.909C309.613,297.932,311.702,297.932,313.09,297.236z"
                        />
                        <path
                          style={{ fill: "#FFFFFF" }}
                          d="M413.217,183.198v8.344l-4.169-8.344H376.37v8.344l-4.174-8.344h-44.502   c-7.648,0-13.909,1.392-19.469,4.173v-4.173h-31.289v0.696v3.477c-3.476-2.78-7.648-4.173-13.211-4.173h-111.95l-7.652,17.384   l-7.647-17.384h-25.031h-10.431v8.344l-3.477-8.344h-0.696H66.942l-13.909,32.68L37.042,251.34l-0.294,0.697h0.294h35.463h0.444   l0.252-0.697l4.174-10.428h9.039l4.172,11.125h40.326v-0.697v-7.647l3.479,8.343h20.163l3.475-8.343v7.647v0.697h15.993h79.965   h0.696v-18.08h1.394c1.389,0,1.389,0,1.389,2.087v15.297h50.065v-4.172c4.172,2.089,10.426,4.172,18.771,4.172h20.863l4.172-11.123   h9.732l4.172,11.123h40.328v-6.952v-3.476l6.261,10.428h1.387h0.698h30.595v-68.143h-31.291l0,0H413.217z M177.501,241.609h-6.955   h-4.171v-4.169v-34.076l-0.696,1.595v-0.019l-16.176,36.669h-0.512h-3.719h-6.017l-16.687-38.245v38.245h-23.64l-4.867-10.43   H70.417l-4.868,10.43H53.326l20.57-48.675h17.382l19.469,46.587v-46.587h4.171h14.251l0.328,0.697h0.024l8.773,19.094l6.3,14.306   l0.223-0.721l13.906-33.375H177.5v48.674H177.501L177.501,241.609z M225.481,203.364h-27.119v9.039h26.423v9.734h-26.423v9.738   h27.119v10.427h-38.939v-49.367h38.939V203.364L225.481,203.364z M275.076,221.294c0.018,0.016,0.041,0.027,0.063,0.042   c0.263,0.278,0.488,0.557,0.68,0.824c1.332,1.746,2.409,4.343,2.463,8.151c0.004,0.066,0.007,0.131,0.011,0.197   c0,0.038,0.007,0.071,0.007,0.11c0,0.022-0.002,0.039-0.002,0.06c0.016,0.383,0.026,0.774,0.026,1.197v9.735h-10.428v-5.565   c0-2.781,0-6.954-2.089-9.735c-0.657-0.657-1.322-1.09-2.046-1.398c-1.042-0.675-3.017-0.686-6.295-0.686h-12.52v17.384h-11.818   v-48.675h26.425c6.254,0,10.428,0,13.906,2.086c3.407,2.046,5.465,5.439,5.543,10.812c-0.161,7.4-4.911,11.46-8.326,12.829   C270.676,218.662,272.996,219.129,275.076,221.294z M298.491,241.609h-11.822v-48.675h11.822V241.609z M434.083,241.609h-15.3   l-22.25-36.855v30.595l-0.073-0.072v6.362h-11.747v-0.029h-11.822l-4.172-10.43H344.38l-4.172,11.123h-13.211   c-5.559,0-12.517-1.389-16.687-5.561c-4.172-4.172-6.256-9.735-6.256-18.773c0-6.953,1.389-13.911,6.256-19.472   c3.474-4.175,9.735-5.562,17.382-5.562h11.128v10.429h-11.128c-4.172,0-6.254,0.693-9.041,2.783   c-2.082,2.085-3.474,6.256-3.474,11.123c0,5.564,0.696,9.04,3.474,11.821c2.091,2.089,4.87,2.785,8.346,2.785h4.867l15.991-38.243   h6.957h10.428l19.472,46.587v-2.376v-15.705v-1.389v-27.116h17.382l20.161,34.07v-34.07h11.826v47.977h0.002L434.083,241.609   L434.083,241.609z"
                        />
                        <path
                          style={{ fill: "#FFFFFF" }}
                          d="M265.161,213.207c0.203-0.217,0.387-0.463,0.543-0.745c0.63-0.997,1.352-2.793,0.963-5.244   c-0.016-0.225-0.057-0.433-0.105-0.634c-0.013-0.056-0.011-0.105-0.026-0.161l-0.007,0.001c-0.346-1.191-1.229-1.923-2.11-2.367   c-1.394-0.693-3.48-0.693-5.565-0.693h-13.909v11.127h13.909c2.085,0,4.172,0,5.565-0.697c0.209-0.106,0.395-0.25,0.574-0.413   l0.002,0.009C264.996,213.389,265.067,213.315,265.161,213.207z"
                        />
                        <path
                          style={{ fill: "#FFFFFF" }}
                          d="M475.105,311.144c0-4.867-1.389-9.736-3.474-13.212v-31.289h-0.032v-2.089c0,0-29.145,0-33.483,0   c-4.336,0-9.598,4.171-9.598,4.171v-4.171h-31.984c-4.87,0-11.124,1.392-13.909,4.171v-4.171h-57.016v2.089v2.081   c-4.169-3.474-11.824-4.171-15.298-4.171h-37.549v2.089v2.081c-3.476-3.474-11.824-4.171-15.998-4.171H215.05l-9.737,10.431   l-9.04-10.431h-2.911h-4.737h-54.93v2.089v5.493v62.651h61.19l10.054-10.057l8.715,10.057h0.698h35.258h1.598h0.696h0.692v-6.953   v-9.039h3.479c4.863,0,11.124,0,15.991-2.089v17.382v1.394h31.291v-1.394V317.4h1.387c2.089,0,2.089,0,2.089,2.086v14.6v1.394   h94.563c6.263,0,12.517-1.394,15.993-4.175v2.781v1.394h29.902c6.254,0,12.517-0.695,16.689-3.478   c6.402-3.841,10.437-10.64,11.037-18.749c0.028-0.24,0.063-0.48,0.085-0.721l-0.041-0.039   C475.087,312.043,475.105,311.598,475.105,311.144z M256.076,306.973h-13.91v2.081v4.174v4.173v7.649h-22.855l-13.302-15.299   l-0.046,0.051l-0.65-0.748l-15.297,15.996h-44.501v-48.673h45.197l12.348,13.525l2.596,2.832l0.352-0.365l14.604-15.991h36.852   c7.152,0,15.161,1.765,18.196,9.042c0.365,1.441,0.577,3.043,0.577,4.863C276.237,304.189,266.502,306.973,256.076,306.973z    M325.609,306.276c1.389,2.081,2.085,4.867,2.085,9.041v9.732h-11.819v-6.256c0-2.786,0-7.65-2.089-9.739   c-1.387-2.081-4.172-2.081-8.341-2.081H292.93v18.077h-11.82v-49.369h26.421c5.559,0,10.426,0,13.909,2.084   c3.474,2.088,6.254,5.565,6.254,11.128c0,7.647-4.865,11.819-8.343,13.212C322.829,303.49,324.914,304.885,325.609,306.276z    M373.589,286.107h-27.122v9.04h26.424v9.737h-26.424v9.736h27.122v10.429H334.65V275.68h38.939V286.107z M402.791,325.05h-22.252   v-10.429h22.252c2.082,0,3.476,0,4.87-1.392c0.696-0.697,1.387-2.085,1.387-3.477c0-1.394-0.691-2.778-1.387-3.475   c-0.698-0.695-2.091-1.391-4.176-1.391c-11.126-0.696-24.337,0-24.337-15.296c0-6.954,4.172-14.604,16.689-14.604h22.945v11.819   h-21.554c-2.085,0-3.478,0-4.87,0.696c-1.387,0.697-1.387,2.089-1.387,3.478c0,2.087,1.387,2.783,2.778,3.473   c1.394,0.697,2.783,0.697,4.172,0.697h6.259c6.259,0,10.43,1.391,13.211,4.173c2.087,2.087,3.478,5.564,3.478,10.43   C420.869,320.179,414.611,325.05,402.791,325.05z M462.59,320.179c-2.778,2.785-7.648,4.871-14.604,4.871H425.74v-10.429h22.245   c2.087,0,3.481,0,4.87-1.392c0.693-0.697,1.391-2.085,1.391-3.477c0-1.394-0.698-2.778-1.391-3.475   c-0.696-0.695-2.085-1.391-4.172-1.391c-11.122-0.696-24.337,0-24.337-15.295c0-6.609,3.781-12.579,13.106-14.352   c1.115-0.154,2.293-0.253,3.583-0.253h22.948v11.819h-15.3h-5.561h-0.696c-2.087,0-3.476,0-4.865,0.696   c-0.7,0.697-1.396,2.089-1.396,3.478c0,2.087,0.696,2.783,2.785,3.473c1.389,0.697,2.78,0.697,4.172,0.697h0.691h5.565   c3.039,0,5.337,0.375,7.44,1.114c1.926,0.697,8.302,3.549,9.728,10.994c0.124,0.78,0.215,1.594,0.215,2.495   C466.761,313.925,465.37,317.401,462.59,320.179z"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
