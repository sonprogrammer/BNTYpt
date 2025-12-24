import tw from "twin.macro";
import styled, { keyframes } from "styled-components";


const moveOrb = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(30px, -50px); }
  100% { transform: translate(0, 0); }
`;

export const StyledContainer = styled.div`
  ${tw`
    relative
    w-full
    h-screen
    overflow-hidden
    bg-[#020617]
    flex
    justify-center
    items-center
  `}
`;

export const BackgroundDecor = styled.div`
  ${tw`absolute inset-0 overflow-hidden pointer-events-none`}
  
  &::before, &::after {
    content: '';
    ${tw`absolute rounded-full opacity-30 blur-[120px]`}
    animation: ${moveOrb} 10s infinite alternate ease-in-out;
  }

  &::before {
    width: 400px;
    height: 400px;
    background: #e11d48; 
    top: -100px;
    right: -100px;
  }

  &::after {
    width: 500px;
    height: 500px;
    background: #1e40af; 
    bottom: -150px;
    left: -150px;
    animation-delay: -5s;
  }
`;

export const StyledLogin = styled.div`
  ${tw`
    relative
    z-10
    w-full
    max-w-[1200px]
    flex
    flex-col
    lg:flex-row
    items-center
    justify-center
    gap-12
    p-6
  `}
`;

export const BrandingSection = styled.div`
  ${tw`
    hidden lg:flex
    flex-col
    items-start
    text-white
    space-y-6
    max-w-md
  `}

  h1 {
    ${tw`text-9xl font-black text-white m-0`}
    font-family: "rippedFont";
    line-height: 0.8;
    background: linear-gradient(to bottom, #fff 50%, #e11d48 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .tagline {
    ${tw`text-2xl font-bold text-gray-100 tracking-tight mt-4`}
  }

  .description {
    ${tw`text-gray-400 leading-relaxed`}
  }

  .feature-pills {
    ${tw`flex flex-wrap gap-2 mt-4`}
    span {
      ${tw`px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-red-500`}
    }
  }
`;