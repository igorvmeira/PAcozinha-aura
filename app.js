// ============================================================
// AURA – PA Cozinha | app.js
// Firebase Firestore: estoque em tempo real compartilhado
// ============================================================

// ===== DADOS INICIAIS DO PA (carregados na 1ª vez) ==========
const PA_INICIAL = [
  {cod:'1052',nome:'Pastel Queijo',und:'Porção',resp:'Shirley',min:3,max:6,qty:0},
  {cod:'1051',nome:'Pastel de Costela',und:'Porção',resp:'Shirley',min:6,max:10,qty:5},
  {cod:'1049',nome:'Lasanha de Costela',und:'Porção',resp:'Fernanda',min:4,max:10,qty:7},
  {cod:'1022',nome:'Arroz Cozido',und:'Porção',resp:'Shirley',min:8,max:14,qty:13},
  {cod:'1023',nome:'Molho Pesto',und:'g',resp:'Gabriel',min:200,max:400,qty:40},
  {cod:'38',nome:'Tartare de Camarão',und:'Porções',resp:'Gabriel',min:5,max:10,qty:0},
  {cod:'5',nome:'Purê de Mandioca',und:'Porções',resp:'Fernanda',min:25,max:40,qty:49},
  {cod:'800021186',nome:'Filé ao molho Gorgonzola',und:'Porções',resp:'Fernanda',min:5,max:15,qty:7},
  {cod:'1024',nome:'Crisp de Bacon',und:'g',resp:'Fernanda',min:250,max:500,qty:0},
  {cod:'1021',nome:'Salmão Risoto',und:'Porções',resp:'Gabriel',min:25,max:50,qty:42},
  {cod:'1001',nome:'Arroz Arbório',und:'Porções',resp:'Shirley',min:10,max:15,qty:15},
  {cod:'144',nome:'Tartelete',und:'Porções',resp:'Fernanda',min:8,max:16,qty:18},
  {cod:'1015',nome:'Cocada',und:'Porções',resp:'Fernanda',min:4,max:16,qty:29},
  {cod:'456',nome:'Pão de Queijo Doce',und:'Porções',resp:'Fernanda',min:5,max:18,qty:27},
  {cod:'1025',nome:'Chips de Batata Doce',und:'g',resp:'Shirley',min:500,max:1200,qty:221},
  {cod:'1006',nome:'Filé Mignon',und:'Porções',resp:'Gabriel',min:10,max:30,qty:24},
  {cod:'1026',nome:'Molho Pomodoro',und:'g',resp:'Paulo',min:500,max:1000,qty:9385},
  {cod:'41',nome:'Massa Pré-cozida',und:'Porções',resp:'Shirley',min:5,max:10,qty:11},
  {cod:'453',nome:'Pudim',und:'Porções',resp:'Fernanda',min:4,max:8,qty:8},
  {cod:'1017',nome:'Carne de Sol',und:'Porções',resp:'Gabriel',min:25,max:50,qty:27},
  {cod:'1014',nome:'Torresmo',und:'Porções',resp:'Gabriel',min:8,max:30,qty:8},
  {cod:'1027',nome:'Espuma de Queijo',und:'ml',resp:'Fernanda',min:100,max:500,qty:200},
  {cod:'1003',nome:'Picanha',und:'Porções',resp:'Gabriel',min:20,max:40,qty:31},
  {cod:'1009',nome:'Chorizo',und:'Porções',resp:'Gabriel',min:25,max:50,qty:35},
  {cod:'1005',nome:'Linguiça Angus',und:'Porções',resp:'Claudio',min:24,max:48,qty:49},
  {cod:'800020497',nome:'Parmegiana (Filé)',und:'Porções',resp:'Shirley',min:10,max:20,qty:0},
  {cod:'1050',nome:'Tilápia Ceviche',und:'Porções',resp:'Shirley',min:4,max:8,qty:4},
  {cod:'1048',nome:'Ponta Filé',und:'Porções',resp:'Gabriel',min:12,max:20,qty:10},
  {cod:'1029',nome:'Chimichurri',und:'g',resp:'Gabriel',min:200,max:400,qty:640},
  {cod:'800020723',nome:'Frango Crocante',und:'Porções',resp:'Shirley',min:10,max:20,qty:12},
  {cod:'1011',nome:'Isca de Peixe',und:'Porções',resp:'Fernanda',min:20,max:40,qty:8},
  {cod:'800020926',nome:'Pulled Pork',und:'g',resp:'Paulo',min:1000,max:2000,qty:2800},
  {cod:'1013',nome:'Croquete de Costela',und:'Porções',resp:'Shirley',min:20,max:60,qty:60},
  {cod:'800020455',nome:'Bolinho de Camarão',und:'Porções',resp:'Gabriel',min:10,max:20,qty:190},
  {cod:'457',nome:'Pão de Queijo Pulled',und:'Porções',resp:'Fernanda',min:16,max:40,qty:18},
  {cod:'1010',nome:'Fritas 200g',und:'Porções',resp:'Paulo',min:100,max:150,qty:102},
  {cod:'1030',nome:'Maionese de Ervas',und:'g',resp:'Paulo',min:300,max:1000,qty:1010},
  {cod:'1031',nome:'Molho Lambão',und:'g',resp:'Shirley',min:300,max:1000,qty:550},
  {cod:'1032',nome:'Molho de Queijo',und:'g',resp:'Shirley',min:500,max:1000,qty:3600},
  {cod:'1033',nome:'Creme de Milho',und:'g',resp:'Fernanda',min:500,max:1000,qty:0},
  {cod:'1034',nome:'Farofa de Bacon',und:'g',resp:'Shirley',min:500,max:1000,qty:610},
  {cod:'1035',nome:'Maionese de Limão',und:'g',resp:'Paulo',min:500,max:1000,qty:2040},
  {cod:'1036',nome:'Mandioca Palha',und:'g',resp:'Shirley',min:500,max:1000,qty:400},
  {cod:'1037',nome:'Vinagrete',und:'g',resp:'Shirley',min:500,max:1000,qty:380},
  {cod:'1038',nome:'Pão Italiano',und:'Unidade',resp:'Claudio',min:3,max:5,qty:2},
  {cod:'1039',nome:'Parmesão Ralado',und:'g',resp:'Shirley',min:500,max:1000,qty:80},
  {cod:'1040',nome:'Picles de Cebola',und:'g',resp:'Paulo',min:200,max:600,qty:300},
  {cod:'1041',nome:'Geleia de Frutas',und:'g',resp:'Paulo',min:500,max:1000,qty:200},
  {cod:'1042',nome:'Bolo Aniversariantes',und:'Unidade',resp:'Fernanda',min:4,max:8,qty:5},
  {cod:'1008',nome:'Sorvete Berrys',und:'L',resp:'Claudio',min:10,max:20,qty:1},
  {cod:'1043',nome:'Molho Tarê',und:'g',resp:'Gabriel',min:300,max:500,qty:750},
  {cod:'1047',nome:'Coxinha sem Massa',und:'Porções',resp:'Shirley',min:15,max:25,qty:35},
  {cod:'1019',nome:'Blend Burguer',und:'Unidade',resp:'Claudio',min:24,max:40,qty:23},
  {cod:'1012',nome:'Caldo de Legumes',und:'L',resp:'Shirley',min:1,max:2,qty:7},
  {cod:'1020',nome:'Pão Brioche',und:'Unidade',resp:'Claudio',min:12,max:36,qty:0},
  {cod:'1044',nome:'Cebola Caramelizada',und:'g',resp:'Paulo',min:500,max:1000,qty:0},
  {cod:'1045',nome:'BBQ Goiabada',und:'g',resp:'Paulo',min:500,max:1000,qty:2040},
  {cod:'800020725',nome:'Picanha 150g',und:'Porções',resp:'Gabriel',min:4,max:10,qty:1},
  {cod:'800020724',nome:'Carne de Sol Risoto',und:'Porções',resp:'Gabriel',min:4,max:10,qty:6},
  {cod:'1028',nome:'Pasta de Alho',und:'g',resp:'Shirley',min:300,max:1000,qty:700},
  {cod:'1000',nome:'Tomate Confit',und:'g',resp:'Gabriel',min:300,max:600,qty:340},
  {cod:'1004',nome:'Alho Confit',und:'g',resp:'Gabriel',min:300,max:600,qty:545},
  {cod:'1016',nome:'Polpa de Pequi',und:'Porções',resp:'Paulo',min:6,max:10,qty:13},
  {cod:'1002',nome:'Caramelo Salgado',und:'g',resp:'Fernanda',min:200,max:400,qty:555},
  {cod:'800021244',nome:'Pão de Queijo Doce (preparo)',und:'Porções',resp:'Fernanda',min:5,max:18,qty:27},
];

