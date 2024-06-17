import { db } from '@/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { create } from 'zustand';

const useOrganisationStore = create((set) => ({
  organisations: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  fetchOrganisations: async () => {
    set({ isLoading: true });
    set({ error: null });

    try {
      const orgRef = collection(db, 'organisation');

      const q = query(orgRef); // Example: Limit to 10 documents

      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const { searchTerm } = useOrganisationStore.getState(); // get the current search term from the state

      // Filter the data based on the search term
      const filteredData = data.filter((org) =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      set({ organisations: filteredData });
    } catch (error) {
      console.error('Error fetching organisations:', error);
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useOrganisationStore;
