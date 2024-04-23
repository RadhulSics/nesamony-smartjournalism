import { useEffect, useState } from "react";

function CustomerViewPlaceMap({ lat, lon }) {
  const [x, setx] = useState("");

  console.log(lat, lon);
  useEffect(() => {
    const ifameData = document.getElementById("iframeId");

    setx(
        <iframe
          id="iframeId"
          src={`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`}
          height="200px"
          width="100%"
        ></iframe>
      );
  }, []);

  return (
    <div>
      <div style={{ margin: "50px 30px" }}>{x}</div>
    </div>
  );
}

export default CustomerViewPlaceMap;
