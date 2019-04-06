import React from 'react';
import { observer } from 'mobx-react';
import List from '@material-ui/core/List';

import Label from './Label'; 


import publishSneakerStore from '../stores/PublishSneakerStore';

class GeneratedLabels extends React.Component {
    render() {

        const labels = publishSneakerStore.labels;

        return (
            <div>
                <div>GeneratedLabels</div>
                <List>
                    {
                        labels.map(label => (
                            <Label
                                key={label.id}
                                data={label}
                            />
                        ))
                    }
                </List>
            </div>
            
        )
    }
}

export default observer(GeneratedLabels);