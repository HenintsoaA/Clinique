// script.js
// Logique du knapsack (DP 2D avec récupération d'items, et version 1D optimisée)
// UI manipulation pour ajouter/supprimer objets et afficher résultats.

(() => {
  // state
  const items = []; // chaque item = {weight: number, value: number}

  // UI elements
  const capacityInput = document.getElementById('capacity');
  const weightInput = document.getElementById('item-weight');
  const valueInput = document.getElementById('item-value');
  const addBtn = document.getElementById('add-item-btn');
  const itemsTableBody = document.querySelector('#items-table tbody');
  const clearBtn = document.getElementById('clear-items-btn');
  const runDpBtn = document.getElementById('run-dp-btn');
  const runOptBtn = document.getElementById('run-opt-btn');
  const resultsDiv = document.getElementById('results');

  // --- Helpers UI ---
  function renderItems() {
    itemsTableBody.innerHTML = '';
    items.forEach((it, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${it.weight}</td>
        <td>${it.value}</td>
        <td><button class="action-btn" data-idx="${idx}">Supprimer</button></td>
      `;
      itemsTableBody.appendChild(tr);
    });

    // attach delete listeners
    Array.from(itemsTableBody.querySelectorAll('.action-btn')).forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = Number(e.currentTarget.getAttribute('data-idx'));
        items.splice(idx, 1);
        renderItems();
      });
    });
  }

  function showResult(html) {
    resultsDiv.innerHTML = html;
  }

  // --- Algorithm: DP 2D with items retrieval ---
  // capacity: integer, items: [{weight, value}, ...]
  function knapsackDP(capacity, itemsList) {
    const n = itemsList.length;
    // dp (n+1) x (capacity+1)
    const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      const w_i = itemsList[i - 1].weight;
      const v_i = itemsList[i - 1].value;
      for (let w = 0; w <= capacity; w++) {
        if (w_i <= w) {
          dp[i][w] = Math.max(dp[i - 1][w], v_i + dp[i - 1][w - w_i]);
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    // backtrack to find chosen items
    let w = capacity;
    const chosen = [];
    for (let i = n; i > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        chosen.push(i - 1); // index of item
        w -= itemsList[i - 1].weight;
      }
    }
    chosen.reverse();

    return { maxValue: dp[n][capacity], chosenIndices: chosen, dpMatrix: dp };
  }

  // --- Algorithm: Optimized 1D (space O(capacity)) ---
  function knapsackOptimized1D(capacity, itemsList) {
    const dp = new Array(capacity + 1).fill(0);
    for (let i = 0; i < itemsList.length; i++) {
      const w_i = itemsList[i].weight;
      const v_i = itemsList[i].value;
      for (let w = capacity; w >= w_i; w--) {
        dp[w] = Math.max(dp[w], v_i + dp[w - w_i]);
      }
    }
    return dp[capacity];
  }

  // --- UI Events ---
  addBtn.addEventListener('click', () => {
    const w = Number(weightInput.value);
    const v = Number(valueInput.value);
    if (!Number.isFinite(w) || w < 0 || !Number.isFinite(v) || v < 0) {
      alert('Entrez des nombres valides (>= 0) pour poids et valeur.');
      return;
    }
    // convert to integers
    const item = { weight: Math.floor(w), value: Math.floor(v) };
    items.push(item);
    renderItems();
  });

  clearBtn.addEventListener('click', () => {
    if (!confirm('Supprimer tous les objets ?')) return;
    items.length = 0;
    renderItems();
    showResult('');
  });

  runDpBtn.addEventListener('click', () => {
    const cap = Number(capacityInput.value);
    if (!Number.isFinite(cap) || cap < 0) {
      alert('Entrez une capacité valide (>= 0).');
      return;
    }
    const capacity = Math.floor(cap);

    // edge cases
    if (items.length === 0) {
      showResult('<div class="small">Aucun objet à traiter.</div>');
      return;
    }

    // run DP
    const { maxValue, chosenIndices } = knapsackDP(capacity, items);

    // build html result
    let html = `<div><strong>Valeur max (DP) :</strong> ${maxValue}</div>`;
    html += `<div class="small">Capacité utilisée maximale: ${capacity}</div>`;

    if (chosenIndices.length === 0) {
      html += `<div class="small">Aucun objet sélectionné (ou capacité trop faible).</div>`;
    } else {
      html += `<div style="margin-top:8px"><strong>Objets choisis (${chosenIndices.length}) :</strong></div>`;
      html += '<ul>';
      chosenIndices.forEach(i => {
        const it = items[i];
        html += `<li>Objet ${i + 1} — Poids: ${it.weight}, Valeur: ${it.value}</li>`;
      });
      html += '</ul>';
    }

    showResult(html);
  });

  runOptBtn.addEventListener('click', () => {
    const cap = Number(capacityInput.value);
    if (!Number.isFinite(cap) || cap < 0) {
      alert('Entrez une capacité valide (>= 0).');
      return;
    }
    const capacity = Math.floor(cap);

    if (items.length === 0) {
      showResult('<div class="small">Aucun objet à traiter.</div>');
      return;
    }

    const best = knapsackOptimized1D(capacity, items);
    let html = `<div><strong>Valeur max (Optimisé 1D) :</strong> ${best}</div>`;
    html += `<div class="small">Remarque : cette version est plus rapide en mémoire mais <em>ne retrouve pas les objets</em>.</div>`;
    showResult(html);
  });

  // initial demo items
  (function seedDemo() {
    items.push({ weight: 5, value: 10 });
    items.push({ weight: 4, value: 40 });
    items.push({ weight: 6, value: 30 });
    renderItems();
  })();

})();
