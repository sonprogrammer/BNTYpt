import styled from "styled-components";
import tw from "twin.macro";

export const StyledBox = styled.div`
    ${tw`flex flex-col items-center w-full max-w-[450px] mx-auto p-4 gap-6`}
`;

export const StyledContainer = styled.div`
    ${tw`w-full bg-[#1a1a1a] rounded-[2.5rem] p-6 border border-white/5 shadow-2xl`}
`;

export const StyledTitle = styled.div`
    ${tw`flex justify-between items-center mb-6`}
    h1 { ${tw`text-xl font-black text-white`} }
    .add-btn {
        ${tw`w-10 h-10 flex items-center justify-center bg-red-700 text-white rounded-full hover:bg-red-600 transition-all shadow-lg shadow-red-900/20 active:scale-90`}
    }
`;

export const StyledHeader = styled.header`
    ${tw`flex justify-between items-center mb-6 px-2`}
    h2 { ${tw`text-lg font-bold text-gray-200 uppercase tracking-widest`} }
`;

export const StyledIcon = styled.div`
    ${tw`w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white cursor-pointer transition-colors`}
`;

export const StyledGrid = styled.div`
    ${tw`grid grid-cols-7 gap-1 w-full`}
`;

export const StyledDay = styled.div`
    ${tw`text-center text-[10px] font-black text-gray-600 pb-4 uppercase tracking-tighter`}
`;

export const StyledCell = styled.div<{ isToday: boolean; isSelected: boolean; isDisabled: boolean }>`
    ${tw`aspect-square flex flex-col items-center justify-center cursor-pointer relative rounded-xl transition-all text-sm font-medium`}
    
    color: ${({ isDisabled }) => (isDisabled ? '#374151' : '#f3f4f6')};
    
    ${({ isToday }) => isToday && tw`bg-white/10 text-red-500 font-bold`}
    ${({ isSelected }) => isSelected && tw`bg-red-700 text-white shadow-lg shadow-red-900/30 scale-105 z-10`}
    
    &:hover { ${tw`bg-white/5`} }
`;

export const DotWrapper = styled.div`
    ${tw`absolute bottom-1.5 flex gap-0.5`}
`;

export const Dot = styled.div<{ color: string }>`
    ${tw`w-1 h-1 rounded-full`}
    background-color: ${({ color }) => color};
`;

export const StyledDetail = styled.div`
    ${tw`w-full bg-[#1a1a1a] rounded-[2rem] p-6 border border-white/5 shadow-xl`}
    
    .detail-header { ${tw`mb-4 pb-4 border-b border-white/5`} 
        h3 { ${tw`text-gray-400 font-bold text-sm tracking-widest`} }
    }
    
    .detail-content {
        ${tw`flex flex-col gap-4`}
        .item {
            ${tw`flex flex-col gap-1`}
            .label { 
                ${tw`text-[10px] font-black px-2 py-0.5 rounded w-fit`}
                &.diet { ${tw`bg-yellow-500/10 text-yellow-500`} }
                &.workout { ${tw`bg-red-500/10 text-red-500`} }
            }
            p { ${tw`text-gray-300 text-sm leading-relaxed`} }
        }
    }
`;

export const StyledModal = styled.div`
    ${tw`fixed inset-0 flex items-center justify-center z-[2000] p-4`}
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(8px);
`;

export const StyledModalBox = styled.div`
    ${tw`bg-[#1a1a1a] p-8 rounded-[2rem] w-full max-w-[400px] border border-white/10 shadow-2xl relative flex flex-col gap-6`}
`;

export const StyledCloseBtn = styled.div`
    ${tw`absolute right-6 top-6 text-gray-500 hover:text-white cursor-pointer transition-all`}
`;

export const StyledModalContents = styled.div`
    ${tw`flex flex-col gap-2`}
    label { ${tw`text-xs font-black text-red-600 uppercase tracking-widest`} }
`;

export const StyledModalTextArea = styled.textarea`
    ${tw`w-full h-32 p-4 bg-white/5 border border-white/10 rounded-2xl text-white text-sm outline-none focus:border-red-600 transition-all resize-none`}
`;

export const StyledBtn = styled.button`
    ${tw`w-full py-4 bg-red-700 hover:bg-red-600 text-white font-black rounded-2xl transition-all active:scale-95 shadow-lg shadow-red-900/20`}
`;