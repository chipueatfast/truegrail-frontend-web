import React from 'react';
// import { getFirstFactory } from './service';
import InfoInput from './InfoInput';
import GeneratedLabels from './GeneratedLabels';
import { Container } from './styled';
import panelStore from '~/stores/panelStore';



class Factory extends React.Component {
    componentDidMount() {
        panelStore.currentPage.set('FACTORY');
    }
    render() {
        return (
            <Container>
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
}

export default Factory;