class Tableau {
    
    constructor(nbElement, maxValue) {
        this.minValue = Infinity;
        this.maxValue = 0;
        this.tableau = [];
        for (let i = 0; i < nbElement; i++) {
            let randomValue = Math.random() * maxValue;
            this.minValue = Math.min(randomValue, this.minValue);
            this.maxValue = Math.max(randomValue, this.maxValue);
            this.tableau.push(randomValue);
        }
    }

    get getTableau() {
        return this.tableau;
    }

    get getMin() {
        return this.minValue;
    }

    get getMax() {
        return this.maxValue;
    }
}

export default Tableau