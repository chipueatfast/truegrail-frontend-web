import React, {useState, useEffect} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DesignedStamp from '../DesignedStamp';
import { Container, LoadingContainer } from './styled';
import { generateStampDetail } from '../service';
import LoadingIndicator from '~/universal-components/LoadingIndicator/index';

function GeneratedStamps({
    batchInfo,
    password,
}) {
    const [isGenerating, setIsGenerating] = useState(true);
    const [stamps, setStamps] = useState([]);
    useEffect(() => {
        async function temp() {
            const {
                quantity,
            } = batchInfo;
            const generatedStamps = [];
            for (let i = 0; i < quantity; i++) {
                generatedStamps.push(await generateStampDetail(batchInfo));
            }
            setStamps(generatedStamps);
            setIsGenerating(false);
        }
        temp().then();

    }, []);
    if (isGenerating) {
        return (<LoadingContainer>
            <LoadingIndicator />
            <span>Generating stamps, please wait...</span>
        </LoadingContainer>)
    }
    return (
        <Container>
            <List>
                {
                    stamps.map(stamp => {
                        return (
                            <ListItem key={stamp.id}>
                                <DesignedStamp
                                    {...stamp}
                                    password={password}
                                    batchInfo={batchInfo}
                                />
                            </ListItem>
                        )
                    })
                }

            </List>
        </Container>
    );
}

export default GeneratedStamps;
