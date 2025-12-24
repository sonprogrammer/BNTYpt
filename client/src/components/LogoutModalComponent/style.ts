import styled,{keyframes} from "styled-components";
import tw from "twin.macro";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const Overlay = styled.div`
  ${tw`fixed inset-0 z-[5000] flex items-center justify-center bg-black/80 backdrop-blur-sm`}
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalBox = styled.div`
  ${tw`bg-[#1a1a1a] border border-white/10 w-[85%] max-w-[350px] p-8 rounded-[2.5rem] text-center shadow-2xl`}
  animation: ${slideUp} 0.3s ease-out;

  h2 { ${tw`text-white text-xl font-black mb-3`} }
  p { ${tw`text-gray-500 text-sm font-medium mb-8 leading-relaxed`} }
`;

export const IconWrapper = styled.div`
  ${tw`w-16 h-16 bg-red-900/20 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl`}
`;

export const ButtonGroup = styled.div`
  ${tw`flex flex-col gap-3`}
  button {
    ${tw`w-full py-4 rounded-2xl font-black text-sm transition-all active:scale-95`}
    &.confirm { ${tw`bg-red-700 text-white hover:bg-red-600`} }
    &.cancel { ${tw`bg-white/5 text-gray-500 hover:text-white`} }
  }
`;