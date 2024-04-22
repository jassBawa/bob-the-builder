import { GetProfile } from "@/services/apiService";
import useSWR from "swr";

const URL = "http://localhost:3001/getFormDetails/";

function useProfile() {
  const { data, error, mutate } = useSWR(URL, GetProfile);

  const profile = data?.[0] || null; // Handle potential missing data

  return {
    profile,
    isLoading: !error && !data,
    isError: error,
    refetchBuildings: mutate,
  };
}

export default useProfile;
