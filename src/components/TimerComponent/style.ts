import tw from 'twin.macro'
import styled from 'styled-components'


export const StyledWrapper = styled.div`
    ${tw`
        flex
        items-center
        justify-center
        // h-screen
        w-full
        mt-40
    `}
`

export const StyledContainer = styled.div`
    ${tw`
        flex
        flex-col
        items-center
        justify-center
        bg-blue-950
        text-white
        w-[400px]
        h-[300px]
        rounded-[50px]
        text-center
    `}
    h1{
        ${tw`
            text-2xl
            font-bold
            mb-2
        `}
    }
    
`

export const StyledTimeBox = styled.div`
    ${tw`
        flex
        flex-col

        items-center
        mb-8
    `}
`

export const StyledTimeSetting = styled.div`
    ${tw`
        flex
        items-center
        justify-center
        w-full
        max-w-md
        mb-4
        mt-4
    `}
    h2{
        ${tw`
            mb-4
        `}
    }
    p {
        ${tw`
          mx-2
          text-lg
        `}
      }
    input{
        ${tw`
        text-black
        mx-2
        my-1
        p-2
        border
        border-gray-300
        rounded
        text-center
        w-full
        max-w-[120px]
        `}
    }
`

export const StyledBtns = styled.div`
    ${tw`
        w-[50%]
        flex
        justify-between
    `}
`
export const StyledStartBtn = styled.button`
    ${tw`
        
    `}
    &:hover{
        color : red;
    }
`
export const StyledStopBtn = styled.button`
    ${tw`

    `}
    &:hover{
        color : skyblue;
    }
`
export const StyledResetBtn = styled.button`
    ${tw`

    `}
`