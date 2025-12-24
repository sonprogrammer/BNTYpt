import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

export const StyledContainer = styled.div`
  ${tw`flex flex-col items-center justify-center h-screen bg-gray-950`}
  text-align: center;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

export const StyledEmoji = styled.div`
  ${tw`text-8xl mb-8`}
  animation: ${float} 3s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.1));
`;

export const StyledText = styled.div`
  ${tw`text-2xl md:text-4xl text-white font-black mb-2 uppercase tracking-tighter`}
  span {
    ${tw`text-red-700`}
  }
`;

export const StyledSubText = styled.p`
  ${tw`text-gray-500 mb-10 font-medium`}
`;

export const StyledBackLink = styled.button`
  ${tw`
    px-8 py-3 
    bg-red-700 text-white 
    rounded-full text-sm font-black uppercase tracking-widest
    transition-all duration-300
    hover:bg-red-600 hover:shadow-lg hover:shadow-red-900/40
    active:scale-95
  `}
`;