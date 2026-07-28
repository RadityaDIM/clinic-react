import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";

const fetchDiseases = async () => {
  const res = dashboardService.displayAllDisease;
  console.log("res : ", res);
  return res.data.data;
};

export default function DiseaseList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["diseases"],
    queryFn: fetchDiseases,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading data...</p>;
  if (isError) return <p>Terjadi kesalahan</p>;

  return <></>;
}
