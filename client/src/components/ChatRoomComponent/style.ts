import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        w-full
        h-full
        flex
        flex-col
    `}
`
export const Styledupper = styled.div`
    ${tw`
        flex
        items-center
        justify-center
        p-5
        text-3xl
        font-bold
    `}
`
export const StyledMessageBox = styled.div`
    ${tw`
        flex
        flex-col
        flex-1
        overflow-y-auto
        bg-stone-400
    `}
`
export const StyledMessage = styled.div<{ isMine: boolean}>`
    ${tw`
        p-4
        my-2
        bg-gray-200
        rounded-lg
        max-w-[70%]
    `}
    background-color: ${({isMine}) => (isMine ? 'orange' : 'gray')};
    align-self: ${({isMine}) => (isMine ? 'flex-end' : 'flex-start')};
    color: ${({isMine}) => (isMine ? 'black' : 'white')};

`

export const StyledSendEl = styled.div`
    ${tw`
        flex
        items-center
        justify-between
        py-3
        relative
    `}
    input{
        ${tw`
            flex-1
            mr-5
            ml-2
            p-3
            rounded-full
            w-[90%]
            bg-stone-400
            outline-none
            pl-12
        `}
    }
    button{
        ${tw`
            bg-red-800
            text-stone-300
            font-bold
            p-3
            rounded-xl
            mr-3
        `}
    }
`

export const StyledPlus = styled.div`
    ${tw`
        absolute
        left-4
        p-2
        rounded-full
        flex
        items-center
        justify-center
        transition-all
        duration-100
        
    `}
    &:hover{
        ${tw`
            bg-gray-500
        `}
        opacity: 0.8;
        cursor: pointer;
    }
`