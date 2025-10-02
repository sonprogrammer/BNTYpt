
import styled from "styled-components";
import tw from "twin.macro";



export const StyledBox = styled.div`
    ${tw`
        flex
        flex-col
        // lg:w-[100vw]
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

export const StyledTitle = styled.div`
    ${tw`
        flex
        justify-between
        items-center
        mb-3
        border-b
        p-3
    `}
    p{
        ${tw`
            cursor-pointer
            text-slate-600
            font-extrabold
        `}
        &:hover{
            background-color: rgb(185 28 28);
            color: white;
            padding: 3px;
            border-radius: 30px;
        }
    }
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

export const StyledModal = styled.div`
    ${tw`
        fixed
        top-0
        left-0
        w-full
        h-full
        flex
        justify-center
        items-center
        bg-black
        bg-opacity-50
    `}
`

export const StyledModalBox = styled.div`
    ${tw`
        bg-stone-500
        p-5
        rounded-lg
        w-[50%]
        h-[70%]
        shadow-2xl
        relative
    `}
    @media(max-width:700px){
        width: 90%;
    }
    display: grid;
`


export const StyledCloseBtn = styled.div`
    ${tw`
        absolute
        right-5
        top-5
        cursor-pointer
    `}
    &:hover{
        color: red;
    }
`

export const StyledModalContents = styled.div`
    ${tw`
        flex-1
        p-4
    `}
    flex: 1;
    overflow: none;
    h1{
        ${tw`
            text-xl
            font-bold
            text-red-900
        `}
    }
`
export const StyledModalTextArea = styled.textarea`
    ${tw`
        w-full
        border-[1px]
        border-red-900
        rounded-md
        resize-none
        h-[80%]
        outline-none
        font-bold
        mt-3
        p-3
        bg-stone-400
    `}
`

export const StyledBtn = styled.button`
    ${tw`
        px-4
        py-2
        mt-auto
        rounded-md
        text-red-600
        font-bold
        bg-blue-950
    `}
    &:hover{
        background-color: rgb(30 58 138);
    }
`