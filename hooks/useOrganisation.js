import { db } from '@/firebase';
import { fetchBuildingData } from '@/lib/buildingSubcollection';
import { getDoc, doc } from 'firebase/firestore'; // Firebase imports

import { create } from 'zustand';

const useOrganisationStore = create((set) => ({
  organisation: null,
  buildings: [],
  isLoading: false,
  error: null,
  fetchOrganisation: async (uid) => {
    set({ isLoading: true }); // Update state for loading
    set({ error: null }); // Reset error state

    try {
      const orgRef = doc(db, 'organisation', uid); // Document reference with uid
      const buildingData = await fetchBuildingData(db, uid);
      const orgSnapshot = await getDoc(orgRef);
      if (orgSnapshot.exists) {
        set({ organisation: orgSnapshot.data(), buildings: buildingData });
      } else {
        console.log('Organisation document not found');
      }
    } catch (error) {
      console.error('Error fetching Organisation:', error);
      set({ error: error });
    } finally {
      set({ isLoading: false }); // Update state for loading completion
    }
  },
}));

export default useOrganisationStore;
