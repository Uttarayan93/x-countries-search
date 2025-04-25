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
      <p>
        <h2>
          <span>{props.name}</span>
        </h2>
      </p>
    </div>
  );
};

const Countries = () => {
  const API_URL =
    "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("API Error:", error));
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setKeyword(searchValue);

    const filteredArray = countries.filter((country) =>
      country.common.toLowerCase().includes(searchValue)
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
            className="countryCard"
            key={country.common}
            name={country.common}
            flag={country.png}
          />
        ))}
      </div>
    </div>
  );
};

export default Countries;
