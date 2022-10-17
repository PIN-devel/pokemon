import { useQueries, useQuery } from "@tanstack/react-query";

const pokemonApi = (id?: string) =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${id || ""}?limit=151`)
    .then((data) => data.json())
    .then((data) => data);

export const usePokemonQueries = (names: string[]) => {
  const queries = names.map((name, idx) => ({
    queryKey: ["evolution", `${name}_${idx}`],
    queryFn: () => pokemonApi(name),
  }));
  return useQueries({ queries });
};

export default function usePokemon(id?: string) {
  return useQuery(id ? ["pokemon", id] : ["pokemon"], () => pokemonApi(id));
}