// ===== MAPEAMENTO REAL: cod_venda -> [{c: cod_pa, f: fator}] =====
const MAPA_VENDA = {
  '82':  [{c:'1010',f:2},{c:'1024',f:50},{c:'1032',f:100}],
  '6':   [{c:'1010',f:2}],
  '800021243': [{c:'800021186',f:0.5},{c:'1022',f:1}],
  '283': [{c:'1005',f:1},{c:'1009',f:1},{c:'1010',f:2},{c:'1032',f:50},{c:'1037',f:30}],
  '38':  [{c:'1001',f:2},{c:'1039',f:60}],
  '37':  [{c:'1001',f:1},{c:'1021',f:1},{c:'1039',f:30}],
  '39':  [{c:'1001',f:1},{c:'1006',f:1},{c:'1026',f:150},{c:'1032',f:50},{c:'1039',f:30}],
  '499': [{c:'1001',f:2},{c:'1039',f:60}],
  '800020724': [{c:'1001',f:2},{c:'1039',f:60}],
  '519': [{c:'1001',f:1}],
  '800020725': [{c:'1001',f:1},{c:'1003',f:1}],
  '18':  [{c:'1039',f:30}],
  '25':  [{c:'1003',f:1},{c:'1010',f:1},{c:'1037',f:30}],
  '800020838': [{c:'1003',f:1},{c:'1005',f:1},{c:'1037',f:30}],
  '281': [{c:'1005',f:2},{c:'1009',f:2},{c:'1010',f:2}],
  '282': [{c:'1009',f:2},{c:'1010',f:2}],
  '89':  [{c:'1010',f:2}],
  '26':  [{c:'1009',f:1},{c:'1010',f:1},{c:'1029',f:50},{c:'1032',f:100},{c:'1037',f:30}],
  '29':  [{c:'1005',f:1},{c:'1010',f:1},{c:'1037',f:30}],
  '800020543': [{c:'1005',f:1},{c:'1017',f:1},{c:'1037',f:30}],
  '41':  [{c:'1006',f:1}],
  '46':  [{c:'1008',f:1},{c:'1015',f:1}],
  '47':  [{c:'1008',f:2}],
  '144': [{c:'1008',f:1},{c:'1038',f:200}],
  '449': [{c:'1008',f:2}],
  '421': [{c:'1008',f:2}],
  '800020502': [{c:'1010',f:4},{c:'1017',f:2},{c:'1037',f:60}],
  '800020562': [{c:'1010',f:1},{c:'1019',f:1},{c:'1030',f:30},{c:'1045',f:30}],
  '800020563': [{c:'1010',f:1},{c:'1019',f:1},{c:'1020',f:1},{c:'1044',f:50}],
  '800020534': [{c:'1010',f:1}],
  '145': [{c:'1010',f:2}],
  '800020548': [{c:'1010',f:1}],
  '800020510': [{c:'1010',f:1},{c:'1022',f:1},{c:'1048',f:1}],
  '800020497': [{c:'1010',f:2}],
  '800020533': [{c:'1011',f:1},{c:'1020',f:1}],
  '8':   [{c:'1011',f:1},{c:'1035',f:50}],
  '800020535': [{c:'1013',f:1}],
  '23':  [{c:'1013',f:1}],
  '800020549': [{c:'1014',f:1}],
  '7':   [{c:'1014',f:1}],
  '5':   [{c:'1017',f:1},{c:'1036',f:50}],
  '800020547': [{c:'1017',f:2}],
  '800020925': [{c:'1019',f:1},{c:'1025',f:20},{c:'1040',f:50}],
  '800021268': [{c:'1019',f:1}],
  '800020727': [{c:'1021',f:1}],
  '800020726': [{c:'1021',f:1},{c:'1023',f:40}],
  '32':  [{c:'1022',f:2}],
  '33':  [{c:'1022',f:1}],
  '802': [{c:'1025',f:1},{c:'1050',f:1}],
  '800021104': [{c:'1025',f:1}],
  '800021221': [{c:'1026',f:1},{c:'1027',f:1},{c:'1032',f:1},{c:'1049',f:1}],
  '800021106': [{c:'1026',f:1},{c:'1027',f:1},{c:'1032',f:1},{c:'1049',f:1}],
  '12':  [{c:'1027',f:100},{c:'1048',f:1}],
  '143': [{c:'1030',f:30},{c:'1031',f:30},{c:'1052',f:1}],
  '91':  [{c:'1030',f:30},{c:'1031',f:30},{c:'1051',f:1}],
  '15':  [{c:'1033',f:100},{c:'1047',f:1}],
  '800021187': [{c:'1033',f:100},{c:'1047',f:1}],
  '800020723': [{c:'1038',f:1}],
  '800020980': [{c:'1038',f:1}],
  '456': [{c:'1041',f:50},{c:'800021244',f:1}],
  '800021186': [{c:'800021186',f:1}],
  '800021244': [{c:'800021244',f:0.5}],
  '19':  [{c:'1050',f:1}],
  '800020467': [{c:'1051',f:0.5},{c:'1052',f:0.5}],
  '800020986': [{c:'1008',f:1},{c:'1015',f:1}],
  '800020991': [{c:'1019',f:1},{c:'1030',f:30},{c:'1045',f:30}],
  '800020994': [{c:'1019',f:1},{c:'1020',f:1},{c:'1044',f:50}],
  '800021110': [{c:'1005',f:1},{c:'1009',f:1},{c:'1010',f:2},{c:'1032',f:50},{c:'1037',f:30}],
  '800021312': [{c:'1006',f:1}],
  '800021266': [{c:'1010',f:1}],
};

