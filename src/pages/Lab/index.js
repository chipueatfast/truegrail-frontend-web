import React from 'react';
import { decryptPrivateKey } from '~/utils/eosio';
import { getEncryptedPrivateKey } from '~/utils/localStorage';

function Lab() {
    const [password, setPassword] = React.useState('');
    const [privateKey, setPrivateKey] = React.useState('chua co giai ma');
    return (
        <div>
            get private key
            <input
                type='text'
                values={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <button
                onClick={() => {
                    console.log('p: ', password);
                
                    setPrivateKey(decryptPrivateKey(getEncryptedPrivateKey(), password));
                }}
            >
                Decrypt
            </button>
            <div>{privateKey}</div>
            
        </div>
    )
}

export default Lab;
