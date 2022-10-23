import { useState } from "react";
import { FlatList } from "react-native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import { useRoute } from "@react-navigation/native";

type RouteParams = {
    group: string
}

export function Players(){
    const route = useRoute()
    const {group} = route.params as RouteParams

    
    const [team, setTeam] = useState("")
    const [teams, setTeams] = useState<string[]>([])
    const [players, setPlayers] = useState<string[]>([])


    return (
        <Container>
            <Header showBackButton />
            <Highlight
                title={group}
                subtitle="add the gang and separate the teams"
            />

            <Form>
                <Input 
                    placeholder="Participant name"
                    autoCorrect={false}
                />

                <ButtonIcon icon="add" />
            </Form>

            <HeaderList>
                <FlatList
                    data={teams}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />

                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>

            <FlatList 
                data={players}
                keyExtractor={item => item}
                renderItem={({item})=>(
                    <PlayerCard
                        name={item}
                        onRemove={()=>{}}
                    />
                )}
                ListEmptyComponent={()=>(
                    <ListEmpty message="How about registering the first person?" />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    {paddingBottom: 100},
                    players.length === 0 && {flex: 1}
                ]}
            />

            <Button
                title="Remove class"
                type="SECONDARY"
            />
        </Container>
    )
}