// ===== ESTADO LOCAL ==========
let pratos = [];
let filtro = 'todos';
let db, fbDoc, fbGetDoc, fbSetDoc, fbOnSnapshot, fbCollection, fbAddDoc, fbServerTimestamp, fbQuery, fbOrderBy, fbLimit;

// ===== HELPERS ==========
function fmtQty(q) {
  if (typeof q !== 'number') return String(q);
  return q % 1 !== 0 ? q.toFixed(1) : String(q);
}

function getStatus(p) {
  if (p.qty <= 0 || p.qty < p.min) return 'crit';
  const pct = (p.qty - p.min) / ((p.max - p.min) || 1);
  if (pct < 0.25) return 'low';
  if (p.qty > p.max) return 'over';
  return 'ok';
}

function barPct(p) { return p.max > 0 ? Math.min(100, Math.round(p.qty / p.max * 100)) : 0; }

function barClr(s) {
  return { ok: '#5a8a3a', low: '#8a6020', crit: '#8a2020', over: '#1a5a8a' }[s];
}

function badgeHtml(s) {
  const m = { ok: ['b-ok','OK'], low: ['b-low','ATENÇÃO'], crit: ['b-crit','CRÍTICO'], over: ['b-over','ACIMA'] };
  return `<span class="badge ${m[s][0]}">${m[s][1]}</span>`;
}

