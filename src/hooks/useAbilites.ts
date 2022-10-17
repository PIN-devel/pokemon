import { useQueries } from "@tanstack/react-query";
import { Ability } from "../types";

export default function useAbilites(abilities: Array<Ability>) {
  const queries = abilities.map(({ ability }, idx) => ({
    queryKey: ["ability", idx],
    queryFn: () =>
      fetch(ability.url)
        .then((data) => data.json())
        .then((data) => data),
  }));
  return useQueries({ queries });
}
