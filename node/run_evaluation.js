const constants = require('../common/constants');
const utils = require('../common/utils');
const fs = require('fs');
const KNN = require('../common/classifiers/knn.js');
const { createCanvas } = require('canvas');

console.log('Running classification...');

const {samples: trainingSamples} = JSON.parse(fs.readFileSync(constants.TRAINING));

const knn = new KNN(trainingSamples, 50);

const {samples: testingSamples} = JSON.parse(fs.readFileSync(constants.TESTING));

let correctCount = 0, totalCount = 0;
for(const sample of testingSamples) {
    totalCount++;
    const {label: predictedLabel} = knn.predict(sample.point);
    if(predictedLabel === sample.label) correctCount++;
}

console.log(`Accuracy: ${correctCount}/${totalCount} (${utils.formatPercent(correctCount/totalCount)})`);

console.log('Generating decision boundary plot');

const canvas =createCanvas(400, 400);
const ctx = canvas.getContext('2d');
for(let x = 0; x < canvas.width; x++) {
    for(let y = 0; y < canvas.height; y++){
        const point = [x/canvas.width, 1- y/canvas.height];
        const {label} = knn.predict(point);
        const color = utils.styles[label].color;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1,1);

    }
}

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(constants.DECISION_BOUNDARY, buffer);


