import styled from "styled-components"
import tw from "twin.macro"


export const StyledTitle = styled.div`
    ${tw`
        text-center
        py-4
        text-[56px]
        bg-slate-900
    `}
    h1{
        ${tw`
            text-red-500
            `}
            font-family : "Anton"
    }
`