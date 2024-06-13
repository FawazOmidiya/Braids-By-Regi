import React from "react";
import Navbar from "../_components/Navbar";
import "../styles/Home.css";
import Gallery from "../_components/Gallery";
import MedSect from "../_components/MedSect";

function Home() {
  return (
    <div>
      <header>
        <Navbar></Navbar>
        <h1 className="title">
          <em>Braids by Regi!</em>
        </h1>
      </header>
      <main>
        <Gallery></Gallery>
        {/* Policies */}
        <h1 className="large-txt"> BBR Policies</h1>
        <div className="policies">
          <MedSect>
            <h1>Deposit</h1>
            <p>
              There is a $35 non refundable deposit for all services over $50.
              <br />
              For services under $50 there is a $10 non refundable deposit.
              <br />
              Deposits must be sent in the same day you book your appointment
              via e-transfer to reginabielu@gmail.com. <br />
              Your appointment will be cancelled if a deposit hasn't been made.
            </p>
          </MedSect>
          <MedSect>
            <h1>After Booking</h1>
            <p>
              Deposits must be sent in the same day you book your appointment
              via e-transfer to reginabielu@gmail.com. <br />
              Your appointment will be cancelled if a deposit hasn't been made.
            </p>
          </MedSect>
          <MedSect>
            <h1>Cancellations and Rescheduling</h1>
            <p>
              Please let me know over 48 hours in advance. Rescheduling over 48
              hours in advance will allow you to use the same deposit.
              Rescheduling under 48 hours in advance will require a new deposit.
              <br />
              Please come washed All services come with a free blowdry There is
              a 20 minute window for lateness anything beyond hat may result in
              cancellation/rescheduling or a $15 fee.
            </p>
          </MedSect>
        </div>
      </main>
    </div>
  );
}

export default Home;
