import { getCompanies } from "@/api/companies";
import { getRoles } from "@/api/roles";
import { useQuery } from "@tanstack/react-query";

export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
}

export function useRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
}