function setSyncDot(state) {
  const el = document.getElementById('sync-dot');
  if (!el) return;
  el.className = 'sync-dot' + (state === 'ok' ? ' synced' : state === 'syncing' ? ' syncing' : '');
  el.title = { ok: 'Sincronizado', syncing: 'Salvando...', err: 'Erro de conexão' }[state] || '';
}

// ===== FIREBASE ==========
async function initFirebase() {
  db = window._db;
  fbDoc = window._doc;
  fbGetDoc = window._getDoc;
  fbSetDoc = window._setDoc;
  fbOnSnapshot = window._onSnapshot;
  fbCollection = window._collection;
  fbAddDoc = window._addDoc;
  fbServerTimestamp = window._serverTimestamp;
  fbQuery = window._query;
  fbOrderBy = window._orderBy;
  fbLimit = window._limit;

  // Carregar ou inicializar estoque
  const estoqueRef = fbDoc(db, 'pa', 'estoque');
  const snap = await fbGetDoc(estoqueRef);

  if (!snap.exists()) {
    // Primeira vez: salvar PA inicial
    await fbSetDoc(estoqueRef, { pratos: PA_INICIAL, updatedAt: fbServerTimestamp() });
    pratos = PA_INICIAL.map(p => ({ ...p }));
  } else {
    pratos = snap.data().pratos || PA_INICIAL.map(p => ({ ...p }));
  }

  // Listener em tempo real
  fbOnSnapshot(estoqueRef, (doc) => {
    if (doc.exists()) {
      pratos = doc.data().pratos || [];
      renderEstoque();
      renderConfig();
      renderInv();
      renderProdSelect();
      setSyncDot('ok');
    }
  });

  // Listener log de produção (hoje)
  const hoje = new Date().toISOString().split('T')[0];
  const prodRef = fbCollection(db, 'producao');
  const q = fbQuery(prodRef, fbOrderBy('ts', 'desc'), fbLimit(50));
  fbOnSnapshot(q, (snap) => {
    const logs = [];
    snap.forEach(d => {
      const data = d.data();
      if (data.data === hoje) logs.push(data);
    });
    renderProdLog(logs);
  });

  // Listener desperdícios
  const despRef = fbCollection(db, 'desperdicio');
  const qd = fbQuery(despRef, fbOrderBy('ts', 'desc'), fbLimit(100));
  fbOnSnapshot(qd, (snap) => {
    const logs = [];
    snap.forEach(d => logs.push(d.data()));
    renderDespLog(logs);
  });

  // Mostrar app
  document.getElementById('loading').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  setSyncDot('ok');
}

