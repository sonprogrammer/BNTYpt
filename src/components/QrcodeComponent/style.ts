import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        flex
        justify-center
        items-center
        h-full
        w-full
    `}
`
export const StyledTrainerBox = styled.div`
    ${tw`
        flex
        flex-col
        justify-center
        items-center
        p-4
        bg-white
        rounded-lg
        shadow-lg
    `}
    width: 300px;
    height: 300px;
    h2{
        ${tw`
            mb-5
        `}
    }
`
export const StyledMemberBox = styled.div`
    ${tw`
        flex
        flex-col
        justify-center
        items-center
        p-4
        bg-white
        rounded-lg
        shadow-lg
    `}
    width: 300px;
    height: 300px;
`