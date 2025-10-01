import tw from "twin.macro";
import styled from "styled-components";


export const StyledContainer = styled.div`
    ${tw`
        w-full
        h-full    
        p-5
    `}
`
export const StyledBtnBox = styled.div`
    ${tw`
        flex
        justify-end
    `}
`

export const StyledDeleteBtn = styled.button`
    ${tw`
        mr-10
        bg-red-900
        p-2
        rounded-xl
        px-3
        text-gray-300
    `}
`

export const StyledNothing = styled.div`
    ${tw`
        w-full
        h-full
        flex
        justify-center
        items-center
        text-center
        text-3xl
        font-bold
        text-gray-700
    `}
`

export const StyledImgContainer = styled.div`
    ${tw`
        flex
        flex-wrap
        justify-around
        h-full
        gap-10
        p-5
    `}
        display: grid;
        grid-template-columns: repeat(1, 1fr);

        @media (min-width: 640px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: 768px) {
            grid-template-columns: repeat(3, 1fr);

            justify-items: center;
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
        relative
    `}
    &:hover{
        transparent: 50%;
    }
    &:hover img{
        filter: brightness(50%);
    }
        &:hover div{
            color: white;
    }

`

export const StyledDelete = styled.button`
    ${tw`
        hidden
        text-2xl
        top-[-8px]
        absolute
        right-[-8px]
        text-stone-300
        border-2
        w-[48px]
        h-[48px]
        rounded-full
        border-black
        bg-slate-900
    `}
    &:hover{
        ${tw`
            text-red-600
        `}
    }
`

export const StyledImage = styled.img`
    ${tw`
        w-full
        h-[100px]
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