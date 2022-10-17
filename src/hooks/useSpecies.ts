import { useQuery } from "@tanstack/react-query";

const speciesApi = (id?: string) =>
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((data) => data.json())
    .then((data) => data);

export default function useSpecies(id?: string) {
  return useQuery(["species", { id }], () => speciesApi(id));
}
