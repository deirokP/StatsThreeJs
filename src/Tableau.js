import * as THREE from 'three';

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

    tri() {
        let temp = this.tableau.sort(function (a, b) { return a-b; });
        this.tableau = temp;
    }
    
    getPoints() {
        let points = [];
        let xOffset = -100;
        for (let i = 0; i < this.tableau.length; i++) {
            points.push(new THREE.Vector3(xOffset, 0, 0));
            points.push(new THREE.Vector3(xOffset, this.tableau[i], 0));
            xOffset += 1;
        }
        return points;
    }


    // Returns a single rgb color interpolation between given rgb color
    // based on the factor given; via https://codepen.io/njmcode/pen/axoyD?editors=0010
    interpolateColor(color1, color2, factor) {
        if (arguments.length < 3) { 
            factor = 0.5; 
        }
        var result = color1.slice();
        for (var i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
        }
        return result;
    }

    // My function to interpolate between two colors completely, returning an array
    interpolateColors(color1, color2, steps) {
        var stepFactor = 1 / (steps - 1),
            interpolatedColorArray = [];
    
        color1 = color1.match(/\d+/g).map(Number);
        color2 = color2.match(/\d+/g).map(Number);
    
        for(var i = 0; i < steps; i++) {
            interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
        }
    
        return interpolatedColorArray;
    }

}

export default Tableau