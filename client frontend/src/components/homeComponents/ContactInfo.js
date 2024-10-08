import React from "react";
const ContactInfo = () => {
  return (
    <div className="contactInfo container">
      <div className="row">
        <div className="col-12 col-md-6 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h5>Call Us 24x7</h5>
            <p>052-722-1888</p>
          </div>
        </div>
        <div className="col-12 col-md-6 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h5>Headquarter</h5>
            <p>Tel-Aviv</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
