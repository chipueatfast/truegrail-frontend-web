import styled from 'styled-components';

export const Container = styled.div`
    margin: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    height: 200px;
    flex-grow: 1;

    .text-field {
        width: 100%;
        margin-top: 10px;
    }

    .select {
        width: 100%;
    }

    button {
        margin-top: 15px;
    }

    input {
        text-align: center;
    }

    .action {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        margin-right: 12px;
    }

`