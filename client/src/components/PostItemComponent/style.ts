import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        flex
        flex-col
        border-[2px]
        p-3
        border-red-950
        mb-5
        overflow-hidden
        h-full
        cursor-pointer
    `}
    
    p{
        ${tw`
            // mb-5
        `}
    }
`

export const StyledUpper = styled.section`
    ${tw`
        flex
        w-full
        justify-between
        border-b-2
        pb-2
        border-stone-300
    `}
`

export const StyledTitle = styled.h1`
    ${tw`
        font-bold
        
    `}
`

export const StyledBox = styled.section`
    ${tw`
        mt-2
        overflow-hidden
    `}
`
export const StyledContent = styled.div`
    ${tw`
        
    `}
`
export const StyledImg = styled.div`
    ${tw`

    `}
`