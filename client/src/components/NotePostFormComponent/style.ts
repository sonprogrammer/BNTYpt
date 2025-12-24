import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainerForm = styled.form`
    ${tw`
        flex flex-col gap-4
        w-full h-full
        bg-transparent
    `}
`;

export const StyledUpper = styled.section`
    ${tw`flex flex-col gap-1 mb-2`}
    .select-wrapper {
        ${tw`flex justify-end`}
    }
`;

export const StyledRecord = styled.h1`
    ${tw`
        text-xs font-black text-red-600
        tracking-[0.3em] uppercase
    `}
`;

export const StyledSelect = styled.select`
    ${tw`
        bg-white/10 text-white text-xs font-bold
        px-3 py-1.5 rounded-lg border border-white/10
        outline-none cursor-pointer
    `}
    option { ${tw`bg-gray-900 text-white`} }
`;

export const StyledTitle = styled.input`
    ${tw`
        w-full p-4 rounded-2xl
        bg-white/5 text-white font-bold text-lg
        border border-white/10 outline-none
        placeholder:text-gray-700
        focus:border-red-700 transition-all
    `}
`;

export const StyledTextArea = styled.textarea`
    ${tw`
        w-full flex-1 p-4 rounded-2xl
        bg-white/5 text-gray-300 font-medium
        border border-white/10 outline-none
        placeholder:text-gray-700
        resize-none leading-relaxed
        focus:border-red-700 transition-all
    `}
`;

export const StyledSubmitEl = styled.div`
    ${tw`flex flex-col gap-4 pt-2`}

    .file-input-wrapper {
        label {
            ${tw`
                flex items-center gap-2
                text-sm font-bold text-gray-400
                cursor-pointer hover:text-white transition-colors
            `}
            svg { ${tw`text-red-700`} }
        }
    }
`;

export const ImagePreviewWrapper = styled.div`
    ${tw`flex gap-2 overflow-x-auto py-1`}
    img {
        ${tw`w-20 h-20 object-cover rounded-xl border border-white/10 shadow-lg`}
    }
`;

export const StyledBtn = styled.button`
    ${tw`
        w-full py-4 rounded-2xl
        bg-red-700 text-white font-black text-sm
        hover:bg-red-600 active:scale-95
        transition-all shadow-lg shadow-red-900/20
        disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed
    `}
`;