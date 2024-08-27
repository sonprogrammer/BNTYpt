import { BrowserRouter } from 'react-router-dom';
import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        flex
        justify-center
        items-center
        h-full
        p-4
    `}
`
export const StyledBox = styled.div`
    ${tw`
        p-10
        rounded-xl
        w-[50%]
        h-[50%]
        border-[2px]
        border-red-950
        flex
        flex-col
        justify-between
        items-center
        gap-5
    `}
    background-color: rgba(82, 82, 82, 0.5);
    box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.5);
    max-width: 100%;
    max-height: 100%;
    h1{
        ${tw`
            font-bold
            text-[63px]
            text-red-700
        `}
        font-family : "Anton";
        text-shadow: 4px 4px 5px rgba(0, 0, 0, 0.7);
    }
    img{
        width: 100px;
    }
    @media(max-width:1024px){
        ${tw`
            w-[70%]
            h-[50%]
        `}
    }

    @media(max-width:768px){
        ${tw`
            w-[80%]
            h-[50%]
        `}
    }
    @media(max-width:480px){
        w-[90%]
        h-[60%]
    }
`
export const dfd = styled.div`
    ${tw`

    `}
`