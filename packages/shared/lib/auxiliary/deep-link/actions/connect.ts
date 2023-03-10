import { Core } from "@walletconnect/core";
import { Web3Wallet } from "@walletconnect/web3wallet";

export async function initializeWalletConnect(url): Promise<void> {

    console.log(url);
    

    const core = new Core({
      projectId: '760c10756afd8450d4d96b55ef0748ec',
    });
    
    const web3wallet = await Web3Wallet.init({
      core, // <- pass the shared `core` instance
      metadata: {
        name: "Demo app",
        description: "Demo Client as Wallet/Peer",
        url: "www.walletconnect.com",
        icons: [],
      },
    });

    web3wallet.on("session_proposal", async (proposal) => {
      console.log('Session proposal', proposal);
      
      const session = await web3wallet.approveSession({
        id: proposal.id,
        namespaces: {
            default: { accounts: [], methods: ["eth_sendTransaction"], events: [] },
        },
      });
        
    });

    await web3wallet.core.pairing.pair({ uri: url.uri });
}
