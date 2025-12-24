import styled from "styled-components";
import tw from "twin.macro";

export const StyledNotMember = styled.div`
    ${tw`
        flex flex-col justify-center items-center
        h-[60vh] text-xl font-bold text-gray-700
    `}
`;

export const StyledContainer = styled.div`
    ${tw`
        flex items-center
        p-5 md:p-6
        border-b border-white/5
        cursor-pointer
        transition-all duration-200
        relative
    `}
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.03);
    }

    .arrow-icon {
        ${tw`text-gray-800 text-xs ml-auto`}
    }
`;

export const StyledProfile = styled.div`
    ${tw`
        flex-shrink-0
        w-14 h-14 rounded-2xl
        bg-gray-800 border border-white/10
        overflow-hidden
    `}
    img {
        ${tw`w-full h-full object-cover`}
    }
`;

export const StyledContent = styled.div`
    ${tw`
        ml-5 flex flex-col flex-1
    `}
    
    .top-row {
        ${tw`flex items-center gap-2 mb-1`}
        h2 { ${tw`text-lg font-bold text-gray-100`} }
    }
`;

export const LastMsgWrapper = styled.div`
    ${tw`flex justify-between items-center`}
    .msg-text {
        ${tw`text-sm text-gray-500 truncate max-w-[200px] md:max-w-[300px]`}
    }
`;

export const UnreadBadge = styled.span`
    ${tw`
        bg-red-600 text-white
        text-[10px] font-black
        px-1.5 py-0.5 rounded-md
        animate-pulse
    `}
`;