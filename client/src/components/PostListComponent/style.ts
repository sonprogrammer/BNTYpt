import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        mt-5
        w-full
        h-full
        grid
        grid-cols-3
        gap-5
        auto-rows-[300px]
    `}
    @media (max-width: 600px){
        ${tw`

            grid-cols-2    
        `}
    }
`