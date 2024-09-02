import { isToday } from 'date-fns';
import styled from "styled-components";
import tw from "twin.macro";



export const StyledBox = styled.div`
    ${tw`
        flex
        flex-col
        lg:w-[100vw]
        lg:items-center
        lg:gap-4
        p-2
        mt-2
    `}
`

export const StyledContainer = styled.div`
    ${tw`
        w-full
        lg:w-2/3
        mx-auto
        mb-4
    `}
    max-width: 320px;
    min-width: 320px;
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-grow: 0;
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
        w-[100%]
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
        space-x-2
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
        p-4
        bg-stone-400
        rounded-lg
        w-[320px]
        flex-shrink-0

    `}

    max-height: 220px;
    overflow-y: auto;
    @media (max-width:768px) {
        ${tw`
            mt-4
            w-[320px]
        `
       }    
}
`