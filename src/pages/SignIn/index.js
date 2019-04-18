import React from 'react';
import { addOrChangeAccount } from './service';

function SignIn() {
    
    return (
        <div>
            <button
                onClick={() => {
                    addOrChangeAccount();
                }}
            >
                Change account
            </button>
        </div>
    )
}

export default SignIn;