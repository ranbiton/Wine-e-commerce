import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import VideoSection from "../components/homeComponents/VideoSection";

const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const history = useHistory();

  const [showAgeCheck, setShowAgeCheck] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!userInfo) {
      setShowAgeCheck(true);
    }
  }, [userInfo]);


  const keyword = match.params.keyword || "";
  const pageNumber = match.params.pageNumber || 1;

  const handleWineTypeFilter = (wineType) => {
    if (wineType === "all") {
      history.push("/");
    } else {
      history.push(`/search/${wineType}`);
    }
  };

  
  const handleAgeConfirmation = (isOver18) => {
    setShowAgeCheck(false);
    if (!isOver18) {
      history.push("/not-found");
    }
  };


  return (
    <div>
      <Header />
      {showAgeCheck && (
        <div className="age-check-modal">
          <div className="age-check-content">
            <h2>Age Verification</h2>
            <p>Are you over 18?</p>
            <div className="age-check-buttons">
              <button onClick={() => handleAgeConfirmation(false)}>No</button>
              <button onClick={() => handleAgeConfirmation(true)}>Yes</button>
            </div>
          </div>
        </div>
      )}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <button 
              className="btn btn-dark mx-2 mb-2" 
              onClick={() => handleWineTypeFilter("all")}
            >
              All
            </button>
            <button 
              className="btn btn-red mx-2 mb-2" 
              onClick={() => handleWineTypeFilter("red")}
            >
              Red
            </button>
            <button 
              className="btn btn-white mx-2 mb-2" 
              onClick={() => handleWineTypeFilter("white")}
            >
              White
            </button>
            <button 
              className="btn btn-rose mx-2 mb-2" 
              onClick={() => handleWineTypeFilter("rose")}
            >
              Rose
            </button>
          </div>
        </div>
      </div>
      <ShopSection keyword={keyword} pageNumber={pageNumber} />
      <VideoSection />
      <ContactInfo />
    </div>
  );
};

export default HomeScreen;