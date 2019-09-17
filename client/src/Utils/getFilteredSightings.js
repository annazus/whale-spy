const getFilteredSightings = (sightings, filterCriteria) => {
  return sightings.filter(
    element =>
      filterCriteria.speciesList.includes(element.species) &&
      (!filterCriteria.fromDate ||
        element.dateSpotted >= filterCriteria.fromDate.getTime()) &&
      (!filterCriteria.toDate ||
        element.dateSpotted <= filterCriteria.toDate.getTime())
  );
};

// filterCriteria: {
//     fromDate: null,
//     toDate: null,
//     speciesList: ["ORCA", "GRAY", "MINKE", "HUMPBACK", "UNKNOWN"]
//   },
//   appData: {
//     sightings: [],
//     me: []
//   },
export { getFilteredSightings as default };
