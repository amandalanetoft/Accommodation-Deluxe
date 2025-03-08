// FilterContainer.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import PriceFilter from "./PriceFilter";
import TypeOfHotelFilter from "./TypeOfHotelFilter";
import FoodAndDrinksFilter from "./FoodAndDrinksFilter";
import ActivitiesFilter from "./ActivitiesFilter";
import RatingFilter from "./RatingFilter";

// eslint-disable-next-line react/prop-types
const FilterContainer = ({ setFilters }) => {
  return (
    <div className="min-h-screen ml-5">
       {/* Yttre behållare för filterpanelen */}
      <div className="filter-panel p-4 border border-grey rounded-[10px] w-[365px]">
        <div className="relative w-full pb-2">
          <h2 className="text-2xl font-semibold z-10">Filter</h2>
          <div className="absolute inset-0 border-b border-grey -mx-4"></div>
        </div>
        {/* Varje filterkomponent tar emot setFilters-funktionen som prop */}
        <PriceFilter setFilters={setFilters} />
        <TypeOfHotelFilter setFilters={setFilters} />
        <FoodAndDrinksFilter setFilters={setFilters} />
        <ActivitiesFilter setFilters={setFilters} />
        <RatingFilter setFilters={setFilters} />
      </div>
    </div>
  );
};

export default FilterContainer;


