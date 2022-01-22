import { IObserver } from "../interfaces/IObserver";
import { Caisse } from "./Caisse";

export class TransactionList implements IObserver{
    private ulList : HTMLUListElement 

    constructor() {
        this.ulList = document.querySelector('#trans_liste')

    }

    update(caisse: Caisse) {
        let transactions = caisse.getTransactions()
        const li =document.createElement("li")
        caisse.getTransactions().forEach(element => {
            if (element.getType()==="debit")  {
                li.innerHTML =`
            <li class="card">
                <div class="card-header">
                    <span class="badge badge-debit">Debit : ${element.getMontant()} CFA</span>
                    <p class="descript">${element.getDescription()}</p>
                </div>
            </li>
        `
            } else {
                li.innerHTML = `
                <li class="card">
                    <div class="card-header">
                        <span class="badge badge-credit">Credit : ${element.getMontant()} CFA</span>
                        <p class="descript">${element.getDescription()}</p>
                    </div>
                </li>
            `
            }
            
            
        });
        this.ulList.append(li)
        /* for(const trans of transactions){
            if (trans.getType() === "debit") {
                this.ulList.innerHTML = `
                    <li class="card">
                        <div class="card-header">
                            <span class="badge badge-debit">Debit : ${trans.getMontant()} CFA</span>
                            <p class="descript">${trans.getDescription()}</p>
                        </div>
                    </li>
                `
            }
            else {
                this.ulList.innerHTML =`
                    <li class="card">
                        <div class="card-header">
                            <span class="badge badge-credit">Credit : ${trans.getMontant()} CFA</span>
                            <p class="descript">${trans.getDescription()}</p>
                        </div>
                    </li>
                `
            }
        } */
    }
}