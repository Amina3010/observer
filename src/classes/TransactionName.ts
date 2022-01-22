import { IObserver } from "../interfaces/IObserver";
import { Caisse } from "./Caisse";

export class TransactionName implements IObserver {
    private tbody: HTMLTableColElement
    private result: any[] = []
    
    constructor() {

    }
    
    update(caisse: Caisse) {
        let transactions = caisse.getTransactions()
        this.tbody = document.querySelector('#trans_name')
        for(const trans of transactions){
            let index = this.result.findIndex((el) => trans.getName() === el.name) 
            if (index === -1) {
                let newResult = {
                    name: trans.getName(),
                    credit: (trans.getType() === "credit") ? trans.getMontant() : 0,
                    debit: (trans.getType() === "debit") ? trans.getMontant() : 0
                }
                this.result.push(newResult)
            }
            else {
                if (trans.getType() === "credit") {
                    this.result[index].credit += trans.getMontant() 
                }
                else{
                    this.result[index].debit += trans.getMontant() 
                }
            }
        }
        this.tbody.innerHTML=""
        for(const rs of this.result){
            this.tbody.innerHTML += `
                <tr>
                    <td>${rs.name}</td>
                    <td>${rs.credit}</td>
                    <td>${rs.debit}</td>
                </tr>
            `
        }
    }
}