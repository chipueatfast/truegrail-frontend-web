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
            </Container>
        )
    }
}

export default Factory;