async function salvarEstoque() {
  setSyncDot('syncing');
  try {
    const estoqueRef = fbDoc(db, 'pa', 'estoque');
    await fbSetDoc(estoqueRef, { pratos, updatedAt: fbServerTimestamp() });
    setSyncDot('ok');
  } catch (e) {
    console.error(e);
    setSyncDot('err');
  }
}

// ===== TABS ==========
function goTab(name, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  btn.classList.add('active');
  if (name === 'estoque') renderEstoque();
  if (name === 'producao') renderProdSelect();
  if (name === 'inventario') renderInv();
  if (name === 'config') renderConfig();
}

// ===== ESTOQUE ==========
function setFilter(f, btn) {
  filtro = f;
  document.querySelectorAll('.pill').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  renderEstoque();
}

function renderEstoque() {
  const crit = pratos.filter(p => getStatus(p) === 'crit').length;
  const low  = pratos.filter(p => getStatus(p) === 'low').length;
  const ok   = pratos.filter(p => ['ok','over'].includes(getStatus(p))).length;

  document.getElementById('m-tot').textContent  = pratos.length;
  document.getElementById('m-crit').textContent = crit;
  document.getElementById('m-low').textContent  = low;
  document.getElementById('m-ok').textContent   = ok;

  const order = { crit: 0, low: 1, ok: 2, over: 3 };
  let lista = [...pratos].sort((a, b) => order[getStatus(a)] - order[getStatus(b)]);
  if (filtro !== 'todos') {
    lista = lista.filter(p => filtro === 'ok' ? ['ok','over'].includes(getStatus(p)) : getStatus(p) === filtro);
  }

  document.getElementById('estoque-list').innerHTML = lista.map(p => {
    const s = getStatus(p);
    return `<div class="item-row">
      <div style="flex:1;min-width:120px">
        <div class="item-name">${p.nome}</div>
        <div class="item-sub">${p.resp} · ${p.und}</div>
      </div>
      <div class="bar-wrap"><div class="bar-fill" style="width:${barPct(p)}%;background:${barClr(s)}"></div></div>
      <div class="qty-display">${fmtQty(p.qty)}<span class="qty-max">/${p.max}</span></div>
      <div style="min-width:68px;text-align:right">${badgeHtml(s)}</div>
    </div>`;
  }).join('');
}

