import styled from 'styled-components'
import tw from 'twin.macro'

export const StyledContainer = styled.div`
    ${tw`
        fixed
        top-0
        left-0
        w-full
        h-full
        flex
        justify-center
        items-center
        z-50
    `}
    background-color: rgba(0,0,0, 0.5);

`
export const StyledBox = styled.div`
    ${tw`
        w-[50%]
        h-[50%]
        flex
        flex-col
        items-center
        justify-center
        bg-stone-600
        gap-10
        relative
        p-3
    `}
    @media(max-width: 700px){
        width: 90%;
    }
`

export const StyledXIcon = styled.div`
${tw`
    absolute
    right-5
    top-5
    cursor-pointer
`}
&:hover{
    color: red;
}
`

export const StyledMember = styled.div`
    ${tw`
        flex
        items-center
        absolute
        top-20
        w-[50%]
        gap-3
        justify-center
    `}
`

export const StyledSelect = styled.select`
        ${tw`
            flex
            bg-stone-400
        `}
        @media(max-width:500px){
            width: 20%
        }
`

export const StyledInput = styled.div`
    ${tw`
        flex
        justify-center
        items-center
        gap-5
        text-red-950
    `}
    p {
        ${tw`
            text-2xl
            font-bold
        `}
    }
    input{
        ${tw`
            bg-stone-700
            border
            border-red-950
            text-gray-400
        `}}
`
export const StyledInputIcon = styled.div`
    ${tw`
        absolute
    `}
`
export const StyledMembers = styled.div`
    ${tw`
        text-3xl
        font-bold
        text-red-950
        absolute
        top-20
    `}
`

export const StyledBtn = styled.button`
    ${tw`
        p-3
        px-10
        bg-red-900
        absolute
        bottom-10
        font-bold
        text-xl
    `}
`