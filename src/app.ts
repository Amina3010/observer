import { Caisse } from "./classes/Caisse";
import { TransactionCount } from "./classes/TransactionCount";
import { SoldeView } from "./classes/SoldeView";
import { TransactionList } from "./classes/TransactionList";
import { TransactionName } from "./classes/TransactionName";

let caisse = new Caisse();

let soldeView = new SoldeView();
caisse.subscribe(soldeView)

let transactionCount = new TransactionCount();
caisse.subscribe(transactionCount)

let transactionList = new TransactionList();
caisse.subscribe(transactionList)

let transactionName = new TransactionName();
caisse.subscribe(transactionName)

let formTransaction = document.querySelector("#form_transaction")

formTransaction.addEventListener("submit", (e:Event)=>{
    e.preventDefault();

    let name = document.querySelector('#name') as HTMLInputElement;
    let type = document.querySelector('#type') as HTMLInputElement;
    let montant = document.querySelector('#montant') as HTMLInputElement;

    caisse.addTransaction(name.value, type.value, parseInt(montant.value))
})



