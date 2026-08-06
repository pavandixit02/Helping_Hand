import { LedgerService } from './LedgerService';

export class WalletService {
  public static async holdFunds(patientWalletId: string, amount: number, escrowWalletId: string, appointmentId: string) {
    console.log(`[Wallet] Holding $${amount} from Wallet ${patientWalletId} in Escrow ${escrowWalletId}`);
    
    await LedgerService.recordTransaction([
      { walletId: patientWalletId, amount, type: 'DEBIT' },
      { walletId: escrowWalletId, amount, type: 'CREDIT' }
    ], appointmentId, 'Funds Held in Escrow for Appointment');
  }

  public static async releaseFunds(escrowWalletId: string, doctorWalletId: string, platformWalletId: string, totalAmount: number, platformCut: number, appointmentId: string) {
    const doctorAmount = totalAmount - platformCut;
    console.log(`[Wallet] Releasing Escrow: Doctor gets $${doctorAmount}, Platform gets $${platformCut}`);
    
    await LedgerService.recordTransaction([
      { walletId: escrowWalletId, amount: totalAmount, type: 'DEBIT' },
      { walletId: doctorWalletId, amount: doctorAmount, type: 'CREDIT' },
      { walletId: platformWalletId, amount: platformCut, type: 'CREDIT' }
    ], appointmentId, 'Escrow Released and Settled');
  }

  public static async refundHold(escrowWalletId: string, patientWalletId: string, amount: number, appointmentId: string) {
    console.log(`[Wallet] Refunding Escrow $${amount} to Patient Wallet ${patientWalletId}`);
    
    await LedgerService.recordTransaction([
      { walletId: escrowWalletId, amount, type: 'DEBIT' },
      { walletId: patientWalletId, amount, type: 'CREDIT' }
    ], appointmentId, 'Appointment Cancelled - Refund Issued');
  }
}
