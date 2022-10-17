import styled from "@emotion/styled";
import useAbilites from "../hooks/useAbilites";
import { Ability, Color, EffectEntry } from "../types";
import { mapColorToHex } from "../utils";

const Base = styled.div`
  margin-top: 32px;
`;

const Title = styled.h4<{ color: string }>`
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: bold;
  color: ${({ color }) => color};
`;

const ListItem = styled.li`
  display: flex;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
  ${ListItem} + ${ListItem} {
    margin-top: 12px;
  }
`;

const Label = styled.span`
  flex: 1 0 30%;
  text-transform: capitalize;
  color: #374151;
  font-size: 12px;
  font-weight: bold;
`;

const Description = styled.span`
  flex: 1 0 70%;
  font-weight: 400;
  font-size: 12px;
  color: #374151;
  word-wrap: break-word;
`;

interface Props {
  color?: Color;
  abilities: Array<Ability>;
}

export default function Abilities({ color, abilities }: Props) {
  const results = useAbilites(abilities);

  return (
    <Base>
      <Title color={mapColorToHex(color?.name)}>능력</Title>
      <List>
        {results.map(
          ({ data }, idx) =>
            data && (
              <ListItem key={idx}>
                <Label>{data.name}</Label>
                <Description>
                  {
                    data.flavor_text_entries.find(
                      (entry: EffectEntry) => entry.language.name === "ko"
                    ).flavor_text
                  }
                </Description>
              </ListItem>
            )
        )}
      </List>
    </Base>
  );
}
