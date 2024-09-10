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
        bg-slate-900
        `}
        h1{
            ${tw`
            text-center
            text-red-500
            `}
            font-family : "Anton"
    }
    h3{
        ${tw`
            absolute
            text-white
            right-12
        `}
        &:hover{
            cursor: pointer;
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