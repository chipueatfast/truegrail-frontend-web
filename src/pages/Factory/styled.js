import styled from 'styled-components';

export const Container = styled.div`
    padding-top: 15px;
    min-width: 680px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const IssueActionBox = styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    img {
        width: 200px;
        object-fit: contain;
        margin: 12px;
    }
`