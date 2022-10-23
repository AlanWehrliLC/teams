import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Container, Content, Icon } from "./styles";
import {Highlight} from "@components/Highlight"
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Input } from "@components/Input";


export function NewGroup(){
    const [group, setGroup] = useState('')

    const navigation = useNavigation()

    function handleNew(){
        navigation.navigate("players", {group})
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