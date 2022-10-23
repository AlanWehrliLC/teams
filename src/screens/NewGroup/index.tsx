import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Container, Content, Icon } from "./styles";
import {Highlight} from "@components/Highlight"
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { groupCreate } from "@storage/group/groupCreate";


export function NewGroup(){
    const [group, setGroup] = useState('')

    const navigation = useNavigation()

    async function handleNew(){
        try {
            await groupCreate(group)
            navigation.navigate("players", {group})
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <Header showBackButton />

            <Content>
                <Icon />
                <Highlight title="New Class" subtitle="create a class to add people" />

                <Input
                    placeholder="Class name"
                    onChangeText={setGroup}
                />

                <Button 
                    title="Create"
                    style={{marginTop: 20}}
                    onPress={handleNew}
                />

            </Content>

        </Container>
    )
}