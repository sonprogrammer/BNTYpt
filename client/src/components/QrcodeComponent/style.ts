import styled from "styled-components";
import tw from "twin.macro";
import QrReader from 'react-qr-scanner';

export const StyledContainer = styled.div`
    ${tw`
        flex
        justify-center
        items-center

    `}
`
export const StyledTrainerBox = styled.div`
    ${tw`
        flex
        flex-col
        justify-center
        items-center
        p-4
        bg-white
        rounded-lg
        shadow-lg
    `}

   
`
export const StyledMemberBox = styled.div`
    ${tw`
        flex
        flex-col
        justify-center
        items-center
        p-4
        bg-gray-700
        rounded-lg
        shadow-lg
        shadow-gray-900
    `}
    width: 300px;
    // height: 300px;
`

export const StyledQrReader = styled(QrReader)`
    ${tw`
        p-0
        m-0
        box-border
    `}
    video{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;