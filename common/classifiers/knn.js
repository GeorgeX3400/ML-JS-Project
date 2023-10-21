if(typeof utils === 'undefined') utils = require('../utils');


class KNN {
    constructor(samples, k) {
        this.samples = samples;
        this.k = k;
    }

    predict(point) {
        const samplePoint = this.samples.map(s => s.point);
            const indices = utils.getNearest(point, samplePoint, this.k);
            const nearestSamples = indices.map(i => this.samples[i]);
            const labels = nearestSamples.map(s => s.label);
            const counts = {};
            for(const label of labels) {
                if(counts[label]) counts[label]++;
                else counts[label] = 1;
            }
            const max = Math.max(...Object.values(counts));
            let label, maxValue = -1;
            for(const label1 of labels) {
                if(counts[label1] > maxValue) {
                    label = label1; maxValue = counts[label1];
                }
            }
            
            return {label, nearestSamples};
    }
}

if(typeof module !== 'undefined') module.exports = KNN;