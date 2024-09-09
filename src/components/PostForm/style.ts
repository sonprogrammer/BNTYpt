import { addDays } from 'date-fns';
import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainerForm  = styled.form`
    ${tw`
        p-4
        m-5
        border-[2px]
        border-red-950
        rounded-md
        shadow-md
        h-full
        w-[50%]
        flex
        flex-col
    `}
    @media (max-width:700px){
        width: 90%;
    }
`

export const StyledTitle = styled.h1`
    ${tw`
        text-center
        m-3
        text-3xl
        font-bold
        text-red-900
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