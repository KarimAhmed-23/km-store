import React from "react";
import "./Info.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Contact() {
  return (
    <>
      <Helmet>
        <title>Biod | Contact</title>
      </Helmet>
      <section className="info-page">
        <div
          className="welcome-banner"
          style={{
            backgroundImage: `url(${require("../../assets/images/info-bg.png")})`,
          }}
        >
          <div className="welcome-banner-text">contact Us</div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="description-area">
                <p>
                  You can reach the Biod team via the following email{" "}
                  <Link to="mailto:karimahmed250@gmail.com">
                    karimahmed250@gmail.com
                  </Link>{" "}
                  Our team will respond as soon as possible .
                </p>
                <p>
                  Alternatively, you can contact us through our hotline :{" "}
                  <Link to="tel:19123">19123</Link> .
                </p>
                <p>
                  You can also connect with us through our social media
                  channels:
                </p>
                <p>
                  <Link>Facebook</Link>
                </p>
                <p>
                  <Link>Twitter</Link>
                </p>
                <p>
                  <Link>Instagram</Link>
                </p>
                <p>
                  For any business inquiries or partnership opportunities,
                  please email us at :{" "}
                  <Link to="mailto:partnerships@biod.com">
                    partnerships@biod.com
                  </Link>
                </p>
                <p>
                  If you prefer traditional mail, you can send correspondence to
                  our mailing address: Biod Headquarters, 123 Main Street,
                  cairo, egypt
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
