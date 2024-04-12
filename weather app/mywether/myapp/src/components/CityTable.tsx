import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import "./CityTable.css";

interface City {
  geoname_id: string;
  name: string;
  ascii_name: string;
  population: string;
  cou_name_en: string;
  timezone: string;
}

interface CityTableProps {
  cities: {
    results: City[];
  } | null;
}

const CityTable: React.FC<CityTableProps> = ({ cities }) => {
  const [searchValue, setSearchValue] = useState("");
  const [cityList, setCityList] = useState<City[]>(cities?.results || []);
  const [rowsLimit, ] = useState(10);
  const [rowsToShow, setRowsToShow] = useState(cityList.slice(0, rowsLimit));
  const [customPagination, setCustomPagination] = useState<number[]>([]);
  const [activeColumn, setActiveColumn] = useState("");
  const [sortingColumn, setSortingColumn] = useState("population");
  const [totalPage, setTotalPage] = useState(
    Math.ceil(cityList.length / rowsLimit)
  );
  const [currentPage, setCurrentPage] = useState(0);

  const searchCities = (keyword: string) => {
    keyword = keyword.toLowerCase();
    setSearchValue(keyword);
    if (!keyword) {
      setCityList(cities?.results || []);
    } else {
      const results = cities?.results.filter((city) => {
        return (
          city.name.toLowerCase().includes(keyword) ||
          city.ascii_name.toLowerCase().includes(keyword)
        );
      });
      setCityList(results || []);
    }
    setCurrentPage(0);
  };

  const clearData = () => {
    setSearchValue("");
    setCityList(cities?.results || []);
    setCurrentPage(0);
  };

  const sortByColumn = (column: string) => {
    let sortedCities;
    const isPrice = column === "population";
  
    // Check if the column is already active for sorting
    if (sortingColumn === column) {
      // If already sorting, toggle between ascending and descending order
      sortedCities = cityList.slice().reverse();
    } else {
      // If not sorting, sort the column in ascending order
      sortedCities = cityList.slice().sort((a, b) => {
        if (isPrice) return parseInt(a[column]) - parseInt(b[column]);
        return a[column as keyof City].localeCompare(b[column as keyof City]);
      });
    }
  
    setCityList(sortedCities);
    setActiveColumn(column);
    setSortingColumn(column);
    setCurrentPage(0);
  };
  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(cityList.slice(startIndex, endIndex));
    setCurrentPage(currentPage + 1);
  };

  const changePage = (value: number) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(cityList.slice(startIndex, endIndex));
    setCurrentPage(value);
  };

  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(cityList.slice(startIndex, endIndex));
    setCurrentPage(currentPage - 1);
  };

  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(cityList.length / rowsLimit)).fill(null).map((_, index) => index)
    );
  }, [cityList.length, rowsLimit]);

  useEffect(() => {
    setRowsToShow(cityList.slice(0, rowsLimit));
    setTotalPage(Math.ceil(cityList.length / rowsLimit));
  }, [cityList, rowsLimit]);

  return (
    <div className="city-table-container">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Keyword Search"
          onChange={(e) => searchCities(e.target.value)}
          value={searchValue}
        />
        <button
          className={`search-clear ${searchValue.length > 0 ? "visible" : "hidden"}`}
          onClick={clearData}
        >
          Clear
        </button>
      </div>
      <div className="table-wrapper">
        <table className="city-table">
          <thead>
            <tr>
              <th className="th-geoID">GeoID</th>
              <th className="th-name">
                <div className="th-header-wrapper">
                  <span
                    className={`th-name-sort ${
                      activeColumn === "name" ? "active" : ""
                    }`}
                    onClick={() => sortByColumn("name")}
                  >
                    <div className="th-sort-wrapper">
                      <h2>City</h2>
                      {sortingColumn === "name" ? (
                        <GoArrowUp />
                      ) : (
                        <GoArrowDown />
                      )}
                    </div>
                  </span>
                </div>
              </th>
              <th className="th-ascii-name">Ascii Name</th>
              <th className="th-population">
                <div className="th-header-wrapper">
                  <span
                    className={`th-population-sort ${
                      activeColumn === "population" ? "active" : ""
                    }`}
                    onClick={() => sortByColumn("population")}
                  >
                    <div className="th-sort-wrapper">
                      <h2>Population</h2>
                      {sortingColumn === "population" ? (
                        <GoArrowUp />
                      ) : (
                        <GoArrowDown />
                      )}
                    </div>
                  </span>
                </div>
              </th>
              <th className="th-country">Country</th>
              <th className="th-timezone">Timezone</th>
            </tr>
          </thead>
          <tbody>
            {rowsToShow.map((city) => (
              <tr key={city.geoname_id} className="table-row">
                <td className="td-geoID">{city.geoname_id}</td>
                <td className="td-name">
                  <Link to={`/searchId/${city.geoname_id}`} target="_blank">
                    {city.name}
                  </Link>
                </td>
                <td className="td-ascii-name">{city.ascii_name}</td>
                <td className="td-population">{city.population}</td>
                <td className="td-country">{city.cou_name_en}</td>
                <td className="td-timezone">{city.timezone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          className={`pagination-btn ${
            currentPage === 0 ? "disabled" : ""
          }`}
          onClick={previousPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        {customPagination.map((index) => (
          <button
            key={index}
            className={`pagination-btn ${
              currentPage === index ? "active" : ""
            }`}
            onClick={() => changePage(index)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`pagination-btn ${
            currentPage === totalPage - 1 ? "disabled" : ""
          }`}
          onClick={nextPage}
          disabled={currentPage === totalPage - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CityTable;
