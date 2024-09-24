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
        h-[70%]
        border-[2px]
        border-red-950
        flex
        flex-col
        justify-between
        items-center
        gap-3
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
    @media(max-width:1224px){
        ${tw`
            w-[70%]
            h-[70%]
        `}
    }

    @media(max-width:768px){
        ${tw`
            w-[80%]
            h-[70%]
        `}
    }
    @media(max-width:480px){
        w-[90%]
        h-[60%]
    }
`


export const StyledLoginInput = styled.div`
    ${tw`
        flex
        flex-col
        gap-5
        w-[80%]
    `}
    input{
        ${tw`
            p-3
            rounded-md
        `}
    }
`

export const StyledLoginBtn = styled.button`
    ${tw`
        bg-blue-900
        text-white
    `}
    border-radius: 5px;
    padding: 10px 30px;
    width: 188.7px;
`

export const StyledRadios = styled.div`
    ${tw`
        flex
        flex-col
        items-start
    `}
    label{
        ${tw`
            flex
            gap-5
            text-lg
            text-white
            font-bold
        `}
    }

`

export const StyledSignUpBtn = styled.button`
    ${tw`
        // bg-stone-600
        text-white
        p-2
    `}
    &:hover{
        text-decoration: underline;

    }
`