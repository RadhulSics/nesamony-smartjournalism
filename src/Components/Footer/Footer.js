import React from "react";
import FooterNoLog from "./Footernolog";
import FooterJournalist from "./FooterJournalist";
import FooterMediaAdmin from "./FooterMediaAdmin";
import FooterPublic from "./FooterPublic";

function Footer({ auth }) {
  if (auth == 0) {
    return <FooterNoLog />;
  } else if (auth == 1) {
    return <FooterJournalist />;
  } else if (auth == 2) {
    return <FooterMediaAdmin />;
  } else if (auth == 3) {
    return <FooterPublic />;
  }
}

export default Footer;
