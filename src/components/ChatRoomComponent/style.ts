import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        flex
        border-b
        border-black
        p-7
        
    `}
    hover:{
        background-color: black;
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