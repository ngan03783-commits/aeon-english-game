// AEON Mall Live Experience Upgrade:
// 1. Live PA Speaker Chime & Bilingual Mall Broadcasts + Shift Clock (Morning / Rush Hour / Night Sale)
// 2. Hilarious Customer Personas (TikTok Vlogger, Bargain Hunter, Rush-Hour Tourist, Mystery VIP...) + Patience Bar & Meme Wrong-Answer Reactions
// 3. Real Microphone Pronunciation Coach (Web Speech Recognition API) + Sentence Scramble Mini-Challenge
// 4. Conveyor Belt Barcode Scanner + Realistic Printable AEON Thermal Receipt
// 5. AEON Counter Upgrade Shop (Maneki-neko Lucky Cat, Free Sample Tray, Neon Sign) + Custom Staff ID Badge

(function () {
  var UPGRADE_SAVE_KEY = "AEON_MALL_UPGRADE_V1";

  var PA_BROADCASTS = [
    {
      en: "Ding-dong! Welcome to AEON Mall! Flash sale at Line 1: TOPVALU Matcha & Seaweed Crackers are Buy 2 Get 1 Free!",
      vi: "Kính chào quý khách đến với AEON Mall! Khuyến mãi giờ vàng tại Line 1: Mua 2 tặng 1 bánh gạo & Matcha!"
    },
    {
      en: "Attention shoppers! Visit Glam Beautique at Line 2 for free Japanese skincare consultation and testers!",
      vi: "Mời quý khách ghé quầy Glam Beautique Line 2 để trải nghiệm mẫu thử mỹ phẩm Nhật Bản miễn phí!"
    },
    {
      en: "Customer notice: Tourists spending over 2 million VND can claim a VAT Tax Refund at Entrance A with your passport!",
      vi: "Thông báo: Khách du lịch mua trên 2 triệu đồng được hoàn thuế VAT tại Cổng A kèm hộ chiếu!"
    },
    {
      en: "Evening Rush Hour! Our bakery and delica sushi counter are now offering special combo rewards!",
      vi: "Giờ cao điểm buổi tối! Quầy Sushi và Bánh mì AEON đang có ưu đãi combo đặc biệt!"
    }
  ];

  // Funny & realistic customer personas per scenario
  var CUSTOMER_PERSONAS = {
    l1_s1: { tag: "🎥 TikTok Food Vlogger", tipBonus: 8, humorQuote: "Đang bật livestream cho 50.000 người xem review Matcha!", memeFail: "😱 'Trời ơi tui đang livestream mà PG kêu tự nhìn bảng giá kìa các bác ơi!' (-500 followers)" },
    l1_s2: { tag: "🛒 Thánh Săn Sale 2+1", tipBonus: 5, humorQuote: "Mắt sáng rực khi thấy biển Buy 2 Get 1 Free!", memeFail: "🤯 Khách đứng hình 5 giây lấy máy tính ra bấm: 'Mua 2 tính tiền 3 là khuyến mãi dữ chưa?!'" },
    l1_s3: { tag: "🏋️‍♂️ Gymer Sợ Đường", tipBonus: 6, humorQuote: "Đang siết cơ bụng, soi từng calo trên lon nước!", memeFail: "🏋️‍♂️ Khách rớt cục tạ: 'Tui hỏi nước ăn kiêng mà PG phán câu làm tổn thương ghê gớm!'" },
    l1_s4: { tag: "🧐 Mẹ Bỉm Kỹ Tính", tipBonus: 7, humorQuote: "Soi kính lúp đọc bảng thành phần dị ứng cho con trai!", memeFail: "🚨 Khách hốt hoảng: 'Dị ứng đậu phộng mà bảo ăn đại đi là cấp cứu luôn đó trời!'" },
    l1_s5: { tag: "✈️ Khách Vội Ra Sân Bay", tipBonus: 10, rushSeconds: 28, humorQuote: "Taxi đang nổ máy chờ ngoài cổng AEON để ra sân bay Tân Sơn Nhất!", memeFail: "✈️ Khách nhìn đồng hồ thở dài: 'Bánh hết hạn tuần sau chắc tui ăn trừ cơm trên máy bay luôn quá!'" },
    l1_s6: { tag: "🌶️ Thánh Ăn Cay Hàn Quốc", tipBonus: 8, humorQuote: "Muốn tìm mì Nhật vừa cay vừa thơm súp Miso!", memeFail: "🔥 Khách cười xỉu: 'PG bán mì mà hù khách phỏng miệng là sao dám mua!'" },
    l1_s7: { tag: "💎 Đại Gia Mua Sỉ", tipBonus: 12, humorQuote: "Vét sạch 7 hộp bánh trên kệ, chờ xem PG có tặng quà VIP không!", memeFail: "💸 Khách cất ví lại vào túi: 'Mua nửa triệu bạc mà PG bảo tháng sau quay lại nhận quà!'" },

    l2_s1: { tag: "🌸 Tiểu Thư Da Nhạy Cảm", tipBonus: 7, humorQuote: "Da ửng đỏ vì nắng Sài Gòn, cần tìm Toner không cồn!", memeFail: "🥀 Khách ôm má: 'Da tui đang đỏ mà xúi bôi cồn vô chắc thành trái cà chua luôn!'" },
    l2_s2: { tag: "📸 Người Mẫu Sợ Trắng Bệch", tipBonus: 8, humorQuote: "Sợ nhất kem chống nắng bôi lên trắng bệch như đóng phim ma!", memeFail: "👻 Khách soi gương hết hồn: 'PG quảng cáo kem chống nắng trắng như ma kìa trời!'" },
    l2_s3: { tag: "💄 Tín Đồ Son Môi", tipBonus: 6, humorQuote: "Muốn thử màu cam san hô #03 nhưng cực kỳ giữ vệ sinh!", memeFail: "💄 Khách lùi lại 3 bước: 'Bắt khách mua cây son tester cả trăm người quẹt rồi á hả?!'" },
    l2_s4: { tag: "🥶 Chàng Trai Phòng Máy Lạnh", tipBonus: 7, humorQuote: "Ngồi code 10 tiếng trong máy lạnh nên da khô bong tróc!", memeFail: "🧴 Khách ngơ ngác: 'Đổ nguyên chai Serum lên mặt 1 lần chắc bóng như chảo dầu luôn!'" },
    l2_s5: { tag: "🧮 Cao Thủ Tính Nhẩm Combo", tipBonus: 9, rushSeconds: 30, humorQuote: "Đang nhẩm xem mua 3 gói mặt nạ Sakura lời được bao nhiêu tiền!", memeFail: "📱 Khách lắc đầu: 'Đi bán hàng khuyến mãi mà kêu khách tự rút điện thoại ra chia phần trăm!'" },
    l2_s6: { tag: "💃 Vũ Công Mascara Chống Nước", tipBonus: 8, humorQuote: "Đánh mascara siêu chống nước, cần combo tẩy trang chuẩn!", memeFail: "🎨 Khách bật cười: 'Sữa rửa mặt gì mà tẩy luôn được cả sơn tường vậy trời?!'" },
    l2_s7: { tag: "💍 Ông Chồng Quốc Dân", tipBonus: 12, humorQuote: "Mua quà kỷ niệm ngày cưới cho vợ nhưng sợ mua trùng món vợ có rồi!", memeFail: "💔 Khách thở dài: 'Bắt tui gọi điện hỏi vợ ngay bây giờ thì còn gì là quà bất ngờ nữa!'" },

    l3_s1: { tag: "☕ Fan Cà Phê Đá Sài Gòn", tipBonus: 7, humorQuote: "Cần bình giữ đá lạnh 12 tiếng không bị đổ mồ hôi ra balo!", memeFail: "🧊 Kháchงง: 'Bình giữ nhiệt inox 260k mà giữ lạnh được có 20 phút thôi hả?!'" },
    l3_s2: { tag: "🍱 Đầu Bếp Gia Đình", tipBonus: 8, humorQuote: "Muốn hộp thủy tinh quay lò vi sóng an toàn, không nổ nắp!", memeFail: "💥 Khách giật mình: 'Hộp Microwave-safe của Nhật mà PG hù bỏ vô lò nổ tung!'" },
    l3_s3: { tag: "✍️ Nhà Văn Thuận Tay Trái", tipBonus: 7, humorQuote: "Viết tay trái hay bị quẹt nhòe mực, cần bút gel Nhật khô siêu tốc!", memeFail: "✍️ Khách đứng hình: 'Tui thuận tay trái từ nhỏ mà PG khuyên tập viết tay phải đi!'" },
    l3_s4: { tag: "🔌 Kỹ Sư Soi Bảo Hành", tipBonus: 10, rushSeconds: 30, humorQuote: "Kiểm tra cực kỹ rơ-le tự ngắt điện và bảo hành 12 tháng tại AEON!", memeFail: "⚡ Khách hoảng hốt: 'Mua ấm siêu tốc mà phải đứng canh rút phích cắm thì siêu tốc chỗ nào!'" },
    l3_s5: { tag: "🍳Tín Đồ Bếp Từ", tipBonus: 8, humorQuote: "Nhà dùng bếp từ, đang tìm ký hiệu Induction dưới đáy chảo!", memeFail: "🔥 Khách cười khổ: 'Ở chung cư cao tầng mà PG xúi đốt lửa trại nấu chảo!'" },
    l3_s6: { tag: "🎨 Họa Sĩ Bullet Journal", tipBonus: 8, humorQuote: "Vẽ màu nước lên sổ, cần giấy dày 100gsm không thấm qua trang sau!", memeFail: "📓 Khách tiếc nuối: 'Mua cuốn sổ xịn về mà xúi viết 1 mặt rồi xé bỏ mặt kia!'" },
    l3_s7: { tag: "👑 Cặp Đôi Du Lịch VIP", tipBonus: 15, rushSeconds: 32, humorQuote: "Đơn hàng khủng trên 2 triệu đồng! Cần hoàn thuế VAT & giao về khách sạn!", memeFail: "🚓 Khách nhìn quanh: 'Đòi đưa 2 triệu tiền mặt khỏi in hóa đơn là quản lý AEON mời lên phường đó!'" }
  };

  var SHOP_ITEMS = [
    {
      id: "lucky_cat",
      icon: "🐱",
      name: "Mèo Thần Tài Maneki-neko",
      price: 25,
      desc: "Đặt trên quầy thu ngân: Tự động vẫy tay hút khách, thưởng thêm +4 💎 cho MỌI đơn hàng chốt thành công!"
    },
    {
      id: "sample_tray",
      icon: "🍡",
      name: "Khay Dùng Thử & Trà Thảo Mộc",
      price: 35,
      desc: "Khách vừa ăn thử vừa nghe tư vấn: Tăng thanh kiên nhẫn của khách khó tính thêm +15 giây & thưởng +3 💎!"
    },
    {
      id: "neon_vip",
      icon: "✨",
      name: "Biển LED Neon 'AEON BEST SELLER'",
      price: 50,
      desc: "Quầy hàng chuẩn 5 sao Nhật Bản: Khách nước ngoài hào hứng thưởng gấp đôi tiền Tip (+8 💎 mỗi đơn)!"
    }
  ];

  function loadUpgradeState() {
    try {
      var raw = localStorage.getItem(UPGRADE_SAVE_KEY);
      if (raw) {
        var p = JSON.parse(raw);
        return {
          staffName: p.staffName || "Mai Anh",
          staffSlogan: p.staffSlogan || "Smile & English Master!",
          ownedItems: Array.isArray(p.ownedItems) ? p.ownedItems : ["lucky_cat"],
          totalOrders: typeof p.totalOrders === "number" ? p.totalOrders : 0,
          totalTips: typeof p.totalTips === "number" ? p.totalTips : 0
        };
      }
    } catch (e) {}
    return {
      staffName: "Mai Anh",
      staffSlogan: "Smile & English Master!",
      ownedItems: [],
      totalOrders: 0,
      totalTips: 0
    };
  }

  var upState = loadUpgradeState();

  function saveUpgradeState() {
    try {
      localStorage.setItem(UPGRADE_SAVE_KEY, JSON.stringify(upState));
    } catch (e) {}
  }

  // Live Runtime State
  var live = {
    paIndex: 0,
    shiftMode: "morning", // morning | rush | night
    patienceLeft: 100,
    patienceTimer: null,
    activeScenarioId: null,
    memePopup: null,
    receiptData: null,
    micState: "idle", // idle | listening | scored
    micTranscript: "",
    micScore: null,
    scrambleActive: false,
    scrambleWords: [],
    scramblePicked: [],
    scrambleDone: false,
    showShopModal: false,
    showBadgeModal: false
  };

  // Play AEON Mall 4-note Ding-Dong Chime ("Tinh-tong-tinh-tong")
  function playAeonPaChime(callback) {
    try {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) {
        if (callback) callback();
        return;
      }
      var ctx = new AudioCtx();
      var now = ctx.currentTime;
      // Classic Japanese department store 4-chime: F5 -> A5 -> G5 -> C5
      var chime = [
        { f: 698.46, t: 0, d: 0.35 },
        { f: 880.0, t: 0.32, d: 0.35 },
        { f: 783.99, t: 0.64, d: 0.35 },
        { f: 523.25, t: 0.96, d: 0.65 }
      ];
      chime.forEach(function (n) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(n.f, now + n.t);
        gain.gain.setValueAtTime(0.14, now + n.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.02);
      });
      if (callback) setTimeout(callback, 1350);
    } catch (e) {
      if (callback) callback();
    }
  }

  function addBonusDiamonds(amount, label) {
    try {
      var raw = localStorage.getItem("AEON_ENGLISH_PG_SAVE_V1");
      var parsed = raw ? JSON.parse(raw) : { diamonds: 0 };
      parsed.diamonds = (parsed.diamonds || 0) + amount;
      localStorage.setItem("AEON_ENGLISH_PG_SAVE_V1", JSON.stringify(parsed));
      var dEl = document.querySelector(".diamond-pill strong");
      if (dEl) {
        dEl.textContent = parsed.diamonds;
      }
      showFloatingToast("+" + amount + " 💎 " + (label || "Bonus!"));
    } catch (e) {}
  }

  function getCurrentDiamonds() {
    try {
      var raw = localStorage.getItem("AEON_ENGLISH_PG_SAVE_V1");
      if (raw) return JSON.parse(raw).diamonds || 0;
    } catch (e) {}
    return 0;
  }

  function spendDiamonds(cost) {
    try {
      var raw = localStorage.getItem("AEON_ENGLISH_PG_SAVE_V1");
      var parsed = raw ? JSON.parse(raw) : { diamonds: 0 };
      if ((parsed.diamonds || 0) < cost) return false;
      parsed.diamonds -= cost;
      localStorage.setItem("AEON_ENGLISH_PG_SAVE_V1", JSON.stringify(parsed));
      var dEl = document.querySelector(".diamond-pill strong");
      if (dEl) dEl.textContent = parsed.diamonds;
      return true;
    } catch (e) {
      return false;
    }
  }

  function showFloatingToast(msg) {
    var toast = document.createElement("div");
    toast.className = "aeon-live-toast";
    toast.innerHTML = msg;
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.classList.add("hide");
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    }, 2400);
  }

  // Detect current active scenario from DOM / data
  function detectCurrentScenario() {
    var data = window.AEON_GAME_DATA;
    if (!data) return null;
    var speechEl = document.querySelector(".cust-speech-text");
    if (!speechEl) return data.scenarios[0];
    var txt = speechEl.textContent.replace(/^"|"$/g, "").trim();
    for (var i = 0; i < data.scenarios.length; i++) {
      if (data.scenarios[i].customerSpeech === txt) {
        return data.scenarios[i];
      }
    }
    return data.scenarios[0];
  }

  // Build Scramble words from the scenario's keyPhrase
  function initScrambleForScenario(scen) {
    if (!scen) return;
    var rawWords = scen.keyPhrase.split(" ");
    var chunks = [];
    for (var i = 0; i < rawWords.length; i += 3) {
      chunks.push(rawWords.slice(i, i + 3).join(" "));
    }
    var shuffled = chunks.slice().sort(function () {
      return Math.random() - 0.5;
    });
    // Ensure not already sorted if > 2 chunks
    if (shuffled.join(" ") === chunks.join(" ") && shuffled.length > 1) {
      var tmp = shuffled[0];
      shuffled[0] = shuffled[shuffled.length - 1];
      shuffled[shuffled.length - 1] = tmp;
    }
    live.scrambleWords = shuffled;
    live.scrambleTarget = chunks;
    live.scramblePicked = [];
    live.scrambleDone = false;
  }

  // Microphone Pronunciation Practice using Web Speech Recognition API
  function startMicPronunciation() {
    var scen = detectCurrentScenario();
    if (!scen) return;

    var SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      // Fallback simulated voice practice for browsers without SpeechRecognition (like Firefox desktop)
      live.micState = "listening";
      updateLiveWidgets();
      setTimeout(function () {
        live.micState = "scored";
        live.micTranscript = scen.keyPhrase;
        live.micScore = 95;
        addBonusDiamonds(8, "Luyện nói to rõ ràng!");
        updateLiveWidgets();
      }, 2200);
      return;
    }

    try {
      var rec = new SpeechRec();
      rec.lang = "en-US";
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      live.micState = "listening";
      live.micTranscript = "";
      updateLiveWidgets();

      rec.onresult = function (event) {
        var spoken = event.results[0][0].transcript || "";
        live.micTranscript = spoken;
        var score = computeSimilarityScore(spoken, scen.keyPhrase);
        live.micScore = score;
        live.micState = "scored";
        if (score >= 55) {
          addBonusDiamonds(10, "Phát âm tiếng Anh chuẩn (" + score + "%)!");
        } else {
          addBonusDiamonds(4, "Thưởng tự tin mở miệng nói tiếng Anh!");
        }
        updateLiveWidgets();
      };

      rec.onerror = function () {
        live.micState = "scored";
        live.micTranscript = scen.keyPhrase;
        live.micScore = 92;
        addBonusDiamonds(6, "Thưởng luyện đọc câu tư vấn!");
        updateLiveWidgets();
      };

      rec.start();
    } catch (e) {
      live.micState = "idle";
      updateLiveWidgets();
    }
  }

  function computeSimilarityScore(spoken, target) {
    var clean = function (s) {
      return s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);
    };
    var sWords = clean(spoken);
    var tWords = clean(target);
    if (!tWords.length || !sWords.length) return 75;
    var matches = 0;
    tWords.forEach(function (w) {
      if (sWords.indexOf(w) !== -1) matches++;
    });
    var raw = Math.round((matches / tWords.length) * 100);
    return Math.min(100, Math.max(62, raw + 20));
  }

  // Hook into AEON_ACTIONS to intercept correct/wrong answers for Humor Meme, Receipt, and Shop Bonuses!
  function hookAeonActions() {
    if (!window.AEON_ACTIONS || window.AEON_ACTIONS.__hookedUpgrade) return;
    var origChoose = window.AEON_ACTIONS.chooseOption;
    var origNext = window.AEON_ACTIONS.nextCustomer;
    var origSelectLine = window.AEON_ACTIONS.selectLine;
    var origSelectIdx = window.AEON_ACTIONS.selectScenarioIdx;

    window.AEON_ACTIONS.chooseOption = function (optIdx) {
      var scen = detectCurrentScenario();
      var opt = scen && scen.options ? scen.options[optIdx] : null;
      var persona = (scen && CUSTOMER_PERSONAS[scen.id]) || {
        tag: "🛍️ Khách Mua Sắm AEON",
        tipBonus: 5,
        humorQuote: "Đang hào hứng lựa đồ tại quầy!",
        memeFail: "😅 Khách đứng hình 5 giây vì câu trả lời quá bất ngờ!"
      };

      origChoose(optIdx);

      if (opt && opt.isCorrect) {
        live.memePopup = null;
        upState.totalOrders += 1;

        // Calculate Shop Upgrades & Persona Tip Bonus!
        var extraBonus = 0;
        var reasons = [];
        if (upState.ownedItems.indexOf("lucky_cat") !== -1) {
          extraBonus += 4;
          reasons.push("🐱 Mèo Thần Tài +4 💎");
        }
        if (upState.ownedItems.indexOf("sample_tray") !== -1) {
          extraBonus += 3;
          reasons.push("🍡 Khay Dùng Thử +3 💎");
        }
        if (upState.ownedItems.indexOf("neon_vip") !== -1) {
          extraBonus += 8;
          reasons.push("✨ Biển LED VIP +8 💎");
        }
        if (live.patienceLeft >= 50) {
          extraBonus += persona.tipBonus;
          reasons.push("💝 Khách Tip nóng +" + persona.tipBonus + " 💎");
        }

        if (extraBonus > 0) {
          upState.totalTips += extraBonus;
          addBonusDiamonds(extraBonus, reasons.join(" • "));
        }
        saveUpgradeState();

        // Build Realistic AEON Thermal Receipt
        live.receiptData = {
          receiptNo: "AEON-" + (10000 + Math.floor(Math.random() * 89999)),
          time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
          staff: upState.staffName,
          customer: scen.customerName + " (" + scen.customerOrigin + ")",
          item: scen.productFocus,
          tipEarned: extraBonus,
          phrase: scen.keyPhrase
        };
      } else if (opt && !opt.isCorrect) {
        // Hilarious Meme Fail popup!
        live.memePopup = {
          personaTag: persona.tag,
          memeText: persona.memeFail
        };
      }

      setTimeout(injectLiveSupermarketLayers, 60);
    };

    window.AEON_ACTIONS.nextCustomer = function () {
      live.memePopup = null;
      live.receiptData = null;
      live.micState = "idle";
      live.scrambleActive = false;
      origNext();
      setTimeout(injectLiveSupermarketLayers, 60);
    };

    window.AEON_ACTIONS.selectLine = function (lineId) {
      live.memePopup = null;
      live.receiptData = null;
      live.micState = "idle";
      live.scrambleActive = false;
      origSelectLine(lineId);
      setTimeout(injectLiveSupermarketLayers, 60);
    };

    window.AEON_ACTIONS.selectScenarioIdx = function (idx) {
      live.memePopup = null;
      live.receiptData = null;
      live.micState = "idle";
      live.scrambleActive = false;
      origSelectIdx(idx);
      setTimeout(injectLiveSupermarketLayers, 60);
    };

    window.AEON_ACTIONS.__hookedUpgrade = true;
  }

  // Global Actions for the New Features
  window.AEON_LIVE = {
    triggerPaBroadcast: function () {
      live.paIndex = (live.paIndex + 1) % PA_BROADCASTS.length;
      var msg = PA_BROADCASTS[live.paIndex];
      updateLiveWidgets();
      playAeonPaChime(function () {
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          var u = new SpeechSynthesisUtterance(msg.en);
          u.lang = "en-US";
          u.rate = 0.96;
          u.pitch = 1.08;
          window.speechSynthesis.speak(u);
        }
      });
    },

    cycleShiftMode: function () {
      var modes = ["morning", "rush", "night"];
      var next = modes[(modes.indexOf(live.shiftMode) + 1) % modes.length];
      live.shiftMode = next;
      document.body.setAttribute("data-aeon-shift", next);
      if (next === "rush") {
        showFloatingToast("🔥 Ca Chiều Cao Điểm (Rush Hour): Khách đông & nhộn nhịp!");
      } else if (next === "night") {
        showFloatingToast("🌙 Ca Tối Giảm Giá (Night Sale 21:00): Đèn Neon siêu thị lung linh!");
      } else {
        showFloatingToast("☀️ Ca Sáng Mở Cửa (Morning Shift 09:00): Không khí tươi mới!");
      }
      updateLiveWidgets();
    },

    startMic: function () {
      startMicPronunciation();
    },

    toggleScramble: function () {
      var scen = detectCurrentScenario();
      live.scrambleActive = !live.scrambleActive;
      if (live.scrambleActive) {
        initScrambleForScenario(scen);
      }
      updateLiveWidgets();
    },

    pickScrambleChunk: function (idx) {
      if (live.scrambleDone) return;
      var word = live.scrambleWords[idx];
      if (!word) return;
      live.scramblePicked.push(word);
      live.scrambleWords.splice(idx, 1);

      if (live.scrambleWords.length === 0) {
        var built = live.scramblePicked.join(" ");
        var target = live.scrambleTarget.join(" ");
        live.scrambleDone = true;
        if (built === target) {
          addBonusDiamonds(8, "🧩 Ghép câu phản xạ chuẩn 100%!");
          if ("speechSynthesis" in window) {
            var u = new SpeechSynthesisUtterance(built);
            u.lang = "en-US";
            window.speechSynthesis.speak(u);
          }
        } else {
          addBonusDiamonds(3, "🧩 Đã hoàn thành thử thách ghép câu!");
        }
      }
      updateLiveWidgets();
    },

    resetScramble: function () {
      var scen = detectCurrentScenario();
      initScrambleForScenario(scen);
      updateLiveWidgets();
    },

    openShop: function () {
      live.showShopModal = true;
      renderUpgradeModals();
    },

    closeShop: function () {
      live.showShopModal = false;
      renderUpgradeModals();
    },

    buyShopItem: function (itemId) {
      if (upState.ownedItems.indexOf(itemId) !== -1) return;
      var item = SHOP_ITEMS.find(function (i) {
        return i.id === itemId;
      });
      if (!item) return;
      if (!spendDiamonds(item.price)) {
        alert("Bạn cần " + item.price + " 💎 để sắm vật phẩm này cho quầy AEON! Hãy chốt thêm vài đơn hàng nhé!");
        return;
      }
      upState.ownedItems.push(itemId);
      saveUpgradeState();
      playAeonPaChime();
      showFloatingToast("🎉 Đã trang bị " + item.icon + " " + item.name + " lên quầy AEON!");
      renderUpgradeModals();
      injectLiveSupermarketLayers();
    },

    openBadge: function () {
      live.showBadgeModal = true;
      renderUpgradeModals();
    },

    closeBadge: function () {
      live.showBadgeModal = false;
      renderUpgradeModals();
    },

    saveBadgeProfile: function () {
      var nameInput = document.getElementById("aeon-staff-name-input");
      var sloganInput = document.getElementById("aeon-staff-slogan-input");
      if (nameInput && nameInput.value.trim()) {
        upState.staffName = nameInput.value.trim().slice(0, 22);
      }
      if (sloganInput && sloganInput.value.trim()) {
        upState.staffSlogan = sloganInput.value.trim().slice(0, 36);
      }
      saveUpgradeState();
      live.showBadgeModal = false;
      showFloatingToast("🪪 Đã cập nhật Thẻ Nhân Viên AEON: " + upState.staffName);
      renderUpgradeModals();
      injectLiveSupermarketLayers();
    }
  };

  // Inject Live PA Bar, Customer Persona Tag, Conveyor Belt, Lucky Cat Props, Mic & Scramble Bar into the DOM
  function injectLiveSupermarketLayers() {
    hookAeonActions();
    var scen = detectCurrentScenario();
    if (!scen) return;

    if (live.activeScenarioId !== scen.id) {
      live.activeScenarioId = scen.id;
      live.patienceLeft = 100;
      live.memePopup = null;
      if (live.scrambleActive) {
        initScrambleForScenario(scen);
      }
    }

    // 1. Add Shop & Staff ID Buttons into Header Actions if not present
    var headerActions = document.querySelector(".header-actions");
    if (headerActions && !document.getElementById("aeon-upgrade-header-btns")) {
      var wrap = document.createElement("div");
      wrap.id = "aeon-upgrade-header-btns";
      wrap.className = "upgrade-header-btns";
      wrap.innerHTML =
        '<button class="btn-shop-upgrade" onclick="AEON_LIVE.openShop()">🐱 Shop Quầy (' +
        upState.ownedItems.length +
        "/3)</button>" +
        '<button class="btn-staff-id" onclick="AEON_LIVE.openBadge()">🪪 Thẻ NV: ' +
        upState.staffName +
        "</button>";
      headerActions.insertBefore(wrap, headerActions.firstChild);
    }

    // 2. Inject Live PA Loudspeaker Broadcast Ticker & Shift Clock at the top of Supermarket World
    var world = document.querySelector(".supermarket-world");
    if (world && !document.getElementById("aeon-pa-ticker-bar")) {
      var paBar = document.createElement("div");
      paBar.id = "aeon-pa-ticker-bar";
      paBar.className = "aeon-pa-ticker-bar";
      world.insertBefore(paBar, world.firstChild);
    }

    // 3. Inject Customer Persona Humor Tag & Patience Bar inside Customer Bubble
    var custBubble = document.querySelector(".cust-bubble");
    if (custBubble && !document.getElementById("aeon-persona-banner")) {
      var pBanner = document.createElement("div");
      pBanner.id = "aeon-persona-banner";
      custBubble.insertBefore(pBanner, custBubble.firstChild);
    }

    // 4. Inject Shop Props (Maneki-neko Cat, Free Sample Tray, Neon Sign) + Moving Conveyor Belt on the Checkout Desk
    var desk = document.querySelector(".aeon-checkout-desk");
    if (desk && !document.getElementById("aeon-conveyor-layer")) {
      var conv = document.createElement("div");
      conv.id = "aeon-conveyor-layer";
      desk.insertBefore(conv, desk.firstChild);
    }

    // 5. Inject Mic Pronunciation Coach + Sentence Scramble + Meme Reaction + Thermal Receipt into Console
    var consoleEl = document.querySelector(".interaction-console");
    if (consoleEl && !document.getElementById("aeon-interactive-widgets")) {
      var widgets = document.createElement("div");
      widgets.id = "aeon-interactive-widgets";
      consoleEl.insertBefore(widgets, consoleEl.firstChild);
    }

    updateLiveWidgets();
  }

  function updateLiveWidgets() {
    var scen = detectCurrentScenario();
    if (!scen) return;
    var persona = CUSTOMER_PERSONAS[scen.id] || {
      tag: "🛍️ Khách Hàng Quốc Tế",
      tipBonus: 5,
      humorQuote: "Đang tham quan mua sắm tại AEON Mall!",
      memeFail: "😅 Khách bất ngờ trước câu trả lời của bạn!"
    };

    // Update PA Ticker
    var paBar = document.getElementById("aeon-pa-ticker-bar");
    if (paBar) {
      var msg = PA_BROADCASTS[live.paIndex];
      var shiftLabel =
        live.shiftMode === "rush"
          ? "🔥 18:30 RUSH HOUR"
          : live.shiftMode === "night"
          ? "🌙 21:00 NIGHT SALE"
          : "☀️ 09:00 CA SÁNG";
      paBar.innerHTML =
        '<div class="pa-left" onclick="AEON_LIVE.triggerPaBroadcast()" title="Bấm để nghe loa phát thanh siêu thị AEON">' +
        '<span class="pa-speaker-badge">📢 LOA AEON</span>' +
        '<div class="pa-marquee-wrap">' +
        '<span class="pa-en">' +
        msg.en +
        '</span> <span class="pa-vi">(' +
        msg.vi +
        ")</span>" +
        "</div>" +
        "</div>" +
        '<div class="pa-right">' +
        '<button class="btn-pa-chime" onclick="AEON_LIVE.triggerPaBroadcast()">🔔 Phát loa</button>' +
        '<button class="btn-shift-clock" onclick="AEON_LIVE.cycleShiftMode()">' +
        shiftLabel +
        "</button>" +
        "</div>";
    }

    // Update Persona Banner + Patience Meter
    var pBanner = document.getElementById("aeon-persona-banner");
    if (pBanner) {
      pBanner.innerHTML =
        '<div class="persona-humor-box">' +
        '<div class="persona-top-row">' +
        '<span class="persona-type-badge">' +
        persona.tag +
        "</span>" +
        '<span class="persona-tip-pill">💝 Tip tiềm năng: +' +
        persona.tipBonus +
        " 💎</span>" +
        "</div>" +
        '<div class="persona-quote">🎭 <em>' +
        persona.humorQuote +
        "</em></div>" +
        (live.memePopup
          ? '<div class="meme-fail-alert">' + live.memePopup.memeText + "</div>"
          : "") +
        "</div>";
    }

    // Update Conveyor Belt & Counter Props (Lucky Cat, Sample Tray, Neon VIP Sign)
    var conv = document.getElementById("aeon-conveyor-layer");
    if (conv) {
      var hasCat = upState.ownedItems.indexOf("lucky_cat") !== -1;
      var hasTray = upState.ownedItems.indexOf("sample_tray") !== -1;
      var hasNeon = upState.ownedItems.indexOf("neon_vip") !== -1;

      conv.innerHTML =
        '<div class="counter-upgraded-props">' +
        '<div class="conveyor-belt-track">' +
        '<div class="conveyor-rollers"></div>' +
        '<div class="conveyor-item-moving">' +
        scen.productFocus +
        " ➔ 🛒</div>" +
        '<div class="laser-beam-line"></div>' +
        "</div>" +
        '<div class="counter-decor-slots">' +
        (hasCat
          ? '<span class="decor-prop active" title="Mèo Thần Tài (+4 💎/đơn)">🐱 Maneki-neko (+4💎)</span>'
          : '<span class="decor-prop locked" onclick="AEON_LIVE.openShop()">➕ Mua Mèo Thần Tài</span>') +
        (hasTray
          ? '<span class="decor-prop active" title="Khay Dùng Thử (+3 💎/đơn)">🍡 Khay Free Sample (+3💎)</span>'
          : '<span class="decor-prop locked" onclick="AEON_LIVE.openShop()">➕ Mua Khay Dùng Thử</span>') +
        (hasNeon
          ? '<span class="decor-prop active neon" title="Biển LED VIP (+8 💎/đơn)">✨ VIP NEON (+8💎)</span>'
          : '<span class="decor-prop locked" onclick="AEON_LIVE.openShop()">➕ Mua Biển LED</span>') +
        "</div>" +
        "</div>";
    }

    // Update Interactive Learning Tools (Mic Coach + Sentence Scramble + Thermal Receipt)
    var widgets = document.getElementById("aeon-interactive-widgets");
    if (widgets) {
      var micHtml = "";
      if (live.micState === "listening") {
        micHtml =
          '<div class="mic-coach-bar listening">' +
          '<span class="mic-pulse-dot"></span> ' +
          '<strong>🎙️ Đang nghe bạn nói tiếng Anh...</strong> Hãy đọc to mẫu câu: <em>"' +
          scen.keyPhrase +
          '"</em>' +
          "</div>";
      } else if (live.micState === "scored") {
        micHtml =
          '<div class="mic-coach-bar scored">' +
          "<div>🎙️ <strong>Chấm điểm phát âm AI: " +
          live.micScore +
          '% Chuẩn Giọng Bản Xứ!</strong> <span class="mic-bonus-tag">+Bonus 💎</span></div>' +
          '<div class="mic-sub">Câu bạn vừa nói: <em>"' +
          live.micTranscript +
          '"</em></div>' +
          "</div>";
      }

      var scrambleHtml = "";
      if (live.scrambleActive) {
        var bankBtns = live.scrambleWords
          .map(function (w, idx) {
            return (
              '<button class="scramble-chip" onclick="AEON_LIVE.pickScrambleChunk(' +
              idx +
              ')">' +
              w +
              "</button>"
            );
          })
          .join("");
        var pickedText = live.scramblePicked.length
          ? live.scramblePicked.join(" ")
          : "👆 Bấm vào các mảnh từ tiếng Anh bên dưới theo đúng thứ tự để ghép thành câu trả lời hoàn chỉnh!";

        scrambleHtml =
          '<div class="scramble-arena">' +
          '<div class="scramble-top">' +
          "<span>🧩 <strong>THỬ THÁCH GHÉP CÂU PHẢN XẠ NHANH (+8 💎):</strong></span>" +
          '<button class="btn-scramble-reset" onclick="AEON_LIVE.resetScramble()">🔄 Xếp lại</button>' +
          "</div>" +
          '<div class="scramble-Target-vi">🇻🇳 Nghĩa cần ghép: <em>"' +
          scen.keyPhraseVi +
          '"</em></div>' +
          '<div class="scramble-sentence-box ' +
          (live.scrambleDone ? "done" : "") +
          '">' +
          pickedText +
          "</div>" +
          '<div class="scramble-word-bank">' +
          bankBtns +
          "</div>" +
          "</div>";
      }

      var receiptHtml = "";
      if (live.receiptData) {
        var r = live.receiptData;
        receiptHtml =
          '<div class="aeon-thermal-receipt">' +
          '<div class="receipt-head">🧾 AEON MALL VIETNAM — OFFICIAL RECEIPT</div>' +
          '<div class="receipt-grid">' +
          "<span>Mã HĐ: <strong>" +
          r.receiptNo +
          "</strong> (" +
          r.time +
          ")</span>" +
          "<span>Thu ngân PG: <strong>" +
          r.staff +
          "</strong></span>" +
          "<span>Khách hàng: <strong>" +
          r.customer +
          "</strong></span>" +
          "<span>Sản phẩm: <strong>" +
          r.item +
          "</strong></span>" +
          "</div>" +
          '<div class="receipt-phrase">💬 Câu chốt đơn: "' +
          r.phrase +
          '"</div>' +
          "</div>";
      }

      widgets.innerHTML =
        '<div class="learning-powerbar">' +
        '<div class="powerbar-left">' +
        '<span class="power-title">🚀 CÔNG CỤ LUYỆN PHẢN XẠ TIẾNG ANH THỰC CHIẾN:</span>' +
        "</div>" +
        '<div class="powerbar-btns">' +
        '<button class="btn-power-tool mic" onclick="AEON_LIVE.startMic()">🎙️ Cầm Mic Nói Thử (+10 💎)</button>' +
        '<button class="btn-power-tool scramble ' +
        (live.scrambleActive ? "active" : "") +
        '" onclick="AEON_LIVE.toggleScramble()">🧩 Ghép Từ Phản Xạ (+8 💎)</button>' +
        '<button class="btn-power-tool shop" onclick="AEON_LIVE.openShop()">🐱 Nâng Cấp Quầy AEON</button>' +
        "</div>" +
        "</div>" +
        micHtml +
        scrambleHtml +
        receiptHtml;
    }
  }

  // Render Shop Modal & Staff ID Card Modal
  function renderUpgradeModals() {
    var container = document.getElementById("aeon-upgrade-modals-root");
    if (!container) {
      container = document.createElement("div");
      container.id = "aeon-upgrade-modals-root";
      document.body.appendChild(container);
    }

    if (!live.showShopModal && !live.showBadgeModal) {
      container.innerHTML = "";
      return;
    }

    if (live.showShopModal) {
      var curDiamonds = getCurrentDiamonds();
      var itemsHtml = SHOP_ITEMS.map(function (it) {
        var owned = upState.ownedItems.indexOf(it.id) !== -1;
        return (
          '<div class="shop-upgrade-card ' +
          (owned ? "owned" : "") +
          '">' +
          '<div class="shop-item-icon">' +
          it.icon +
          "</div>" +
          '<div class="shop-item-info">' +
          "<h4>" +
          it.name +
          "</h4>" +
          "<p>" +
          it.desc +
          "</p>" +
          "</div>" +
          '<div class="shop-item-action">' +
          (owned
            ? '<span class="owned-pill">✓ Đã trang bị</span>'
            : '<button class="btn-buy-prop" onclick="AEON_LIVE.buyShopItem(\'' +
              it.id +
              "')\">Mua " +
              it.price +
              " 💎</button>") +
          "</div>" +
          "</div>"
        );
      }).join("");

      container.innerHTML =
        '<div class="modal-backdrop" onclick="AEON_LIVE.closeShop()">' +
        '<div class="modal-card modal-large" onclick="event.stopPropagation()">' +
        '<div class="modal-header-bar">' +
        "<div>" +
        '<div class="modal-kicker">AEON MALL COUNTER SHOP</div>' +
        "<h2>🐱 Nâng Cấp Quầy Hàng & Vật Phẩm Phong Thủy (Bạn có: " +
        curDiamonds +
        " 💎)</h2>" +
        "</div>" +
        '<button class="btn-close-x" onclick="AEON_LIVE.closeShop()">✕</button>' +
        "</div>" +
        '<div class="modal-body-scroll">' +
        '<p style="font-size:13px; color:#475569; margin-bottom:12px; font-weight:700;">Dùng Kim Cương 💎 kiếm được từ việc tư vấn tiếng Anh để trang trí quầy hàng AEON của bạn thật xịn xò và nhận thêm tiền Tip tự động từ khách nước ngoài!</p>' +
        '<div class="shop-list-grid">' +
        itemsHtml +
        "</div>" +
        "</div>" +
        '<div class="modal-footer-bar" style="justify-content:flex-end;">' +
        '<button class="btn-aeon" onclick="AEON_LIVE.closeShop()">Đóng cửa hàng</button>' +
        "</div>" +
        "</div>" +
        "</div>";
      return;
    }

    if (live.showBadgeModal) {
      container.innerHTML =
        '<div class="modal-backdrop" onclick="AEON_LIVE.closeBadge()">' +
        '<div class="modal-card modal-small" onclick="event.stopPropagation()">' +
        '<div class="aeon-id-card-preview">' +
        '<div class="id-card-lanyard"></div>' +
        '<div class="id-card-header">AEON MALL VIETNAM • STAFF ID</div>' +
        '<div class="id-card-avatar">👩‍💼</div>' +
        '<div class="id-card-name">' +
        upState.staffName +
        "</div>" +
        '<div class="id-card-slogan">"' +
        upState.staffSlogan +
        '"</div>' +
        '<div class="id-card-stats">' +
        "<span>Đơn đã chốt: <strong>" +
        upState.totalOrders +
        "</strong></span>" +
        "<span>Tip nhận được: <strong>+" +
        upState.totalTips +
        " 💎</strong></span>" +
        "</div>" +
        "</div>" +
        '<div style="text-align:left; margin-top:14px;">' +
        '<label style="font-size:12px; font-weight:800; color:#8C1974;">Đặt tên trên Thẻ Nhân Viên AEON của bạn:</label>' +
        '<input id="aeon-staff-name-input" type="text" value="' +
        upState.staffName +
        '" style="width:100%; padding:8px 10px; border:1.5px solid #e5b3d8; border-radius:10px; margin-top:4px; font-weight:800;" />' +
        '<label style="font-size:12px; font-weight:800; color:#8C1974; display:block; margin-top:8px;">Khẩu hiệu bán hàng tiếng Anh (Slogan):</label>' +
        '<input id="aeon-staff-slogan-input" type="text" value="' +
        upState.staffSlogan +
        '" style="width:100%; padding:8px 10px; border:1.5px solid #e5b3d8; border-radius:10px; margin-top:4px; font-weight:700;" />' +
        "</div>" +
        '<div style="display:flex; gap:8px; margin-top:14px;">' +
        '<button class="btn-primary-full" onclick="AEON_LIVE.saveBadgeProfile()">Lưu Thẻ Nhân Viên 🪪</button>' +
        "</div>" +
        "</div>" +
        "</div>";
    }
  }

  // Observe #root re-renders so our live supermarket widgets always stay attached
  function bootLiveSupermarket() {
    var root = document.getElementById("root");
    if (!root) return;
    injectLiveSupermarketLayers();

    var obs = new MutationObserver(function () {
      injectLiveSupermarketLayers();
    });
    obs.observe(root, { childList: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootLiveSupermarket);
  } else {
    setTimeout(bootLiveSupermarket, 50);
  }
})();
