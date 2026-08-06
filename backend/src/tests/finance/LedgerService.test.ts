import { LedgerService } from '../../modules/finance/services/LedgerService';

describe('LedgerService (Double-Entry Accounting)', () => {
  it('should successfully record a perfectly balanced transaction', async () => {
    const entries: any = [
      { walletId: 'w_patient_1', amount: 100, type: 'DEBIT' },
      { walletId: 'w_doctor_1', amount: 90, type: 'CREDIT' },
      { walletId: 'w_platform_1', amount: 10, type: 'CREDIT' },
    ];

    const result = await LedgerService.recordTransaction(entries, 'TEST_REF_001', 'Test Consultation');
    expect(result).toBe(true);
  });

  it('should throw an error if the transaction is unbalanced (ACID violation)', async () => {
    const entries: any = [
      { walletId: 'w_patient_1', amount: 100, type: 'DEBIT' },
      { walletId: 'w_doctor_1', amount: 90, type: 'CREDIT' },
      // Platform fee missing, debits > credits
    ];

    await expect(LedgerService.recordTransaction(entries, 'TEST_REF_002', 'Unbalanced'))
      .rejects
      .toThrow(/Unbalanced transaction/);
  });
});
