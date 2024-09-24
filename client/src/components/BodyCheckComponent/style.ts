import tw from "twin.macro";
import styled from "styled-components";

export const StyledContainer = styled.div`
    ${tw`
        flex
        flex-wrap
        justify-around
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

export const StyledBox = styled.div`
    ${tw`
        flex
        w-[100%]
        flex-col
        items-center
        bg-gray-300
        rounded-3xl
    `}
`

export const StyledImage = styled.img`
    ${tw`
        w-full
        h-auto
        rounded-lg
        p-2
        mt-2
    `}
    max-width: 200px;
    @media(min-width: 768px){
        max-width: 300px;
    }
    @media(min-width: 1024px){
        max-width: 400px;
    }
`

export const StyledText = styled.p`
    ${tw`
        w-full
        text-center
        text-xl
        mt-2
        mb-4
        pt-3
    `}
    border-top: 3px solid rgb(69 10 10);

`