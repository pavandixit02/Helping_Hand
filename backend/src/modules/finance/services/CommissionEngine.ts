export class CommissionEngine {
  private static readonly DEFAULT_PLATFORM_FEE_PERCENTAGE = 10; // 10%

  public static calculateCommission(amount: number, customRate?: number): { platformFee: number; providerPayout: number } {
    const rate = customRate ?? this.DEFAULT_PLATFORM_FEE_PERCENTAGE;
    const platformFee = Number(((amount * rate) / 100).toFixed(2));
    const providerPayout = Number((amount - platformFee).toFixed(2));

    return { platformFee, providerPayout };
  }
}
