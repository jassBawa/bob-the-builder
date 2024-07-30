import { create } from 'zustand';

const useBuildingData = create((set) => ({
  reboundData: null,
  capoData: null,
  upvData: null,
  halfCellData: null,
  generalObservationsData: null,
  setReboundData: (data) => set({ reboundData: data }),
  setGeneralObservationsData: (data) => set({ generalObservationsData: data }),
  setCapoData: (data) => set({ capoData: data }),
  setUpvData: (data) => set({ upvData: data }),
  setHalfCellData: (data) => set({ halfCellData: data }),
}));

export default useBuildingData;
