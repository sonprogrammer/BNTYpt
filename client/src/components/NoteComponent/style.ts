
// import { addDays } from 'date-fns';
import styled from "styled-components";
import tw from "twin.macro";


export const StyledNoteContainer = styled.div`
    ${tw`
        w-[80%]
        h-full
    `}
`

export const StyledMembersGroup = styled.section`
    ${tw`
        w-full
        border-2
        mt-2
        p-2
        flex
        gap-10
    `}
`

export const StyledMember = styled.button`
    ${tw`
        bg-neutral-300
        px-3
        py-1
        rounded-lg
        `}
        &:hover{
            ${tw`
                bg-neutral-400
                text-white
                duration-200
            `}
        }
`

export const StyledRecordBtn = styled.button`
    ${tw`
        bg-red-900
        text-white
        w-full
        rounded-md
        py-2
        mt-3
    `}
`

export const StyledNavText = styled.section`
    ${tw`
        mt-10
        text-center
        text-3xl
        font-bold
        text-stone-300
    `}
`

export const StyledNothing = styled.div`
    ${tw`
        h-full
        flex
        justify-center
        items-center
        font-bold
        text-3xl
        text-stone-300
    `}
`


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