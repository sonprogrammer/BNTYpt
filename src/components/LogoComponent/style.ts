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
`