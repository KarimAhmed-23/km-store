import React from "react";
import "./Info.css";
import { Helmet } from "react-helmet";

function ShippingPolicy() {
  return (
   <>
   
   <Helmet>
        <title>FreshCart | Shipping Policy</title>
      </Helmet>
    <section className="info-page">
      <div
        className="welcome-banner"
        style={{
          backgroundImage: `url(${require("../../assets/images/info-bg.png")})`,
        }}
      >
        <div className="welcome-banner-text">Shipping Policy</div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="description-area">
              <p>
                Shipping Purchase Agreement
                <br />
                This Shipping Purchase Agreement ("Agreement") is entered into
                between biod ("Seller") and the customer ("Buyer") for the
                purchase of shipping services through the Seller's e-commerce
                website ("Website"). The Agreement outlines the terms and
                conditions governing the purchase of shipping services through
                the Website.
              </p>
              <p>
                1. Acceptance of Terms: By purchasing shipping services through
                the Website, the Buyer acknowledges and agrees to be bound by
                the terms and conditions set forth in this Agreement.
              </p>
              <p>
                2. Shipping Options: The Website provides various shipping
                options for the Buyer to choose from. The Buyer is responsible
                for selecting the desired shipping method and reviewing the
                associated costs and estimated delivery times before making a
                purchase.
              </p>
              <p>
                3. Shipping Address: The Buyer must provide an accurate and
                complete shipping address at the time of purchase. The Seller
                will not be held responsible for any delays, misdeliveries, or
                losses arising from incorrect or incomplete shipping information
                provided by the Buyer.
              </p>
              <p>
                4. Shipping Charges and Payment: The Buyer agrees to pay the
                shipping charges specified at the time of purchase. The shipping
                charges may vary based on the selected shipping method,
                destination, and package weight or dimensions. The Buyer will be
                informed of the total shipping cost before completing the
                purchase.
              </p>
              <p>
                5. Delivery: The Seller will make reasonable efforts to ensure
                timely delivery of the purchased items to the specified shipping
                address. However, the Seller does not guarantee delivery dates
                or times and will not be liable for any delays caused by
                unforeseen circumstances, such as weather conditions, customs
                procedures, or carrier issues.
              </p>
              <p>
                6. Shipment Tracking: The Seller may provide shipment tracking
                information to the Buyer, if available. The Buyer can use the
                provided tracking details to monitor the status and progress of
                the shipment through the carrier's website or tracking system.
              </p>
              <p>
                7. Shipment Loss or Damage: In the event of loss or damage to
                the shipped items, the Buyer should promptly notify the Seller
                and provide all relevant details. The Seller will work with the
                shipping carrier to initiate a claim process, if applicable. Any
                compensation or reimbursement for lost or damaged items will be
                subject to the terms and conditions of the shipping carrier's
                liability coverage.
              </p>
              <p>
                8. International Shipping: For international shipments, the
                Buyer is responsible for complying with all customs regulations,
                including the payment of any applicable customs duties, taxes,
                or fees. The Seller will not be held responsible for any
                customs-related issues or delays.
              </p>
              <p>
                9. Limitation of Liability: The Seller shall not be held liable
                for any damages, losses, or claims arising out of the purchase
                or use of shipping services, including but not limited to any
                direct, indirect, incidental, or consequential damages.
              </p>
              <p>
                10. Governing Law and Jurisdiction: This Agreement shall be
                governed by and interpreted in accordance with the laws of
                [Jurisdiction]. Any disputes arising from or relating to this
                Agreement shall be subject to the exclusive jurisdiction of the
                courts located in [Jurisdiction].
              </p>
              <p>
                11. Entire Agreement: This Agreement constitutes the entire
                agreement between the Seller and the Buyer regarding the
                purchase of shipping services through the Website and supersedes
                any prior agreements or understandings, whether oral or written.
              </p>
              <p>
                By proceeding with the purchase of shipping services through the
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

export default ShippingPolicy;
