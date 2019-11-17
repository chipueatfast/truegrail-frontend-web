import { Keygen } from 'eosjs-keygen';


export async function generateKeyPair() {
    const keypair = await Keygen.generateMasterKeys();
    console.log(keypair);
}
