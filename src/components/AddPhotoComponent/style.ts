import styled from "styled-components";
import tw from "twin.macro";

export const StyledAdd = styled.div`
    ${tw`
        fixed
        bottom-20
        right-5
        w-20
        h-20
        text-center
        text-red-700
        bg-slate-900
        text-7xl
        font-semibold
        rounded-full
        cursor-pointer
    `}
    opacity: 0.7;
    z-index: 1000;
    transition: transform 0.3s;
    &:hover{
        transform: scale(1.2);
    }
`