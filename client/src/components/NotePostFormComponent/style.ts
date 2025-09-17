import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainerForm  = styled.form`
    ${tw`
        p-5
        border-[2px]
        border-red-950
        rounded-md
        shadow-md
        h-full
        w-full
        flex
        flex-col
    `}
`

export const StyledUpper = styled.section`
    ${tw`
        flex
        items-center
        relative
    `}
`

export const StyledSelect = styled.select`
        ${tw`
            bg-stone-400
            absolute
            right-3
        `}

`

export const StyledRecord = styled.h1`
    ${tw`
        text-center
        m-3
        text-3xl
        font-bold
        text-red-900
        flex-1
    `}
`

export const StyledTitle = styled.input`
    ${tw`
        w-full
        p-1
        border-[2px]
        border-red-900
        rounded-md
        mb-1
        bg-stone-400
        outline-none
        pl-5
        font-bold
    `}
`

export const StyledTextArea = styled.textarea`
    ${tw`
        w-full
        h-full
        p-5 
        border-[2px]
        border-red-900
        rounded-md
        bg-stone-400
        resize-none
        font-bold
        outline-none
    `}
`


export const StyledSubmitEl = styled.div`
    ${tw`
        flex
        flex-col
        mt-3
        h-full
        justify-end
    `}
`

export const StyledBtn = styled.button`
    ${tw`
        px-4 
        py-2 
        mt-auto
        bg-blue-950 
        rounded-md 
        text-red-600
        font-bold
    `}
    &:hover{
        background-color: rgb(30 58 138);
    }
`