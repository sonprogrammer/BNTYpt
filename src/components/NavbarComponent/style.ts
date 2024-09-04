import tw from 'twin.macro'
import styled from 'styled-components'


export const StyledMenus = styled.div`
    ${tw`
        flex
        justify-around
        py-4
        text-xl
        font-bold
        bg-gray-400
        h-[32]
    `}
        border-bottom: 1px solid;
    button{
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        &:hover{
            transform : scale(1.5);
            color: rgb(153 27 27);
        }
    }
`

