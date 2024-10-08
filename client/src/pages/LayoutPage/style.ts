import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
       w-full
       h-screen
       flex
       flex-col
    `}
`
export const StyledOutlet = styled.div`
    ${tw`
        flex-1
        overflow-auto
        bg-stone-500
    `}
`

export const StyledMenus = styled.div`
    ${tw`
        // fixed
        // bottom-0
        // left-0
        w-full
    `}
`