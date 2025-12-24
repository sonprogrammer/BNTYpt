import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        mt-5 w-full h-full
        grid grid-cols-2 md:grid-cols-3
        gap-4 md:gap-6
        auto-rows-[250px]
    `}
`;

export const StyledModalContainer = styled.div`
    ${tw`
        fixed inset-0 z-[4000]
        flex justify-center items-center
        bg-black/80 backdrop-blur-md
    `}
`;

export const StyledModalBox = styled.div`
    ${tw`
        flex flex-col
        w-[90%] max-w-[600px] h-[85%]   
        bg-[#1a1a1a] text-white
        rounded-[2.5rem] border border-white/10
        relative px-6 md:px-10 py-8
        overflow-y-auto shadow-2xl
    `}
    
    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb { ${tw`bg-white/10 rounded-full`} }
`;

export const StyledEditBox = styled.div`
    ${tw`flex flex-col gap-4 mt-6`}
    .label { ${tw`text-[10px] font-black text-red-600 uppercase tracking-widest`} }
`;

export const StyledEditTitle = styled.input`
    ${tw`
        w-full p-4 text-xl font-bold rounded-2xl
        bg-white/5 text-white border border-white/10
        outline-none focus:border-red-600 transition-all
    `}
`;

export const StyledEditText = styled.textarea`
    ${tw`
        w-full min-h-[200px] p-4 font-medium rounded-2xl
        bg-white/5 text-gray-300 border border-white/10
        outline-none focus:border-red-600 transition-all
        resize-none leading-relaxed
    `}
`;

export const StyledEditBtnGroup = styled.div`
    ${tw`flex gap-3 justify-end mt-4`}
    button {
        ${tw`px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95`}
        &.save { ${tw`bg-red-700 text-white hover:bg-red-600 shadow-lg shadow-red-900/20`} }
        &.cancel { ${tw`bg-white/5 text-gray-400 hover:text-white`} }
    }
`;

export const StyledCloseBtn = styled.button`
    ${tw`absolute right-8 top-8 text-gray-500 hover:text-white transition-colors`}
`;

export const StyledTitle = styled.h1`
    ${tw`text-2xl md:text-3xl font-black text-white mt-4 mb-2 leading-tight`}
`;

export const StyledDate = styled.h2`
    ${tw`text-sm font-bold text-gray-600 mb-4`}
`;

export const StyledImage = styled.div`
    ${tw`w-full my-6 rounded-3xl overflow-hidden flex flex-col gap-4`}
    img { ${tw`w-full object-cover rounded-2xl shadow-lg`} }
`;

export const StyledText = styled.p`
    ${tw`text-gray-300 font-medium leading-loose text-base pb-10 whitespace-pre-wrap`}
`;

export const StyledTrainerFn = styled.div`
    ${tw`flex gap-3 my-4 items-center`}
`;