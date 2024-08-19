import tw from "twin.macro";
import styled from 'styled-components'

export const StyledContainer = styled.div`
    ${tw`
        border
        border-red-950
        items-center
        text-center
    `}
    h1{
        ${tw`
            text-3xl
            text-red-900
        `}
    }
`

export const StyledEmailInput = styled.input`
    ${tw`
        border
        border-black
        flex
    `}
`
export const StyledSubmitBtns = styled.div`
    ${tw`
        flex
        flex-col

    `}
`