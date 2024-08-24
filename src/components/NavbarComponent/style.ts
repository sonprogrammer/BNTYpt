import tw from 'twin.macro'
import styled from 'styled-components'

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
export const StyledMenus = styled.div`
    ${tw`
        flex
        justify-around
        py-4
        text-xl
        font-bold
        bg-gray-400
    `}
        border-bottom: 1px solid;
    button{
        // position: relative;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        &:hover{
            transform : scale(1.2);
            color: rgb(153 27 27);
        }
    }
`

