import { ChargeBy } from "./chargeBy";

export interface Recharge {
    Id: string;
    TotalChargeAmount: number;
    ChargeBy: ChargeBy[];
}