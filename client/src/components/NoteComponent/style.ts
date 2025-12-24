import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const StyledNoteContainer = styled.div`
    ${tw`w-[90%] md:w-[85%] max-w-[800px] mx-auto h-full flex flex-col pt-4 pb-10`}
    
    .content-area {
        ${tw`flex-1 mt-6`}
        animation: ${fadeIn} 0.5s ease-out; 
    }
`;

export const StyledMembersGroup = styled.section`
    ${tw`w-full mb-4`}
    .label {
        ${tw`text-xs font-black text-gray-500 mb-3 uppercase tracking-widest`}
    }
    .member-list {
        ${tw`flex gap-3 overflow-x-auto pb-2`}
        &::-webkit-scrollbar { height: 4px; }
        &::-webkit-scrollbar-thumb { ${tw`bg-white/10 rounded-full`} }
    }
`;

export const StyledMember = styled.button<{ active?: boolean }>`
    ${tw`
        px-4 py-2 rounded-xl text-sm font-bold flex-shrink-0
        transition-all duration-200 border
    `}
    ${({ active }) => active 
        ? tw`bg-red-700 border-red-600 text-white shadow-lg shadow-red-900/30` 
        : tw`bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white`
    }
`;

export const StyledRecordBtn = styled.button`
    ${tw`
        w-full py-4 mt-2
        bg-white/5 border border-dashed border-white/20
        text-white font-bold rounded-2xl
        hover:bg-white/10 hover:border-red-700/50 hover:text-red-500
        transition-all active:scale-95
    `}
`;

export const StyledNavText = styled.section`
    ${tw`
        mt-20 text-center
        text-lg font-medium text-gray-600
        animate-pulse
    `}
`;

export const StyledNothing = styled.div`
    ${tw`
        h-[60vh] flex flex-col justify-center items-center
        font-bold text-xl text-gray-700
    `}
`;

export const StyledPostBox = styled.div`
    ${tw`
        fixed inset-0 z-[300]
        flex items-center justify-center
        bg-black/80 backdrop-blur-sm
    `}
`;

export const StyledPostForm = styled.div`
    ${tw`
        bg-[#1a1a1a] p-6 pt-10
        rounded-[2rem] w-[90%] max-w-[500px]
        border border-white/10 shadow-2xl
        relative
    `}
`;

export const StyledClose = styled.div`
    ${tw`
        absolute right-6 top-6
        text-gray-500 hover:text-white
        cursor-pointer transition-colors
    `}
`;