import styled from "@emotion/styled";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import loading from "../assets/loading.gif";
import useInterSectionObserver from "../hooks/useInterSectionObserver";
import { PokemonResponse } from "../types";
import { formatNumbering } from "../utils";

const Base = styled.div`
  margin-top: 24px;
  overflow: hidden scroll;
  height: 100vh;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 180px);
`;

const Loading = styled.img``;

const ListItem = styled.li`
  position: relative;
  list-style: none;
  display: flex;
  align-items: center;
  box-shadow: 6px 4px 14px 5px rgba(0, 0, 0, 0.21);
  border-radius: 12px;
  & + & {
    margin-top: 18px;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const Image = styled.img``;

const Name = styled.p`
  margin: 0;
  padding: 0 0 0 12px;
  flex: 1 1 100%;
  color: #374151;
  text-transform: capitalize;
  font-size: 16px;
  font-weight: bold;
`;

const Index = styled.p`
  position: absolute;
  margin: 0;
  padding: 0;
  right: 16px;
  bottom: 16px;
  font-size: 24px;
  font-weight: bold;
  color: #d1d5db;
`;

const getImageUrl = (pokemonIndex: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;

export default function PokemonList() {
  // const { isLoading, isError, data } = usePokemon();
  const ref = useRef<Element>();
  const rootRef = useRef();
  const entry = useInterSectionObserver(ref, {
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });
  const isIntersecting = !!entry?.isIntersecting;
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ["pocketmonInfinite"],
    async ({ pageParam }) => {
      const data = await fetch(
        pageParam ? pageParam : "https://pokeapi.co/api/v2/pokemon?limit=20"
      )
        .then((raw) => raw.json())
        .then((data) => data);
      console.log(data);
      return data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.next,
      getPreviousPageParam: (firstPage) => firstPage.previous,
    }
  );
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isIntersecting);
    isIntersecting && fetchNextPage();
  }, [isIntersecting]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Base>
      {isFetching ? (
        <LoadingWrapper>
          <Loading src={loading} alt="loading" />
        </LoadingWrapper>
      ) : (
        <List>
          {data?.pages.map((page, idx1) =>
            page?.results.map((pokemon: PokemonResponse, idx2: number) => (
              <ListItem
                key={pokemon.name}
                onClick={() => navigate(`/${idx2 + 1 + idx1 * 20}`)}
              >
                <Image src={getImageUrl(idx2 + 1 + idx1 * 20)} />
                <Name>{pokemon.name}</Name>
                <Index>{formatNumbering(String(idx2 + 1 + idx1 * 20))}</Index>
              </ListItem>
            ))
          )}
        </List>
      )}
      <div ref={ref}></div>
      {/* <button onClick={() => fetchNextPage()}>more load</button> */}
    </Base>
  );
}
