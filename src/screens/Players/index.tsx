import { useState, useEffect, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";

type RouteParams = {
    group: string
}

export function Players(){
    const [isLoading, setIsLoading] = useState(true)

    const route = useRoute()
    const navigation = useNavigation()
    const {group} = route.params as RouteParams

    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('Time A')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const newPlayerNemaInputRef = useRef<TextInput>(null)

    async function handleAddPlayer(){
        if(newPlayerName.trim().length === 0) {
            return Alert.alert("New person", "Enter the person's name to add")
        }

        const newPlayer = {
            name: newPlayerName,
            team
        }

        try {
            await playerAddByGroup(newPlayer, group)

            newPlayerNemaInputRef.current?.blur()

            setNewPlayerName('')
            fetchPlayersByTeam()

        } catch (error) {
            if (error instanceof AppError) {
                return Alert.alert("New person", error.message)
            }else(
                Alert.alert("New person", "Unable to add a new person!")
            )
        }
    }

    async function fetchPlayersByTeam(){
        try {
            setIsLoading(true)

            const playersByTeam = await playersGetByGroupAndTeam(group, team)
            setPlayers(playersByTeam)
        } catch (error) {
            Alert.alert("People", "Unable to load the people of the selected team!")
        } finally {
            setIsLoading(false)
        }
    }

    async function handlePlayerRemove(playerName: string){
        try {
            await playerRemoveByGroup(playerName, group)
            fetchPlayersByTeam()
        } catch (error) {
            Alert.alert("Remove person", "Could not remove this person!")
        }
    }

    async function groupRemove(){
        try {
            await groupRemoveByName(group)
            navigation.navigate("groups")
        } catch (error) {
            Alert.alert("Remove group", "Unable to remove group!")
        }
    }

    async function handleGroupRemove(){
        Alert.alert(
            "Remove",
            "Do you want to remove the class?",
            [
                {text: "No", style: "cancel"},
                {text: "Sim", onPress: ()=> groupRemove()}
            ]
        )
    }

    useEffect(()=>{
        fetchPlayersByTeam()
    },[team])

    return (
        <Container>
            <Header showBackButton />
            <Highlight
                title={group}
                subtitle="add the gang and separate the teams"
            />

            <Form>
                <Input 
                    inputRef={newPlayerNemaInputRef}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    placeholder="Participant name"
                    autoCorrect={false}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />

                <ButtonIcon
                    icon="add"
                    onPress={handleAddPlayer}
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={['Time A', 'Time B']}
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

            {
                isLoading ? <Loading /> :
                    <FlatList 
                        data={players}
                        keyExtractor={item => item.name}
                        renderItem={({item})=>(
                            <PlayerCard
                                name={item.name}
                                onRemove={()=> handlePlayerRemove(item.name)}
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
            }

            <Button
                title="Remove class"
                type="SECONDARY"
                onPress={handleGroupRemove}
            />
        </Container>
    )
}