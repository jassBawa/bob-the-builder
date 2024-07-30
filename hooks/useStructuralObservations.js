import { uploadImages } from '@/lib/uploadToFirebase';
import { create } from 'zustand';

const useStructuralObservations = create((set) => ({
  structuralObservationsData: {
    cracks: [],
    settlement: [],
    corrosion: [],
    leakageAndDampness: [],
    deflection: [],
    // conditionOf: [{ id: '1', element: '', location: '', photo: '' }],
  },

  addItem: (observationType, newItem) => {
    set((state) => ({
      structuralObservationsData: {
        ...state.structuralObservationsData,
        [observationType]: [
          ...state.structuralObservationsData[observationType],
          newItem,
        ],
      },
    }));
  },

  removeItem: (observationType, itemId) => {
    set((state) => ({
      structuralObservationsData: {
        ...state.structuralObservationsData,
        [observationType]: state.structuralObservationsData[
          observationType
        ].filter((item) => item.id !== itemId),
      },
    }));
  },
  updateItem: async (observationType, itemId, updatedItem) => {
    if (updatedItem.photo) {
      const uploadedImageUrl = await uploadImages(updatedItem.photo);
      updatedItem.photo = uploadedImageUrl;
    }
    set((state) => ({
      structuralObservationsData: {
        ...state.structuralObservationsData,
        [observationType]: state.structuralObservationsData[
          observationType
        ].map((item) => (item.id === itemId ? updatedItem : item)),
      },
    }));
  },
}));

export default useStructuralObservations;
