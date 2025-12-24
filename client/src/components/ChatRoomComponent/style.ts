import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`w-full h-full flex flex-col bg-gray-950`}
`;

export const Styledupper = styled.div`
    ${tw`
        flex items-center justify-center
        py-4 px-6 border-b border-white/5
        bg-gray-950 z-10
    `}
    h2 { ${tw`text-lg font-bold text-white tracking-tight`} }
`;

export const StyledArrow = styled.div`
    ${tw`absolute left-6 text-gray-400 hover:text-white transition-colors cursor-pointer`}
`;

export const StyledMessageBox = styled.div`
    ${tw`
        flex flex-col flex-1
        overflow-y-auto overflow-x-hidden
        px-4 py-6 space-y-4
        bg-gray-950
    `}
   
    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb { ${tw`bg-gray-800 rounded-full`} }
`;

export const StyledMessage = styled.div<{ isMine: boolean }>`
    ${tw`flex flex-col relative max-w-[80%]`}
    align-self: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};

    .bubble {
        ${tw`p-3 px-4 rounded-2xl text-sm leading-relaxed shadow-sm`}
        ${({ isMine }) => (isMine 
            ? tw`bg-red-700 text-white rounded-tr-none` 
            : tw`bg-white/10 text-gray-100 rounded-tl-none`
        )}
    }

    .status {
        ${tw`absolute bottom-0 text-[10px] font-bold text-red-500`}
        ${({ isMine }) => (isMine ? 'left: -15px;' : 'right: -15px;')}
    }
`;

export const StyledSendEl = styled.div`
    ${tw`
        flex items-center gap-3
        p-4 bg-gray-900/50 backdrop-blur-md
        border-t border-white/5
    `}

    .input-wrapper {
        ${tw`relative flex-1 flex items-center bg-white/5 border border-white/10 rounded-2xl`}
        
        input {
            ${tw`w-full p-3 px-4 bg-transparent text-white outline-none text-sm placeholder:text-gray-600`}
        }
    }

    .preview-overlay {
        ${tw`absolute -top-20 left-0 p-2 bg-gray-800 rounded-xl shadow-2xl flex items-center border border-white/10`}
        img { ${tw`w-12 h-12 object-cover rounded-lg`} }
        button { ${tw`ml-2 text-gray-400 hover:text-white px-1`} }
    }

    .send-btn {
        ${tw`
            w-11 h-11 flex items-center justify-center
            bg-red-700 text-white rounded-xl
            hover:bg-red-600 transition-all active:scale-95
        `}
    }
`;

export const StyledPlus = styled.div`
    ${tw`
        text-gray-400 text-xl
        hover:text-white transition-colors
        cursor-pointer p-1
    `}
`;