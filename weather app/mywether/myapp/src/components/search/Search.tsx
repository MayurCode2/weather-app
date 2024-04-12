import  { useState } from "react";
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";

interface Location {
  label: string;
  value: string;
}

interface SearchProps {
  onSearchChange: (searchData: Location) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<Location | null>(null);

  const loadOptions: LoadOptions<Location, any, any> = async (inputValue) => {
    try {
      const response = await fetch(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=name%20like%20%27${inputValue}%25%27&limit=100&lang=en&timezone=Asia%2FKolkata&refine=timezone%3A%22Asia%22&refine=feature_code%3A%22PPL%22`
      );
      const data = await response.json();
      return {
        options: data.results.map((city:any) => {
          return {
            value: `${city.coordinates.lat} ${city.coordinates.lon}`,
            label: `${city.name}, ${city.country_code}`,
          };
        }),
      };
    } catch (error) {
      console.log(error);
      return { options: [] }; // or handle the error in a different way
    }
  };

  const handleOnChange = (searchData: Location | null) => {
    setSearch(searchData);
    if (searchData) {
      onSearchChange(searchData);
    }
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
