import { Product } from './../../types/types';

export class Data {
    async getData(data: string) {
        const res = await fetch(data);
        const dataBase: Product[] = await res.json();
        return dataBase;
    }
}