// ===== PRODUÇÃO ==========
function renderProdSelect() {
  const sel = document.getElementById('p-item');
  if (!sel) return;
  sel.innerHTML = pratos.map((p, i) => `<option value="${i}">${p.nome}</option>`).join('');
}

function renderProdLog(logs) {
  const tb = document.getElementById('p-log');
  if (!tb) return;
  if (!logs.length) {
    tb.innerHTML = '<tr><td colspan="4" style="color:var(--text3);padding:16px 10px">Nenhuma produção lançada hoje.</td></tr>';
    return;
  }
  tb.innerHTML = logs.map(l => {
    const hora = l.ts?.toDate ? l.ts.toDate().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : l.hora || '';
    return `<tr><td>${l.nome}</td><td>${fmtQty(l.qty)}</td><td>${l.resp}</td><td>${hora}</td></tr>`;
  }).join('');
}

async function lancarProd() {
  const i   = parseInt(document.getElementById('p-item').value);
  const qty = parseFloat(document.getElementById('p-qty').value);
  const resp = document.getElementById('p-resp').value;
  if (!qty || qty <= 0) return;

  pratos[i].qty = +(pratos[i].qty + qty).toFixed(2);

  // Salvar estoque
  await salvarEstoque();

  // Log de produção
  await fbAddDoc(fbCollection(db, 'producao'), {
    nome: pratos[i].nome,
    cod: pratos[i].cod,
    qty,
    resp,
    data: new Date().toISOString().split('T')[0],
    ts: fbServerTimestamp(),
  });

  const al = document.getElementById('p-alert');
  al.innerHTML = `<div class="alert a-ok">+${qty} ${pratos[i].und} de "${pratos[i].nome}" adicionado ao estoque.</div>`;
  setTimeout(() => al.innerHTML = '', 3000);
}

// ===== IMPORTAR VENDAS ==========
function importarVendas(input) {
  const file = input.files[0];
  if (!file) return;
  const al = document.getElementById('v-alert');
  const pr = document.getElementById('v-preview');
  al.innerHTML = ''; pr.innerHTML = '';

  const reader = new FileReader();
  reader.onload = async (e) => {
    const linhas = e.target.result.split('\n').filter(l => l.trim());
    const sep = linhas[0].includes('\t') ? '\t' : ',';
    const rows = linhas.slice(1).map(l => l.split(sep).map(s => s.trim().replace(/^"|"$/g, '')));

    const baixas = {};
    const naoMapeados = [];
    let totalVendas = 0;

    rows.forEach(row => {
      if (row.length < 3) return;
      let cod, qty;
      // Formato completo: Subgrupo, Grupo, Código, Nome, Quantidade, Valor
      if (row.length >= 5 && !isNaN(parseFloat(row[4]))) {
        cod = String(row[2]).trim();
        qty = parseFloat(row[4]);
      } else {
        // Formato simples: Subgrupo, Nome, Quantidade
        cod = null;
        qty = parseFloat(row[2]);
      }
      if (isNaN(qty) || qty <= 0) return;
      totalVendas++;

      const mapa = cod ? MAPA_VENDA[cod] : null;
      if (mapa) {
        mapa.forEach(({ c, f }) => {
          baixas[c] = (baixas[c] || 0) + (qty * f);
        });
      } else {
        const nomePrato = row[3] || row[1] || cod || '?';
        naoMapeados.push(`${nomePrato} (cod: ${cod || '?'})`);
      }
    });

    // Aplicar baixas no array local
    let aplicados = 0;
    Object.entries(baixas).forEach(([cod_pa, total]) => {
      const idx = pratos.findIndex(p => p.cod === cod_pa);
      if (idx >= 0) {
        pratos[idx].qty = Math.max(0, +(pratos[idx].qty - total).toFixed(2));
        aplicados++;
      }
    });

    // Salvar no Firebase
    await salvarEstoque();

    // Log de importação
    await fbAddDoc(fbCollection(db, 'importacoes'), {
      arquivo: file.name,
      totalVendas,
      aplicados,
      naoMapeados,
      ts: fbServerTimestamp(),
    });

    al.innerHTML = `<div class="alert a-ok">✓ ${totalVendas} item(s) processados. Baixa aplicada em ${aplicados} item(s) do PA.${naoMapeados.length ? ` <strong>${naoMapeados.length} não mapeado(s)</strong>.` : ''}</div>`;

    const linhasBaixa = Object.entries(baixas).map(([cod_pa, total]) => {
      const p = pratos.find(x => x.cod === cod_pa);
      return p ? `<tr><td>${p.nome}</td><td style="font-family:var(--mono)">${total % 1 !== 0 ? total.toFixed(1) : total} ${p.und}</td></tr>` : '';
    }).filter(Boolean).join('');

    pr.innerHTML = `
      <div style="margin-top:14px;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Baixas aplicadas no PA</div>
      <table class="tbl"><thead><tr><th>Item do PA</th><th>Total baixado</th></tr></thead><tbody>${linhasBaixa}</tbody></table>
    `;

    if (naoMapeados.length) {
      pr.innerHTML += `<div class="alert a-warn" style="margin-top:10px">Não mapeados (sem baixa automática): ${naoMapeados.slice(0, 8).join(', ')}${naoMapeados.length > 8 ? ` e mais ${naoMapeados.length - 8}` : ''}</div>`;
    }

    renderEstoque();
  };
  reader.readAsText(file, 'utf-8');
  input.value = '';
}

