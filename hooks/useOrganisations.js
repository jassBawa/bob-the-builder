import { db } from '@/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { create } from 'zustand';

const useOrganisationStore = create((set) => ({
  organisations: [],
  isLoading: false,
  error: null,
  fetchOrganisations: async () => {
    set({ isLoading: true });
    set({ error: null });

    try {
      const orgRef = collection(db, 'organisation');
      console.log(orgRef);

      // Optional: Add filtering or pagination logic here (e.g., limit, where)
      const q = query(orgRef); // Example: Limit to 10 documents

      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      set({ organisations: data });
    } catch (error) {
      console.error('Error fetching organisations:', error);
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useOrganisationStore;
