import React from "react";
import "./Info.css";
import { Helmet } from "react-helmet";

function PurchasePolicy() {
  return (
    <>
      <Helmet>
        <title>FreshCart | Purchase Policy</title>
      </Helmet>
      <section className="info-page">
        <div
          className="welcome-banner"
          style={{
            backgroundImage: `url(${require("../../assets/images/info-bg.png")})`,
          }}
        >
          <div className="welcome-banner-text">Purchase Policy</div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="description-area">
                <p>
                  Policy Purchase Agreement
                  <br />
                  This Policy Purchase Agreement ("Agreement") is entered into
                  between biod ("Seller") and the customer ("Buyer") for the
                  purchase of policies through the Seller's e-commerce website
                  ("Website"). The Agreement outlines the terms and conditions
                  governing the purchase of policies through the Website.
                </p>
                <p>
                  1. Acceptance of Terms: By purchasing a policy through the
                  Website, the Buyer acknowledges and agrees to be bound by the
                  terms and conditions set forth in this Agreement.
                </p>
                <p>
                  2. Policy Description: The Seller provides detailed
                  descriptions of each policy available for purchase on the
                  Website. The Buyer is responsible for reviewing the policy
                  details, including coverage, terms, and any limitations or
                  exclusions, before making a purchase.
                </p>
                <p>
                  3. Purchase Process: The Buyer can select the desired policy
                  from the Website and proceed to the checkout page. The Buyer
                  must provide accurate and complete information, including
                  personal details and payment information, to complete the
                  purchase.
                </p>
                <p>
                  4. Pricing and Payment: The prices displayed on the Website
                  are in [currency] and are inclusive of any applicable taxes or
                  fees, unless otherwise specified. The Buyer agrees to pay the
                  total amount specified at the time of purchase using the
                  provided payment method.
                </p>
                <p>
                  5. Delivery: Upon successful payment, the Seller will provide
                  the Buyer with the policy details and any associated documents
                  via email or through the Buyer's account on the Website. It is
                  the Buyer's responsibility to ensure that the provided email
                  address is accurate and accessible.
                </p>
                <p>
                  6. Refunds and Cancellations: The policies purchased through
                  the Website may have specific refund or cancellation terms
                  outlined in their respective policy documents. The Buyer
                  should review these terms carefully. Refunds or cancellations
                  may be subject to certain conditions, fees, or restrictions as
                  determined by the Seller or the policy provider.
                </p>
                <p>
                  7. Limitation of Liability: The Seller shall not be held
                  liable for any damages, losses, or claims arising out of the
                  purchase or use of the policies, including but not limited to
                  any direct, indirect, incidental, or consequential damages.
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
                  agreement between the Seller and the Buyer regarding the
                  purchase of policies through the Website and supersedes any
                  prior agreements or understandings, whether oral or written.
                </p>
                <p>
                  By proceeding with the purchase of a policy through the
                  Seller's Website, the Buyer acknowledges that they have read,
                  understood, and agreed to the terms and conditions of this
                  Agreement.
                </p>
                <p>
                  If you have any questions or concerns, please contact our
                  customer support team .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PurchasePolicy;
