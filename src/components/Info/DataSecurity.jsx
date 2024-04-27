import React from "react";
import "./Info.css";
import { Helmet } from "react-helmet";

function DataSecurity() {
  return (
    <>
      <Helmet>
        <title>FreshCart | Data Security</title>
      </Helmet>
      <section className="info-page">
        <div
          className="welcome-banner"
          style={{
            backgroundImage: `url(${require("../../assets/images/info-bg.png")})`,
          }}
        >
          <div className="welcome-banner-text">Data Security</div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="description-area">
                <p>
                  Data Security Agreement
                  <br />
                  This Data Security Agreement ("Agreement") is entered into
                  between biod ("Seller") and the customer ("Buyer") for the
                  protection of data shared or collected through the Seller's
                  e-commerce website ("Website"). The Agreement outlines the
                  terms and conditions governing the security and privacy of
                  data on the Website.
                </p>
                <p>
                  1. Data Collection and Use: The Seller may collect and store
                  personal and non-personal data from the Buyer during the use
                  of the Website. The collected data may include, but is not
                  limited to, name, contact information, payment details, and
                  order history. The Seller will use this data solely for the
                  purpose of providing and improving the services offered on the
                  Website.
                </p>
                <p>
                  2. Data Security Measures: The Seller implements reasonable
                  administrative, technical, and physical safeguards to protect
                  the data collected on the Website from unauthorized access,
                  disclosure, alteration, or destruction. These security
                  measures may include encryption, secure socket layer (SSL)
                  technology, firewalls, access controls, and regular system
                  updates.
                </p>
                <p>
                  3. Third-Party Access: The Seller may engage third-party
                  service providers to assist in data storage, processing, or
                  other related services. These third parties are contractually
                  bound to maintain the confidentiality and security of the data
                  in accordance with applicable data protection laws and
                  regulations.
                </p>
                <p>
                  4. Data Sharing: The Seller will not sell, rent, or disclose
                  the Buyer's data to third parties for marketing purposes
                  without obtaining the Buyer's explicit consent. However, the
                  Seller may share the Buyer's data with trusted partners or
                  service providers who assist in the fulfillment of orders,
                  payment processing, shipping, or other necessary business
                  operations.
                </p>
                <p>
                  5. Data Retention: The Seller will retain the Buyer's data for
                  as long as necessary to fulfill the purposes for which it was
                  collected or as required by applicable laws and regulations.
                  Upon request, the Seller will delete or anonymize the Buyer's
                  data in accordance with applicable data protection laws.
                </p>
                <p>
                  6. Buyer's Responsibilities: The Buyer is responsible for
                  maintaining the confidentiality of their account credentials
                  and for promptly notifying the Seller of any unauthorized
                  access or suspected security breaches. The Buyer should also
                  ensure the accuracy and completeness of the data provided to
                  the Seller.
                </p>
                <p>
                  7. Limitation of Liability: The Seller shall not be held
                  liable for any damages, losses, or claims arising out of
                  unauthorized access, disclosure, or alteration of the Buyer's
                  data, unless caused by the Seller's willful misconduct or
                  gross negligence.
                </p>
                <p>
                  8. Governing Law and Jurisdiction: This Agreement shall be
                  governed by and interpreted in accordance with the laws of
                  [Jurisdiction]. Any disputes arising from or relating to this
                  Agreement shall be subject to the exclusive jurisdiction of
                  the courts located in [Jurisdiction].
                </p>
                <p>
                  9. Entire Agreement: This Agreement constitutes the entire
                  agreement between the Seller and the Buyer regarding the data
                  security on the Website and supersedes any prior agreements or
                  understandings, whether oral or written.
                </p>
                <p>
                  By using the Seller's Website and providing personal data, the
                  Buyer acknowledges that they have read, understood, and agreed
                  to the terms and conditions of this Agreement.
                </p>
                <p>
                  If you have any questions or concerns regarding data security,
                  please contact our customer support team .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DataSecurity;
