export class Transaction {
    private name: string
    private type: string
    private montant: number
    
    constructor(_name, _type, _montant){
        this.name = _name
        this.type = _type
        this.montant = _montant
    }

    getName()
    {
        return this.name
    }

    getType()
    {
        return this.type
    }

    getMontant()
    {
        return this.montant
    }

    getDescription()
    {
        if (this.type == 'debit') {
            return this.name+ ' a fait un retrait de ' +this.montant
        }
        else {
            return this.name+ ' a fait un depot de ' +this.montant
        }
    }
}