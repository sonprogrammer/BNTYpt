import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
       w-full
       h-screen
       flex
       flex-col
       bg-black
    `}
`
export const StyledOutlet = styled.div`
    ${tw`
        flex-1
        overflow-auto
        bg-gray-950
        text-gray-100
    `}
`

export const StyledMenus = styled.div`
    ${tw`
        
        w-full
        bg-gray-950
        border-t border-white/5
    `}
`