import React from 'react';
import { observer } from 'mobx-react';

import { collectionStore } from './stores';
import contractStore from '~/stores/contractStore';
import ItemCard from './ItemCard';
import { Container } from './styled';

@observer
class Outlet extends React.Component {

    componentDidUpdate() {
        if (contractStore.getTrueGrailInstance() && !collectionStore.fetched.get()) {
            collectionStore.fetchCollection();
        } 
    }

    render() {
        return (
            <Container>
                {
                    !contractStore.getTrueGrailInstance() && (
                        <div> Fetching... </div>)
                }
                {
                    collectionStore.sneakers.map(snk => {
                        return (<ItemCard info={snk} key = {snk.id} />)
                    })
                }
            </Container>
        )
    }
}

export default Outlet;
