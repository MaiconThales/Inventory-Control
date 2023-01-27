import { Base } from "./base.model";

export class Product extends Base {
    description!: string;
    categoryId!: string;
    amountInventory!: number;
    minimumInventory!: number;
    lastUpdate!: Date;
    valueSale!: number;
}