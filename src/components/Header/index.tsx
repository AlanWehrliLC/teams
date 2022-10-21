import { HeaderContainer, HeaderLogo } from "./styles";

import logoImg from "@assets/logo.png"

export function Header(){
    return (
        <HeaderContainer>
            <HeaderLogo source={logoImg} />
        </HeaderContainer>
    )
}