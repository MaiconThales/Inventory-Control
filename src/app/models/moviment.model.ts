import { Base } from "./base.model";

export class Moviment extends Base {
    productId!: string;
    type!: string;
    amount!: number;
    dataMoviment!: Date;
}