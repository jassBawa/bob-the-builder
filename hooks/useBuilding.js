import { buildingFetcher } from "@/services/apiService";
import useSWR from "swr";

function useBuilding(url) {
  const { data, error, mutate } = useSWR(url, buildingFetcher);

  const building = data?.[0]; // Handle potential missing data

  return {
    building,
    isLoading: !error && !data,
    isError: error,
    refetchBuildings: mutate,
  };
}

export default useBuilding;