// ===== DESPERDÍCIO ==========
async function lancarDesp() {
  const prod   = document.getElementById('d-prod').value.trim();
  const qty    = document.getElementById('d-qty').value.trim();
  const setor  = document.getElementById('d-setor').value;
  const motivo = document.getElementById('d-motivo').value;
  const al     = document.getElementById('d-alert');

  if (!prod || !qty) {
    al.innerHTML = '<div class="alert a-warn">Preencha produto e quantidade.</div>';
    return;
  }

  await fbAddDoc(fbCollection(db, 'desperdicio'), {
    prod, qty, setor, motivo,
    data: new Date().toLocaleDateString('pt-BR'),
    ts: fbServerTimestamp(),
  });

  document.getElementById('d-prod').value = '';
  document.getElementById('d-qty').value  = '';
  al.innerHTML = '<div class="alert a-ok">Desperdício registrado.</div>';
  setTimeout(() => al.innerHTML = '', 3000);
}

function renderDespLog(logs) {
  const tb = document.getElementById('d-log');
  if (!tb) return;
  if (!logs.length) {
    tb.innerHTML = '<tr><td colspan="5" style="color:var(--text3);padding:16px 10px">Nenhum registro ainda.</td></tr>';
    return;
  }
  tb.innerHTML = logs.map(l => `<tr><td>${l.data}</td><td>${l.prod}</td><td>${l.qty}</td><td>${l.setor}</td><td>${l.motivo}</td></tr>`).join('');
}

// ===== INVENTÁRIO ==========
function renderInv() {
  const tb = document.getElementById('inv-list');
  if (!tb) return;
  tb.innerHTML = pratos.map((p, i) => `
    <tr>
      <td>${p.nome}</td>
      <td style="color:var(--text3)">${p.resp}</td>
      <td style="color:var(--text3)">${p.und}</td>
      <td style="text-align:center;font-family:var(--mono);font-weight:500">${fmtQty(p.qty)}</td>
      <td><input type="number" id="inv-${i}" min="0" step="0.5" value="${p.qty}" style="width:70px;text-align:center" oninput="calcDiff(${i})"></td>
      <td id="diff-${i}" style="text-align:center;font-family:var(--mono);font-weight:500">—</td>
      <td id="st-${i}"></td>
    </tr>`).join('');
}

