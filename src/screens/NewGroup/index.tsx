import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import {Highlight} from "@components/Highlight"
import { Button } from "@components/Button";
import { Input } from "@components/Input";


export function NewGroup(){
    return (
        <Container>
            <Header showBackButton />

            <Content>
                <Icon />
                <Highlight title="New Class" subtitle="create a class to add people" />

                <Input
                    placeholder="Class name"
                />

                <Button 
                    title="Create"
                    style={{marginTop: 20}}
                />

            </Content>

        </Container>
    )
}