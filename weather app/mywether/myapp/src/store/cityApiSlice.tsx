import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cityApi = createApi({
  reducerPath: "cityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://public.opendatasoft.com/api/explore/v2.1/catalog/",
  }),
  endpoints: (builder) => ({
    fetchCities: builder.query({
      query: () =>
        "datasets/geonames-all-cities-with-a-population-1000/records?limit=100&lang=en&refine=timezone%3A%22Asia%22&refine=feature_code%3A%22PPL%22",
    }),
  }),
});

export const { useFetchCitiesQuery } = cityApi;
