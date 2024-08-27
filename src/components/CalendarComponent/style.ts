import { isToday } from 'date-fns';
import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        w-80
        mx-auto
    `}
`
export const StyledHeader = styled.header`
    ${tw`
        flex
        justify-between
        items-center
        mb-2
    `}
    
`
export const StyledGrid = styled.div`
    ${tw`
        grid
        grid-cols-7
        gap-1
    `}
`
export const StyledDay = styled.div`
    ${tw`
        text-center
        font-bold
    `}
`
export const StyledCell = styled.div<{ isToday: boolean; isSelected: boolean; isDisabled: boolean }>`
${tw`p-2 text-center cursor-pointer`}
${({ isToday }) => isToday && tw`bg-gray-300`}
${({ isSelected }) => isSelected && tw`bg-blue-500 text-white`}
${({ isDisabled }) => isDisabled && tw`text-gray-400`}
`;
