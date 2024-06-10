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
      }),
      first: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        rhTestResults: '',
      }),
      second: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        rhTestResults: '',
      }),
    },
    USPV: {
      ground: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        probingMethod: '',
        upvValues: '',
        metricGrade: '',
      }),
      first: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        probingMethod: '',
        upvValues: '',
        metricGrade: '',
      }),
      second: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        probingMethod: '',
        upvValues: '',
        metricGrade: '',
      }),
    },
    capo: {
      ground: Array(10).fill({
        location: '',
        element: '',
        failureLoad: '',
        cubeCompressiveStrength: '',
      }),
      first: Array(10).fill({
        location: '',
        element: '',
        failureLoad: '',
        cubeCompressiveStrength: '',
      }),
      second: Array(10).fill({
        location: '',
        element: '',
        failureLoad: '',
        cubeCompressiveStrength: '',
      }),
    },
  },
  corrosion: {
    halfCellPotential: {
      ground: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        spacing: '',
        measurePotentital: '',
        metricGrade: '',
      }),
      first: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        spacing: '',
        measurePotentital: '',
        metricGrade: '',
      }),
      second: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        spacing: '',
        measurePotentital: '',
        metricGrade: '',
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
        metricGrade: '',
      }),
      first: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        probingMethod: '',
        upvValues: '',
        metricGrade: '',
      }),
      second: Array(10).fill({
        location: '',
        element: '',
        grade: '',
        probingMethod: '',
        upvValues: '',
        metricGrade: '',
      }),
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
