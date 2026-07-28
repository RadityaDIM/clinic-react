import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";

const fetchPatients = async () => {
  const res = await dashboardService.getPatients();
  console.log("res : ", res);
  return res.data.data;
};

export default function PatientList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading data...</p>;
  if (isError) return <p>Terjadi kesalahan</p>;

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.user.username}</li>
      ))}
    </ul>
  );
}
