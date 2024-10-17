import styled from "styled-components";
import tw from "twin.macro";


export const StyledNotMember = styled.div`
    ${tw`
        flex
        justify-center
        items-center
        h-full
        text-3xl
        font-bold
    `}
`


export const StyledContainer = styled.div`
    ${tw`
        flex
        border-b
        border-black
        p-7
        
    `}
    &:hover{
        background-color: rgba(0, 0, 0, 0.5);
        transition: background-color 0.3s;
        color: rgb(168 162 158);
    }
`
export const StyledProfile = styled.div`
    ${tw`
        border
        rounded-full
    `}
    img{
        ${tw`
            rounded-full
        `}
    }
`
export const StyledContent = styled.div`
    ${tw`
        ml-7
        flex
        flex-col
        justify-center
    `}
    h2{
        ${tw`
            text-xl
            font-bold
            
        `}
    }
`