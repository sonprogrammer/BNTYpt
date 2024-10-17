import styled from "styled-components"
import tw from "twin.macro"





export const StyledTitle = styled.div`
    ${tw`
        flex
        justify-center
        w-full
        text-center
        py-4
        text-[56px]
        // text-[66px]
        bg-slate-900
        `}
        h1{
            ${tw`
            text-center
            text-red-500
            `}
            // font-family : "Anton"
            font-family : "rippedFont";
    }
    h3{
        ${tw`
            absolute
            text-slate-500
            right-12
            top-10
            text-3xl
        `}
        &:hover{
            cursor: pointer;
            color: rgb(185 28 28);
        }
        @media(max-width: 800px){
            display:none;
        }
    }
    .logout-icon{
        display:none;
        &:hover{
            cursor: pointer;
            color: rgb(185 28 28);
        }
        @media(max-width: 800px){
            display: block;
            ${tw`
                absolute
                right-8
                top-10
                text-4xl
                text-slate-500
            `}
        }
    }
    
`

export const StyledLogoutModal = styled.div`
    ${tw`
        flex
        justify-center
        items-center
    `}
`