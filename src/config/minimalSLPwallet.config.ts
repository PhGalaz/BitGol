const BchWallet = require('minimal-slp-wallet');

class BCHWallet {
  private wallet: any = null;

  async initializeWallet(mnemonic?: string, interfaceType = 'rest-api', restURL = 'https://api.fullstack.cash/v5/'): Promise<any> {
    try {
      this.wallet = new BchWallet(mnemonic, {
        interface: interfaceType,
        restURL: restURL
      });
      await this.wallet.walletInfoPromise;
      await this.wallet.initialize();
      console.log('Connected to Minimal SLP wallet');
      return this.wallet;
    } catch (error) {
      console.error('Failed to connect to Minimal SLP wallet', error);
      throw error;
    }
  }

  async createWallet(): Promise<any> {
    try {
      const wallet = await this.initializeWallet();
      console.log('New wallet created');
      console.log('Mnemonic:', wallet.walletInfo.mnemonic);
      console.log('Cash Address:', wallet.walletInfo.cashAddress);
      console.log('Legacy Address:', wallet.walletInfo.legacyAddress);
      console.log('Private Key:', wallet.walletInfo.privateKey);
      return wallet;
    } catch (error) {
      console.error('Failed to create a new wallet', error);
      throw error;
    }
  }

  async getBalance(): Promise<any> {
    if (!this.wallet) throw new Error('Wallet not initialized');
    return this.wallet.getBalance();
  }

  async getTokens(): Promise<any> {
    if (!this.wallet) throw new Error('Wallet not initialized');
    return this.wallet.listTokens();
  }

  async sendTransaction(receivers: { address: string; amountSat: number }[]): Promise<any> {
    if (!this.wallet) throw new Error('Wallet not initialized');
    return this.wallet.send(receivers);
  }

  async sendTokens(receiver: { address: string; tokenId: string; qty: number }): Promise<any> {
    if (!this.wallet) throw new Error('Wallet not initialized');
    return this.wallet.sendTokens(receiver);
  }

  async getTransactionHistory(): Promise<any> {
    if (!this.wallet) throw new Error('Wallet not initialized');
    return this.wallet.getTransactions();
  }

  async getTokenData(tokenId: string): Promise<any> {
    if (!this.wallet) throw new Error('Wallet not initialized');
    return this.wallet.getTokenData(tokenId);
  }

  async getUsdPrice(): Promise<any> {
    if (!this.wallet) throw new Error('Wallet not initialized');
    return this.wallet.getUsd();
  }

  async sendOpReturn(data: string): Promise<any> {
    if (!this.wallet) throw new Error('Wallet not initialized');
    return this.wallet.sendOpReturn(data);
  }
}

const bchWalletConfig = new BCHWallet();
export default bchWalletConfig;
