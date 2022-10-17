import styled from "@emotion/styled";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import About from "../components/About";
import Evolution from "../components/Evolution";
import PokemonInfo from "../components/PokemonInfo";
import Stats from "../components/Stats";
import Tabs from "../components/Tabs";
import usePokemon from "../hooks/usePokemon";
import useSpecies from "../hooks/useSpecies";
import { FlavorTextEntry } from "../types";

type Params = {
  id: string;
};

type Tab = "about" | "stats" | "evolution";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const TabsWrapper = styled.div`
  margin: 24px auto 0;
`;

export default function DetailPage() {
  const { id } = useParams<Params>();
  const [selectedTab, setSelectedTab] = useState<Tab>("about");
  const pokemonResult = usePokemon(id);
  const speciesResult = useSpecies(id);

  const { name, types, height, weight, abilities, baseExp, stats } = useMemo(
    () => ({
      name: pokemonResult.data?.name,
      types: pokemonResult.data?.types,
      height: pokemonResult.data?.height,
      weight: pokemonResult.data?.weight,
      abilities: pokemonResult.data?.abilities,
      baseExp: pokemonResult.data?.base_experience,
      stats: pokemonResult.data?.stats,
    }),
    [pokemonResult]
  );

  const {
    color,
    growthRate,
    flavorText,
    genderRate,
    isLegendary,
    isMythical,
    evolutionChainUrl,
  } = useMemo(
    () => ({
      color: speciesResult.data?.color,
      growthRate: speciesResult.data?.growth_rate.name,
      flavorText: speciesResult.data?.flavor_text_entries.find(
        (entry: FlavorTextEntry) => entry.language.name === "ko"
      ).flavor_text,
      genderRate: speciesResult.data?.gender_rate,
      isLegendary: speciesResult.data?.is_legendary,
      isMythical: speciesResult.data?.is_mythical,
      evolutionChainUrl: speciesResult.data?.evolution_chain.url,
    }),
    [speciesResult]
  );

  const handleClick = (tab: Tab) => {
    setSelectedTab(tab);
  };
  return (
    <Container>
      <PokemonInfo id={id || "1"} name={name} types={types} color={color} />
      <TabsWrapper>
        <Tabs tab={selectedTab} onClick={handleClick} color={color} />
      </TabsWrapper>
      {selectedTab === "about" && (
        <About
          isLoading={pokemonResult.isLoading || speciesResult.isLoading}
          color={color}
          growthRate={growthRate}
          flavorText={flavorText}
          genderRate={genderRate}
          isLegendary={isLegendary}
          isMythical={isMythical}
          types={types}
          weight={weight}
          height={height}
          baseExp={baseExp}
          abilities={abilities}
        />
      )}
      {selectedTab === "stats" && (
        <Stats
          isLoading={pokemonResult.isLoading || speciesResult.isLoading}
          color={color}
          stats={stats}
        />
      )}
      {selectedTab === "evolution" && (
        <Evolution
          id={id}
          isLoading={speciesResult.isLoading}
          color={color}
          url={evolutionChainUrl}
        />
      )}
    </Container>
  );
}
