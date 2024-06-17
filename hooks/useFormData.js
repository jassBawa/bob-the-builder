import { uploadImages } from '@/lib/uploadToFirebase';
import { create } from 'zustand';

const useFormData = create((set) => ({
  generalObservationsData: {
    dateOfInspection: '',
    nameOfStructure: '',
    location: '',
    typeOfStructure: '',
    sizeOfBuilding: '',
    ageOfBuilding: '',
    numberOfStories: '',
    architecturalPlanAvailable: false,
  },
  updateGeneralObservationsData: (data) =>
    set((state) => ({
      generalObservationsData: { ...state.generalObservationsData, ...data },
    })),

  structuralObservationsData: {
    cracks: {
      beam: { grade: '', location: '', photo: '' },
      slab: { grade: '', location: '', photo: '' },
      column: { grade: '', location: '', photo: '' },
      chajja: { grade: '', location: '', photo: '' },
      plaster: { grade: '', location: '', photo: '' },
      wall: { grade: '', location: '', photo: '' },
    },
    settlement: {
      foundation: { grade: '', location: '', photo: '' },
      'joint at plinth': { grade: '', location: '', photo: '' },
      column: { grade: '', location: '', photo: '' },
      wall: { grade: '', location: '', photo: '' },
    },
    corrosion: {
      beam: { grade: '', location: '', photo: '' },
      slab: { grade: '', location: '', photo: '' },
      column: { grade: '', location: '', photo: '' },
      chajja: { grade: '', location: '', photo: '' },
      stairs: { grade: '', location: '', photo: '' },
      wall: { grade: '', location: '', photo: '' },
    },
    leakageAndDampness: {
      'external walls': { grade: '', location: '', photo: '' },
      'internal walls': { grade: '', location: '', photo: '' },
      toilet: { grade: '', location: '', photo: '' },
      terrace: { grade: '', location: '', photo: '' },
      slab: { grade: '', location: '', photo: '' },
      'water tank': { grade: '', location: '', photo: '' },
      'drainage line': { grade: '', location: '', photo: '' },
    },
    deflection: {
      beam: { grade: '', location: '', photo: '' },
      slab: { grade: '', location: '', photo: '' },
    },
    conditionOf: {
      stairs: { grade: '', location: '', photo: '' },
      'lifts/shafts': { grade: '', location: '', photo: '' },
      floors: { grade: '', location: '', photo: '' },
      duct: { grade: '', location: '', photo: '' },
    },
  },

  handleGradeChange: (type, key, value) => {
    console.log(type, key, value);
    return set((state) => ({
      structuralObservationsData: {
        ...state.structuralObservationsData,
        [type]: {
          ...state.structuralObservationsData[type],
          [key]: {
            ...state.structuralObservationsData[type][key],
            grade: value,
          },
        },
      },
    }));
  },
  handleLocationChange: (type, name, value) =>
    set((state) => ({
      structuralObservationsData: {
        ...state.structuralObservationsData,
        [type]: {
          ...state.structuralObservationsData[type],
          [name]: {
            ...state.structuralObservationsData[type][name],
            location: value,
          },
        },
      },
    })),
  handlePhotoChange: async (type, name, file) => {
    const url = await uploadImages(file);
    console.log(url);
    set((state) => ({
      structuralObservationsData: {
        ...state.structuralObservationsData,
        [type]: {
          ...state.structuralObservationsData[type],
          [name]: {
            ...state.structuralObservationsData[type][name],
            photo: url,
          },
        },
      },
    }));
  },
}));

export default useFormData;
