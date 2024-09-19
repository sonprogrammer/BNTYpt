import { addDays } from 'date-fns';
import styled from "styled-components";
import tw from "twin.macro";

export const StyledPostBox = styled.div`
    ${tw`
        fixed
        top-0
        left-0
        w-full
        h-full
        flex
        items-center
        justify-center
        bg-black 
        bg-opacity-50
    `}
`

export const StyledPostForm = styled.div`
    ${tw`
        bg-stone-500
        p-3
        rounded-lg
        w-[75%]
        h-[75%]
        flex
        items-center
        relative
    `}
    @media (max-width:700px){
        width: 90%;
    }
        
`

export const StyledClose = styled.div`
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