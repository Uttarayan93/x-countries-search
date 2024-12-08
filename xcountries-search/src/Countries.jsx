import { useState, useEffect } from "react";

const CountryCard = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "auto auto",
        height: "250px",
        width: "250px",
        border: "1px solid gray",
        borderRadius: "20px",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <img
        style={{
          height: "100px",
          width: "auto",
          border: "1px solid gray",
        }}
        src={props.flag}
        alt={props.name}
      />
      <h4>{props.name}</h4>
    </div>
  );
};

const Countries = () => {
  const API_URL = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (e) => {
    setKeyword(e.target.value.toLowerCase());

    const filteredArray = countries.filter((country) =>
      country.name.common.toLowerCase().includes(keyword)
    );

    setFilteredCountries(filteredArray);
  };

  const countriesToDisplay = keyword ? filteredCountries : countries;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <input
        type="text"
        placeholder="Search country name"
        style={{
          alignSelf: "center",
          fontSize: "32px",
          textAlign: "center",
        }}
        onChange={handleSearch}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {countriesToDisplay.map((country) => (
          <CountryCard
            key={country.cca3} // Use a unique identifier like cca3
            name={country.name.common}
            flag={country.flags.svg}
          />
        ))}
      </div>
    </div>
  );
};

export default Countries;
