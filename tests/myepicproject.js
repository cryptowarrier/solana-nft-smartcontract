const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("myepicproject", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  it("Is initialized!", async () => {
    // Add your test here.
    const program = anchor.workspace.Myepicproject;
    const provider = anchor.Provider.env();
    // create an account keypair for our program to use.
    const baseAccount = anchor.web3.Keypair.generate();


    const tx = await program.rpc.startStuffOff({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });
    console.log("📝 Your transaction signature", tx);

    // fetch data from the account.
    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('👀 GIF Count', account.totalGifs.toString());

    // You'll need to now pass a GIF link to the function! You'll also need to pass in the user submitting the GIF!
    await program.rpc.addGif("insert_a_giphy_link_here", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    });

    // Call the account.
    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('👀 GIF Count', account.totalGifs.toString())

    // Access gif_list on the account!
    console.log('👀 GIF List', account.gifList)
  });
});
