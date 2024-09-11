import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
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
        bg-opacity-40

    `}
    z-index: 9999;
`

export const StyledContent = styled.div`
    ${tw`
        bg-stone-500
        p-8
        rounded-xl
    `}
    p{
        color: black;
        font-size: 24px;
        margin-bottom: 16px;
    }

`
export const StyledBtns = styled.div`
    ${tw`
        flex
        justify-around
        mt-2
        text-3xl
    `}
    button{
        ${tw`
            px-3
            py-1
            transition-all
            duration-300
            rounded-md
            font-bold
        `}
        &:first-child{
            ${tw`
                mr-4
                text-red-500
            `}
        }

        &:hover{
            ${tw`
                transform
                scale-110
            `}
        }

        &:first-child:hover{
            ${tw`
                bg-red-500
                text-white
            `}
        }

        &:last-child:hover{
            ${tw`
                bg-black
                text-white
            `}
        }
    }
`
