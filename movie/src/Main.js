import { useEffect, useState } from "react";
import Card from "./components/Card/card";
import Header from "./components/Header/header";
import axios from "axios";
const Main = () => {
  const [Information, setInformation] = useState([]);

  useEffect(() => {
    axios("https://localhost:7170/api/Film/get")
      .then((response) => {
        setInformation(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="App">
        <Header />
        <main>
          <div className=" containerGeral">
            <Card Information={Information} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Main;
