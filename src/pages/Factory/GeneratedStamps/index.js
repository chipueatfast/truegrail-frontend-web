import React, {useState, useEffect} from 'react';
import List from '@material-ui/core/List';
import GrailStamp from '../GrailStamp';
import { Container } from './styled';
import { generateStampDetail } from '../service';

function GeneratedStamps({
    batchInfo,
}) {
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
        }
        temp();

    }, []);
    return (
        <Container>
            <List>
                {
                    stamps.map(stamp => {
                        return (
                            <GrailStamp
                                key={stamp.id}
                                {...stamp}
                            />
                        )
                    })
                }

            </List>
        </Container>
    );
}

export default GeneratedStamps;
