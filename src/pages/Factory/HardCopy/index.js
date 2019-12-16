import React, { useEffect, useState } from 'react';
import SpecificationSvg from '~/assets/img/miniature/specification.svg';
import PackageLabel from '~/assets/img/miniature/package_label.png';
import ConfidentialLabel from '~/assets/img/miniature/confidential.svg';
import LockMini from '~/assets/img/authentication.png';
import Helmet from 'react-helmet';
import QRCode from 'qrcode-react';
import queryString from 'query-string';
import { Container, DashedLine } from './styled';


function HardCopy() {
    const [hardCopy, setHardCopy] = useState(null);
    useEffect(() => {
        const parsed = queryString.parse(location.search); // eslint-disable-line
        const hardCopyData = JSON.parse(atob(parsed.hardCopyData)); 
        setHardCopy(hardCopyData);
        setTimeout(() => window.print(), 500);
    }, []);
    if (!hardCopy) {
        return null;
    }
    const {
        id,
        privateKey,
        batchInfo: {
            colorway,
            model,
            size,
            releaseDate,
        },
    } = hardCopy;
    return (
        <Container>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`Sneaker Id.${id}`}</title>
            </Helmet>
            <span
                className='heading'
            >
                Manufacture part
            </span>
            <span
                className='note'
            >
                This area (above the dashed line) is for the manufacture to know and use as a material to produce sneaker
            </span>
            <div className='miniature-section'>
                <div
                    className='miniature'
                >
                    <img
                        alt='minature'
                        src={SpecificationSvg}
                    />
                </div>
                <div
                    className='content'
                >
                    <span
                        className='heading'
                    >
                        Sneaker details:
                    </span>
                    <span
                        className='note'
                    >
                        Model: {model}           
                    </span>
                    <span
                        className='note'
                    >
                        Colorway: {colorway}           
                    </span>

                    <span
                        className='note'
                    >
                        Size: {size}           
                    </span>

                    <span
                        className='note'
                    >
                        Release date: {releaseDate}           
                    </span>
                </div>
            </div>
            <div className='miniature-section'>
                <div className='miniature'>
                    <img
                        alt='miniature'
                        src={PackageLabel}
                    />
                </div>
                <div className='content'>
                    <span
                        className='heading'
                    >
                        ID label
                    </span>
                    <span
                        className='note'
                    >
                        This is the QR code represent the sneaker ID which will be printed along with the stamp attached onto the issued sneaker
                    </span>
                    
                </div>
                <div
                    className='qr'
                >
                    <QRCode
                        value={id.toString()}
                    />
                </div>
            </div>
            <DashedLine />
            <div className='private-notice'>
                <img
                    src={ConfidentialLabel}
                    alt='confidential'
                />
                <span>
                    This is confidential part
                </span>
                <img
                    src={ConfidentialLabel}
                    alt='confidential'
                />
            </div>
            <div className='miniature-section'>
                <div className='miniature'>
                    <img
                        alt='miniature'
                        src={LockMini}
                    />
                </div>
                <div className='content'>
                    <span
                        className='heading'
                    >
                        Claim code
                    </span>
                    <span
                        className='note'
                    >
                        This is for the first buyer to activate this sneaker onto the TrueGrails system.
                        <br />
                        <br />
                        This must be kept as a secret in an envelope contained in the shoebox. The first buyer of this sneaker should receive the envelope in a perfect status - carefully enclosed, no damage and the content inside of it is not visible if not opened.
                        <br />
                        <br />
                        The claim code can be used only once. Further instruction you can find in the TrueGrail mobile app.
                    </span>
                    
                </div>
                <div
                    className='qr'
                >
                    <QRCode
                        value={privateKey}
                    />
                </div>
            </div>

        </Container>
    )
}

export default HardCopy;
