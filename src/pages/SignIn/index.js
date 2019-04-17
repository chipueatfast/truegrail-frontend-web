import React from 'react';
import { addOrChangeAccount } from './service';

function SignIn() {
    return (
        <div>
            <div>Welcome, welcome</div>
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