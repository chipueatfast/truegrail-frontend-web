import React, { useEffect, useState } from 'react';
import IssueImg from '~/assets/img/miniature/issue.png'
import ClaimImg from '~/assets/img/miniature/claim.png'
import ResellImg from '~/assets/img/miniature/resell.png';
import queryString from 'query-string';
import { fetchHistoryOfASneaker } from './service';
import { Container, TraceRowContainer } from './styled';

function Tracing() {
    const parsed = queryString.parse(location.search);  // eslint-disable-line
    const [tracing, setTracing] = useState({
        issue: null,
        claim: null,
        resell: [],
    })

    useEffect(() => {
        fetchHistoryOfASneaker(parsed.sneakerId).then(details => {
            const issue = details.find(detail => detail.type === 'issue');
            const claim = details.find(detail => detail.type === 'claim');
            const resell = details.filter(detail => detail.type === 'resell');
            setTracing({
                issue,
                claim,
                resell: resell || [],
            })
        });
    }, [])

    const {
        issue,
        claim,
        resell,
    } = tracing;

    function renderIssue() {
        return (
            <TraceRowContainer>
                <img
                    alt='mini'
                    src={IssueImg}
                />
                <div>
                    Factory name: {issue.factoryName}
                </div>
            </TraceRowContainer>
        )
    }

    function renderClaim() {
        return (
            <TraceRowContainer>
                <img
                    alt='mini'
                    src={ClaimImg}
                />
                <div>
                    Claimer name: {claim.claimerName}
                </div>
            </TraceRowContainer>
        )
    }

    function renderResell() {
        return (
            <>
                {
                    resell.map(r => (
                     <TraceRowContainer key={r.id}>
                        <img
                            alt='mini'
                            src={ResellImg}
                        />
                        <div>
                            Seller: {r.sellerName}
                            <br />
                            to
                            <br/>
                            Buyer: {r.buyerName}
                        </div>
                    </TraceRowContainer>
                    ))
                }
            </>
        )
    }
    return (
        <Container>
            <h2>History of Sneaker no.{parsed.sneakerId}</h2>
            {
                !!issue && renderIssue()
            }
            {
                !!claim && renderClaim()
            }
            {
                resell && resell.length !== 0 && renderResell()
            }
        </Container>
    )
}

export default Tracing;
