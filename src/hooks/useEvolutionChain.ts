import { useQuery } from "@tanstack/react-query";

export default function useEvolutionChain(url: string) {
  return useQuery(["evolution", { url }], () =>
    url
      ? fetch(url)
          .then((data) => data.json())
          .then((data) => data)
      : null
  );
}
