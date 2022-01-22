import { IObserver } from "../interfaces/IObserver";
import { Caisse } from "./Caisse";

export class TransactionCount implements IObserver {

    
    private debitTd: HTMLHeadingElement
    private creditTd: HTMLHeadingElement
    
    constructor() {
        this.debitTd = document.querySelector('#nombre_transaction_debit')
        this.creditTd = document.querySelector('#nombre_transaction_credit')

    }
    
    update(caisse: Caisse) {
        let transactions = caisse.getTransactions()
        let nbrDebit: number = 0
        let nbrCredit: number = 0
        
        for(const trans of transactions){
            if (trans.getType() == "debit") {
                nbrDebit += 1
            }
            else {
                nbrCredit += 1
            }
        }
        this.debitTd.innerText = nbrDebit.toString()
        this.creditTd.innerText = nbrCredit.toString()
    }
}