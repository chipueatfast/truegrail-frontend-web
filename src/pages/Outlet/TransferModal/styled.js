import styled from 'styled-components';

export const Container = styled.div`
    width: 400px;
    height: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;

    .text-field {
            width: 80%;
    }

    .action {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        button {
            margin: 10px 0;
        }
    }
`;