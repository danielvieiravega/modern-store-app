import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CartService {
    public items: any[] = [];
    cartChange: Observable<any>;
    cartChangeObserer: Observer<any>;

    constructor() {
        this.cartChange = new Observable((observer: Observer<any>) => {
            this.cartChangeObserer = observer;
        });

    }

    save() {
        localStorage.setItem('mws.cart', JSON.stringify(this.items));
    }

    load() {
        const data = localStorage.getItem('mws.cart');
        if (data) {
            this.items = JSON.parse(data);
        }
        this.cartChangeObserer.next(this.items);
    }

    getItems(): any[] {
        var data = localStorage.getItem('mws.cart');
        if (data) {
            this.items = JSON.parse(data);
        }
        this.cartChangeObserer.next(this.items);
        return this.items;
    }

    addItem(item) {
        this.getItems();
        if (this.hasItem(item.id)) {
            this.updateQuantity(item.id, 1);
        } else {
            this.items.push(item);
        }
        localStorage.setItem('mws.cart', JSON.stringify(this.items));
        this.cartChangeObserer.next(this.items);
    }

    updateQuantity(id, quantity) {
        for (const i of this.items) {
            if (i.id === id) {
                i.quantity += +quantity;
            }
        }
        this.cartChangeObserer.next(this.items);
    }

    hasItem(id): boolean {
        for (const i of this.items) {
            if (i.id === id) {
                return true;
            }
        }
        this.cartChangeObserer.next(this.items);
        return false;
    }

    removeItem(id: string) {
        for (var item of this.items) {
            if (item.id === id) {
                var index = this.items.indexOf(item);
                this.items.splice(index, 1);
            }
        }
        localStorage.setItem('mws.cart', JSON.stringify(this.items));

        this.cartChangeObserer.next(this.items);
    }

    getSubTotal(): number {
        let result = 0;
        for (const i of this.items) {
            result += +(+i.price * +i.quantity);
        }
        this.cartChangeObserer.next(this.items);
        return result;
    }

}
