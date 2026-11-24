// AEON Mall — Inline SVG people, walkers and product packs (100% offline, no external images)
(function () {
    var SKIN = { fair: ["#f7d9c4", "#e9b99a"], light: ["#f1c9a5", "#dfa77f"], tan: ["#d9a273", "#c28a5c"], brown: ["#a8714a", "#8f5c38"], asian: ["#f3d3a8", "#e2b987"] };
    var SHORT = "M33 60C30 30 46 24 60 24C75 24 91 31 87 60C81 47 71 42 60 42C49 42 40 47 33 60Z";

    function person(o) {
        var sk = SKIN[o.skin || "light"], s = sk[0], sd = sk[1];
        var hc = o.hair || "#2b1b12", shirt = o.shirt || "#3b82f6";
        var mood = o.mood || "smile", talk = !!o.speaking, pg = o.role === "pg", style = o.style || "short";
        var back = "", front = '<path d="' + SHORT + '" fill="' + hc + '"/>', faceRx = 26, ears = true;

        if (style === "long") {
            back = '<path d="M31 62C24 104 32 116 46 116H74C88 116 96 104 89 62C92 26 28 26 31 62Z" fill="' + hc + '"/>';
        } else if (style === "bob") {
            back = '<path d="M30 62C26 84 30 92 38 92H82C90 92 94 84 90 62C92 26 28 26 30 62Z" fill="' + hc + '"/>';
        } else if (style === "bun") {
            back = '<circle cx="60" cy="20" r="11" fill="' + hc + '"/>';
        } else if (style === "curly") {
            back = [[36, 40, 10], [48, 28, 11], [62, 24, 11], [76, 28, 11], [86, 40, 10], [31, 56, 8], [89, 56, 8]]
                .map(function (c) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" fill="' + hc + '"/>'; }).join("");
        } else if (style === "hijab") {
            var sc = o.scarf || "#0e7490";
            back = '<path d="M28 66C24 24 96 24 92 66C94 98 82 110 60 110C38 110 26 98 28 66Z" fill="' + sc + '"/>';
            front = '<path d="M38 55C43 38 77 38 82 55C74 47 46 47 38 55Z" fill="' + sc + '"/><path d="M38 55C43 38 77 38 82 55" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="2"/>';
            faceRx = 21; ears = false;
        }

        var up = mood === "think";
        var px = up ? 1.5 : 0, py = up ? -1.8 : 0;
        var eyes = mood === "happy"
            ? '<path d="M44 65Q49 58 54 65M66 65Q71 58 76 65" fill="none" stroke="#2a1a12" stroke-width="2.6" stroke-linecap="round"/>'
            : '<g class="blink" style="animation-delay:-' + (Math.random() * 4).toFixed(1) + 's"><ellipse cx="49" cy="64" rx="5" ry="5.2" fill="#fff"/><ellipse cx="71" cy="64" rx="5" ry="5.2" fill="#fff"/><circle cx="' + (49 + px) + '" cy="' + (64 + py) + '" r="2.9" fill="#2a1a12"/><circle cx="' + (71 + px) + '" cy="' + (64 + py) + '" r="2.9" fill="#2a1a12"/></g>';
        var bc = 'fill="none" stroke="#4b3426" stroke-width="2.4" stroke-linecap="round"';
        var brows = {
            smile: '<path d="M42 55Q49 52 56 55M64 55Q71 52 78 55" ' + bc + '/>',
            happy: '<path d="M42 52Q49 48 56 52M64 52Q71 48 78 52" ' + bc + '/>',
            think: '<path d="M42 56Q49 54 56 56" ' + bc + '/><path d="M64 51Q71 46 78 52" ' + bc + '/>',
            upset: '<path d="M42 51L56 57M78 51L64 57" ' + bc + '/>'
        }[mood] || "";
        var mouth;
        if (talk) mouth = '<ellipse class="talk" cx="60" cy="80" rx="6.5" ry="5" fill="#7a1f2b"/>';
        else if (mood === "happy") mouth = '<path d="M48 76Q60 93 72 76Z" fill="#fff" stroke="#9b3b45" stroke-width="2" stroke-linejoin="round"/>';
        else if (mood === "think") mouth = '<path d="M54 81Q60 79 67 82" fill="none" stroke="#9b3b45" stroke-width="2.4" stroke-linecap="round"/>';
        else if (mood === "upset") mouth = '<path d="M51 85Q60 76 69 85" fill="none" stroke="#9b3b45" stroke-width="2.6" stroke-linecap="round"/>';
        else mouth = '<path d="M51 77Q60 85 69 77" fill="none" stroke="#b4505a" stroke-width="2.6" stroke-linecap="round"/>';
        var blush = mood === "happy" ? '<circle cx="41" cy="75" r="5" fill="#f9a8a8" opacity=".55"/><circle cx="79" cy="75" r="5" fill="#f9a8a8" opacity=".55"/>' : "";
        var beard = o.beard ? '<path d="M40 70C42 96 78 96 80 70C74 82 66 75 60 75C54 75 46 82 40 70Z" fill="' + hc + '"/>' : "";
        var glasses = o.glasses ? '<g fill="rgba(255,255,255,.18)" stroke="#334155" stroke-width="2"><circle cx="49" cy="64" r="8.5"/><circle cx="71" cy="64" r="8.5"/><path d="M57.5 63Q60 61 62.5 63" fill="none"/></g>' : "";
        var headCls = mood === "happy" ? "head-nod" : mood === "upset" ? "head-shake" : mood === "think" ? "head-tilt" : "head-idle";

        var torso = '<rect x="52" y="86" width="16" height="26" rx="6" fill="' + sd + '"/><path d="M12 164C12 124 32 108 60 108C88 108 108 124 108 164Z" fill="' + shirt + '"/>';
        var extra = "";
        if (pg) {
            torso += '<path d="M46 108L60 126L74 108L68 103H52Z" fill="#fff"/><path d="M34 114H86L94 164H26Z" fill="#fff" stroke="#f0c6e4" stroke-width="2"/>' +
                '<rect x="39" y="120" width="22" height="11" rx="2" fill="#fde7f4" stroke="#B41F8E" stroke-width="1.5"/><path d="M42 125H58" stroke="#B41F8E" stroke-width="2"/>' +
                '<text x="60" y="152" font-size="11" font-weight="900" fill="#B41F8E" text-anchor="middle" font-family="Arial,sans-serif">AEON</text>';
            if (mood === "smile" || mood === "happy") {
                extra = '<g class="wave"><path d="M98 132L114 100" stroke="' + shirt + '" stroke-width="12" stroke-linecap="round"/><circle cx="115" cy="94" r="7.5" fill="' + s + '"/></g>';
            }
        } else {
            torso += '<path d="M47 108L60 123L73 108L68 104H52Z" fill="rgba(255,255,255,.28)"/>';
            if (mood === "happy") {
                extra = '<g class="pay"><path d="M16 130L2 110" stroke="' + shirt + '" stroke-width="12" stroke-linecap="round"/><circle cx="0" cy="105" r="6.5" fill="' + s + '"/><g transform="rotate(-16 8 98)"><rect x="-4" y="88" width="24" height="15" rx="2.5" fill="#B41F8E"/><rect x="-4" y="92" width="24" height="3.5" fill="#f9a8d4"/></g></g>';
            }
        }

        var cart = "";
        if (o.cart) {
            var bag = mood === "happy" ? '<path d="M44 120H76L80 146H40Z" fill="#B41F8E"/><path d="M50 120Q60 106 70 120" fill="none" stroke="#8C1974" stroke-width="3"/><text x="60" y="138" font-size="10" font-weight="900" fill="#fff" text-anchor="middle" font-family="Arial,sans-serif">AEON</text>' : "";
            cart = '<g class="cart"><path d="M10 118H110" stroke="#475569" stroke-width="5" stroke-linecap="round"/>' + bag +
                '<path class="cart-basket" d="M14 124H106L96 152H26Z" fill="rgba(226,232,240,.5)" stroke="#64748b" stroke-width="2.5" stroke-linejoin="round"/>' +
                '<path d="M38 124L40 152M60 124V152M82 124L80 152M19 138H101" stroke="#94a3b8" stroke-width="1.6"/>' +
                '<path d="M28 152V157M92 152V157" stroke="#475569" stroke-width="3"/><circle cx="28" cy="160" r="4" fill="#1f2937"/><circle cx="92" cy="160" r="4" fill="#1f2937"/></g>';
        }

        return '<svg class="char-svg" viewBox="-14 0 148 166" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<ellipse cx="60" cy="163" rx="52" ry="3.5" fill="rgba(80,20,70,.16)"/>' +
            '<g class="body">' + back + torso +
            '<g class="' + headCls + '">' +
            (ears ? '<circle cx="34" cy="66" r="5" fill="' + sd + '"/><circle cx="86" cy="66" r="5" fill="' + sd + '"/>' : "") +
            '<ellipse cx="60" cy="62" rx="' + faceRx + '" ry="30" fill="' + s + '"/>' + beard + front + blush + eyes + brows +
            '<path d="M60 66Q57 73 60 74" fill="none" stroke="' + sd + '" stroke-width="2" stroke-linecap="round"/>' + mouth + glasses +
            "</g>" + extra + "</g>" + cart + "</svg>";
    }

    function walker(o, flip) {
        var sk = (SKIN[o.skin] || SKIN.light)[0], sh = o.shirt, pn = o.pants, hc = o.hair;
        var hair = '<path d="M23 15C22 4 42 4 41 15C38 10 27 10 23 15Z" fill="' + hc + '"/>' + (o.long ? '<path d="M22 14C19 30 24 35 29 35L29 14Z" fill="' + hc + '"/>' : "");
        var arm = function (cls, c) { return '<g class="w-arm ' + cls + '" style="transform-origin:30px 30px"><path d="M30 30V54" stroke="' + c + '" stroke-width="7" stroke-linecap="round"/><circle cx="30" cy="56" r="3.6" fill="' + sk + '"/></g>'; };
        var leg = function (cls, c) { return '<g class="w-leg ' + cls + '" style="transform-origin:31px 62px"><path d="M31 62V105" stroke="' + c + '" stroke-width="9" stroke-linecap="round"/><path d="M28 108H41" stroke="#1f2937" stroke-width="5" stroke-linecap="round"/></g>'; };
        var front = o.cart
            ? '<path d="M30 32L48 52" stroke="' + sh + '" stroke-width="7" stroke-linecap="round"/><path d="M44 50H66" stroke="#475569" stroke-width="3" stroke-linecap="round"/><path d="M46 54H67L63 76H50Z" fill="rgba(226,232,240,.8)" stroke="#64748b" stroke-width="1.8"/><path d="M52 76V80M62 76V80" stroke="#475569" stroke-width="2"/><circle cx="52" cy="82" r="2.6" fill="#1f2937"/><circle cx="62" cy="82" r="2.6" fill="#1f2937"/><rect x="50" y="48" width="8" height="8" rx="1.5" fill="#B41F8E"/>'
            : arm("w-arm-f", sh);
        return '<svg class="walker-svg' + (flip ? " flip" : "") + '" viewBox="0 0 70 120" style="height:' + o.h + 'px" aria-hidden="true">' +
            '<ellipse cx="34" cy="118" rx="18" ry="3" fill="rgba(0,0,0,.16)"/>' +
            '<g class="w-bob">' + (o.cart ? "" : arm("w-arm-b", sh)) + leg("w-leg-b", pn) +
            '<path d="M22 30Q32 23 42 30L41 66H23Z" fill="' + sh + '"/>' +
            '<rect x="29" y="22" width="6" height="8" rx="2" fill="' + sk + '"/>' +
            '<circle cx="32" cy="15" r="9" fill="' + sk + '"/>' + hair + '<circle cx="36" cy="15" r="1.2" fill="#2a1a12"/>' +
            leg("w-leg-f", pn) + front + "</g></svg>";
    }

    var WS = ["fair", "asian", "tan", "brown", "light"], WH = ["#2b1b12", "#7a3e1d", "#d6a74c", "#1c1917", "#9ca3af"];
    var WSH = ["#f472b6", "#38bdf8", "#facc15", "#34d399", "#a78bfa", "#fb923c"], WP = ["#334155", "#1e3a8a", "#475569", "#7c2d12"];
    function walkerLook(n, i) {
        var k = n * 4 + i;
        return { skin: WS[k % 5], hair: WH[(k * 2) % 5], shirt: WSH[k % 6], pants: WP[k % 4], cart: i % 2 === 0, long: k % 3 !== 0, h: [74, 52, 62, 48][i % 4], b: [2, 24, 10, 28][i % 4] };
    }

    var PC = [["#f59e0b", "#fff7ed"], ["#16a34a", "#f0fdf4"], ["#db2777", "#fdf2f8"], ["#0ea5e9", "#f0f9ff"], ["#7c3aed", "#f5f3ff"], ["#ef4444", "#fef2f2"]];
    function pack(icon, i, ln) {
        var c = PC[i % 6], kind = (i + ln) % 3;
        function shape() {
            if (kind === 0) return '<rect x="20" y="2" width="12" height="8" rx="2" fill="#334155"/><path d="M14 14Q14 10 20 10H32Q38 10 38 14V54Q38 58 34 58H18Q14 58 14 54Z" fill="' + c[0] + '"/><rect x="14" y="24" width="24" height="22" fill="' + c[1] + '"/>';
            if (kind === 1) return '<rect x="8" y="8" width="36" height="50" rx="3" fill="' + c[0] + '"/><rect x="8" y="8" width="36" height="9" fill="rgba(0,0,0,.18)"/><rect x="12" y="24" width="28" height="24" rx="3" fill="' + c[1] + '"/>';
            return '<path d="M10 10L14 6H38L42 10V56Q42 58 40 58H12Q10 58 10 56Z" fill="' + c[0] + '"/><path d="M10 10H42" stroke="rgba(0,0,0,.25)" stroke-width="3" stroke-dasharray="2 2"/><rect x="14" y="22" width="24" height="24" rx="12" fill="' + c[1] + '"/>';
        }
        return '<svg class="pack-svg" viewBox="0 0 96 64" aria-hidden="true"><g transform="translate(36 6) scale(.82)" opacity=".85">' + shape() + '</g><g transform="translate(-2 6) scale(.82)" opacity=".85">' + shape() + '</g><g transform="translate(22 0)">' + shape() + '<text x="26" y="41" font-size="16" text-anchor="middle">' + icon + "</text></g></svg>";
    }

    var CL = {
        l1_s1: { skin: "light", hair: "#b9833e", style: "curly", shirt: "#2f6fb3" },
        l1_s2: { skin: "fair", hair: "#e2b04a", style: "long", shirt: "#f59e9e" },
        l1_s3: { skin: "asian", hair: "#1c1917", glasses: 1, shirt: "#0f766e" },
        l1_s4: { skin: "fair", hair: "#cfd3d8", style: "bun", shirt: "#7c3aed" },
        l1_s5: { skin: "fair", hair: "#7a3e1d", beard: 1, shirt: "#374151" },
        l1_s6: { skin: "asian", hair: "#1c1917", style: "long", shirt: "#fb7185" },
        l1_s7: { skin: "tan", hair: "#2b1b12", beard: 1, shirt: "#dc2626" },
        l2_s1: { skin: "fair", hair: "#8a4b24", style: "bun", shirt: "#1e3a8a" },
        l2_s2: { skin: "tan", hair: "#3b2416", style: "long", shirt: "#059669" },
        l2_s3: { skin: "asian", style: "hijab", scarf: "#0e7490", shirt: "#0e7490" },
        l2_s4: { skin: "fair", hair: "#d6a74c", glasses: 1, shirt: "#475569" },
        l2_s5: { skin: "fair", hair: "#7a3e1d", style: "curly", shirt: "#ea580c" },
        l2_s6: { skin: "light", hair: "#e8c15a", style: "long", shirt: "#db2777" },
        l2_s7: { skin: "tan", hair: "#1f130c", style: "curly", shirt: "#16a34a" },
        l3_s1: { skin: "fair", hair: "#d9b86a", beard: 1, shirt: "#1d4ed8" },
        l3_s2: { skin: "brown", hair: "#140c08", style: "long", shirt: "#f59e0b" },
        l3_s3: { skin: "light", hair: "#9ca3af", glasses: 1, shirt: "#92400e" },
        l3_s4: { skin: "light", hair: "#b4742b", glasses: 1, shirt: "#334155" },
        l3_s5: { skin: "light", hair: "#2b1b12", style: "bob", shirt: "#be123c" },
        l3_s6: { skin: "asian", hair: "#1c1917", style: "bun", shirt: "#6366f1" },
        l3_s7: [{ skin: "light", hair: "#9ca3af", beard: 1, shirt: "#0369a1" }, { skin: "fair", hair: "#d6a74c", style: "long", shirt: "#db2777" }]
    };
    function merge(a, b) { var r = {}, k; for (k in a) r[k] = a[k]; for (k in b) r[k] = b[k]; return r; }

    function customer(id, mood, speaking) {
        var d = CL[id] || { skin: "light", shirt: "#3b82f6" };
        if (Array.isArray(d)) {
            return '<div class="char-pair">' + d.map(function (p, i) { return person(merge(p, { mood: mood, speaking: speaking && i === 0, cart: i === 0 })); }).join("") + "</div>";
        }
        return person(merge(d, { mood: mood, speaking: speaking, cart: true }));
    }

    var PGL = {
        line1: { skin: "asian", hair: "#1c1917", style: "bun" },
        line2: { skin: "asian", hair: "#3b2416", style: "long" },
        line3: { skin: "asian", hair: "#2b1b12", style: "bob" }
    };
    function pgLook(lineId, mood, speaking) {
        return person(merge(PGL[lineId] || PGL.line1, { role: "pg", shirt: "#B41F8E", mood: mood, speaking: speaking }));
    }

    window.AEON_CHARS = { person: person, walker: walker, walkerLook: walkerLook, pack: pack, customer: customer, pg: pgLook };
})();