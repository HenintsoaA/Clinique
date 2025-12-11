// ----------- Algorithmes de tri -----------

function bubbleSort(arr) {
    let a = [...arr];
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
            if (a[j] > a[j + 1]) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
            }
        }
    }
    return a;
}

function insertionSort(arr) {
    let a = [...arr];
    for (let i = 1; i < a.length; i++) {
        let key = a[i];
        let j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
    return a;
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) result.push(left.shift());
        else result.push(right.shift());
    }
    return [...result, ...left, ...right];
}

function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let pivot = arr[0];
    let left = arr.slice(1).filter(x => x <= pivot);
    let right = arr.slice(1).filter(x => x > pivot);
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// ----------- Mesure du temps -----------

function measureTime(fn, arr) {
    let start = performance.now();
    fn(arr);
    return performance.now() - start;
}

// ----------- Dessin du graphique (Canvas pur) -----------

function drawChart(sizes, results) {
    const canvas = document.getElementById("chart");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const colors = {
        Bubble: "red",
        Insertion: "blue",
        Merge: "green",
        Quick: "purple"
    };

    const maxTime = Math.max(
        ...results.Bubble,
        ...results.Insertion,
        ...results.Merge,
        ...results.Quick
    );

    const padding = 50;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    // Axes
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Fonction pour dessiner une courbe
    function drawLine(data, color) {
        ctx.strokeStyle = color;
        ctx.beginPath();

        data.forEach((val, i) => {
            let x = padding + (i / (sizes.length - 1)) * chartWidth;
            let y = canvas.height - padding - (val / maxTime) * chartHeight;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);

            // Points
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.stroke();
    }

    // Dessiner chaque algorithme
    drawLine(results.Bubble, colors.Bubble);
    drawLine(results.Insertion, colors.Insertion);
    drawLine(results.Merge, colors.Merge);
    drawLine(results.Quick, colors.Quick);

    // Légende
    let yLegend = padding;
    for (let algo in colors) {
        ctx.fillStyle = colors[algo];
        ctx.fillRect(canvas.width - 150, yLegend, 12, 12);
        ctx.fillStyle = "black";
        ctx.fillText(algo, canvas.width - 130, yLegend + 10);
        yLegend += 20;
    }
}

// ----------- Lancer les tests -----------

document.getElementById("runTest").addEventListener("click", () => {
    const sizes = [200, 500, 1000, 2000];
    const results = {
        Bubble: [],
        Insertion: [],
        Merge: [],
        Quick: []
    };

    sizes.forEach(size => {
        const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 10000));

        results.Bubble.push(measureTime(bubbleSort, arr));
        results.Insertion.push(measureTime(insertionSort, arr));
        results.Merge.push(measureTime(mergeSort, arr));
        results.Quick.push(measureTime(quickSort, arr));
    });

    drawChart(sizes, results);
});
