import React from 'react';
// import { getFirstFactory } from './service';
import InfoInput from './InfoInput';
import GeneratedLabels from './GeneratedLabels';



function Factory(props) {
    return (
        <div>
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
        </div>
    )
}

export default Factory;