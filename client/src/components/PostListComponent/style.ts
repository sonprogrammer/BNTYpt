import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        mt-5
        w-full
        h-full
        grid
        grid-cols-3
        gap-5
        auto-rows-[300px]
    `}
    @media (max-width: 600px){
        ${tw`

            grid-cols-2    
        `}
    }
`

export const StyledModalContainer = styled.div`
    ${tw`
        fixed
        top-0
        left-0
        w-full
        h-full
        flex
        justify-center
        items-center
        bg-black
        bg-opacity-40
    `}
`

export const StyledModalBox = styled.div`
    ${tw`
        flex
        flex-col
        w-[60%] 
        h-[80%]   
        bg-stone-400
        rounded-xl
        relative
        px-8
        py-3
        overflow-auto
    `}
    @media(max-width: 800px){
        width: 80%;
    }
`

export const StyledEditBox = styled.div`
    ${tw`
        flex
        flex-col
        gap-3
        flex-1
    `}
`

export const StyledEditTitle = styled.input`
    ${tw`
        text-center
        mt-5
        text-3xl
        font-bold
        rounded-md
        bg-stone-300
        outline-red-700
        border-none
    `}
`

export const StyledEditText = styled.textarea`
    ${tw`
        resize-none
        bg-stone-300
        font-semibold
        rounded-md
        flex-1
        mb-3
        p-3
        outline-red-700

    `}
`

export const StyledEditBtnGroup = styled.div`
    ${tw`
        flex 
        gap-5
        justify-end
    `}
    button{
        ${tw`
            bg-stone-300
            px-2
            rounded-md
        `}
    }
`

export const StyledCloseBtn = styled.button`
    ${tw`
        absolute
        right-5
        top-3
    `}
`

export const StyledTitle = styled.h1`
    ${tw`
        text-center
        mt-5
        text-3xl
        font-bold
    `}
`

export const StyledDate = styled.h2`
    ${tw`
        flex
        justify-end
        w-full
    `}
`

export const StyledImage = styled.div`
    ${tw`
        flex
        justify-center
    `}
`

export const StyledText = styled.p`
    ${tw`
        font-semibold
        pt-3
    `}
`

export const StyledTrainerFn = styled.div`
    ${tw`
        flex
        gap-5
        my-3
        justify-end
    `}
`

export const StyledFnBtn = styled.button`
    ${tw`
        bg-gray-200
        px-2
        rounded-md
    `}
`

export const StyledAskDeleteContainer = styled.div`
    ${tw`
        fixed
        top-0
        left-0
        w-full
        h-full
        flex
        justify-center
        items-center
        bg-black
        bg-opacity-40
    `}
`

export const StyledAskBox = styled.div`
    ${tw`
        bg-slate-900
        w-[50%]
        text-center
        p-3
        rounded-md
        text-white
    `}
    h1{
        ${tw`
            text-xl
            font-bold
        `}
    }
    p{
        ${tw`
            text-lg
            font-semibold
        `}
    }
`

export const StyledBtns = styled.div`
    ${tw`
        flex
        gap-10
        justify-center
        py-5
    `}
`