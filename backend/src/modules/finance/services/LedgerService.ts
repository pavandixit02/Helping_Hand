// Mock Double-Entry Ledger Service
export class LedgerService {
  /**
   * Records a double-entry transaction. Total credits must equal total debits.
   */
  public static async recordTransaction(
    entries: { walletId: string; amount: number; type: 'CREDIT' | 'DEBIT' }[],
    referenceId: string,
    description: string
  ): Promise<boolean> {
    const totalCredit = entries.filter(e => e.type === 'CREDIT').reduce((acc, curr) => acc + curr.amount, 0);
    const totalDebit = entries.filter(e => e.type === 'DEBIT').reduce((acc, curr) => acc + curr.amount, 0);

    if (totalCredit !== totalDebit) {
      throw new Error(`[Ledger Error] Unbalanced transaction. Credits (${totalCredit}) != Debits (${totalDebit})`);
    }

    console.log(`[Ledger] Recording balanced transaction ${referenceId}: ${description}`);
    // In production: Use Prisma $transaction to insert entries into WalletTransaction table
    return true;
  }
}
