import { IObserver } from "../interfaces/IObserver";
import { Caisse } from "./Caisse";

export class SoldeView implements IObserver {
   private htmlSolde: HTMLHeadingElement;

    constructor() {
        this.htmlSolde = document.querySelector("#solde_total")
    }

    update(caisse: Caisse) {
        this.htmlSolde.innerText = caisse.getSolde().toString()
    }
}
    