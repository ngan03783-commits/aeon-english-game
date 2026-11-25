// English Farm — Hay Day Isometric Edition (1200x800 SVG). Rich 3D-shaded isometric farm + 8 interactive learning spots.
(function () {
    function rnd(seed) {
        var s = seed;
        return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    }
    function iso(u, v) { return [0.866 * (u - v), 0.5 * (u + v)]; }

    /* ---------- SVG Definitions (Gradients, Patterns, Filters) ---------- */
    function defs() {
        return '<defs>' +
            '<filter id="sh" x="-25%" y="-25%" width="160%" height="160%"><feDropShadow dx="4" dy="7" stdDeviation="3.5" flood-color="#19380c" flood-opacity=".38"/></filter>' +
            '<filter id="softSh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="2" dy="4" stdDeviation="2" flood-color="#19380c" flood-opacity=".28"/></filter>' +
            '<linearGradient id="grassBase" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#84d93e"/><stop offset=".55" stop-color="#6ac12b"/><stop offset="1" stop-color="#55a61c"/></linearGradient>' +
            '<linearGradient id="trunkG" x1="0" x2="1"><stop offset="0" stop-color="#4e2e14"/><stop offset=".45" stop-color="#8f5b2d"/><stop offset="1" stop-color="#462810"/></linearGradient>' +
            '<linearGradient id="soilG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8c5425"/><stop offset=".5" stop-color="#6e3f19"/><stop offset="1" stop-color="#542e10"/></linearGradient>' +
            '<linearGradient id="goldG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff078"/><stop offset=".45" stop-color="#f7b500"/><stop offset="1" stop-color="#b87400"/></linearGradient>' +
            '<linearGradient id="hiveG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe659"/><stop offset=".55" stop-color="#f5a700"/><stop offset="1" stop-color="#c47100"/></linearGradient>' +
            '<linearGradient id="redMetal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5242"/><stop offset=".5" stop-color="#d9261c"/><stop offset="1" stop-color="#8f110b"/></linearGradient>' +
            '<linearGradient id="darkRoof" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#494554"/><stop offset="1" stop-color="#232029"/></linearGradient>' +
            '<radialGradient id="pondG" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#8cf0ff"/><stop offset=".6" stop-color="#2cb5e8"/><stop offset="1" stop-color="#1778a8"/></radialGradient>' +
            '<radialGradient id="sunG" cx="15%" cy="5%" r="85%"><stop offset="0" stop-color="#fff8bf" stop-opacity=".42"/><stop offset="1" stop-color="#fff8bf" stop-opacity="0"/></radialGradient>' +
            '<radialGradient id="vigG" cx="50%" cy="50%" r="76%"><stop offset=".68" stop-color="#0d2b06" stop-opacity="0"/><stop offset="1" stop-color="#0d2b06" stop-opacity=".3"/></radialGradient>' +
            '<pattern id="isoLawn" width="120" height="69.28" patternUnits="userSpaceOnUse">' +
                '<polygon points="60,0 120,34.64 60,69.28 0,34.64" fill="#92e349" opacity=".18"/>' +
            '</pattern>' +
            '<pattern id="chk" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#fff5ee"/><rect width="7" height="7" fill="#e03c31"/><rect x="7" y="7" width="7" height="7" fill="#e03c31"/><rect x="7" width="7" height="7" fill="#f79e98" opacity=".45"/><rect y="7" width="7" height="7" fill="#f79e98" opacity=".45"/></pattern>' +
            '<pattern id="awn" width="20" height="24" patternUnits="userSpaceOnUse"><rect width="20" height="24" fill="#fff8eb"/><rect width="10" height="24" fill="#e03126"/></pattern>' +
            '</defs>';
    }

    /* ---------- Isometric Helper Primitives ---------- */
    function isoPoly(cx, cy, u1, v1, u2, v2, fill, stroke, sw) {
        var p1 = iso(u1, v1), p2 = iso(u2, v1), p3 = iso(u2, v2), p4 = iso(u1, v2);
        return '<polygon points="' +
            (cx + p1[0]).toFixed(1) + ',' + (cy + p1[1]).toFixed(1) + ' ' +
            (cx + p2[0]).toFixed(1) + ',' + (cy + p2[1]).toFixed(1) + ' ' +
            (cx + p3[0]).toFixed(1) + ',' + (cy + p3[1]).toFixed(1) + ' ' +
            (cx + p4[0]).toFixed(1) + ',' + (cy + p4[1]).toFixed(1) +
            '" fill="' + fill + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 1.5) + '"' : '') + ' stroke-linejoin="round"/>';
    }

    // 3D Isometric Box (for hedges, stone blocks, hay bales, troughs)
    function isoBox(cx, cy, u1, v1, u2, v2, h, cTop, cLeft, cRight, stroke) {
        var p1 = iso(u1, v1), p2 = iso(u2, v1), p3 = iso(u2, v2), p4 = iso(u1, v2);
        var x1 = cx + p1[0], y1 = cy + p1[1],
            x2 = cx + p2[0], y2 = cy + p2[1],
            x3 = cx + p3[0], y3 = cy + p3[1],
            x4 = cx + p4[0], y4 = cy + p4[1];
        var st = stroke ? ' stroke="' + stroke + '" stroke-width="1.4" stroke-linejoin="round"' : ' stroke-linejoin="round"';
        // Front-left face: p4 -> p3
        var leftFace = '<polygon points="' + x4.toFixed(1) + ',' + (y4 - h).toFixed(1) + ' ' + x3.toFixed(1) + ',' + (y3 - h).toFixed(1) + ' ' + x3.toFixed(1) + ',' + y3.toFixed(1) + ' ' + x4.toFixed(1) + ',' + y4.toFixed(1) + '" fill="' + cLeft + '"' + st + '/>';
        // Front-right face: p3 -> p2
        var rightFace = '<polygon points="' + x3.toFixed(1) + ',' + (y3 - h).toFixed(1) + ' ' + x2.toFixed(1) + ',' + (y2 - h).toFixed(1) + ' ' + x2.toFixed(1) + ',' + y2.toFixed(1) + ' ' + x3.toFixed(1) + ',' + y3.toFixed(1) + '" fill="' + cRight + '"' + st + '/>';
        // Top face
        var topFace = '<polygon points="' + x1.toFixed(1) + ',' + (y1 - h).toFixed(1) + ' ' + x2.toFixed(1) + ',' + (y2 - h).toFixed(1) + ' ' + x3.toFixed(1) + ',' + (y3 - h).toFixed(1) + ' ' + x4.toFixed(1) + ',' + (y4 - h).toFixed(1) + '" fill="' + cTop + '"' + st + '/>';
        return leftFace + rightFace + topFace;
    }

    // Sculpted 3D Isometric Hedge Segment with yellow/orange tiny flowers (like Hay Day)
    function isoHedgeSeg(cx, cy, u1, v1, u2, v2, h, seed) {
        var r = rnd(seed || 11);
        var o = isoBox(cx, cy, u1, v1, u2, v2, h, "#65c728", "#2d7e12", "#3e9b1b", "#266b0e");
        // Soft highlight strip along top
        o += isoPoly(cx, cy - h, u1 + 3, v1 + 3, u2 - 3, v2 - 3, "#86e23c");
        // Tiny golden blossoms on the hedge
        var count = Math.max(4, Math.round(((u2 - u1) * (v2 - v1)) / 240));
        for (var i = 0; i < count; i++) {
            var u = u1 + 5 + r() * Math.max(4, u2 - u1 - 10);
            var v = v1 + 5 + r() * Math.max(4, v2 - v1 - 10);
            var p = iso(u, v);
            var fx = (cx + p[0]).toFixed(1), fy = (cy + p[1] - h + (r() > 0.65 ? 5 : 0)).toFixed(1);
            o += '<circle cx="' + fx + '" cy="' + fy + '" r="2.8" fill="' + (i % 3 === 0 ? "#fff799" : "#ffcc00") + '" stroke="#cc7a00" stroke-width=".8"/>';
        }
        return '<g filter="url(#softSh)">' + o + '</g>';
    }

    // Hay Day Square Courtyard Boxwood Hedge (hollow square hedge with flowers)
    function isoSquareHedge(cx, cy, size, thick, h, seed) {
        var s = size, t = thick;
        return '<g>' +
            isoHedgeSeg(cx, cy, -s, -s, s, -s + t, h, seed + 1) + // back-right
            isoHedgeSeg(cx, cy, -s, -s + t, -s + t, s - t, h, seed + 2) + // back-left
            isoHedgeSeg(cx, cy, s - t, -s + t, s, s - t, h, seed + 3) + // front-right
            isoHedgeSeg(cx, cy, -s, s - t, s, s, h, seed + 4) + // front-left
            '</g>';
    }

    // Isometric Cobblestone Tile (realistic rounded stepping stones)
    function cobbleTile(cx, cy, u, v, sz, seed) {
        var r = rnd(seed || (u * 31 + v * 17));
        var p = iso(u, v), x = cx + p[0], y = cy + p[1], s = sz || 18, o = "";
        // Base mortar shadow
        o += isoPoly(cx, cy, u - s, v - s, u + s, v + s, "#788272");
        // 4 sub-stones per tile for realistic Hay Day cobblestone texture
        var subs = [[-s * 0.48, -s * 0.48], [s * 0.48, -s * 0.48], [-s * 0.48, s * 0.48], [s * 0.48, s * 0.48]];
        subs.forEach(function (sb, k) {
            var q = iso(u + sb[0], v + sb[1]);
            var tones = ["#c8d1d3", "#b5bfc2", "#d6dedf", "#aeb8bb"];
            var col = tones[(k + Math.floor(r() * 4)) % 4];
            o += '<ellipse cx="' + (cx + q[0]).toFixed(1) + '" cy="' + (cy + q[1] + 2).toFixed(1) + '" rx="10.5" ry="6.2" fill="#6b7477"/>';
            o += '<ellipse cx="' + (cx + q[0]).toFixed(1) + '" cy="' + (cy + q[1]).toFixed(1) + '" rx="10" ry="5.8" fill="' + col + '" stroke="#889296" stroke-width="1.2"/>';
            o += '<ellipse cx="' + (cx + q[0] - 2).toFixed(1) + '" cy="' + (cy + q[1] - 1.5).toFixed(1) + '" rx="5" ry="2.2" fill="#eef3f5" opacity=".55"/>';
        });
        return o;
    }

    // Large Square Stepping Stone Slab (around yellow flowers & top road)
    function stoneSlab(cx, cy, u, v) {
        var o = isoBox(cx, cy, u - 14, v - 14, u + 14, v + 14, 4, "#c6cbc4", "#8b9188", "#9ea49b", "#6e756c");
        o += isoPoly(cx, cy - 4, u - 10, v - 10, u + 10, v + 10, "#d7dcd5");
        return o;
    }

    // Isometric White Picket / Rail Fence
    function fence(x1, y1, x2, y2, n) {
        var dx = (x2 - x1) / n, dy = (y2 - y1) / n, o = "";
        // Ground shadow
        o += '<line x1="' + x1 + '" y1="' + (y1 + 3) + '" x2="' + x2 + '" y2="' + (y2 + 3) + '" stroke="rgba(25,60,10,.28)" stroke-width="6" stroke-linecap="round"/>';
        [-11, -23].forEach(function (h) {
            o += '<line x1="' + x1 + '" y1="' + (y1 + h + 2) + '" x2="' + x2 + '" y2="' + (y2 + h + 2) + '" stroke="#b8c4c8" stroke-width="6.5" stroke-linecap="round"/>';
            o += '<line x1="' + x1 + '" y1="' + (y1 + h) + '" x2="' + x2 + '" y2="' + (y2 + h) + '" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>';
        });
        for (var i = 0; i <= n; i++) {
            var px = (x1 + dx * i).toFixed(1), py = (y1 + dy * i).toFixed(1);
            o += '<path d="M' + (px - 4.5) + ' ' + py + 'V' + (py - 31) + 'L' + px + ' ' + (py - 37) + 'L' + (+px + 4.5) + ' ' + (py - 31) + 'V' + py + 'Z" fill="#fff" stroke="#b4c0c4" stroke-width="1.6"/>';
        }
        return "<g>" + o + "</g>";
    }

    // Brown Wooden Corral Fence (for horse/cow pasture on far right)
    function brownFence(x1, y1, x2, y2, n) {
        var dx = (x2 - x1) / n, dy = (y2 - y1) / n, o = "";
        [-12, -24].forEach(function (h) {
            o += '<line x1="' + x1 + '" y1="' + (y1 + h) + '" x2="' + x2 + '" y2="' + (y2 + h) + '" stroke="#6b3e1b" stroke-width="7" stroke-linecap="round"/>';
            o += '<line x1="' + x1 + '" y1="' + (y1 + h - 1) + '" x2="' + x2 + '" y2="' + (y2 + h - 1) + '" stroke="#9e602e" stroke-width="4" stroke-linecap="round"/>';
        });
        for (var i = 0; i <= n; i++) {
            var px = (x1 + dx * i - 4).toFixed(1), py = (y1 + dy * i - 34).toFixed(1);
            o += '<rect x="' + px + '" y="' + py + '" width="8" height="35" rx="2.5" fill="#8c5223" stroke="#542e10" stroke-width="1.8"/>';
        }
        return "<g>" + o + "</g>";
    }

    // 3D Stone Wall Segment (upper right of Hay Day map)
    function stoneWall(cx, cy, u1, v1, u2, v2) {
        var o = isoBox(cx, cy, u1, v1, u2, v2, 26, "#d2d7da", "#8e969b", "#adb5ba", "#5f676c");
        // Individual stone block lines
        var steps = Math.max(2, Math.round(Math.max(u2 - u1, v2 - v1) / 24));
        for (var i = 0; i < steps; i++) {
            var u = u1 + (u2 - u1) * (i / steps), v = v1 + (v2 - v1) * (i / steps);
            var p = iso(u, v);
            o += '<ellipse cx="' + (cx + p[0]).toFixed(1) + '" cy="' + (cy + p[1] - 26).toFixed(1) + '" rx="9" ry="5" fill="#e3e7e9" stroke="#7c8489" stroke-width="1.2"/>';
            o += '<circle cx="' + (cx + p[0] + 3).toFixed(1) + '" cy="' + (cy + p[1] - 12).toFixed(1) + '" r="5.5" fill="#9ea7ac" stroke="#687075" stroke-width="1.1"/>';
        }
        return '<g filter="url(#softSh)">' + o + '</g>';
    }

    /* ---------- Iconic Hay Day Props & Buildings ---------- */
    // 1. Order Board (top-left beside the dirt road, with pinned checklists & green checkmarks)
    function orderBoard(x, y) {
        var notes = "";
        [[-24, -56], [-4, -58], [16, -55], [-20, -34], [2, -36], [20, -34]].forEach(function (p) {
            notes += '<g transform="translate(' + p[0] + ' ' + p[1] + ')">' +
                '<rect x="-8" y="-9" width="16" height="18" rx="2" fill="#fff8e1" stroke="#b5925b" stroke-width="1.2"/>' +
                '<circle cx="0" cy="-6" r="1.8" fill="#d93829"/>' +
                '<path d="M-4 1l3 3l6 -6" fill="none" stroke="#2ca02c" stroke-width="2.2" stroke-linecap="round"/>' +
                '</g>';
        });
        return '<g transform="translate(' + x + ' ' + y + ') rotate(-14)">' +
            '<ellipse cx="0" cy="10" rx="44" ry="9" fill="rgba(20,50,10,.3)"/>' +
            '<rect x="-34" y="-22" width="9" height="32" rx="2" fill="#6b3e1b" stroke="#42240d" stroke-width="2"/>' +
            '<rect x="25" y="-22" width="9" height="32" rx="2" fill="#6b3e1b" stroke="#42240d" stroke-width="2"/>' +
            '<rect x="-42" y="-74" width="84" height="56" rx="6" fill="#a8652c" stroke="#542e10" stroke-width="3.5"/>' +
            '<rect x="-36" y="-68" width="72" height="44" rx="4" fill="#7a4519" stroke="#c9884a" stroke-width="2"/>' +
            '<path d="M-46 -72L0 -86L46 -72Z" fill="#6b3e1b" stroke="#42240d" stroke-width="2.5"/>' +
            notes + '</g>';
    }

    // 2. Vintage Red & Green Farm Delivery Truck on the Dirt Road
    function deliveryTruck(x, y) {
        return '<g transform="translate(' + x + ' ' + y + ') rotate(-27)">' +
            '<ellipse cx="2" cy="26" rx="68" ry="15" fill="rgba(30,25,15,.35)"/>' +
            // Dark green cargo bed with yellow slatted rails
            '<rect x="-64" y="-24" width="70" height="38" rx="4" fill="#1e6b34" stroke="#10421e" stroke-width="3"/>' +
            '<rect x="-60" y="-34" width="62" height="14" rx="3" fill="#298542" stroke="#10421e" stroke-width="2.5"/>' +
            '<line x1="-58" y1="-27" x2="0" y2="-27" stroke="#f5c43d" stroke-width="3"/>' +
            '<line x1="-58" y1="-8" x2="2" y2="-8" stroke="#f5c43d" stroke-width="3"/>' +
            // Red cab & rounded hood
            '<path d="M4 -28H34C40 -28 44 -22 46 -12L64 -8C70 -6 72 0 72 12H4Z" fill="url(#redMetal)" stroke="#7a100b" stroke-width="3"/>' +
            '<rect x="12" y="-22" width="22" height="14" rx="3" fill="#bfeaff" stroke="#7a100b" stroke-width="2"/>' +
            '<rect x="66" y="-5" width="5" height="14" rx="2" fill="#ffe680" stroke="#8a5a00" stroke-width="1.5"/>' +
            // Mudguards & Wheels
            '<path d="M-48 16A16 16 0 0 1 -16 16" fill="#191919" stroke="#000" stroke-width="2"/>' +
            '<path d="M32 16A16 16 0 0 1 64 16" fill="#9e1610" stroke="#5e0b07" stroke-width="2"/>' +
            '<circle cx="-32" cy="18" r="13" fill="#262626" stroke="#111" stroke-width="2.5"/><circle cx="-32" cy="18" r="6" fill="#f2b705"/>' +
            '<circle cx="48" cy="18" r="13" fill="#262626" stroke="#111" stroke-width="2.5"/><circle cx="48" cy="18" r="6" fill="#f2b705"/>' +
            '<circle class="smoke" cx="-68" cy="10" r="6" fill="#fff" opacity=".65"/>' +
            '</g>';
    }

    // 3. Golden Horse Statue Streetlamp (left cobblestone courtyard)
    function goldenHorseStatue(x, y) {
        return '<g transform="translate(' + x + ' ' + y + ')">' +
            '<ellipse cx="0" cy="16" rx="36" ry="12" fill="rgba(20,50,10,.32)"/>' +
            // 3D Stepped Golden Pedestal
            isoBox(0, 12, -22, -22, 22, 22, 10, "#ffe45c", "#c98a00", "#e6a800", "#8c5c00") +
            isoBox(0, 2, -16, -16, 16, 16, 14, "#ffeb7a", "#d49400", "#f0b400", "#8c5c00") +
            isoBox(0, -12, -11, -11, 11, 11, 22, "#fff29e", "#dca000", "#f7c000", "#8c5c00") +
            // Vintage Lamp Post rising from pedestal
            '<rect x="-3.5" y="-115" width="7" height="85" rx="3" fill="#2b2d38" stroke="#14151c" stroke-width="1.5"/>' +
            '<circle cx="0" cy="-76" r="5.5" fill="#ffd43b" stroke="#9e6c00" stroke-width="1.5"/>' +
            // Twin lanterns at top
            '<path d="M-20 -106Q0 -120 20 -106" fill="none" stroke="#2b2d38" stroke-width="4" stroke-linecap="round"/>' +
            '<rect x="-26" y="-122" width="12" height="16" rx="3" fill="#fff3a1" stroke="#2b2d38" stroke-width="2.2"/>' +
            '<path d="M-29 -122L-20 -131L-11 -122Z" fill="#2b2d38"/>' +
            '<rect x="14" y="-122" width="12" height="16" rx="3" fill="#fff3a1" stroke="#2b2d38" stroke-width="2.2"/>' +
            '<path d="M11 -122L20 -131L29 -122Z" fill="#2b2d38"/>' +
            // Golden rearing horse with top hat & umbrella
            '<path d="M0 -34C10 -36 18 -46 16 -58C15 -66 24 -74 28 -70C32 -66 24 -56 21 -50C25 -42 20 -30 8 -28Z" fill="url(#goldG)" stroke="#8c5800" stroke-width="2"/>' +
            '<ellipse cx="8" cy="-46" rx="11" ry="16" transform="rotate(-20 8 -46)" fill="url(#goldG)" stroke="#8c5800" stroke-width="2"/>' +
            '<path d="M12 -64C14 -76 26 -82 32 -75C34 -71 27 -66 22 -64Z" fill="url(#goldG)" stroke="#8c5800" stroke-width="2"/>' +
            // Top hat on horse
            '<rect x="14" y="-88" width="13" height="10" rx="2" fill="#232530"/><ellipse cx="20" cy="-78" rx="10" ry="3" fill="#232530"/>' +
            // Black umbrella held by horse
            '<line x1="25" y1="-55" x2="36" y2="-32" stroke="#232530" stroke-width="3" stroke-linecap="round"/>' +
            '</g>';
    }

    // 4. Red Popcorn / Snack Cart (bottom-left cobblestone plaza)
    function redSnackCart(x, y) {
        return '<g transform="translate(' + x + ' ' + y + ')">' +
            '<ellipse cx="0" cy="36" rx="52" ry="14" fill="rgba(20,50,10,.32)"/>' +
            // Cart body (3D isometric red box)
            isoBox(0, 26, -30, -20, 30, 20, 36, "#f5d7a1", "#b81d13", "#e02b20", "#6e0e08") +
            // Glass display cabinet
            isoBox(0, -10, -26, -16, 26, 16, 26, "#782b1a", "rgba(210,245,255,.55)", "rgba(180,235,255,.45)", "#5e2112") +
            // Popcorn / snacks inside
            '<circle cx="-8" cy="-18" r="5" fill="#ffd43b"/><circle cx="0" cy="-20" r="6" fill="#ffe066"/><circle cx="9" cy="-17" r="5" fill="#fcc419"/>' +
            // Striped Awning Roof + Gold Star Crest
            '<path d="M-44 -34L0 -56L44 -34L32 -16L-32 -16Z" fill="url(#awn)" stroke="#6e0e08" stroke-width="2.5"/>' +
            '<circle cx="0" cy="-42" r="11" fill="#ffd43b" stroke="#8c5800" stroke-width="2"/>' +
            '<text x="0" y="-38" font-size="13" text-anchor="middle">⭐</text>' +
            // Spoked Wheel
            '<circle cx="14" cy="28" r="14" fill="#542e10" stroke="#2b1706" stroke-width="2.5"/>' +
            '<circle cx="14" cy="28" r="10" fill="none" stroke="#f5c43d" stroke-width="2.5"/>' +
            '<circle cx="14" cy="28" r="4" fill="#f5c43d"/>' +
            // Cute Cafe Table & 2 Green Chairs beside cart
            '<g transform="translate(-14 68)">' +
                '<ellipse cx="0" cy="14" rx="28" ry="9" fill="rgba(20,50,10,.22)"/>' +
                '<rect x="-24" y="-8" width="12" height="14" rx="3" fill="#7ec832" stroke="#3c7310" stroke-width="1.8"/>' +
                '<rect x="14" y="-6" width="12" height="14" rx="3" fill="#7ec832" stroke="#3c7310" stroke-width="1.8"/>' +
                '<rect x="-2.5" y="0" width="5" height="14" fill="#6b3e1b"/>' +
                '<ellipse cx="0" cy="-2" rx="15" ry="8" fill="#c77d38" stroke="#6b3e1b" stroke-width="2"/>' +
            '</g>' +
            '</g>';
    }

    // 5. Isometric Checkered Picnic Table
    function picnicTable(x, y) {
        return '<g transform="translate(' + x + ' ' + y + ')">' +
            '<ellipse cx="0" cy="20" rx="46" ry="14" fill="rgba(20,50,10,.28)"/>' +
            // Benches
            isoBox(0, 18, -28, 16, 28, 25, 8, "#c97a36", "#7a4417", "#9e5b22", "#4f2b0d") +
            isoBox(0, 8, -28, -25, 28, -16, 8, "#c97a36", "#7a4417", "#9e5b22", "#4f2b0d") +
            // Wooden table base
            isoBox(0, 14, -24, -12, 24, 12, 15, "#a65e24", "#6b3a12", "#874b1a", "#472509") +
            // Red-and-white checkered tablecloth overhang
            isoBox(0, -1, -28, -16, 28, 16, 5, "url(#chk)", "#b8251d", "#d93229", "#7a140e") +
            '</g>';
    }

    // 6. Ice Cream Stand with Red-Yellow Umbrella & Golden Honey Extractor Barrel
    function honeyAndIceCream(x, y) {
        return '<g transform="translate(' + x + ' ' + y + ')">' +
            // Ice Cream Maker Stand (left)
            '<g transform="translate(-52 38)">' +
                '<ellipse cx="0" cy="22" rx="38" ry="12" fill="rgba(20,50,10,.28)"/>' +
                isoBox(0, 18, -22, -16, 22, 16, 26, "#e8f4f8", "#b0c8d4", "#cde2ec", "#688290") +
                '<text x="-6" y="6" font-size="14" text-anchor="middle">⭐</text>' +
                // Wooden Ice Barrel & Waffle Cones
                '<ellipse cx="16" cy="4" rx="12" ry="14" fill="#9e5b22" stroke="#542e10" stroke-width="2"/>' +
                '<ellipse cx="16" cy="-6" rx="10" ry="5" fill="#fff"/>' +
                '<path d="M-14 -12L-10 -28L-6 -12Z" fill="#d99b4e" stroke="#7a4e18" stroke-width="1.5"/>' +
                '<path d="M-4 -12L0 -28L4 -12Z" fill="#d99b4e" stroke="#7a4e18" stroke-width="1.5"/>' +
                // Red & Yellow Beach Umbrella
                '<line x1="6" y1="-10" x2="14" y2="-66" stroke="#e0dcd3" stroke-width="4" stroke-linecap="round"/>' +
                '<path d="M-34 -56Q14 -92 58 -48Z" fill="#e62e25" stroke="#8a140e" stroke-width="2.2"/>' +
                '<path d="M-12 -61Q14 -88 36 -52Z" fill="#ffd426" stroke="#b58900" stroke-width="1.8"/>' +
            '</g>' +
            // Golden Honey Extractor Barrel (right)
            '<g transform="translate(36 -8)">' +
                '<ellipse cx="0" cy="24" rx="40" ry="12" fill="rgba(20,50,10,.3)"/>' +
                isoBox(0, 20, -24, -18, 24, 18, 8, "#9e5b22", "#5e3410", "#7a4417", "#3d2008") +
                '<ellipse cx="0" cy="-6" rx="28" ry="22" fill="url(#hiveG)" stroke="#7a4410" stroke-width="2.8"/>' +
                '<ellipse cx="-14" cy="-6" rx="10" ry="18" fill="#e6dcce" stroke="#7a4410" stroke-width="2.2"/>' +
                '<circle cx="-14" cy="-6" r="3.5" fill="#5e3410"/>' +
                '<line x1="-14" y1="-22" x2="-14" y2="10" stroke="#7a4410" stroke-width="2.5"/>' +
                '<line x1="-22" y1="-6" x2="-6" y2="-6" stroke="#7a4410" stroke-width="2.5"/>' +
                '<circle cx="6" cy="-14" r="8" fill="#d92b20" stroke="#fff" stroke-width="1.5"/>' +
                '<text x="6" y="-10" font-size="10" text-anchor="middle">⭐</text>' +
                // Spout & Honey Bucket
                '<path d="M16 2H26V10" fill="none" stroke="#8c969e" stroke-width="4.5" stroke-linecap="round"/>' +
                '<ellipse cx="26" cy="20" rx="9" ry="7" fill="#a65e24" stroke="#542e10" stroke-width="1.8"/>' +
                '<ellipse cx="26" cy="16" rx="7" ry="3.5" fill="#ffc400"/>' +
            '</g>' +
            '</g>';
    }

    // 7. Pink Tailor / Sewing Table (bottom-left)
    function sewingTable(x, y) {
        return '<g transform="translate(' + x + ' ' + y + ')">' +
            '<ellipse cx="0" cy="24" rx="52" ry="16" fill="rgba(20,50,10,.3)"/>' +
            '<ellipse cx="0" cy="14" rx="42" ry="20" fill="#d45087" stroke="#8a2450" stroke-width="2.5"/>' +
            '<ellipse cx="0" cy="4" rx="44" ry="20" fill="#ff94c2" stroke="#a63264" stroke-width="2.5"/>' +
            '<ellipse cx="0" cy="1" rx="34" ry="14" fill="#ffd6e7"/>' +
            // Sewing machine, lamp & hat
            '<path d="M-12 0V-16H6V-6" fill="none" stroke="#2d7ea8" stroke-width="5" stroke-linecap="round"/>' +
            '<ellipse cx="22" cy="-2" rx="12" ry="6" fill="#f5d372" stroke="#b5892e" stroke-width="1.8"/>' +
            '<ellipse cx="22" cy="-4" rx="7" ry="4" fill="#ffe699"/>' +
            '<path d="M-6 -14Q4 -36 18 -26" fill="none" stroke="#555" stroke-width="3"/>' +
            '<path d="M12 -32L26 -24L14 -18Z" fill="#4aa8d8" stroke="#1d5b7a" stroke-width="1.8"/>' +
            '</g>';
    }

    // 8. Vintage Blue-Glass Streetlamp with Flower Garland
    function streetLamp(x, y) {
        return '<g transform="translate(' + x + ' ' + y + ')">' +
            '<ellipse cx="0" cy="2" rx="12" ry="5" fill="rgba(20,50,10,.3)"/>' +
            '<path d="M-7 2L-4 -10H4L7 2Z" fill="#23495c" stroke="#122833" stroke-width="1.8"/>' +
            '<rect x="-2.5" y="-68" width="5" height="60" fill="#23495c"/>' +
            // Flower garland on lamp post
            '<circle cx="-3" cy="-24" r="3.5" fill="#ff6b6b"/><circle cx="3" cy="-28" r="3.5" fill="#ffd43b"/><circle cx="-2" cy="-33" r="3" fill="#ff922b"/>' +
            // Blue lantern head
            '<path d="M-11 -68L-14 -84H14L11 -68Z" fill="rgba(135,215,250,.75)" stroke="#1b3b4a" stroke-width="2"/>' +
            '<circle cx="0" cy="-75" r="4.5" fill="#fff3a1"/>' +
            '<path d="M-17 -84L0 -98L17 -84Z" fill="#2a5c75" stroke="#122833" stroke-width="2"/>' +
            '</g>';
    }

    // 9. Stacked 3D Golden Hay Bales & Barrels (top-right by the stone wall)
    function hayAndBarrels(x, y) {
        function bale(bx, by) {
            return '<g transform="translate(' + bx + ' ' + by + ')">' +
                isoBox(0, 0, -18, -12, 18, 12, 16, "#ffe047", "#c98a00", "#e6a800", "#8a5a00") +
                '<line x1="-10" y1="-16" x2="8" y2="-6" stroke="#9e6600" stroke-width="2"/>' +
                '<line x1="-4" y1="-19" x2="14" y2="-9" stroke="#9e6600" stroke-width="2"/>' +
                '</g>';
        }
        function barrel(bx, by) {
            return '<g transform="translate(' + bx + ' ' + by + ')">' +
                '<ellipse cx="0" cy="2" rx="14" ry="6" fill="rgba(0,0,0,.25)"/>' +
                '<rect x="-12" y="-24" width="24" height="24" rx="7" fill="#9c5a25" stroke="#4f2a0d" stroke-width="2"/>' +
                '<line x1="-12" y1="-17" x2="12" y2="-17" stroke="#4a4e52" stroke-width="2.5"/>' +
                '<line x1="-12" y1="-7" x2="12" y2="-7" stroke="#4a4e52" stroke-width="2.5"/>' +
                '<ellipse cx="0" cy="-23" rx="10" ry="4.5" fill="#b86f34" stroke="#4f2a0d" stroke-width="1.8"/>' +
                '</g>';
        }
        return '<g transform="translate(' + x + ' ' + y + ')">' +
            barrel(-18, -75) + barrel(8, -85) + barrel(34, -73) +
            bale(-24, 15) + bale(12, 28) + bale(-6, -2) + bale(38, 12) +
            '</g>';
    }

    // 10. Pet Cushions Area with Puppy & Kitten (top-center)
    function petArea(x, y) {
        return '<g transform="translate(' + x + ' ' + y + ')">' +
            // Red pet bed
            '<ellipse cx="26" cy="-18" rx="28" ry="15" fill="#d93229" stroke="#8a1711" stroke-width="2.5"/>' +
            '<ellipse cx="26" cy="-18" rx="20" ry="10" fill="#68b8d8"/>' +
            // Yellow pet bed
            '<ellipse cx="-32" cy="14" rx="28" ry="15" fill="#e03126" stroke="#8a1711" stroke-width="2.5"/>' +
            '<ellipse cx="-32" cy="14" rx="20" ry="10" fill="#ffd426"/>' +
            // Food bowls
            '<ellipse cx="2" cy="18" rx="7" ry="4" fill="#ff7eb3" stroke="#9e2b5c" stroke-width="1.5"/>' +
            '<ellipse cx="-16" cy="-22" rx="7" ry="4" fill="#d93229" stroke="#7a140e" stroke-width="1.5"/>' +
            // Playful puppy & kitten
            '<text x="12" y="36" font-size="22">🐕</text>' +
            '<text x="64" y="-2" font-size="20">🐈</text>' +
            '</g>';
    }

    // 11. Striped Deck Chairs under Beehive Tree
    function deckChairs(x, y) {
        function chair(cx, cy) {
            return '<g transform="translate(' + cx + ' ' + cy + ')">' +
                '<ellipse cx="0" cy="14" rx="18" ry="6" fill="rgba(20,50,10,.25)"/>' +
                '<path d="M-12 12L4 -18M12 12L-4 -18" stroke="#7a4417" stroke-width="3" stroke-linecap="round"/>' +
                '<path d="M-10 -16L8 -16L14 8L-4 8Z" fill="#2b7de0" stroke="#7a4417" stroke-width="2"/>' +
                '<path d="M-6 -16L0 -16L6 8L0 8Z" fill="#fff"/>' +
                '</g>';
        }
        return '<g transform="translate(' + x + ' ' + y + ')">' + chair(0, 0) + chair(36, 16) + '</g>';
    }

    // 12. Detailed Red Farm Tractor (right side behind sheep pasture)
    function redTractor(x, y) {
        return '<g transform="translate(' + x + ' ' + y + ')">' +
            '<ellipse cx="0" cy="36" rx="58" ry="16" fill="rgba(20,50,10,.35)"/>' +
            // Rear left wheel (behind body)
            '<ellipse cx="22" cy="-2" rx="18" ry="22" fill="#1f1f1f" stroke="#0d0d0d" stroke-width="3"/>' +
            '<ellipse cx="22" cy="-2" rx="9" ry="11" fill="#e6392c"/>' +
            // Red Engine Body & Hood (angled down-left like screenshot)
            isoBox(-6, 18, -32, -14, 22, 14, 24, "#ff4d3d", "#b31910", "#d9261c", "#6e0d07") +
            // Seat & Steering wheel & Exhaust pipe
            '<path d="M12 -14C12 -24 26 -24 26 -14Z" fill="#333" stroke="#111" stroke-width="2"/>' +
            '<line x1="2" y1="-8" x2="10" y2="-22" stroke="#222" stroke-width="3"/><ellipse cx="10" cy="-23" rx="7" ry="3.5" fill="none" stroke="#222" stroke-width="2.5"/>' +
            '<rect x="-20" y="-34" width="5" height="22" rx="2" fill="#444" stroke="#111" stroke-width="1.5"/>' +
            // Bouquet of white flowers on tractor back
            '<circle cx="16" cy="-16" r="10" fill="#4ead33"/><circle cx="13" cy="-19" r="3.5" fill="#fff"/><circle cx="20" cy="-17" r="3.5" fill="#fff"/><circle cx="16" cy="-13" r="3.5" fill="#fff899"/>' +
            // Big Rear Right Tire (foreground)
            '<ellipse cx="28" cy="14" rx="20" ry="24" fill="#242424" stroke="#0d0d0d" stroke-width="3.5"/>' +
            '<ellipse cx="28" cy="14" rx="11" ry="13" fill="#e02b20" stroke="#ffb700" stroke-width="2.5"/>' +
            '<circle cx="28" cy="14" r="4.5" fill="#ffd43b"/>' +
            // Front Wheels
            '<ellipse cx="-38" cy="16" rx="11" ry="14" fill="#242424" stroke="#0d0d0d" stroke-width="3"/>' +
            '<ellipse cx="-38" cy="16" rx="5.5" ry="7" fill="#e02b20"/>' +
            '<ellipse cx="-18" cy="30" rx="12" ry="15" fill="#242424" stroke="#0d0d0d" stroke-width="3"/>' +
            '<ellipse cx="-18" cy="30" rx="6" ry="7.5" fill="#e02b20" stroke="#ffd43b" stroke-width="1.5"/>' +
            '</g>';
    }

    // 13. White Garden Arch Bridge & Lotus Pond (bottom right)
    function bridgeAndPond(x, y) {
        return '<g transform="translate(' + x + ' ' + y + ')">' +
            // Pond at bottom right
            '<g transform="translate(155 20)">' +
                '<ellipse rx="95" ry="38" fill="#5fb878" stroke="#3d8c54" stroke-width="4"/>' +
                '<ellipse rx="86" ry="32" fill="url(#pondG)"/>' +
                '<ellipse class="rip" rx="34" ry="12" cx="-18" cy="2" fill="none" stroke="#fff" stroke-width="1.8" opacity=".65"/>' +
                '<ellipse cx="-38" cy="8" rx="13" ry="5.5" fill="#46a832"/><circle cx="-36" cy="5" r="4" fill="#ff85b3"/>' +
                '<ellipse cx="28" cy="-6" rx="12" ry="5" fill="#46a832"/><circle cx="30" cy="-9" r="3.5" fill="#ff9ec4"/>' +
            '</g>' +
            // White Wooden Arch Bridge
            '<g transform="translate(0 -6) rotate(-18)">' +
                '<ellipse cx="0" cy="18" rx="54" ry="12" fill="rgba(20,50,10,.28)"/>' +
                '<path d="M-46 12Q0 -16 46 12L38 22Q0 -4 -38 22Z" fill="#e8eef2" stroke="#9aa6ad" stroke-width="2.5"/>' +
                '<path d="M-44 -10Q0 -38 44 -10" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>' +
                '<line x1="-34" y1="4" x2="-34" y2="-16" stroke="#fff" stroke-width="4"/>' +
                '<line x1="-12" y1="-4" x2="-12" y2="-24" stroke="#fff" stroke-width="4"/>' +
                '<line x1="12" y1="-4" x2="12" y2="-24" stroke="#fff" stroke-width="4"/>' +
                '<line x1="34" y1="4" x2="34" y2="-16" stroke="#fff" stroke-width="4"/>' +
            '</g>' +
            '</g>';
    }

    // 14. Cypress Topiary Cones & Lavender Bushes (bottom center garden)
    function cypressAndFlowers(x, y) {
        var o = "";
        [[0, 0], [34, -18], [68, -36]].forEach(function (p) {
            o += '<g transform="translate(' + (x + p[0]) + ' ' + (y + p[1]) + ')">' +
                '<ellipse cx="0" cy="4" rx="14" ry="6" fill="rgba(20,50,10,.3)"/>' +
                '<path d="M-13 0Q-14 -34 0 -64Q14 -34 13 0Z" fill="#266e1c" stroke="#164710" stroke-width="2"/>' +
                '<path d="M-8 -4Q-9 -32 0 -58Q5 -32 3 -4Z" fill="#3e962d" opacity=".75"/>' +
                '</g>';
        });
        // Purple lavender spikes
        for (var i = 0; i < 16; i++) {
            var lx = x - 30 + i * 7, ly = y + 26 - (i % 3) * 6;
            o += '<ellipse cx="' + lx + '" cy="' + ly + '" rx="3.2" ry="8" fill="' + (i % 2 ? "#9b72cf" : "#b892ff") + '"/>';
        }
        return o;
    }

    /* ---------- Grass, Cobblestone Plaza, Dirt Road & Static Scenery ---------- */
    function grassAndRoads() {
        var r = rnd(42), i, o = "";
        // Base sunlit grass + isometric mowed diamond pattern
        o += '<rect width="1200" height="800" fill="url(#grassBase)"/>';
        o += '<rect width="1200" height="800" fill="url(#isoLawn)"/>';
        for (i = 0; i < 28; i++) {
            o += '<ellipse cx="' + (r() * 1200).toFixed(0) + '" cy="' + (r() * 800).toFixed(0) + '" rx="' + (55 + r() * 110).toFixed(0) + '" ry="' + (25 + r() * 45).toFixed(0) + '" fill="#9be84e" opacity=".32"/>';
        }

        // Top-Left Diagonal Terracotta Dirt Road (like Hay Day screenshot)
        o += '<path d="M-40 365L495 45" stroke="#7a3e18" stroke-width="116" stroke-linecap="round"/>';
        o += '<path d="M-40 365L495 45" stroke="#ba6830" stroke-width="102" stroke-linecap="round"/>';
        o += '<path d="M-40 365L495 45" stroke="#cf7b3e" stroke-width="76" stroke-linecap="round"/>';
        // Wheel tracks along the dirt road
        o += '<path d="M-40 352L495 32" stroke="#9e5322" stroke-width="6" stroke-dasharray="28 12" opacity=".6"/>';
        o += '<path d="M-40 378L495 58" stroke="#9e5322" stroke-width="6" stroke-dasharray="28 12" opacity=".6"/>';

        // Isometric Cobblestone Paths around the Left Plaza & Hedges
        var cobbles = [
            // Main cobblestone avenue from dirt road down-right
            [-4, -2], [-3, -2], [-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2], [3, -2], [4, -2],
            [-4, -1], [0, -1], [4, -1],
            [-4, 0],  [0, 0],  [4, 0],
            [-4, 1],  [-3, 1], [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1],
            [0, 2], [0, 3], [0, 4], [0, 5],
            [1, 5], [2, 5], [3, 5], [4, 5]
        ];
        cobbles.forEach(function (c, idx) {
            o += cobbleTile(250, 485, c[0] * 34, c[1] * 34, 17, idx + 10);
        });

        // Stepping Stone Slabs around central yellow nectar garden
        [[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [-2, 1], [2, 1], [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2]].forEach(function (s) {
            o += stoneSlab(645, 560, s[0] * 30, s[1] * 30);
        });

        // Fine grass tufts & tiny wildflowers across the lawn
        for (i = 0; i < 180; i++) {
            var gx = (r() * 1180).toFixed(0), gy = (r() * 780).toFixed(0);
            o += '<path d="M' + gx + ' ' + gy + 'l-3 -8M' + gx + ' ' + gy + 'v-10M' + gx + ' ' + gy + 'l3 -8" stroke="' + (i % 2 ? "#428f18" : "#a8f056") + '" stroke-width="1.8" stroke-linecap="round" opacity=".68"/>';
        }
        return o;
    }

    function topFarmhouses() {
        // White Farmhouse Porch at top-center & stone bakery at top-right (matching edges of screenshot)
        return '<g filter="url(#sh)">' +
            // Top-center white porch
            '<g transform="translate(465 25)">' +
                isoBox(0, 20, -55, -28, 55, 28, 12, "#d9dedb", "#969e9a", "#b3bab6", "#646b67") +
                isoBox(0, 8, -46, -22, 46, 22, 36, "#ffffff", "#d9e0dc", "#eef2f0", "#7c8580") +
                '<rect x="-26" y="-22" width="16" height="22" rx="2" fill="#6b3e1b" stroke="#fff" stroke-width="2"/>' +
                '<rect x="10" y="-22" width="16" height="22" rx="2" fill="#6b3e1b" stroke="#fff" stroke-width="2"/>' +
            '</g>' +
            // Top-right house wall
            '<g transform="translate(825 22)">' +
                isoBox(0, 22, -48, -28, 48, 28, 42, "#f5e1c8", "#c9ab88", "#e3c7a6", "#7a5c3c") +
                '<path d="M-64 -16L0 -48L64 -16Z" fill="#a64b2a" stroke="#5e2510" stroke-width="3"/>' +
            '</g>' +
            '</g>';
    }

    function yellowNectarGarden(x, y) {
        var r = rnd(99), o = '<g transform="translate(' + x + ' ' + y + ')">';
        for (var row = -1; row <= 1; row++) {
            for (var col = -2; col <= 2; col++) {
                var p = iso(col * 20, row * 18);
                var bx = p[0], by = p[1];
                o += '<circle cx="' + bx.toFixed(1) + '" cy="' + (by + 4).toFixed(1) + '" r="13" fill="#2e7d16"/>';
                o += '<circle cx="' + bx.toFixed(1) + '" cy="' + by.toFixed(1) + '" r="12" fill="#4eb022"/>';
                for (var f = 0; f < 5; f++) {
                    var fx = bx + (r() - 0.5) * 14, fy = by - 3 + (r() - 0.5) * 10;
                    o += '<circle cx="' + fx.toFixed(1) + '" cy="' + fy.toFixed(1) + '" r="4.2" fill="#ffd400" stroke="#cc8400" stroke-width="1"/>';
                    o += '<circle cx="' + fx.toFixed(1) + '" cy="' + fy.toFixed(1) + '" r="1.5" fill="#9e4f00"/>';
                }
            }
        }
        return o + '</g>';
    }

    function horseCorralRight() {
        return '<g>' +
            brownFence(1040, 275, 1185, 205, 5) +
            brownFence(1040, 275, 1190, 365, 5) +
            // Cute Horse & Cow inside the right wooden corral
            '<g transform="translate(1122 292)">' +
                '<ellipse cx="0" cy="24" rx="24" ry="8" fill="rgba(20,50,10,.3)"/>' +
                '<ellipse cx="6" cy="8" rx="20" ry="13" fill="#b87333" stroke="#6e3f14" stroke-width="2"/>' +
                '<path d="M-8 4C-14 -14 -8 -24 0 -22C6 -20 4 -4 0 6Z" fill="#b87333" stroke="#6e3f14" stroke-width="2"/>' +
                '<ellipse cx="-12" cy="-16" rx="10" ry="7" fill="#c98442" stroke="#6e3f14" stroke-width="2"/>' +
                '<ellipse cx="-17" cy="-14" rx="5" ry="4" fill="#f5d1b0"/>' +
                '<circle cx="-11" cy="-19" r="2" fill="#111"/>' +
                '<path d="M-6 -24L-3 -31L1 -23M0 -23L4 -30L6 -21" fill="#8a4f1d"/>' +
            '</g>' +
            '</g>';
    }

    function stat() {
        return defs() +
            grassAndRoads() +
            topFarmhouses() +
            orderBoard(228, 76) +
            petArea(575, 128) +
            // White fences matching screenshot
            fence(445, 195, 560, 260, 5) +
            fence(475, 480, 625, 565, 6) +
            fence(720, 410, 885, 505, 7) +
            // 3D Gray Stone Wall & Golden Hay Bales in top-right
            stoneWall(890, 115, -95, -14, 95, 14) +
            stoneWall(890, 115, -95, 14, -70, 85) +
            hayAndBarrels(825, 215) +
            // Sculpted 3D Square Boxwood Hedges on left cobblestone plaza
            isoSquareHedge(70, 148, 42, 14, 18, 10) +
            isoSquareHedge(295, 315, 44, 14, 20, 20) +
            isoSquareHedge(335, 520, 44, 14, 20, 30) +
            isoHedgeSeg(195, 608, -26, -12, 26, 12, 18, 44) +
            // Delivery Truck on dirt road
            '<g filter="url(#sh)">' +
                deliveryTruck(245, 195) +
                goldenHorseStatue(182, 398) +
                redSnackCart(88, 525) +
                picnicTable(235, 682) +
                picnicTable(332, 624) +
                honeyAndIceCream(515, 505) +
                sewingTable(415, 742) +
                deckChairs(742, 468) +
                redTractor(1062, 448) +
            '</g>' +
            yellowNectarGarden(645, 556) +
            horseCorralRight() +
            cypressAndFlowers(620, 725) +
            bridgeAndPond(755, 760) +
            // Vintage Blue-Glass Streetlamps
            streetLamp(315, 245) +
            streetLamp(242, 515) +
            streetLamp(472, 668) +
            streetLamp(765, 720);
    }

    /* ---------- 8 Interactive Hay Day Learning Spots ---------- */
    // Exact indices matching FARM_DATA.crops:
    // 0: Apple Orchard, 1: Beehive Tree, 2: Pumpkin Patch, 3: Carrot Field,
    // 4: Coffee Kiosk, 5: Cherry Tree, 6: Strawberry Bed, 7: Sheep Pasture
    var SPOTS = [
        { id: "apple",      x: 545, y: 375, labelY: -125 },
        { id: "honey",      x: 695, y: 340, labelY: -172 },
        { id: "pumpkin",    x: 980, y: 195, labelY: -68  },
        { id: "carrot",     x: 885, y: 355, labelY: -68  },
        { id: "coffee",     x: 390, y: 340, labelY: -115 },
        { id: "cherry",     x: 525, y: 695, labelY: -115 },
        { id: "strawberry", x: 428, y: 425, labelY: -55  },
        { id: "sheep",      x: 915, y: 615, labelY: -102 }
    ];

    // 0 & 5: Lush 3D Fruit Orchard Trees (Apple & Cherry)
    function renderFruitTree(sp, crop, st, isCherry) {
        var scale = st === 0 ? 0.68 : st === 1 ? 0.86 : 1.04;
        var darkLeaf = isCherry ? "#256e2c" : "#28781c";
        var midLeaf  = isCherry ? "#3fa348" : "#49ad28";
        var hiLeaf   = isCherry ? "#7ae078" : "#80e048";
        var fruits = "";
        if (st === 1) {
            // Blossoms in stage 1
            [[-28, -88], [22, -96], [-6, -68], [32, -72], [-34, -64], [6, -112]].forEach(function (p) {
                fruits += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4.5" fill="' + (isCherry ? "#ffb3d9" : "#fff5cc") + '" stroke="#e06699" stroke-width="1"/>';
            });
        } else if (st >= 2) {
            // Glossy 3D ripe apples or cherries!
            var coords = [[-34, -92], [26, -104], [-8, -76], [-46, -66], [38, -72], [-16, -118], [16, -84], [-26, -54], [24, -56]];
            coords.forEach(function (p) {
                if (isCherry) {
                    fruits += '<path d="M' + p[0] + ' ' + (p[1] - 8) + 'l-5 8M' + p[0] + ' ' + (p[1] - 8) + 'l5 8" stroke="#265918" stroke-width="1.6"/>' +
                        '<circle cx="' + (p[0] - 5) + '" cy="' + p[1] + '" r="5" fill="#d91b38" stroke="#6e0718" stroke-width="1.2"/>' +
                        '<circle cx="' + (p[0] + 5) + '" cy="' + (p[1] + 1) + '" r="5" fill="#bf112b" stroke="#6e0718" stroke-width="1.2"/>' +
                        '<circle cx="' + (p[0] - 6.5) + '" cy="' + (p[1] - 1.5) + '" r="1.5" fill="#fff" opacity=".8"/>';
                } else {
                    fruits += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="7.5" fill="#e6221b" stroke="#7a0c08" stroke-width="1.4"/>' +
                        '<circle cx="' + (p[0] - 2.5) + '" cy="' + (p[1] - 2.5) + '" r="2.3" fill="#ffcccc" opacity=".85"/>' +
                        '<path d="M' + p[0] + ' ' + (p[1] - 7) + 'q3 -4 6 -2" fill="none" stroke="#5ce62e" stroke-width="2" stroke-linecap="round"/>';
                }
            });
        }
        function singleTree(dx, dy, sc) {
            return '<g transform="translate(' + dx + ' ' + dy + ') scale(' + sc + ')">' +
                '<ellipse cx="8" cy="8" rx="48" ry="14" fill="rgba(20,55,10,.32)"/>' +
                '<path d="M-11 6C-8 -18 -10 -38 -6 -58L7 -58C10 -38 8 -18 12 6Z" fill="url(#trunkG)" stroke="#3d220d" stroke-width="2.2"/>' +
                '<path d="M-3 -50L-24 -74M3 -48L24 -72" stroke="#6e421f" stroke-width="7" stroke-linecap="round"/>' +
                '<circle cx="-32" cy="-74" r="28" fill="' + darkLeaf + '"/><circle cx="32" cy="-74" r="28" fill="' + darkLeaf + '"/>' +
                '<circle cx="0" cy="-104" r="34" fill="' + darkLeaf + '"/><circle cx="0" cy="-68" r="32" fill="' + darkLeaf + '"/>' +
                '<circle cx="-28" cy="-78" r="24" fill="' + midLeaf + '"/><circle cx="28" cy="-78" r="24" fill="' + midLeaf + '"/>' +
                '<circle cx="0" cy="-106" r="29" fill="' + midLeaf + '"/><circle cx="0" cy="-72" r="27" fill="' + midLeaf + '"/>' +
                '<circle cx="-14" cy="-112" r="14" fill="' + hiLeaf + '" opacity=".85"/><circle cx="16" cy="-92" r="12" fill="' + hiLeaf + '" opacity=".8"/>' +
                '<circle cx="-24" cy="-82" r="11" fill="' + hiLeaf + '" opacity=".75"/>' +
                fruits + '</g>';
        }
        return '<g transform="translate(' + sp.x + ' ' + sp.y + ')"><g class="sway">' +
            singleTree(-34, -18, scale * 0.85) +
            singleTree(22, 10, scale) +
            '</g></g>';
    }

    // 1: Centerpiece Giant Beehive Nectar Tree with 4 Golden Beehives & Buzzing Bees!
    function renderBeehiveTree(sp, st) {
        function hive(hx, hy, full) {
            return '<g transform="translate(' + hx + ' ' + hy + ')">' +
                '<line x1="0" y1="-26" x2="0" y2="-14" stroke="#542e10" stroke-width="3"/>' +
                '<ellipse cx="0" cy="4" rx="17" ry="13" fill="url(#hiveG)" stroke="#7a4400" stroke-width="2"/>' +
                '<ellipse cx="0" cy="-3" rx="19" ry="11" fill="url(#hiveG)" stroke="#7a4400" stroke-width="2"/>' +
                '<ellipse cx="0" cy="-10" rx="15" ry="9" fill="url(#hiveG)" stroke="#7a4400" stroke-width="2"/>' +
                '<ellipse cx="0" cy="-16" rx="10" ry="6" fill="#ffe866" stroke="#7a4400" stroke-width="1.8"/>' +
                '<circle cx="0" cy="2" r="4.5" fill="#3b2006" stroke="#ffd426" stroke-width="1.5"/>' +
                (full ? '<path d="M-6 12q6 7 12 0" fill="#ffd400" stroke="#b87400" stroke-width="1.2"/>' : '') +
                // Animated bee around each hive
                '<g class="bee"><ellipse cx="-20" cy="-8" rx="5.5" ry="4" fill="#ffd400" stroke="#222" stroke-width="1.4"/>' +
                '<line x1="-20" y1="-12" x2="-20" y2="-4" stroke="#222" stroke-width="1.6"/>' +
                '<ellipse cx="-21" cy="-13" rx="3" ry="2" fill="#fff" opacity=".85"/></g>' +
                '</g>';
        }
        var full = st >= 2;
        return '<g transform="translate(' + sp.x + ' ' + sp.y + ')"><g class="sway">' +
            '<ellipse cx="4" cy="18" rx="68" ry="20" fill="rgba(20,55,10,.36)"/>' +
            // Thick gnarled trunk + tree hollow + honey pots at base
            '<path d="M-28 16C-18 -10 -18 -48 -14 -82L16 -82C20 -48 22 -10 32 16Z" fill="url(#trunkG)" stroke="#3d220d" stroke-width="3"/>' +
            '<path d="M-8 -18C-8 -30 8 -30 8 -18C8 -8 -8 -8 -8 -18Z" fill="#2e1808" stroke="#5e3719" stroke-width="2"/>' +
            '<ellipse cx="-30" cy="14" rx="9" ry="8" fill="#c98a3e" stroke="#5e3719" stroke-width="1.8"/><ellipse cx="-30" cy="10" rx="7" ry="3" fill="#ffc400"/>' +
            '<ellipse cx="-16" cy="20" rx="9" ry="8" fill="#c98a3e" stroke="#5e3719" stroke-width="1.8"/><ellipse cx="-16" cy="16" rx="7" ry="3" fill="#ffc400"/>' +
            // Massive multi-layered green canopy
            '<circle cx="-58" cy="-102" r="38" fill="#267319"/><circle cx="58" cy="-98" r="38" fill="#267319"/>' +
            '<circle cx="-30" cy="-138" r="42" fill="#267319"/><circle cx="32" cy="-136" r="42" fill="#267319"/><circle cx="0" cy="-105" r="46" fill="#267319"/>' +
            '<circle cx="-54" cy="-106" r="33" fill="#46a825"/><circle cx="54" cy="-102" r="33" fill="#46a825"/>' +
            '<circle cx="-26" cy="-140" r="36" fill="#46a825"/><circle cx="28" cy="-138" r="36" fill="#46a825"/><circle cx="0" cy="-110" r="40" fill="#52ba2b"/>' +
            '<circle cx="-22" cy="-148" r="20" fill="#82e048" opacity=".8"/><circle cx="24" cy="-144" r="18" fill="#82e048" opacity=".8"/><circle cx="0" cy="-120" r="22" fill="#82e048" opacity=".75"/>' +
            // 4 Hanging Golden Beehives (just like the screenshot!)
            hive(-56, -74, full) +
            hive(-24, -108, full) +
            hive(26, -106, full) +
            hive(54, -68, full) +
            '</g></g>';
    }

    // 2, 3, 6: Isometric 3D Plowed Farmland Plots (Pumpkin Patch, Carrot Field, Strawberry Bed)
    function renderIsoField(sp, id, st) {
        var W = id === "strawberry" ? 46 : 62, H = id === "strawberry" ? 30 : 44;
        var o = isoBox(sp.x, sp.y, -W, -H, W, H, 8, "url(#soilG)", "#4d2a0c", "#693b14", "#3b1f08");
        o += isoPoly(sp.x, sp.y - 8, -W + 4, -H + 4, W - 4, H - 4, "#754318", "#b87b42", 2);
        var rows = id === "strawberry" ? [-16, 0, 16] : [-28, -10, 10, 28];
        var cols = id === "strawberry" ? [-30, -10, 10, 30] : [-44, -22, 0, 22, 44];
        // Plowed soil ridges
        rows.forEach(function (rv) {
            var p1 = iso(-W + 8, rv), p2 = iso(W - 8, rv);
            o += '<line x1="' + (sp.x + p1[0]).toFixed(1) + '" y1="' + (sp.y - 8 + p1[1]).toFixed(1) + '" x2="' + (sp.x + p2[0]).toFixed(1) + '" y2="' + (sp.y - 8 + p2[1]).toFixed(1) + '" stroke="#4a270b" stroke-width="6" stroke-linecap="round"/>';
            o += '<line x1="' + (sp.x + p1[0]).toFixed(1) + '" y1="' + (sp.y - 10 + p1[1]).toFixed(1) + '" x2="' + (sp.x + p2[0]).toFixed(1) + '" y2="' + (sp.y - 10 + p2[1]).toFixed(1) + '" stroke="#9e632e" stroke-width="2.2" stroke-linecap="round"/>';
        });
        // Plants on each ridge
        rows.forEach(function (rv) {
            cols.forEach(function (cu) {
                var p = iso(cu, rv), px = (sp.x + p[0]).toFixed(1), py = (sp.y - 10 + p[1]).toFixed(1);
                if (st === 0) {
                    o += '<circle cx="' + px + '" cy="' + py + '" r="3.5" fill="#70d633" stroke="#2d730e" stroke-width="1"/>';
                } else if (st === 1) {
                    o += '<ellipse cx="' + px + '" cy="' + py + '" rx="7" ry="4.5" fill="#46a825" stroke="#236310" stroke-width="1.2"/>' +
                         '<circle cx="' + px + '" cy="' + (py - 3) + '" r="2.5" fill="#fff099"/>';
                } else if (id === "pumpkin") {
                    // Plump 3D ribbed orange pumpkin
                    o += '<ellipse cx="' + px + '" cy="' + py + '" rx="9" ry="5" fill="#3a8f1e"/>' +
                         '<ellipse cx="' + px + '" cy="' + (py - 3) + '" rx="8.5" ry="6.5" fill="#f77f00" stroke="#9e4700" stroke-width="1.3"/>' +
                         '<ellipse cx="' + px + '" cy="' + (py - 3) + '" rx="4.5" ry="6.5" fill="#ff9e1b" stroke="#b85400" stroke-width="1"/>' +
                         '<path d="M' + px + ' ' + (py - 9) + 'q2 -4 4 -2" fill="none" stroke="#3b7a1a" stroke-width="2" stroke-linecap="round"/>';
                } else if (id === "carrot") {
                    // Bright orange carrot peeking out with lush green leafy top
                    o += '<path d="M' + px + ' ' + (py - 2) + 'l-5 -11M' + px + ' ' + (py - 2) + 'v-13M' + px + ' ' + (py - 2) + 'l5 -11" stroke="#47b025" stroke-width="2.5" stroke-linecap="round"/>' +
                         '<ellipse cx="' + px + '" cy="' + py + '" rx="5.5" ry="3.8" fill="#ff7300" stroke="#9e3d00" stroke-width="1.2"/>';
                } else {
                    // Strawberry bush with red berries
                    o += '<circle cx="' + px + '" cy="' + (py - 2) + '" r="7" fill="#3fa322" stroke="#1f630c" stroke-width="1.2"/>' +
                         '<circle cx="' + (px - 3) + '" cy="' + py + '" r="3.4" fill="#eb2136" stroke="#7a0915" stroke-width="1"/>' +
                         '<circle cx="' + (+px + 3.5) + '" cy="' + (py - 1) + '" r="3.2" fill="#ff334b" stroke="#7a0915" stroke-width="1"/>';
                }
            });
        });
        return '<g filter="url(#softSh)">' + o + '</g>';
    }

    // 4: Coffee Kiosk (A-Frame Dark Roof with Coffee Cup Sign, Gold Star, Sunflowers & Table)
    function renderCoffeeKiosk(sp, st) {
        return '<g transform="translate(' + sp.x + ' ' + sp.y + ')">' +
            '<ellipse cx="0" cy="24" rx="58" ry="18" fill="rgba(20,50,10,.34)"/>' +
            // Wooden deck base
            isoBox(0, 20, -34, -26, 34, 26, 8, "#c77d38", "#754215", "#995920", "#472509") +
            // Kiosk walls (warm cream & wood trim)
            isoBox(0, 12, -28, -20, 28, 20, 38, "#f7ebd2", "#d9c39c", "#efe0c2", "#6e4119") +
            // Service counter & espresso machine inside
            '<rect x="-24" y="-16" width="22" height="18" rx="2" fill="#3d2310" stroke="#8c5425" stroke-width="2"/>' +
            '<rect x="-18" y="-12" width="10" height="12" rx="1.5" fill="#b0bec5"/>' +
            // Steep Dark A-Frame Roof + Orange Trim
            '<path d="M-42 -22L-6 -72L38 -20L10 -6Z" fill="url(#darkRoof)" stroke="#17151c" stroke-width="2.5"/>' +
            '<path d="M-42 -22L-6 -72L-24 -12Z" fill="#6b3e1b" stroke="#381e0a" stroke-width="2"/>' +
            '<path d="M-42 -22L-6 -72L10 -6" fill="none" stroke="#f08c2e" stroke-width="3.5" stroke-linejoin="round"/>' +
            // Gold Star on Front Gable & Coffee Sign on Roof
            '<circle cx="-24" cy="-36" r="10" fill="#ffd43b" stroke="#8c5800" stroke-width="2"/>' +
            '<text x="-24" y="-32" font-size="12" text-anchor="middle">⭐</text>' +
            '<g transform="translate(14 -48) rotate(-25)">' +
                '<ellipse cx="0" cy="0" rx="16" ry="10" fill="#fff8e7" stroke="#5e3410" stroke-width="2"/>' +
                '<text x="0" y="4" font-size="12" text-anchor="middle">☕</text>' +
            '</g>' +
            // Sunflowers at right side of kiosk
            '<circle cx="26" cy="8" r="6" fill="#ffd400" stroke="#cc7a00" stroke-width="1.2"/><circle cx="26" cy="8" r="2.5" fill="#5e3410"/>' +
            '<circle cx="34" cy="4" r="6" fill="#ffd400" stroke="#cc7a00" stroke-width="1.2"/><circle cx="34" cy="4" r="2.5" fill="#5e3410"/>' +
            // Round patio table & chair in front
            '<ellipse cx="-32" cy="22" rx="14" ry="7" fill="#c77d38" stroke="#5e3410" stroke-width="2"/>' +
            (st >= 1 ? '<text x="-32" y="21" font-size="11" text-anchor="middle">☕</text>' : '') +
            '<circle class="smoke" cx="-6" cy="-76" r="6" fill="#fff" opacity=".75"/>' +
            '</g>';
    }

    // 7: White Picket Fence Sheep Pasture (bottom-right)
    function renderSheepPasture(sp, st) {
        function oneSheep(sx, sy, delay, woolScale) {
            return '<g transform="translate(' + sx + ' ' + sy + ')"><g class="sheep" style="animation-delay:-' + delay + 's">' +
                '<ellipse cx="0" cy="15" rx="22" ry="6" fill="rgba(60,35,10,.28)"/>' +
                '<rect x="-12" y="10" width="4" height="9" rx="1.5" fill="#2e2a27"/><rect x="8" y="10" width="4" height="9" rx="1.5" fill="#2e2a27"/>' +
                '<g transform="scale(' + woolScale + ')" fill="#fffef7" stroke="#d4cfc4" stroke-width="1.8">' +
                    '<circle cx="-11" cy="0" r="11"/><circle cx="2" cy="-5" r="13"/><circle cx="13" cy="0" r="11"/><circle cx="0" cy="5" r="11"/>' +
                '</g>' +
                '<ellipse cx="-18" cy="2" rx="7.5" ry="8.5" fill="#2e2a27"/>' +
                '<ellipse cx="-23" cy="-2" rx="4" ry="2.2" fill="#2e2a27"/><ellipse cx="-12" cy="-2" rx="4" ry="2.2" fill="#2e2a27"/>' +
                '<circle cx="-20" cy="0" r="2.2" fill="#fff"/><circle cx="-20.5" cy="0" r="1.1" fill="#111"/>' +
                '</g></g>';
        }
        var w = 102, h = 72, ws = st === 0 ? 0.78 : st === 1 ? 0.92 : 1.08;
        var p1 = iso(-w, -h), p2 = iso(w, -h), p3 = iso(w, h), p4 = iso(-w, h);
        var x1 = sp.x + p1[0], y1 = sp.y + p1[1],
            x2 = sp.x + p2[0], y2 = sp.y + p2[1],
            x3 = sp.x + p3[0], y3 = sp.y + p3[1],
            x4 = sp.x + p4[0], y4 = sp.y + p4[1];
        return '<g>' +
            // Outer green hedge trim around sheep pen (just like the screenshot!)
            isoBox(sp.x, sp.y + 8, -w - 10, -h - 10, w + 10, h + 10, 12, "#5ec227", "#2c7a11", "#3b9618", "#1f590b") +
            // Sandy dirt paddock floor
            isoPoly(sp.x, sp.y - 4, -w, -h, w, h, "#c79248", "#8c5c20", 3) +
            isoPoly(sp.x, sp.y - 4, -w + 8, -h + 8, w - 8, h - 8, "#d4a159") +
            // Back 2 white rail fences
            fence(x1, y1 - 4, x2, y2 - 4, 6) +
            fence(x1, y1 - 4, x4, y4 - 4, 5) +
            // Wooden Feeding Trough inside pen
            isoBox(sp.x + 18, sp.y - 22, -26, -10, 26, 10, 12, "#f0c850", "#7a4417", "#9e5b22", "#472509") +
            // 3 Fluffy Sheep inside the pen
            oneSheep(sp.x - 10, sp.y - 34, 0, ws) +
            oneSheep(sp.x + 48, sp.y - 6, 0.9, ws) +
            oneSheep(sp.x + 14, sp.y + 18, 1.8, ws) +
            (st >= 2 ? oneSheep(sp.x - 52, sp.y + 4, 2.4, ws) : '') +
            // Front 2 white rail fences
            fence(x4, y4 - 4, x3, y3 - 4, 6) +
            fence(x2, y2 - 4, x3, y3 - 4, 5) +
            '</g>';
    }

    function crops(S, D) {
        var shapes = "", labels = "";
        D.crops.forEach(function (c, i) {
            var sp = SPOTS[i] || { x: 500, y: 400, labelY: -90 };
            var p = S.plots[i] || { c: 0, qi: 0 };
            var st = Math.min(p.c, 2), ripe = p.c >= 2;
            var art = "";
            if (c.id === "apple") art = renderFruitTree(sp, c, st, false);
            else if (c.id === "cherry") art = renderFruitTree(sp, c, st, true);
            else if (c.id === "honey") art = renderBeehiveTree(sp, st);
            else if (c.id === "coffee") art = renderCoffeeKiosk(sp, st);
            else if (c.id === "sheep") art = renderSheepPasture(sp, st);
            else art = renderIsoField(sp, c.id, st);

            var hit = '<ellipse cx="' + sp.x + '" cy="' + (sp.y - 35) + '" rx="88" ry="68" fill="transparent"/>';
            shapes += '<g class="spot' + (ripe ? " ripe" : "") + '" onclick="FARM.tap(' + i + ')">' + art + hit + '</g>';

            // Clean Hay Day style floating badge
            var cy = sp.y + sp.labelY;
            var skillTypes = ["📘 Từ vựng", "🧩 Ngữ pháp", "🎧 Nghe"];
            var nextSkill = ripe ? "🧺 Thu hoạch!" : skillTypes[p.qi % 3];
            var w = Math.max(124, c.en.length * 7.8 + 44);
            labels += '<g class="spot-lbl" transform="translate(' + sp.x + ' ' + cy + ')">' +
                '<rect x="' + (-w / 2) + '" y="-20" width="' + w + '" height="34" rx="17" fill="' + (ripe ? "#fff3b0" : "rgba(255,252,240,.94)") + '" stroke="' + (ripe ? "#f59f00" : "#5c3818") + '" stroke-width="2.5" filter="url(#softSh)"/>' +
                '<text x="0" y="-4" font-size="12.5" font-weight="900" fill="#2d1a0a" text-anchor="middle">' + c.emoji + ' ' + c.en + '</text>' +
                '<text x="0" y="9" font-size="10" font-weight="800" fill="' + (ripe ? "#c96200" : "#2f7d32") + '" text-anchor="middle">' + nextSkill + ' (' + Math.min(p.c, 2) + '/2)</text>' +
                '</g>' +
                (ripe ? '<text class="bob" x="' + sp.x + '" y="' + (cy - 26) + '" font-size="28" text-anchor="middle">🧺</text>' : '');
        });
        return shapes + '<g id="f-labels" pointer-events="none">' + labels + '<rect width="1200" height="800" fill="url(#sunG)"/><rect width="1200" height="800" fill="url(#vigG)"/></g>';
    }

    window.FARM_SCENE = { stat: stat, crops: crops };
})();
