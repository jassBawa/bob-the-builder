import { buildingFetcher } from "@/services/apiService";
import useSWR from "swr";

function useBuildings() {
  const { data, error, mutate } = useSWR("/api/buildings", buildingFetcher);

  const buildings = data?.data || []; // Handle potential missing data

  return {
    buildings,
    isLoading: !error && !data,
    isError: error,
    refetchBuildings: mutate,
  };
}

export default useBuildings;
