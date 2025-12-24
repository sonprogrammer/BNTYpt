import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainerForm = styled.form`
    ${tw`
        flex flex-col
        w-full h-full
        bg-transparent
    `}
`;

export const StyledTitle = styled.h1`
    ${tw`
        text-2xl font-black
        text-white mb-6
        flex items-center
    `}
`;

export const StyledTitleInput = styled.input`
    ${tw`
        w-full p-4 mb-6
        bg-white/5 border border-white/10
        rounded-2xl text-white font-bold
        placeholder:text-gray-600
        focus:outline-none focus:border-red-600 focus:bg-white/10
        transition-all
    `}
`;

export const FileInputWrapper = styled.div`
  ${tw`relative mb-4`}
  input { ${tw`hidden`} }
  label {
    ${tw`
      flex flex-col items-center justify-center
      w-full py-8 border-2 border-dashed border-white/10
      rounded-2xl bg-white/5
      text-gray-400 cursor-pointer
      hover:bg-white/10 hover:border-red-600/50
      transition-all
    `}
    span { ${tw`mt-2 text-sm`} }
  }
`;

export const PreviewContainer = styled.div`
  ${tw`
    flex gap-3 overflow-x-auto pb-4 mb-6
    min-h-[120px] items-center
  `}
  
  img {
    ${tw`w-28 h-28 object-cover rounded-xl border border-white/20 flex-shrink-0`}
  }

  .empty-preview {
    ${tw`w-full text-center text-gray-700 text-sm italic`}
  }

  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-thumb { ${tw`bg-gray-800 rounded-full`} }
`;

export const StyledSubmitEl = styled.div`
    ${tw`flex flex-col h-full`}
`;

export const StyledBtn = styled.button`
    ${tw`
        w-full py-4
        bg-red-700 hover:bg-red-600
        disabled:bg-gray-800 disabled:cursor-not-allowed
        text-white font-black text-lg
        rounded-2xl transition-all
        shadow-lg shadow-red-900/20
        flex justify-center items-center
    `}
    &:active { ${tw`scale-[0.98]`} }
`;