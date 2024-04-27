import React from "react";
import "./Info.css";
import { Helmet } from "react-helmet";

function AboutUs() {
  return (
    <>
      <Helmet>
        <title>FreshCart | About Us</title>
      </Helmet>
      <section className="info-page">
        <div
          className="welcome-banner"
          style={{
            backgroundImage: `url(${require("../../assets/images/info-bg.png")})`,
          }}
        >
          <div className="welcome-banner-text">About Us</div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="description-area">
                <p>
                  Welcome to Biod - Your Ultimate Destination for Quality
                  Products!
                </p>
                <p>
                  At Biod, we believe in connecting people with the finest
                  selection of products that enhance their lives. We are an
                  online marketplace dedicated to curating a wide range of
                  high-quality products from trusted sellers, all conveniently
                  available at your fingertips.
                </p>
                <p>
                  Our mission is to provide a seamless and enjoyable shopping
                  experience for our customers. Whether you're searching for
                  trendy fashion apparel, innovative gadgets, home essentials,
                  or unique gifts, Biod has got you covered. We strive to bring
                  you a diverse collection of products that cater to your
                  individual style, passion, and needs.
                </p>
                <p>
                  What sets us apart is our commitment to quality. We
                  meticulously handpick each item, working closely with our
                  network of reputable sellers and brands to ensure that every
                  product meets our stringent standards. Rest assured, when you
                  shop with Biod, you're getting nothing less than the best.
                </p>
                <p>
                  Shopping on our user-friendly platform is a breeze. With
                  intuitive search and navigation features, you can effortlessly
                  discover the products you desire. We've also implemented
                  secure payment gateways to protect your transactions,
                  providing you with peace of mind throughout your shopping
                  journey.
                </p>
                <p>
                  We take pride in our exceptional customer service. Our
                  dedicated support team is always ready to assist you with any
                  questions, concerns, or feedback you may have. Your
                  satisfaction is our top priority, and we strive to exceed your
                  expectations at every step.
                </p>
                <p>
                  Join the Biod community today and experience the joy of
                  finding remarkable products that enhance your lifestyle.
                  Discover new trends, explore unique offerings, and shop with
                  confidence. Weare excited to embark on this journey with you
                  and look forward to serving you at Biod!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
