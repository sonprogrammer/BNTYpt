import styled from "styled-components";
import tw from "twin.macro";
import { QrReader } from 'react-qr-reader';

export const StyledContainer = styled.div`
    ${tw`
        flex
        justify-center
        items-center
        h-full
        w-full
    `}
`
export const StyledTrainerBox = styled.div`
    ${tw`
        flex
        flex-col
        justify-center
        items-center
        p-4
        bg-gray-700
        rounded-lg
        shadow-lg
    `}
    width: 300px;
    height: 300px;
    h2{
        ${tw`
            mb-5
        `}
    }
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
    `}
    width: 300px;
    height: 300px;
`

export const StyledQrReader = styled(QrReader)`
    ${tw`
        p-0
        m-0
        box-border
    `}
`;