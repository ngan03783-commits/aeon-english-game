// AEON Mall — 2-player mode: one PG (answers) + one foreign customer (asks), paired by ID.
(function () {
    var KEY = "AEON_MP_V1", D = window.AEON_GAME_DATA, CH = window.AEON_CHARS;
    var me = null, partner = null, es = null, status = null, pendingScen = null;
    var log = [], waiting = false, curScen = null, custMood = "think", pgMood = "smile", note = "";
    var NEED = { "Cơ bản": 1, "Trung bình": 2, "Nâng cao": 3 };

    function $(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; }
    function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
    function api(path, body) {
        return fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body || {}) })
            .then(function (r) { return r.json().then(function (j) { j.ok = r.ok; return j; }); });
    }
    function save() { try { localStorage.setItem(KEY, JSON.stringify(me)); } catch (e) {} }
    function isPG() { return !!me && me.role === "pg"; }
    function send(kind, data) { return me && partner ? api("/api/msg", { id: me.id, kind: kind, data: data }) : null; }
    function scen(id) { return D.scenarios.filter(function (s) { return s.id === id; })[0]; }
    function lineOf(s) { return D.lines.filter(function (l) { return l.id === s.lineId; })[0]; }
    function need(s) { return Math.max(lineOf(s).requiredLevel, NEED[s.difficulty] || 1); }
    function speak(t) {
        try { if (!window.speechSynthesis) return; speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t); u.lang = "en-US"; u.rate = 0.94; speechSynthesis.speak(u); } catch (e) {}
    }

    /* ---------- connection ---------- */
    function connect() {
        if (es) es.close();
        es = new EventSource("/api/stream?id=" + encodeURIComponent(me.id));
        es.onmessage = function (ev) { handle(JSON.parse(ev.data)); };
        es.onerror = function () {
            note = "Mất kết nối, đang thử lại...";
            refresh();
            if (es.readyState === 2) setTimeout(rejoin, 1500);
        };
    }
    function rejoin() {
        api("/api/join", { id: me.id, name: me.name, role: me.role }).then(function (r) {
            if (r.id) { me.id = r.id; save(); connect(); }
        }).catch(function () { setTimeout(rejoin, 3000); });
    }
    function link() {
        note = "";
        if (partner) { if (isPG()) pushStatus(); else send("hello"); }
        refresh();
    }
    function handle(m) {
        if (m.type === "ready") { partner = m.partner; link(); }
        else if (m.type === "paired") { partner = m.partner; closeModal(); link(); }
        else if (m.type === "partner_online") { link(); }
        else if (m.type === "partner_offline") { note = "Đối tác tạm mất kết nối..."; refresh(); }
        else if (m.type === "unpaired") { partner = null; pendingScen = null; waiting = false; note = "Đối tác đã rời phòng."; refresh(); }
        else if (m.type === "msg") {
            if (m.kind === "hello") pushStatus();
            else if (m.kind === "ask") onAsk(m.data.scenId);
            else if (m.kind === "status") { status = m.data; refresh(); }
            else if (m.kind === "answer") onAnswerMsg(m.data);
        }
    }

    /* ---------- PG side ---------- */
    function pushStatus() { if (window.AEON_ACTIONS && AEON_ACTIONS.mpInfo) send("status", AEON_ACTIONS.mpInfo()); }
    function onAsk(id) {
        pendingScen = id;
        AEON_ACTIONS.mpShowScenario(id);
        refresh();
    }
    var AEON_MP = {
        active: function () { return !!me && !!partner; },
        pending: function () { return pendingScen !== null; },
        onAnswer: function (a) {
            if (!AEON_MP.active()) return;
            if (a.correct) pendingScen = null;
            send("answer", a); pushStatus(); refresh();
        }
    };
    window.AEON_MP = AEON_MP;

    /* ---------- Customer side ---------- */
    function onAnswerMsg(a) {
        var s = scen(a.scenId);
        log.push({ who: "pg", text: a.text, ok: a.correct });
        if (a.correct) { waiting = false; custMood = "happy"; pgMood = "happy"; }
        else { custMood = "upset"; pgMood = "think"; }
        speak(a.text);
        if (s) curScen = s.id;
        refresh();
    }
    function ask(id) {
        if (waiting || !status) return;
        var s = scen(id);
        if (need(s) > status.level) return;
        curScen = id; waiting = true; custMood = "think"; pgMood = "smile";
        log.push({ who: "cust", text: s.customerSpeech, vi: s.customerTranslation, tag: s.productFocus });
        speak(s.customerSpeech);
        send("ask", { scenId: id });
        refresh();
    }
    function renderCustomer() {
        var box = document.getElementById("mp-cust");
        if (!(me && !isPG() && partner)) { if (box) box.remove(); return; }
        if (!box) { box = $("div", ""); box.id = "mp-cust"; document.body.appendChild(box); }
        var s = curScen ? scen(curScen) : D.scenarios[0], line = lineOf(s);
        var lv = status ? status.level : 1;
        var grid = D.scenarios.map(function (x) {
            var locked = need(x) > lv, dis = locked || waiting;
            return '<button class="mp-q' + (locked ? " locked" : "") + '" ' + (dis ? "disabled" : "") + ' onclick="AEON_MP.ask(\'' + x.id + '\')">' +
                (locked ? "🔒 " : "") + esc(x.productFocus) + '<small>' + esc(x.difficulty) + (locked ? " · mở ở Lv." + need(x) : "") + "</small></button>";
        }).join("");
        var logHtml = log.slice(-6).map(function (l) {
            if (l.who === "cust") return '<div class="mp-msg me"><b>Bạn (khách):</b> "' + esc(l.text) + '"<small>→ ' + esc(l.vi) + "</small></div>";
            return '<div class="mp-msg pg ' + (l.ok ? "ok" : "bad") + '"><b>PG:</b> "' + esc(l.text) + '"<small>' +
                (l.ok ? "😊 Bạn hài lòng — PG chốt đơn được rồi!" : "😕 Câu này chưa lịch sự/chính xác — chờ PG thử lại...") + "</small></div>";
        }).join("") || '<div class="mp-hint">Chọn một câu hỏi bên dưới để hỏi PG. PG càng lên level, bạn càng mở được nhiều câu khó hơn.</div>';
        box.innerHTML =
            '<div class="mp-head"><span>🌍 Bạn là <b>KHÁCH</b> · PG: <b>' + esc(partner.name) + "</b> (" + esc(partner.id) + ") · " +
            (status ? "Lv." + status.level + " " + esc(status.title) + " · 💎 " + status.diamonds : "đang chờ PG...") + "</span>" +
            '<button onclick="AEON_MP.leave()">Rời phòng</button></div>' +
            '<div class="mp-stage"><div class="mp-fig">' + CH.pg(line.id, pgMood, false) + "<em>" + esc(partner.name) + "</em></div>" +
            '<div class="mp-log">' + logHtml + (waiting ? '<div class="mp-hint">⏳ Đang chờ PG trả lời...</div>' : "") + "</div>" +
            '<div class="mp-fig">' + CH.customer(s.id, custMood, false) + "<em>Bạn</em></div></div>" +
            '<div class="mp-pick">' + grid + "</div>" + (note ? '<div class="mp-note">' + esc(note) + "</div>" : "");
    }

    /* ---------- PG status bar ---------- */
    function renderBar() {
        var bar = document.getElementById("mp-bar");
        if (!(me && isPG() && partner)) { if (bar) bar.remove(); return; }
        if (!bar) { bar = $("div", ""); bar.id = "mp-bar"; document.body.appendChild(bar); }
        bar.innerHTML = (pendingScen
                ? "🌍 Khách <b>" + esc(partner.name) + "</b> (" + esc(partner.id) + ") đang hỏi — hãy chọn câu trả lời!"
                : "👥 Đang chơi với khách <b>" + esc(partner.name) + "</b> (" + esc(partner.id) + ") · ⏳ chờ khách hỏi câu tiếp theo...") +
            (note ? " · " + esc(note) : "") + ' <button onclick="AEON_MP.leave()">Rời phòng</button>';
    }

    /* ---------- Pairing modal ---------- */
    function modal() { return document.getElementById("mp-modal"); }
    function closeModal() { var m = modal(); if (m) m.remove(); }
    function openModal() {
        closeModal();
        var m = $("div", ""); m.id = "mp-modal"; document.body.appendChild(m);
        drawModal();
    }
    function drawModal(msg) {
        var m = modal(); if (!m) return;
        var body;
        if (location.protocol === "file:") {
            body = '<p class="mp-err">Chế độ 2 người cần mở game qua link trên Render (hoặc chạy <code>node server.js</code> rồi vào <code>http://localhost:3000</code>), không mở bằng file:///.</p>';
        } else if (!me) {
            body = '<label>Tên hiển thị<input id="mp-name" maxlength="20" placeholder="VD: Mai Anh"></label>' +
                '<label>Bạn muốn chơi vai nào?<select id="mp-role"><option value="pg">💁‍♀️ PG bán hàng (trả lời khách)</option><option value="customer">🌍 Khách nước ngoài (đặt câu hỏi)</option></select></label>' +
                '<button class="mp-main" onclick="AEON_MP.join()">Tạo ID của tôi</button>';
        } else {
            body = '<p>ID của bạn (' + (isPG() ? "PG" : "Khách") + '): <b class="mp-id">' + esc(me.id) + '</b> <button onclick="AEON_MP.copyId()">Sao chép</button></p>' +
                (partner ? '<p class="mp-ok">✅ Đã ghép với <b>' + esc(partner.name) + "</b> (" + esc(partner.id) + ")</p>"
                    : '<p>Gửi ID này cho bạn của bạn (vai còn lại), hoặc nhập ID của họ:</p>' +
                    '<label><input id="mp-friend" placeholder="' + (isPG() ? "KH-1234" : "PG-1234") + '"></label><button class="mp-main" onclick="AEON_MP.pair()">Kết bạn</button>');
        }
        m.innerHTML = '<div class="mp-card"><h3>👥 Chơi 2 người</h3>' + body + (msg ? '<p class="mp-err">' + esc(msg) + "</p>" : "") +
            '<button class="mp-close" onclick="AEON_MP.closeModal()">Đóng</button></div>';
    }

    AEON_MP.open = openModal;
    AEON_MP.closeModal = closeModal;
    AEON_MP.ask = ask;
    AEON_MP.copyId = function () { try { navigator.clipboard.writeText(me.id); } catch (e) {} };
    AEON_MP.join = function () {
        var name = (document.getElementById("mp-name").value || "").trim() || "Người chơi";
        var role = document.getElementById("mp-role").value;
        api("/api/join", { name: name, role: role }).then(function (r) {
            if (!r.id) return drawModal(r.error || "Không tạo được ID.");
            me = { id: r.id, name: r.name, role: r.role }; save(); connect(); drawModal();
        }).catch(function () { drawModal("Không kết nối được máy chủ."); });
    };
    AEON_MP.pair = function () {
        var f = (document.getElementById("mp-friend").value || "").trim();
        api("/api/pair", { id: me.id, friendId: f }).then(function (r) {
            if (!r.ok) return drawModal(r.error || "Không ghép được.");
        }).catch(function () { drawModal("Không kết nối được máy chủ."); });
    };
    AEON_MP.leave = function () {
        api("/api/unpair", { id: me.id }); partner = null; pendingScen = null; waiting = false; log = []; status = null; refresh();
    };

    function refresh() { renderBar(); renderCustomer(); if (modal()) drawModal(); }

    /* ---------- boot ---------- */
    function boot() {
        var fab = $("button", "", "👥 Chơi 2 người"); fab.id = "mp-fab"; fab.onclick = openModal; document.body.appendChild(fab);
        if (location.protocol === "file:") return;
        try { me = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { me = null; }
        if (me && me.id) rejoin();
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();