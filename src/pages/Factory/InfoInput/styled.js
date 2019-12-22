import styled from 'styled-components';

export const Container = styled.div`
    max-width: 800px;
    .text-field {
        margin: 0 10px;
    }
`

export const CenterContainer = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: start;
    align-items: center;
`
export const ColorPickerContainer = styled.div`
    cursor: pointer;
    .color {
        box-shadow: 0 0 0 1px rgba(0,0,0,.1);
        width: 80px;
        height: 30px;
        border-radius: 2px;
        background: ${({color}) => color};
    }
    .sketch-picker {
        color: black;
    }
    .popover {
        position: absolute;
        z-index: 2;
    }
    .cover {
        position: fixed;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
    },
`;

export const ActionContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 48px 0;
    .item {
        margin-left: 12px;
    }
`

export const FirstLineInFormContainer = styled.div`
    display: grid;
    grid-template-areas: 'brand model model';
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    margin-bottom: 20px;
    .brand {
        grid-area: brand;
    }
    .model {
        grid-area: model;
    }
`