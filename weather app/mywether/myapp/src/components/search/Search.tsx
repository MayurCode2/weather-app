import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=name%20like%20%27${inputValue}%25%27&limit=100&lang=en&timezone=Asia%2FKolkata&refine=timezone%3A%22Asia%22&refine=feature_code%3A%22PPL%22`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return {
          options: response.results.map((city) => {
            return {
              value: `${city.coordinates.lat} ${city.coordinates.lon}`,
              label: `${city.name}, ${city.country_code}`,
            };
          }),
        };
      })
      .catch((error) => console.log(error));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div className="flex w-[100%] justify-center mt-6">
      <div className="w-[80%] pt-5">
        <AsyncPaginate
          placeholder="Search for city"
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />
      </div>
    </div>
  );
};

export default Search;
