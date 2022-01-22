import { IObserver } from "../interfaces/IObserver";
import { ISubject } from "../interfaces/ISubject";
import { Transaction } from "./Transaction";

export class Caisse implements ISubject{
    private observers: IObserver[] = [];

    private solde: number = 0;
    private transactions: Transaction[] = [];
    
    constructor() { 
        //
    }
    
    subscribe(obs: IObserver){
        this.observers.push(obs)
        obs.update(this)
    }

    unsubscribe(obs: IObserver){
        const idx = this.observers.indexOf(obs)
        this.observers.splice(idx, 1)
    }

    notifyObservers(){
        for (const elm of this.observers){
            elm.update(this)
        }
    }
    
    setSolde (sl:number) {
        this.solde = sl;
        this.notifyObservers()
    }
    
    getSolde () {
        return this.solde
    }
    
    getTransactions () {
        return this.transactions
    }

    addTransaction(name:string, type: string, montant: number) {
        this.transactions.push(new Transaction(name, type, montant))

        if (type === 'credit') {
            this.solde += montant
        } 
        else {
            this.solde -= montant
        }
        
        this.notifyObservers()
    }
}



