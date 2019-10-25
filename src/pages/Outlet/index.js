import React from 'react';
import { observer } from 'mobx-react';

import { collectionStore } from './stores/index';
import ItemCard from './ItemCard';
import { Container } from './styled';

@observer
class Outlet extends React.Component {
    componentDidMount() {
        collectionStore.fetchCollection();
    }

    render() {
        return (
            <Container>
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
