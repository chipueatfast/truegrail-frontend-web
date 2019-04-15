import React from 'react';
// import { getFirstFactory } from './service';
import InfoInput from './InfoInput';
import GeneratedLabels from './GeneratedLabels';
import { Container } from './styled';



function Factory(props) {
    return (
        <Container>
            <div>Factory</div>
            <InfoInput />
            <GeneratedLabels />
            {/* <button
                onClick={async () => {
                    const firstFactory = await getFirstFactory();
                    alert(firstFactory);
                }}
            >
                Get first factory
            </button> */}
        </Container>
    )
}

export default Factory;