import { create } from 'zustand';

const useGeneralObservations = create((set) => ({
  generalObservationsData: {
    dateOfInspection: '',
    typeOfStructure: '',
    ageOfBuilding: '',
    numberOfStories: '',
  },
  setGeneralObservationsData: (data) => set({ generalObservationsData: data }),
}));

export default useGeneralObservations;
