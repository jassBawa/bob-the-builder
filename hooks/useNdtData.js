import { create } from 'zustand';

// Define the initial state
const initialState = {
  inSitu: {
    reboundHammer: {
      ground: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        rhTestResults: '',
        DCStatus: '',
      }),
      first: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        rhTestResults: '',
        DCStatus: '',
      }),
      second: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        rhTestResults: '',
        DCStatus: '',
      }),
    },
    USPV: {
      ground: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        probingMethod: '',
        upvValues: '',
        remarks: '',
      }),
      first: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        probingMethod: '',
        upvValues: '',
        remarks: '',
      }),
      second: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        probingMethod: '',
        upvValues: '',
        remarks: '',
      }),
    },
    capo: {
      ground: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        cubeCompressiveStrength: '',
        DCStatus: '',
      }),
      first: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        cubeCompressiveStrength: '',
        DCStatus: '',
      }),
      second: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        cubeCompressiveStrength: '',
        DCStatus: '',
      }),
    },
  },
  corrosion: {
    halfCellPotential: {
      ground: Array(10).fill({
        location: '',
        element: '',
        spacing: '',
        measurePotentital: '',
        remarks: '',
      }),
      first: Array(10).fill({
        location: '',
        element: '',
        spacing: '',
        measurePotentital: '',
        remarks: '',
      }),
      second: Array(10).fill({
        location: '',
        element: '',
        spacing: '',
        measurePotentital: '',
        remarks: '',
      }),
    },
  },
  strucuturalIntegrity: {
    USPV: {
      ground: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        probingMethod: '',
        upvValues: '',
        remarks: '',
      }),
      first: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        probingMethod: '',
        upvValues: '',
        remarks: '',
      }),
      second: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        probingMethod: '',
        upvValues: '',
        remarks: '',
      }),
    },
  },
  chemical: {
    carbonation: {
      element: '',
      grade: '',
      floor: '',
      location: '',
      meanDepth: '',
      ageOfStrcutural: '',
      captionPhoto: '',
      remarks: '',
    },
  },
};

const useNdtStore = create((set) => ({
  ndtdata: initialState,
  updateField: (topic, subtopic, level, index, field, value) =>
    set((state) => {
      const updatedNdtdata = { ...state.ndtdata };
      updatedNdtdata[topic] = {
        ...state.ndtdata[topic],
        [subtopic]: {
          ...state.ndtdata[topic][subtopic],
          [level]: state.ndtdata[topic][subtopic][level].map((item, idx) =>
            idx === index ? { ...item, [field]: value } : item
          ),
        },
      };
      return { ndtdata: updatedNdtdata };
    }),
  updateChemicalAttack: (field, value) =>
    set((state) => {
      const updatedNdtdata = { ...state.ndtdata };

      // Ensure `chemical` and `carbonation` exist
      updatedNdtdata.chemical = {
        ...updatedNdtdata.chemical,
        carbonation: {
          ...updatedNdtdata.chemical.carbonation,
          [field]: value,
        },
      };

      return { ndtdata: updatedNdtdata };
    }),
  addEntry: (topic, subtopic, level, entry) =>
    set((state) => {
      const updatedNdtdata = { ...state.ndtdata };
      updatedNdtdata[topic][subtopic][level].push(entry);
      return { ndtdata: updatedNdtdata };
    }),
  removeEntry: (topic, subtopic, level, index) =>
    set((state) => {
      const updatedNdtdata = { ...state.ndtdata };
      updatedNdtdata[topic][subtopic][level].splice(index, 1);
      return { ndtdata: updatedNdtdata };
    }),
}));

export default useNdtStore;
