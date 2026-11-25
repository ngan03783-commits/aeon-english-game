// English Farm — Hay Day Edition: Vocabulary (Từ vựng), Grammar (Ngữ pháp) & Listening (Luyện nghe)
(function () {
    var D = window.FARM_DATA, CH = window.AEON_CHARS, KEY = "AEON_FARM_V1";
    var FARMERS = [
        { skin: "light", hair: "#7a3e1d", beard: 1, shirt: "#2f7d32", hat: 1 },
        { skin: "tan", hair: "#2b1b12", style: "long", shirt: "#c2410c", hat: 1 },
        { skin: "fair", hair: "#9ca3af", beard: 1, shirt: "#1d4ed8", hat: 1 },
        { skin: "brown", hair: "#140c08", style: "bun", shirt: "#a21caf", hat: 1 }
    ];
    // mode: "all" | "vocab" | "grammar" | "listen"
    var S = load(), Q = null, timer = null, left = 0, showVi = false, revealText = false, skillMode = "all", hideLabels = false, chatI = 0;

    function load() {
        var d = { coins: 120, gems: 15, streak: 0, harvests: 0, basket: {}, plots: D.crops.map(function () { return { c: 0, qi: 0 }; }) };
        try {
            var s = JSON.parse(localStorage.getItem(KEY));
            if (s && s.plots && s.plots.length === D.crops.length) {
                if (typeof s.gems !== "number") s.gems = 15 + (s.streak || 0);
                return s;
            }
        } catch (e) {}
        return d;
    }
    function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
    function level() { return 1 + Math.floor(S.harvests / 3); }
    function secs() { return Math.max(12, 30 - 2 * (level() - 1)); }
    function esc(s) { return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
    function $(id) { return document.getElementById(id); }

    function speak(t, rate) {
        try {
            if (!window.speechSynthesis) return;
            speechSynthesis.cancel();
            var u = new SpeechSynthesisUtterance(t);
            u.lang = "en-US";
            u.rate = rate || 0.92;
            speechSynthesis.speak(u);
        } catch (e) {}
    }
    function shuffle(a) {
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1)), t = a[i];
            a[i] = a[j]; a[j] = t;
        }
        return a;
    }

    /* ---------- Hay Day Style HUD & Mode Selector ---------- */
    function hud() {
        var xp = S.harvests % 3;
        var xpNum = (S.harvests * 450 + S.coins * 3);
        var xpMax = (level() * 1500);
        var modes = [
            { id: "all",     label: "🎯 Tổng hợp 3 kỹ năng" },
            { id: "vocab",   label: "📘 Từ vựng" },
            { id: "grammar", label: "🧩 Ngữ pháp" },
            { id: "listen",  label: "🎧 Luyện nghe" }
        ];
        var modeBtns = modes.map(function (m) {
            return '<button class="m-btn' + (skillMode === m.id ? " active" : "") + '" onclick="FARM.setMode(\'' + m.id + '\')">' + m.label + '</button>';
        }).join("");

        $("f-hud").innerHTML =
            '<div class="hd-left">' +
                '<button class="hd-gear" title="Cài đặt / Chơi lại từ đầu" onclick="FARM.reset()">⚙️</button>' +
                '<div class="lvl">' +
                    '<div class="hd-star"><span>' + level() + '</span></div>' +
                    '<div class="xpbar"><u style="width:' + Math.max(18, (xp / 3) * 100) + '%"></u><span>' + xpNum.toLocaleString("en-US") + ' / ' + xpMax.toLocaleString("en-US") + ' XP (' + xp + '/3 vụ)</span></div>' +
                '</div>' +
            '</div>' +
            '<div class="hd-modes">' + modeBtns +
                '<button class="m-btn lbl-toggle' + (hideLabels ? " active" : "") + '" title="Ẩn/Hiện bảng tên trên bản đồ" onclick="FARM.toggleLabels()">' + (hideLabels ? "👁 Hiện nhãn" : "🖼 Ngắm cảnh") + '</button>' +
            '</div>' +
            '<div class="hd-right">' +
                '<div class="hd-res coin-row"><span class="res-val">' + S.coins.toLocaleString("en-US") + '</span><span class="res-ico coin-ico">🪙</span><button class="res-plus" title="Bán nông sản nhận xu" onclick="FARM.openBarn(\'basket\')">+</button></div>' +
                '<div class="hd-res gem-row"><span class="res-val">' + (S.gems || 15) + '</span><span class="res-ico gem-ico">💎</span><button class="res-plus" title="Sổ tay Từ vựng & Ngữ pháp" onclick="FARM.openBarn(\'vocab\')">+</button></div>' +
            '</div>' +
            '<button class="hd-cash" title="Sổ tay Từ vựng, Ngữ pháp & Kho nông sản" onclick="FARM.openBarn(\'vocab\')">' +
                '<span class="cash-ico">📓</span><small>Sổ Tay</small>' +
            '</button>' +
            '<button class="hd-friends" title="Thử thách Nghe - Từ vựng - Ngữ pháp ngẫu nhiên" onclick="FARM.randomQuiz()">' +
                '<span class="fr-ico">🎧</span><small>Luyện Nhanh</small>' +
            '</button>';

        $("f-basket").innerHTML = D.crops.map(function (c) {
            return '<span class="bk" onclick="FARM.tap(' + D.crops.indexOf(c) + ')" title="Bấm để tới ' + c.vi + '">' + c.emoji + ' ' + c.en + ': <b>' + (S.basket[c.id] || 0) + '</b></span>';
        }).join("");
    }

    function plots() {
        $("f-crops").innerHTML = window.FARM_SCENE.crops(S, D);
        var lbls = $("f-labels");
        if (lbls) lbls.style.opacity = hideLabels ? "0" : "1";
    }

    /* ---------- Interactive Question Dialog (Vocab + Grammar + Listening) ---------- */
    function dialog() {
        var box = $("f-dialog");
        if (!Q) { box.innerHTML = ""; box.className = ""; return; }
        box.className = "open";

        if (Q.barnTab) {
            renderBarnModal(box, Q.barnTab);
            return;
        }

        var c = D.crops[Q.i], q = Q.q;
        var isListenMode = (skillMode === "listen" || q.type === "listen");
        var hideSentence = isListenMode && !revealText && !Q.done;
        var mood = Q.done ? (Q.ok ? "happy" : "upset") : "think";

        // Skill badge & study aid card (Vocab card / Grammar formula / Listening wave)
        var skillHeader = '<div class="sk-tag ' + (q.type || "vocab") + '">' + esc(q.tag || "📘 Rèn luyện tiếng Anh") + '</div>';
        var studyCard = "";
        if (q.type === "vocab" || c.vocabWord) {
            studyCard += '<div class="study-card vocab-card">' +
                '<div class="vc-main">🔑 Từ vựng: <b>' + esc(c.vocabWord) + '</b> <span class="ipa">' + esc(c.ipa) + '</span> <span class="pos">(' + esc(c.pos) + ')</span> = <b>' + esc(c.vocabVi) + '</b>' +
                '<button class="mini-spk" onclick="FARM.sayWord(\'' + esc(c.vocabWord) + '\')">🔈 Phát âm từ</button></div>' +
                (q.word ? '<div class="vc-sub">📌 Mở rộng: ' + esc(q.word) + '</div>' : '') +
            '</div>';
        }
        if (q.type === "grammar" && q.formula) {
            studyCard += '<div class="study-card gram-card">📐 <b>Công thức Ngữ pháp:</b> <code>' + esc(q.formula) + '</code></div>';
        }
        if (isListenMode) {
            studyCard += '<div class="study-card listen-card">' +
                '🎧 <b>Rèn kỹ năng Nghe phản xạ:</b> Hãy nghe giọng đọc để bắt từ khóa và chọn câu trả lời đúng!' +
                (Q.done && q.keywords ? '<div class="vc-sub">🎯 Từ khóa trong câu: <b>' + esc(q.keywords) + '</b></div>' : '') +
            '</div>';
        }

        var sentenceHtml = hideSentence
            ? '<div class="listen-mask" onclick="FARM.say(1)">' +
                '<span class="wave"><i></i><i></i><i></i><i></i><i></i></span>' +
                '<b>Đang ẩn chữ để luyện tai nghe! (Bấm để nghe lại hoặc bấm "👁 Hiện chữ" bên dưới)</b>' +
              '</div>'
            : '<p class="q-sent">“' + esc(q.s) + '”</p>';

        var opts = Q.opts.map(function (o, k) {
            var cls = "opt" + (Q.done ? (o.ok ? " good" : k === Q.picked ? " bad" : "") : "");
            return '<button class="' + cls + '" ' + (Q.done ? "disabled" : "") + ' onclick="FARM.pick(' + k + ')">' +
                '<b>' + "ABCD"[k] + '</b><span>' + esc(o.t) + '</span>' +
            '</button>';
        }).join("");

        var fb = Q.done
            ? '<div class="fb ' + (Q.ok ? "ok" : "no") + '">' +
                '<b>' + (Q.picked === -2 ? "⏰ Hết giờ rồi!" : Q.ok ? "🎉 Chính xác! Cây/vật nuôi đã phát triển thêm 1 cấp (+15🪙 +1💎)" : "😕 Chưa chính xác — Đáp án đúng đã được tô màu xanh lá.") + '</b>' +
                '<p>🧠 <b>Giải thích Từ vựng & Ngữ pháp:</b> ' + esc(q.why) + '</p>' +
                '<div class="fb-actions">' +
                    '<button class="sub-btn" onclick="FARM.say(0.85)">🔈 Nghe lại câu hỏi & đáp án</button>' +
                    '<button class="main" onclick="FARM.next()">' + (Q.ok ? "Tiếp tục →" : "Thử câu khác →") + '</button>' +
                '</div>' +
              '</div>'
            : '<div class="tbar"><u id="f-tbar" style="width:100%"></u></div><div class="tl">⏱ Thời gian suy nghĩ: <b id="f-tl">' + left + '</b> giây</div>';

        box.innerHTML =
            '<div class="dlg">' +
                skillHeader +
                '<div class="dtop">' +
                    '<div class="dav">' + CH.person(merge(Q.npc, { mood: mood, speaking: false })) + '</div>' +
                    '<div class="dsay">' +
                        '<div class="who">👨‍🌾 Hàng xóm tại <b>' + c.emoji + ' ' + c.en + ' (' + c.vi + ')</b></div>' +
                        sentenceHtml +
                        '<div class="dbtn">' +
                            '<button onclick="FARM.say(0.95)">🔈 Nghe chuẩn (1.0x)</button>' +
                            '<button onclick="FARM.say(0.68)">🐢 Nghe chậm (0.7x)</button>' +
                            (isListenMode && !Q.done ? '<button onclick="FARM.toggleText()">' + (revealText ? "🙈 Ẩn chữ" : "👁 Hiện chữ") + '</button>' : '') +
                            '<button onclick="FARM.vi()">💡 Dịch nghĩa</button>' +
                        '</div>' +
                        (showVi || Q.done ? '<div class="vi">🇻🇳 Dịch: ' + esc(q.vi) + '</div>' : '') +
                    '</div>' +
                '</div>' +
                studyCard +
                '<div class="opts">' + opts + '</div>' +
                fb +
                '<button class="x" onclick="FARM.close()">✕</button>' +
            '</div>';
    }

    /* ---------- Sổ Tay Từ Vựng, Ngữ Pháp & Kho Nông Sản (Barn Notebook) ---------- */
    function renderBarnModal(box, tab) {
        var tabs =
            '<div class="barn-tabs">' +
                '<button class="' + (tab === "vocab" ? "active" : "") + '" onclick="FARM.openBarn(\'vocab\')">📘 Kho Từ Vựng (IPA + Audio)</button>' +
                '<button class="' + (tab === "grammar" ? "active" : "") + '" onclick="FARM.openBarn(\'grammar\')">🧩 Công Thức Ngữ Pháp</button>' +
                '<button class="' + (tab === "basket" ? "active" : "") + '" onclick="FARM.openBarn(\'basket\')">🧺 Kho Nông Sản</button>' +
            '</div>';
        var body = "";
        if (tab === "vocab") {
            body = '<div class="barn-grid">' + D.vocabBank.map(function (v) {
                return '<div class="b-card">' +
                    '<div class="bc-head"><b>' + esc(v.word) + '</b> <span class="ipa">' + esc(v.ipa) + '</span> <span class="pos">' + esc(v.pos) + '</span>' +
                    '<button class="mini-spk" onclick="FARM.sayWord(\'' + esc(v.word) + '. ' + esc(v.ex) + '\')">🔈 Nghe</button></div>' +
                    '<div class="bc-vi">🇻🇳 ' + esc(v.vi) + '</div>' +
                    '<div class="bc-ex">💬 “' + esc(v.ex) + '”</div>' +
                '</div>';
            }).join("") + '</div>';
        } else if (tab === "grammar") {
            body = '<div class="barn-list">' + D.grammarBank.map(function (g) {
                return '<div class="g-card">' +
                    '<b>' + esc(g.title) + '</b>' +
                    '<code>📐 ' + esc(g.rule) + '</code>' +
                    '<p>' + esc(g.desc) + '</p>' +
                '</div>';
            }).join("") + '</div>';
        } else {
            body = '<div class="barn-grid">' + D.crops.map(function (c, idx) {
                var cnt = S.basket[c.id] || 0;
                return '<div class="b-card">' +
                    '<div class="bc-head"><b>' + c.emoji + ' ' + esc(c.en) + '</b> <span class="pos">' + esc(c.vi) + '</span></div>' +
                    '<div class="bc-vi">Đang có trong kho: <b>' + cnt + '</b> đơn vị</div>' +
                    '<div class="bc-ex"><button class="mini-spk" onclick="FARM.close();FARM.tap(' + idx + ')">🌾 Tới thu hoạch / Luyện tập</button></div>' +
                '</div>';
            }).join("") + '</div>';
        }
        box.innerHTML =
            '<div class="dlg barn-dlg">' +
                '<h2 style="margin:0 0 10px;color:#5c3818">📓 Sổ Tay Tiếng Anh Nông Trại Hay Day</h2>' +
                tabs + body +
                '<button class="x" onclick="FARM.close()">✕</button>' +
            '</div>';
    }

    function merge(a, b) { var r = {}, k; for (k in a) r[k] = a[k]; for (k in b) r[k] = b[k]; return r; }

    /* ---------- Game Flow & Skill Selection ---------- */
    function selectQuestion(crop, plot) {
        if (skillMode !== "all") {
            var filtered = crop.q.filter(function (item) { return item.type === skillMode; });
            if (filtered.length) return filtered[plot.qi % filtered.length];
        }
        return crop.q[plot.qi % crop.q.length];
    }

    function open(i) {
        var c = D.crops[i], p = S.plots[i], q = selectQuestion(c, p);
        Q = {
            i: i,
            q: q,
            opts: shuffle(q.o.map(function (t, k) { return { t: t, ok: k === 0 }; })),
            done: false,
            picked: -1,
            ok: false,
            npc: FARMERS[i % FARMERS.length]
        };
        showVi = false;
        revealText = false;
        left = secs();
        dialog();
        speak(q.s, 0.92);
        startTimer();
    }

    function startTimer() {
        clearInterval(timer);
        var total = left;
        timer = setInterval(function () {
            left--;
            var b = $("f-tbar"), l = $("f-tl");
            if (b) b.style.width = Math.max(0, (left / total) * 100) + "%";
            if (l) l.textContent = Math.max(0, left);
            if (left <= 0) pick(-2);
        }, 1000);
    }

    function pick(k) {
        if (!Q || Q.done) return;
        clearInterval(timer);
        Q.picked = k;
        Q.done = true;
        Q.ok = k >= 0 && Q.opts[k].ok;
        var p = S.plots[Q.i];
        if (Q.ok) {
            p.c++;
            p.qi++;
            S.streak++;
            S.coins += 15 + (S.streak >= 3 ? 10 : 0);
            S.gems = (S.gems || 15) + 1;
            // Read the correct English answer aloud to reinforce pronunciation!
            var rightOpt = Q.opts.filter(function (o) { return o.ok; })[0];
            if (rightOpt) speak(rightOpt.t, 0.94);
        } else {
            S.streak = 0;
            p.qi++;
        }
        save(); hud(); plots(); dialog();
    }

    function harvest(i) {
        var c = D.crops[i], p = S.plots[i], before = level();
        S.basket[c.id] = (S.basket[c.id] || 0) + 1;
        S.coins += 50;
        S.gems = (S.gems || 15) + 2;
        S.harvests++;
        p.c = 0;
        save(); hud(); plots();
        speak(c.en + "! " + c.example, 0.94);
        toast("🧺 Thu hoạch +1 " + c.emoji + " " + c.en + " (" + c.vi + ") · +50🪙 +2💎" + (level() > before ? " 🌟 LÊN CẤP " + level() + "!" : ""));
    }

    function toast(t) {
        var e = $("f-toast");
        e.textContent = t;
        e.className = "show";
        clearTimeout(toast.t);
        toast.t = setTimeout(function () { e.className = ""; }, 3500);
    }

    window.FARM = {
        tap: function (i) { if (S.plots[i].c >= 2) harvest(i); else open(i); },
        pick: pick,
        next: function () { var i = Q.i, ok = Q.ok; if (ok) { Q = null; dialog(); } else open(i); },
        close: function () { clearInterval(timer); Q = null; dialog(); },
        say: function (rate) {
            if (!Q || !Q.q) return;
            if (Q.done) {
                var rightOpt = Q.opts.filter(function (o) { return o.ok; })[0];
                speak(Q.q.s + " ... " + (rightOpt ? rightOpt.t : ""), rate || 0.92);
            } else {
                speak(Q.q.s, rate || 0.92);
            }
        },
        sayWord: function (w) { speak(w, 0.88); },
        vi: function () { showVi = !showVi; if (Q) { var t = left; dialog(); left = t; } },
        toggleText: function () { revealText = !revealText; if (Q) { var t = left; dialog(); left = t; } },
        setMode: function (m) {
            skillMode = m;
            hud();
            var names = { all: "🎯 Tổng hợp (Từ vựng + Ngữ pháp + Nghe)", vocab: "📘 Chuyên luyện Từ vựng (Vocabulary)", grammar: "🧩 Chuyên luyện Ngữ pháp (Grammar)", listen: "🎧 Chuyên luyện Nghe phản xạ (Listening)" };
            toast("Đã chuyển sang chế độ: " + names[m]);
        },
        toggleLabels: function () { hideLabels = !hideLabels; hud(); plots(); },
        openBarn: function (tab) { clearInterval(timer); Q = { barnTab: tab || "vocab" }; dialog(); },
        randomQuiz: function () {
            var idx = Math.floor(Math.random() * D.crops.length);
            open(idx);
        },
        reset: function () {
            if (confirm("Đặt lại tiến trình nông trại từ đầu?")) {
                localStorage.removeItem(KEY);
                S = load();
                hud();
                plots();
            }
        },
        _state: function () { return { S: S, Q: Q }; }
    };

    /* ---------- Ambient Neighbours Chatting on Cobblestone Plaza ---------- */
    function chat() {
        var line = D.chat[chatI % D.chat.length], a = chatI % 2 === 0;
        $("f-fig").innerHTML =
            '<div class="cb ' + (a ? "l" : "r") + '"><b>' + (a ? "Tom" : "Rose") + ':</b> "' + esc(line[0]) + '"<small>→ ' + esc(line[1]) + '</small></div>' +
            '<div class="fig f1' + (a ? " talk" : "") + '">' + CH.walker(CH.walkerLook(2, 3), false) + '</div>' +
            '<div class="fig f2' + (a ? "" : " talk") + '">' + CH.walker(CH.walkerLook(1, 1), true) + '</div>' +
            '<div class="fig f3">' + CH.walker(CH.walkerLook(0, 0), false) + '</div>';
        chatI++;
    }

    function boot() {
        $("f-static").innerHTML = window.FARM_SCENE.stat();
        hud();
        plots();
        chat();
        setInterval(chat, 5500);
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
})();
