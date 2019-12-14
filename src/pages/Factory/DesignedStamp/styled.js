import styled from 'styled-components';
import varStyle from '~/styles/variableStyles';

export const Container = styled.div`
    padding: 12px;
    ${({issueStatus}) => {
        switch (issueStatus) {
            case 1:
                return `background: ${varStyle.color.yellow};
                ` ;
            case 2:
                return `background: ${varStyle.color.green};
                `;
            case 3:
                return `background: ${varStyle.color.red};
                        color: white
                `;
            default:
                return null;
        }}};
    grid-gap: 12px;
    border: red solid 1px;
    display: grid;
    grid-template-areas: 'qr detail action';
    grid-template-columns: 1fr 2fr 1fr;
    width: 668px;
`

export const ActionContainer = styled.div`
    grid-area: action;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .item {
        margin: 12px 0;
    }
`

export const DetailContainer = styled.div`
    grid-area: detail;
    display: flex;
    flex-direction: column;

    .heading {
        font-weight: bold;
        font-size: ${varStyle.font.desktop.big};
    }

    .sub-heading {
        margin: 6px 0;
        font-size: ${varStyle.font.desktop.standard};
        font-weight: bold;
    }

    .note {
        font-size: ${varStyle.font.desktop.standard};
        text-overflow: ellipsis;
        overflow: hidden;
        width: 200px;
    }
`

export const QRContainer = styled.div`
    grid-area: qr;
`;
