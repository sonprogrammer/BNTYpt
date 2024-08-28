import { isToday } from 'date-fns';
import styled from "styled-components";
import tw from "twin.macro";



export const StyledBox = styled.div`
    ${tw`
        flex
        flex-col
        lg:w-full
        lg:flex-row
        lg:items-start
        lg:gap-4
    `}
    @media(max-width: 768px){
        ${tw`
            grid
            grid-rows-2

        `}
    }
`

export const StyledContainer = styled.div`
    ${tw`
        w-full
        lg:w-2/3
        mx-auto
        mb-4
    `}
    display: flex;
    flex-direction: column;
    max-width: 1200px;
`
export const StyledHeader = styled.header`
    ${tw`
        flex
        justify-between
        items-center
        mb-2

    `}
    
`

export const StyledIcon = styled.div`
    ${tw`
        cursor-pointer
    `}
    &:hover{
        color: red;
    }
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
${tw`p-2 text-center cursor-pointer relative`}
${({ isToday }) => isToday && tw`bg-stone-700 text-white rounded-full`}
${({ isSelected }) => isSelected && tw`bg-red-900 text-white rounded-full`}
${({ isDisabled }) => isDisabled && tw`text-gray-700`}
`;

export const DotWrapper = styled.div`
    ${tw`
        absolute 
        left-1/2 
        transform -translate-x-1/2 
        flex 
        space-x-3
    `}

`;

export const Dot = styled.div<{ color : string }>`
    ${tw`
        w-2
        h-2
        rounded-full
    `}
    background-color: ${({ color }) => color}
`

export const StyledDetail = styled.div`
    ${tw`
        w-full
        p-4
        bg-stone-400
        rounded-lg
        lg:w-1/3
    `}
    @media (max-width:768px) {
        ${tw`
            mt-4
        `}
        // height: calc(100vh-3rem);
    }    
`