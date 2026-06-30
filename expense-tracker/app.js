// ── Storage & State ──────────────────────────────────────────
let ledger = JSON.parse(localStorage.getItem("ledger")) || [];

let nextId = ledger.length > 0
    ? Math.max(...ledger.map(function(rec){ return rec.id; })) + 1
    : 1;

let totalIn  = 0;
let totalOut = 0;
let netAmt   = 0;

let editingId = null;

// ── Save to localStorage ──────────────────────────────────────
function persistData(){
    localStorage.setItem("ledger", JSON.stringify(ledger));
}

// ── Clear form fields ─────────────────────────────────────────
function resetForm(){
    document.getElementById("entryNote").value = "";
    document.getElementById("entryAmt").value  = "";
    document.getElementById("kindIncome").checked = true;
}

// ── Update summary displays ───────────────────────────────────
function refreshSummary(){
    document.getElementById("totalIncome").textContent  = "₹" + totalIn;
    document.getElementById("totalExpense").textContent = "₹" + totalOut;
    document.getElementById("totalBalance").textContent = "₹" + netAmt;
    document.getElementById("inAmt").textContent        = "₹" + totalIn;
    document.getElementById("outAmt").textContent       = "₹" + totalOut;

    // balance bar fill — capped 0-100 based on in vs total flow
    let totalFlow = totalIn + totalOut;
    let pct = totalFlow > 0 ? Math.min((totalIn / totalFlow) * 100, 100) : 0;
    document.getElementById("balBar").style.width = pct + "%";

    // entry count badge
    document.getElementById("entryCount").textContent = ledger.length + " entr" + (ledger.length === 1 ? "y" : "ies");
}

// ── Render all history cards ──────────────────────────────────
function buildList(){
    totalIn  = 0;
    totalOut = 0;
    netAmt   = 0;

    let list = document.getElementById("historyList");
    list.innerHTML = "";

    if(ledger.length === 0){
        list.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-receipt"></i>
                <p>No entries yet.<br>Log your first transaction!</p>
            </div>`;
        refreshSummary();
        return;
    }

    ledger.forEach(function(rec){
        let isIncome = rec.kind === "Income";

        if(isIncome){
            totalIn += Number(rec.amt);
        } else {
            totalOut += Number(rec.amt);
        }

        let li = document.createElement("li");
        li.className = "hcard";

        li.innerHTML = `
            <div class="hcard-dot ${isIncome ? "dot-in" : "dot-out"}">
                <i class="fa-solid ${isIncome ? "fa-arrow-up" : "fa-arrow-down"}"></i>
            </div>
            <div class="hcard-info">
                <div class="hcard-name">${rec.note}</div>
                <div class="hcard-type">${rec.kind}</div>
            </div>
            <div class="hcard-amt ${isIncome ? "amt-in" : "amt-out"}">
                ${isIncome ? "+" : "-"} ₹${rec.amt}
            </div>
            <div class="hcard-actions">
                <button class="ic-edit" onclick="loadForEdit(${rec.id})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="ic-delete" onclick="removeEntry(${rec.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        list.appendChild(li);
    });

    netAmt = totalIn - totalOut;
    refreshSummary();
}

// ── Save / Update button click ────────────────────────────────
document.getElementById("saveBtn").addEventListener("click", function(e){
    e.preventDefault();

    let note = document.getElementById("entryNote").value.trim();
    let amt  = document.getElementById("entryAmt").value.trim();
    let kind = document.querySelector("input[name='entryKind']:checked").value;

    if(!note || !amt){
        alert("Please fill in both fields.");
        return;
    }

    if(editingId !== null){
        ledger = ledger.map(function(rec){
            if(rec.id === editingId){
                return { id: rec.id, note: note, amt: amt, kind: kind };
            }
            return rec;
        });
        editingId = null;
    } else {
        let newRec = {
            id:   nextId,
            note: note,
            amt:  amt,
            kind: kind
        };
        ledger.push(newRec);
        nextId++;
    }

    persistData();
    resetForm();
    buildList();
});

// ── Load entry into form for editing ─────────────────────────
function loadForEdit(id){
    let rec = ledger.find(function(r){ return r.id === id; });
    if(!rec) return;

    document.getElementById("entryNote").value = rec.note;
    document.getElementById("entryAmt").value  = rec.amt;

    if(rec.kind === "Income"){
        document.getElementById("kindIncome").checked = true;
    } else {
        document.getElementById("kindExpense").checked = true;
    }

    editingId = id;
    document.getElementById("entryNote").focus();
}

// ── Delete an entry ───────────────────────────────────────────
function removeEntry(id){
    ledger = ledger.filter(function(rec){ return rec.id !== id; });
    if(editingId === id) editingId = null;
    persistData();
    buildList();
}

// ── Init ──────────────────────────────────────────────────────
buildList();