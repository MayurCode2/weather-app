import React from "react";
import Navbar from "../components/Navbar";
import CityTable from "../components/CityTable";
import { useFetchCitiesQuery } from "../store/cityApiSlice";
import Spinner from "./Spinner";

const Main = () => {
  const { data: cities, isLoading, isError } = useFetchCitiesQuery("some-id");

  return (
    <div className="">
      <Navbar />
      {isLoading ? (
        <>
          <div className="flex h-screen items-center justify-center">
            <Spinner />
          </div>
        </>
      ) : (
        <CityTable cities={cities} />
      )}
    </div>
  );
};

export default Main;
