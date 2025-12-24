import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        flex flex-col
        p-5
        bg-white/5
        border border-white/10
        rounded-2xl
        transition-all duration-300
        cursor-pointer
        hover:bg-white/10
        hover:border-red-800/50
        hover:-translate-y-1
    `}
`;

export const StyledUpper = styled.section`
    ${tw`
        flex items-center justify-between
        mb-3 pb-2
        border-b border-white/5
    `}
    .date {
        ${tw`text-[10px] font-bold text-gray-600 uppercase`}
    }
`;

export const StyledTitle = styled.h1`
    ${tw`
        font-black text-gray-200
        truncate max-w-[70%]
        text-sm md:text-base
    `}
`;

export const StyledBox = styled.section`
    ${tw`
        flex flex-col flex-1
        overflow-hidden
    `}
`;

export const StyledContent = styled.div`
    ${tw`
        text-xs text-gray-400
        line-clamp-3 
        leading-relaxed
        mb-3
    `}
`;

export const StyledImg = styled.div`
    ${tw`
        relative
        mt-auto
        w-full h-24
        rounded-xl
        overflow-hidden
        bg-black/20
    `}
    img {
        ${tw`w-full h-full object-cover opacity-80`}
    }
    .img-count {
        ${tw`
            absolute bottom-2 right-2
            bg-black/60 backdrop-blur-md
            text-white text-[10px] font-bold
            px-2 py-1 rounded-md
        `}
    }
`;