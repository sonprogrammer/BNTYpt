import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        flex
        flex-col
        justify-center
        items-center
        border-[2px]
        p-3
        border-red-950
        mb-5
        h-[500px]
        relative
    `}

    p{
        ${tw`
            mb-5
        `}
    }
`