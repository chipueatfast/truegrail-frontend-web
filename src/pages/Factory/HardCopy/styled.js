import styled from 'styled-components';
import varStyle from '~/styles/variableStyles';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 668px;
    .heading {
        margin: 12px 0;
        font-size: ${varStyle.font.desktop.big};
        font-weight: bold;
    }

    .private-notice {
        margin-top: 48px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        img {
            width: 64px;
            margin: 0 12px;
        }

        font-size: ${varStyle.font.desktop.bigger};
        font-weight: bold;
    }


    .miniature-section {
        margin-top: 24px;
        display: flex;
        flex-direction: row;

        .miniature {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 140px;
            img {
                width: 128px;
                margin-top: 48px;
            }
        }
        .qr {
            margin-top: 48px;
        }
        .content {
            width: 360px;
            margin: 0 12px;
            display: flex;
            flex-direction: column;
        }

    }

    .note {
        line-height: 24px;
        margin-bottom: 6px;
        font-size: ${varStyle.font.desktop.standard};
    }
`

export const DashedLine = styled.div`
    width: 100%;
    height: 0px;
    border-top: dashed 1px black;
    margin-top: 48px;
`