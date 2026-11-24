// AEON Mall — tiny zero-dependency server: serves the game + pairs a PG with a foreign customer (SSE + POST)
const http = require("http"), fs = require("fs"), path = require("path");
const PORT = process.env.PORT || 3000;
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" };
const NOT_PUBLIC = ["server.js"];
const users = new Map(); // id -> { id, name, role, partner, res }

const pub = (u) => ({ id: u.id, name: u.name, role: u.role });
const send = (u, o) => { if (u && u.res) u.res.write("data: " + JSON.stringify(o) + "\n\n"); };
const json = (res, code, o) => { res.writeHead(code, { "Content-Type": "application/json" }); res.end(JSON.stringify(o)); };
const readBody = (req) => new Promise((ok) => {
    let b = "";
    req.on("data", (c) => { b += c; if (b.length > 1e5) req.destroy(); });
    req.on("end", () => { try { ok(JSON.parse(b || "{}")); } catch (e) { ok({}); } });
});
const norm = (s) => String(s || "").toUpperCase().trim();
function newId(role) {
    let id;
    do { id = (role === "pg" ? "PG" : "KH") + "-" + (1000 + Math.floor(Math.random() * 9000)); } while (users.has(id));
    return id;
}

async function api(req, res, p) {
    const b = await readBody(req), u = users.get(norm(b.id));
    if (p === "/api/join") {
        const role = b.role === "customer" ? "customer" : "pg";
        const name = String(b.name || "Người chơi").slice(0, 20);
        let me = u;
        if (!me) { me = { id: newId(role), name, role, partner: null, res: null }; users.set(me.id, me); }
        me.name = name;
        return json(res, 200, pub(me));
    }
    if (!u) return json(res, 404, { error: "Không tìm thấy ID của bạn, hãy tạo lại ID." });
    if (p === "/api/pair") {
        const f = users.get(norm(b.friendId));
        if (!f || f.id === u.id) return json(res, 404, { error: "Không tìm thấy ID bạn bè này." });
        if (f.role === u.role) return json(res, 400, { error: "Cần ghép 1 PG với 1 Khách (hai người phải chọn vai khác nhau)." });
        if (f.partner && f.partner !== u.id) return json(res, 409, { error: "Người này đang chơi với người khác." });
        if (u.partner && u.partner !== f.id) return json(res, 409, { error: "Bạn đang chơi với người khác, hãy rời phòng trước." });
        u.partner = f.id; f.partner = u.id;
        send(u, { type: "paired", partner: pub(f) }); send(f, { type: "paired", partner: pub(u) });
        return json(res, 200, { partner: pub(f) });
    }
    if (p === "/api/unpair") {
        const f = users.get(u.partner);
        if (f) { f.partner = null; send(f, { type: "unpaired" }); }
        u.partner = null;
        return json(res, 200, {});
    }
    if (p === "/api/msg") {
        const f = users.get(u.partner);
        if (!f) return json(res, 409, { error: "Chưa có đối tác." });
        send(f, { type: "msg", kind: String(b.kind || "").slice(0, 20), data: b.data });
        return json(res, 200, {});
    }
    json(res, 404, { error: "Not found" });
}

http.createServer((req, res) => {
    const url = new URL(req.url, "http://x"), p = url.pathname;
    if (p === "/api/stream") {
        const u = users.get(norm(url.searchParams.get("id")));
        if (!u) { res.writeHead(404); return res.end(); }
        res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
        u.res = res; res.write("retry: 2000\n\n");
        const f = users.get(u.partner);
        send(u, { type: "ready", partner: f ? pub(f) : null });
        send(f, { type: "partner_online" });
        req.on("close", () => { if (u.res === res) { u.res = null; send(users.get(u.partner), { type: "partner_offline" }); } });
        return;
    }
    if (req.method === "POST" && p.indexOf("/api/") === 0) return api(req, res, p);
    const rel = p === "/" ? "/index.html" : decodeURIComponent(p);
    const file = path.join(__dirname, path.normalize(rel).replace(/^(\.\.[/\\])+/, ""));
    const ext = path.extname(file);
    if (!MIME[ext] || NOT_PUBLIC.indexOf(path.basename(file)) !== -1 || file.indexOf(__dirname) !== 0) { res.writeHead(404); return res.end("Not found"); }
    fs.readFile(file, (err, data) => {
        if (err) { res.writeHead(404); return res.end("Not found"); }
        res.writeHead(200, { "Content-Type": MIME[ext] }); res.end(data);
    });
}).listen(PORT, () => console.log("AEON game on port " + PORT));

setInterval(() => users.forEach((u) => { if (u.res) u.res.write(": ping\n\n"); }), 20000);