import styled from 'styled-components';



export const Container = styled.div`
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 15px;
`

export const Content = styled.span`
    font-size: 16px;
    text-align: center;
`

export const Actions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
    button {
        margin-left: 10px;
    }
`