import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px;
`

export const TraceRowContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 12px;
    height: 50px;
    border-bottom: red 1px solid;
    img {
        width: 50px;
        object-fit: contain;
    }
    margin: 12px 0;
`