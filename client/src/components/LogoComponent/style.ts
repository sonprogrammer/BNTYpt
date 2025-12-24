import styled from "styled-components"
import tw from "twin.macro"

export const StyledTitle = styled.div`
    ${tw`
        flex justify-center items-center
        w-full py-4
        bg-gray-950 
        border-b border-white/5 
        relative
        z-50
    `}

    h1 {
        ${tw`
            text-red-700
            text-[48px] md:text-[56px]
            font-black tracking-tighter
            transition-all duration-300
        `}
        font-family : "rippedFont";
        filter: drop-shadow(0 0 10px rgba(185, 28, 28, 0.3));
        
        &:hover {
            ${tw`text-red-600 scale-105`}
        }
    }

    .logout-icon {
        ${tw`
            absolute right-6 md:right-10
            text-xl md:text-2xl
            text-gray-600
            transition-all duration-300
            cursor-pointer
        `}
        
        &:hover {
            ${tw`text-red-600 scale-110`}
            filter: drop-shadow(0 0 8px rgba(185, 28, 28, 0.5));
        }
    }

    @media(max-width: 380px){
        ${tw`py-3`}
        h1 { ${tw`text-[38px]`} }
        .logout-icon { ${tw`right-4 text-xl`} }
    }
`;

export const StyledLogoutModal = styled.div`
    ${tw`
        flex justify-center items-center
    `}
`;