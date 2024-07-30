import { create } from 'zustand';

const useGeneralObservations = create((set) => ({
  generalObservationsData: {
    dateOfInspection: '',
    typeOfStructure: '',
    ageOfBuilding: '',
    numberOfStories: '',
    grade: '',
  },
  setGeneralObservationsData: (data) => set({ generalObservationsData: data }),
}));

export default useGeneralObservations;
