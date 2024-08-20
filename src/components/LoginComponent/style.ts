import tw from "twin.macro";
import styled from 'styled-components'


export const StyledBox = styled.div`
    ${tw`
        flex
        h-screen
        items-center
        justify-center
    `}
`

export const StyledContainer = styled.div`
    ${tw`
        flex
        flex-col
        border
        border-red-700
        items-center
        // justify-center
        text-center
        w-[50%]
        h-[70%]
        // p-24
        bg-neutral-600
    `}
    h1{
        ${tw`
            text-[77px]
            text-red-900
            mb-5
            mt-3
        `}
        font-family : "Anton"
    }
`

export const StyledLogo = styled.img`
    ${tw`
        w-[77px]
        h-[77px]
        mb-6
    `}
`


export const StyledEmailInput = styled.input`
    ${tw`
        border
        border-black
        mb-4
        w-[70%]
        pl-[10px]
        p-1
        bg-stone-500
    `}
    &:focus{
        border : solid 2px;
        border-color : rgb(127 29 29);
        outline: none;
    }
`

export const StyledPasswordInput = styled.input`
    ${tw`
        border
        border-black
        mb-4
        w-[70%]
        pl-[10px]
        p-1
        bg-stone-500
    `}
    &:focus{
        border : solid 2px;
        border-color : rgb(127 29 29);
        outline: none;
    }
`

export const StyledSubmitBtns = styled.div`
    ${tw`
        flex
        flex-col
        mt-5
    `}
`

export const StyledLoginBtn = styled.button`
    ${tw`
        mb-4
        text-white
        font-bold
    `}
`