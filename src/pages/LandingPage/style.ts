import tw from "twin.macro";
import styled from "styled-components";

export const StyledContainer = styled.div`
    ${tw`
        relative
        w-full
        h-screen
        overflow-hidden
    `}
    video{
        ${tw`
            absolute
            top-1/2
            left-1/2 
            w-full
            h-full
            object-cover
        `}
        transform : translate(-50%, -50%);
        z-index: -1;
        filter: brightness(0.8);
    }
`

export const StyledLogin = styled.div`
    ${tw`
        relative

        justify-center
        items-center
        h-full
        `}
        z-index: 1;
`