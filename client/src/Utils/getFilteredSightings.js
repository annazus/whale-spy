const getFilteredSightings = (sightings, filterCriteria) => {
  return sightings.filter(element =>
    filterCriteria.speciesList.includes(element.species)
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
