import tw from "twin.macro";
import styled from "styled-components";

export const StyledContainer = styled.div`
    ${tw`
        flex
        flex-wrap
        justify-around
        h-full
        gap-10
        m-5
    `}
    display: grid;
    grid-template-columns: repeat(1, 1fr);

    @media (min-width: 640px) {
        grid-template-columns: repeat(1, 1fr);
    }

    @media (min-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }

`

export const StyledNothing = styled.div`
    ${tw`
        w-[100vw]
        h-full
        flex
        justify-center
        items-center
        text-center
        text-3xl
        font-bold
    `}
`

export const StyledBox = styled.div`
    ${tw`
        flex
        w-[100%]
        flex-col
        items-center
        bg-gray-300
        rounded-3xl
        relative
    `}
    &:hover{
        background-color: rgba(0,0,10, 0.5) ;
    }
    &:hover img{
        filter: brightness(50%);
    }
        &:hover div{
            color: white;
        }
`

export const StyledImage = styled.img`
    ${tw`
        w-full
        h-auto
        p-2
        border-2
        flex
        flex-1
    `}
    max-width: 200px;
    @media(min-width: 768px){
        max-width: 300px;
    }
    @media(min-width: 1024px){
        max-width: 400px;
    }
`

export const StyledTitle = styled.p`
    ${tw`
        w-full    
        text-center
        py-3
        rounded-t-3xl

    `}
`

export const StyledText = styled.p`
    ${tw`
        w-full
        text-center
        text-sm
        // flex
        py-2
    `}

`