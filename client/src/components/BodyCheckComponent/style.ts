import tw from "twin.macro";
import styled from "styled-components";

export const StyledContainer = styled.div`
  ${tw`w-full min-h-full p-4 md:p-8`}
`;

export const StyledNothing = styled.div`
  ${tw`
    w-full h-[60vh]
    flex flex-col justify-center items-center
    text-center text-gray-600 font-medium
    leading-relaxed
  `}
`;

export const StyledImgContainer = styled.div`
  ${tw`
    grid gap-6 md:gap-8
    grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
    w-full max-w-[1200px] mx-auto
  `}
`;

export const StyledBox = styled.div`
  ${tw`
    flex flex-col
    bg-[#1e1e1e]
    rounded-[2rem]
    overflow-hidden
    border border-white/5
    transition-all duration-300
    cursor-pointer
    relative
  `}
  
  &:hover {
    ${tw`translate-y-[-8px] border-red-900/50`}
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }
`;

export const ImageWrapper = styled.div`
  ${tw`relative w-full aspect-square overflow-hidden bg-black flex items-center justify-center`}
  
  img {
    ${tw`w-full h-full object-cover transition-all duration-500`}
  }

  ${StyledBox}:hover & img {
    ${tw`scale-110 brightness-75`}
  }
`;

export const StyledDelete = styled.button`
  ${tw`
    absolute inset-0 m-auto
    w-16 h-16
    flex items-center justify-center
    bg-red-600/80 text-white text-2xl
    rounded-full backdrop-blur-sm
    transition-all duration-200
    hover:bg-red-500 hover:scale-110
    z-20
  `}
`;

export const StyledTitle = styled.p`
  ${tw`
    w-full text-center py-4 px-2
    text-white font-bold text-lg
    truncate
  `}
`;

export const StyledText = styled.p`
  ${tw`
    w-full text-center py-3
    text-gray-500 text-xs font-mono
    border-t border-white/5
  `}
`;