function calcDiff(i) {
  const v    = parseFloat(document.getElementById(`inv-${i}`).value) || 0;
  const diff = +(v - pratos[i].qty).toFixed(2);
  const abs  = Math.abs(diff);
  const pct  = pratos[i].qty > 0 ? abs / pratos[i].qty : 1;
  const el   = document.getElementById(`diff-${i}`);
  const st   = document.getElementById(`st-${i}`);
  el.textContent = diff === 0 ? '0' : diff > 0 ? '+' + diff : String(diff);
  el.style.color = diff === 0 ? 'var(--ok-text)' : abs <= 2 && pct <= 0.1 ? 'var(--warn-text)' : 'var(--crit-text)';
  st.innerHTML = diff === 0
    ? '<span class="badge b-ok">OK</span>'
    : abs <= 2 && pct <= 0.1
      ? '<span class="badge b-low">VERIFICAR</span>'
      : '<span class="badge b-crit">DIVERGÊNCIA</span>';
}

async function salvarInv() {
  // Coletar contagens
  const contagens = pratos.map((p, i) => {
    const contado = parseFloat(document.getElementById(`inv-${i}`)?.value) || 0;
    return { cod: p.cod, nome: p.nome, sistema: p.qty, contado, diff: +(contado - p.qty).toFixed(2) };
  });

  const divergencias = contagens.filter(c => Math.abs(c.diff) > 2);

  // Salvar log de inventário
  await fbAddDoc(fbCollection(db, 'inventarios'), {
    data: new Date().toLocaleDateString('pt-BR'),
    contagens,
    divergencias,
    ts: fbServerTimestamp(),
  });

  const res = document.getElementById('inv-result');
  if (!divergencias.length) {
    res.innerHTML = '<div class="alert a-ok" style="margin-top:12px">Inventário salvo! Nenhuma divergência significativa encontrada.</div>';
  } else {
    res.innerHTML = `<div class="alert a-warn" style="margin-top:12px">${divergencias.length} item(s) com divergência para investigar: ${divergencias.map(d => d.nome).join(', ')}.</div>`;
  }
}

// ===== CONFIG PRATOS ==========
function renderConfig() {
  document.getElementById('c-count').textContent = pratos.length;
  const tb = document.getElementById('c-list');
  if (!tb) return;
  tb.innerHTML = pratos.map((p, i) => `
    <tr>
      <td style="font-family:var(--mono);font-size:11px;color:var(--text3)">${p.cod}</td>
      <td>${p.nome}</td>
      <td style="color:var(--text3)">${p.und}</td>
      <td style="color:var(--text3)">${p.resp}</td>
      <td style="text-align:center">${p.min}</td>
      <td style="text-align:center">${p.max}</td>
      <td style="text-align:center;font-family:var(--mono);font-weight:500">${fmtQty(p.qty)}</td>
      <td><button onclick="remItem(${i})" class="btn" style="font-size:11px;padding:3px 10px">Remover</button></td>
    </tr>`).join('');
}

async function addItem() {
  const nome = document.getElementById('c-nome').value.trim();
  const und  = document.getElementById('c-und').value.trim() || 'Porções';
  const resp = document.getElementById('c-resp').value.trim() || '—';
  const min  = parseFloat(document.getElementById('c-min').value) || 0;
  const max  = parseFloat(document.getElementById('c-max').value) || 0;
  const ini  = parseFloat(document.getElementById('c-ini').value) || 0;
  const al   = document.getElementById('c-alert');

  if (!nome) { al.innerHTML = '<div class="alert a-warn">Informe o nome do item.</div>'; return; }
  if (max <= min) { al.innerHTML = '<div class="alert a-warn">Máximo deve ser maior que mínimo.</div>'; return; }

  pratos.push({ cod: 'NOVO', nome, und, resp, min, max, qty: ini });
  await salvarEstoque();
  document.getElementById('c-nome').value = '';
  al.innerHTML = '<div class="alert a-ok">Item adicionado e salvo!</div>';
  setTimeout(() => al.innerHTML = '', 3000);
  renderConfig();
}

async function remItem(i) {
  if (!confirm(`Remover "${pratos[i].nome}" do PA?`)) return;
  pratos.splice(i, 1);
  await salvarEstoque();
  renderConfig();
}

// ===== INIT ==========
window.addEventListener('firebase-ready', initFirebase);
