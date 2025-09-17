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
        relative
        bg-slate-900
        `}
        @media(max-width: 380px){
                ${tw`
                    text-[42px]
                `}
            }
        h1{
            ${tw`
                text-red-500
            `}

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
        ${tw`
            absolute
            right-8
            top-[35%]
            text-3xl
            text-slate-500
        `}
        &:hover{
            cursor: pointer;
            color: rgb(185 28 28);
        }
        @media(max-width: 380px){
            ${tw`
                absolute
                right-3
                top-[40%]
                text-2xl
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