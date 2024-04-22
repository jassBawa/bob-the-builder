function useBuildingData() {
  const [buildingData, setBuildingData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const users = /* Get a list of user IDs */ // Replace with your logic to get user IDs
  //       const data = {};

  //       for (const userId of users) {
  //         data[userId] = await fetchBuildingData(db, userId);
  //       }

  //       setBuildingData(data);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [db]); // Re-run on changes to db

  return { buildingData, loading, error };
}

export default useBuildingData;
