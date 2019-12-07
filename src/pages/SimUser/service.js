import { executeSmartContractMethodWithDirectPrivateKey } from '~/utils/eosio';

export async function claimSneaker({
    claimerId,
    sneakerAccount,
    claimCode,
    sneakerId,
}) {

    const claimFromBlockchainRs = await executeSmartContractMethodWithDirectPrivateKey({
        namedParams: {
            sneaker_id: sneakerId,
            new_owner_id: claimerId,
        },
        method: 'transfer',
    }, {
        eosName: sneakerAccount,
        privateKey: claimCode,
    })
    return JSON.stringify(claimFromBlockchainRs);

}