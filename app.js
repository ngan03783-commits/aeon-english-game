// Pure Vanilla JavaScript Application for AEON Mall Sales English Game (Realistic Animated Supermarket Edition)
(function () {
  var STORAGE_KEY = "AEON_ENGLISH_PG_SAVE_V1";
  var data = window.AEON_GAME_DATA;
  var CH = window.AEON_CHARS;
  var DLG = window.AEON_DIALOGUE || {};
  var T0 = Date.now();

  // Ambient shoppers walking back and forth in the background aisle with live chatter bubbles!
  var PASSERSBY_BY_LINE = {
    line1: [
      { avatar: "🚶🏻‍♀️🛒", text: "Look! TOPVALU snacks are Buy 2 Get 1 Free!", dir: "dir-ltr", duration: "19s", delay: "0s" },
      { avatar: "🏃🏼‍♂️🧺", text: "Let's grab some Japanese matcha & sushi!", dir: "dir-rtl", duration: "23s", delay: "-6s" },
      { avatar: "👩🏻‍🤝‍👨🏼🛍️", text: "AEON Bakery smells so good today~", dir: "dir-ltr", duration: "26s", delay: "-13s" },
      { avatar: "👵🏼🛒", text: "Where is the zero-calorie peach tea?", dir: "dir-rtl", duration: "21s", delay: "-16s" }
    ],
    line2: [
      { avatar: "🚶🏼‍♀️🛍️", text: "Glam Beautique has free skincare testers!", dir: "dir-ltr", duration: "20s", delay: "-2s" },
      { avatar: "👩🏻‍🦰🧺", text: "I need a UV gel sunscreen with no white cast.", dir: "dir-rtl", duration: "24s", delay: "-8s" },
      { avatar: "👫🏻🛒", text: "Sakura sheet masks are 20% off for 3 packs!", dir: "dir-ltr", duration: "25s", delay: "-14s" },
      { avatar: "🧔🏻‍♂️🛍️", text: "Looking for an anniversary gift set...", dir: "dir-rtl", duration: "22s", delay: "-18s" }
    ],
    line3: [
      { avatar: "👨🏼‍👩🏼‍👧🏼🛒", text: "HÓME COÓRDY tumblers keep ice cold for 12h!", dir: "dir-ltr", duration: "21s", delay: "-1s" },
      { avatar: "🚶🏻‍♂️📦", text: "Does this ceramic pan work on induction stoves?", dir: "dir-rtl", duration: "24s", delay: "-7s" },
      { avatar: "👩🏻‍🎨🧺", text: "These 0.38mm Japanese gel pens dry so fast!", dir: "dir-ltr", duration: "19s", delay: "-12s" },
      { avatar: "🧳🧑🏼‍🦱", text: "Don't forget the VAT Tax Refund desk by Entrance A!", dir: "dir-rtl", duration: "26s", delay: "-17s" }
    ]
  };

  function loadSavedState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        return {
          diamonds: typeof parsed.diamonds === "number" ? parsed.diamonds : 0,
          completedIds: Array.isArray(parsed.completedIds) ? parsed.completedIds : [],
          selectedLineId: parsed.selectedLineId || "line1",
          hearts: typeof parsed.hearts === "number" ? parsed.hearts : 5,
          streak: typeof parsed.streak === "number" ? parsed.streak : 0
        };
      }
    } catch (e) {
      console.warn("Could not read localStorage", e);
    }
    return {
      diamonds: 0,
      completedIds: [],
      selectedLineId: "line1",
      hearts: 5,
      streak: 0
    };
  }

  var saved = loadSavedState();

  var state = {
    diamonds: saved.diamonds,
    completedIds: saved.completedIds,
    selectedLineId: saved.selectedLineId,
    hearts: saved.hearts,
    streak: saved.streak,
    scenarioIndexInLine: 0,
    showTranslation: false,
    usedHintThisTurn: false,
    hadWrongAttemptThisTurn: false,
    selectedOptionId: null,
    chosenReplyText: null,
    feedback: null,
    isSpeaking: false,
    speaker: "customer",
    diamondFloat: null,
    showHandbook: false,
    handbookFilterLine: "all",
    levelUpModal: null,
    shiftSummaryModal: false
  };

  function saveState() {
    try {
      localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            diamonds: state.diamonds,
            completedIds: state.completedIds,
            selectedLineId: state.selectedLineId,
            hearts: state.hearts,
            streak: state.streak
          })
      );
    } catch (e) {}
  }

  function getLevelObject(diamonds) {
    var current = data.levels[0];
    for (var i = 0; i < data.levels.length; i++) {
      if (diamonds >= data.levels[i].minDiamonds) {
        current = data.levels[i];
      }
    }
    return current;
  }

  function getCurrentLine() {
    for (var i = 0; i < data.lines.length; i++) {
      if (data.lines[i].id === state.selectedLineId) {
        return data.lines[i];
      }
    }
    return data.lines[0];
  }

  function getLineScenarios(lineId) {
    return data.scenarios.filter(function (s) {
      return s.lineId === lineId;
    });
  }

  function jumpToFirstUnfinishedInLine(lineId) {
    var list = getLineScenarios(lineId);
    var idx = -1;
    for (var i = 0; i < list.length; i++) {
      if (state.completedIds.indexOf(list[i].id) === -1) {
        idx = i;
        break;
      }
    }
    state.scenarioIndexInLine = idx >= 0 ? idx : 0;
  }

  jumpToFirstUnfinishedInLine(state.selectedLineId);

  // Sound Effect Synth (Web Audio API)
  function playSoundEffect(type) {
    try {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      var ctx = new AudioCtx();
      var now = ctx.currentTime;

      if (type === "success") {
        // Supermarket barcode scanner BEEP + chime!
        var beepOsc = ctx.createOscillator();
        var beepGain = ctx.createGain();
        beepOsc.type = "sine";
        beepOsc.frequency.setValueAtTime(1850, now);
        beepGain.gain.setValueAtTime(0.12, now);
        beepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        beepOsc.connect(beepGain);
        beepGain.connect(ctx.destination);
        beepOsc.start(now);
        beepOsc.stop(now + 0.1);

        var notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach(function (freq, idx) {
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + 0.1 + idx * 0.07);
          gain.gain.setValueAtTime(0.13, now + 0.1 + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1 + idx * 0.07 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + 0.1 + idx * 0.07);
          osc.stop(now + 0.1 + idx * 0.07 + 0.27);
        });
      } else if (type === "error") {
        var errNotes = [300, 240];
        errNotes.forEach(function (freq, idx) {
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.1, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.24);
        });
      } else if (type === "levelup") {
        var lvlNotes = [440, 554.37, 659.25, 880, 1108.73];
        lvlNotes.forEach(function (freq, idx) {
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);
          gain.gain.setValueAtTime(0.18, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.38);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.4);
        });
      }
    } catch (e) {}
  }

  // Web Speech API
  function speakEnglish(text, who, onDone) {
    if (!("speechSynthesis" in window)) {
      alert("Trình duyệt của bạn không hỗ trợ đọc giọng nói (Web Speech API).");
      return;
    }
    window.speechSynthesis.cancel();
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.94;
    utterance.pitch = 1.02;

    var voices = window.speechSynthesis.getVoices();
    var preferredVoice =
        voices.find(function (v) {
          return (
              v.lang.indexOf("en") !== -1 &&
              (v.name.indexOf("Samantha") !== -1 ||
                  v.name.indexOf("Google") !== -1 ||
                  v.name.indexOf("Natural") !== -1)
          );
        }) ||
        voices.find(function (v) {
          return v.lang.indexOf("en-US") !== -1;
        }) ||
        voices.find(function (v) {
          return v.lang.indexOf("en") !== -1;
        });

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = function () {
      state.isSpeaking = true;
      state.speaker = who || "pg";
      render();
    };
    utterance.onend = function () {
      state.isSpeaking = false;
      render();
      if (onDone) onDone();
    };
    utterance.onerror = function () {
      state.isSpeaking = false;
      render();
    };

    window.speechSynthesis.speak(utterance);
  }

  function resetTurnState() {
    state.showTranslation = false;
    state.usedHintThisTurn = false;
    state.hadWrongAttemptThisTurn = false;
    state.selectedOptionId = null;
    state.chosenReplyText = null;
    state.feedback = null;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
  }

  // Item flies from the shelf into the customer's cart, then the POS scans it
  function flyItemToCart() {
    try {
      var src = document.querySelector(".gondola-item-slot.focused .slot-icon svg") || document.querySelector(".gondola-item-slot .slot-icon svg");
      var dst = document.querySelector(".cust-standee .cart-basket");
      if (!src || !dst || !src.getBoundingClientRect || !document.body.animate) return;
      var a = src.getBoundingClientRect(), b = dst.getBoundingClientRect();
      var el = document.createElement("div");
      el.className = "fly-item";
      el.innerHTML = src.outerHTML;
      el.style.left = a.left + "px";
      el.style.top = a.top + "px";
      document.body.appendChild(el);
      var dx = b.left + b.width / 2 - 30 - a.left, dy = b.top + b.height / 2 - 20 - a.top;
      var anim = el.animate(
          [
            { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: 1 },
            { transform: "translate(" + dx * 0.5 + "px," + (dy * 0.5 - 90) + "px) scale(1.15) rotate(-12deg)", opacity: 1, offset: 0.5 },
            { transform: "translate(" + dx + "px," + dy + "px) scale(0.45) rotate(8deg)", opacity: 0.9 }
          ],
          { duration: 950, easing: "cubic-bezier(.3,.7,.4,1)" }
      );
      anim.onfinish = function () {
        if (el.parentNode) el.parentNode.removeChild(el);
        var pos = document.querySelector(".pos-unit");
        if (pos) {
          pos.classList.add("scanning");
          setTimeout(function () { pos.classList.remove("scanning"); }, 750);
        }
      };
    } catch (e) {}
  }

  window.AEON_ACTIONS = {
    selectLine: function (lineId) {
      var line = data.lines.find(function (l) {
        return l.id === lineId;
      });
      if (!line) return;
      var currentLevelObj = getLevelObject(state.diamonds);
      if (currentLevelObj.level < line.requiredLevel) {
        playSoundEffect("error");
        alert(
            "Quầy " +
            line.name +
            " sẽ mở khóa khi bạn đạt Level " +
            line.requiredLevel +
            "! Hãy chốt thêm đơn để tích Kim Cương 💎 nhé."
        );
        return;
      }
      state.selectedLineId = lineId;
      jumpToFirstUnfinishedInLine(lineId);
      resetTurnState();
      saveState();
      render();
    },

    selectScenarioIdx: function (idx) {
      state.scenarioIndexInLine = idx;
      resetTurnState();
      render();
    },

    toggleHint: function () {
      if (!state.showTranslation) {
        state.usedHintThisTurn = true;
      }
      state.showTranslation = !state.showTranslation;
      render();
    },

    speakCurrentCustomer: function () {
      var lineScenarios = getLineScenarios(state.selectedLineId);
      var scen = lineScenarios[state.scenarioIndexInLine] || lineScenarios[0];
      speakEnglish(scen.customerSpeech, "customer");
    },

    speakKeyPhrase: function () {
      var lineScenarios = getLineScenarios(state.selectedLineId);
      var scen = lineScenarios[state.scenarioIndexInLine] || lineScenarios[0];
      speakEnglish(scen.keyPhrase);
    },

    speakScenarioKeyPhraseById: function (scenId) {
      var scen = data.scenarios.find(function (s) {
        return s.id === scenId;
      });
      if (scen) speakEnglish(scen.keyPhrase);
    },

    speakCustomerReply: function () {
      var ls = getLineScenarios(state.selectedLineId);
      var sc = ls[state.scenarioIndexInLine] || ls[0];
      var d = DLG[sc.id];
      if (d) speakEnglish(d.reply, "customer");
    },

    speakShelfItem: function (name, tag) {
      speakEnglish(name + ". " + tag);
    },

    speakOptionByIndex: function (optIdx, event) {
      if (event) event.stopPropagation();
      var lineScenarios = getLineScenarios(state.selectedLineId);
      var scen = lineScenarios[state.scenarioIndexInLine] || lineScenarios[0];
      var opt = scen.options[optIdx];
      if (opt) speakEnglish(opt.text);
    },

    chooseOption: function (optIdx) {
      if (state.feedback && state.feedback.type === "success") return;

      var lineScenarios = getLineScenarios(state.selectedLineId);
      var currentScenario = lineScenarios[state.scenarioIndexInLine] || lineScenarios[0];
      var option = currentScenario.options[optIdx];
      if (!option) return;

      state.selectedOptionId = option.id;
      state.chosenReplyText = option.text;

      if (option.isCorrect) {
        playSoundEffect("success");
        var baseReward = 10;
        var firstTryBonus =
            !state.usedHintThisTurn && !state.hadWrongAttemptThisTurn ? 5 : 0;
        var totalEarned = baseReward + firstTryBonus;

        var prevLevel = getLevelObject(state.diamonds).level;
        state.diamonds += totalEarned;
        var nextLevelObj = getLevelObject(state.diamonds);

        state.streak += 1;
        state.diamondFloat = "+" + totalEarned + " 💎";

        if (state.completedIds.indexOf(currentScenario.id) === -1) {
          state.completedIds.push(currentScenario.id);
        }

        state.feedback = {
          type: "success",
          text: option.feedbackVi,
          reward: baseReward,
          bonus: firstTryBonus
        };

        saveState();
        render();

        setTimeout(function () {
          state.diamondFloat = null;
          render();
        }, 1200);

        flyItemToCart();
        if ("speechSynthesis" in window) {
          var dlgNow = DLG[currentScenario.id];
          speakEnglish(option.text, "pg", function () {
            if (dlgNow) speakEnglish(dlgNow.reply, "customer");
          });
        }

        if (nextLevelObj.level > prevLevel) {
          setTimeout(function () {
            playSoundEffect("levelup");
            state.levelUpModal = nextLevelObj;
            render();
          }, 600);
        }
      } else {
        playSoundEffect("error");
        state.hadWrongAttemptThisTurn = true;
        state.streak = 0;
        state.hearts = Math.max(1, state.hearts - 1);
        state.feedback = {
          type: "error",
          text: option.feedbackVi
        };
        saveState();
        render();
      }
    },

    nextCustomer: function () {
      var lineScenarios = getLineScenarios(state.selectedLineId);
      var nextIdx = state.scenarioIndexInLine + 1;
      if (nextIdx < lineScenarios.length) {
        state.scenarioIndexInLine = nextIdx;
        resetTurnState();
      } else {
        state.shiftSummaryModal = true;
      }
      render();
    },

    refillHearts: function () {
      state.hearts = 5;
      playSoundEffect("success");
      saveState();
      render();
    },

    resetProgress: function () {
      if (
          window.confirm(
              "Bạn có chắc muốn đặt lại toàn bộ tiến trình chơi (Level 1, 0 Kim Cương) để chơi lại từ đầu không?"
          )
      ) {
        localStorage.removeItem(STORAGE_KEY);
        state.diamonds = 0;
        state.completedIds = [];
        state.selectedLineId = "line1";
        state.hearts = 5;
        state.streak = 0;
        state.scenarioIndexInLine = 0;
        resetTurnState();
        render();
      }
    },

    openHandbook: function () {
      state.showHandbook = true;
      render();
    },

    closeHandbook: function () {
      state.showHandbook = false;
      render();
    },

    setHandbookFilter: function (filterId) {
      state.handbookFilterLine = filterId;
      render();
    },

    closeLevelUpModal: function () {
      state.levelUpModal = null;
      render();
    },

    closeShiftSummary: function () {
      state.shiftSummaryModal = false;
      render();
    },

    replayCurrentLine: function () {
      state.shiftSummaryModal = false;
      state.scenarioIndexInLine = 0;
      resetTurnState();
      render();
    }
  };

  function render() {
    var root = document.getElementById("root");
    if (!root) return;

    var currentLevelObj = getLevelObject(state.diamonds);
    var currentLine = getCurrentLine();
    var lineScenarios = getLineScenarios(currentLine.id);
    var currentScenario =
        lineScenarios[state.scenarioIndexInLine] || lineScenarios[0];
    var dlg = DLG[currentScenario.id];
    var fbType = state.feedback ? state.feedback.type : null;
    var custMood = fbType === "success" ? "happy" : fbType === "error" ? "upset" : "think";
    var pgMood = fbType === "success" ? "happy" : fbType === "error" ? "think" : "smile";
    var custTalking = state.isSpeaking && state.speaker === "customer";
    var pgTalking = state.isSpeaking && state.speaker === "pg";
    var focusItem = currentLine.shelfItems.filter(function (it) {
      return currentScenario.productFocus.indexOf(it.name.split(" ")[0]) !== -1;
    })[0];
    var posText = fbType === "success" ? "✔ " + (focusItem ? focusItem.price : "TOTAL") + " · PAID" : "SCAN · READY";
    var custReplyHtml =
        fbType === "success" && dlg
            ? '<div class="cust-reply animate-pop"><div class="cust-reply-head"><strong>💬 Khách đáp lại:</strong><button class="btn-mini-speak" onclick="AEON_ACTIONS.speakCustomerReply()">🔈 Nghe</button></div><p>"' +
            escapeHtml(dlg.reply) + '"</p><div class="cust-reply-vi">→ ' + escapeHtml(dlg.replyVi) + "</div></div>"
            : "";
    var grammarHtml =
        fbType === "success" && dlg && dlg.grammar
            ? '<div class="grammar-spot">🧠 <strong>Ngữ pháp cần nhớ — ' + escapeHtml(dlg.grammar.title) + ":</strong> " + escapeHtml(dlg.grammar.tip) + "</div>"
            : "";

    var currentMin = currentLevelObj.minDiamonds;
    var currentNext = currentLevelObj.nextDiamonds;
    var isMaxLevel =
        currentLevelObj.level === data.levels[data.levels.length - 1].level;
    var percent = 100;
    var needed = 0;
    var isMax = false;
    if (isMaxLevel && state.diamonds >= currentNext) {
      isMax = true;
    } else {
      var span = currentNext - currentMin;
      var gained = Math.max(0, state.diamonds - currentMin);
      percent = Math.min(100, Math.round((gained / span) * 100));
      needed = Math.max(0, currentNext - state.diamonds);
    }

    var completedInCurrentLine = lineScenarios.filter(function (s) {
      return state.completedIds.indexOf(s.id) !== -1;
    }).length;

    // Build Line Tabs HTML
    var lineTabsHtml = data.lines
        .map(function (line) {
          var isUnlocked = currentLevelObj.level >= line.requiredLevel;
          var isSelected = line.id === currentLine.id;
          var lineTotal = getLineScenarios(line.id).length;
          var lineDone = getLineScenarios(line.id).filter(function (s) {
            return state.completedIds.indexOf(s.id) !== -1;
          }).length;

          var btnClass = isSelected
              ? "line-tab active"
              : isUnlocked
                  ? "line-tab unlocked"
                  : "line-tab locked";

          var badgeHtml = isUnlocked
              ? '<span class="line-badge ' +
              (isSelected ? "badge-active" : "badge-unlocked") +
              '">' +
              lineDone +
              "/" +
              lineTotal +
              "</span>"
              : '<span class="line-badge badge-locked">Mở ở Lv.' +
              line.requiredLevel +
              "</span>";

          return (
              '<button onclick="AEON_ACTIONS.selectLine(\'' +
              line.id +
              '\')" class="' +
              btnClass +
              '">' +
              '<span class="line-icon">' +
              (isUnlocked ? line.icon : "🔒") +
              "</span>" +
              "<span>Line " +
              line.number +
              ": " +
              escapeHtml(line.name) +
              "</span>" +
              badgeHtml +
              "</button>"
          );
        })
        .join("");

    // Queue step buttons
    var queueDotsHtml = lineScenarios
        .map(function (scen, idx) {
          var isDone = state.completedIds.indexOf(scen.id) !== -1;
          var isCurrent = idx === state.scenarioIndexInLine;
          var cls = isCurrent
              ? "step-dot current"
              : isDone
                  ? "step-dot done"
                  : "step-dot";
          return (
              '<button onclick="AEON_ACTIONS.selectScenarioIdx(' +
              idx +
              ')" title="Khách ' +
              (idx + 1) +
              ": " +
              escapeHtml(scen.customerName) +
              '" class="' +
              cls +
              '">' +
              (isDone ? "✓" : idx + 1) +
              "</button>"
          );
        })
        .join("");

    // Animated Passersby in the Aisle
    var walkersList = PASSERSBY_BY_LINE[currentLine.id] || PASSERSBY_BY_LINE.line1;
    var passersbyHtml = walkersList
        .map(function (w, wi) {
          var look = CH.walkerLook(currentLine.number, wi);
          return (
              '<div class="passerby-walker ' +
              w.dir +
              '" style="animation-duration:' +
              w.duration +
              "; animation-delay:" +
              (parseFloat(w.delay) - (Date.now() - T0) / 1000).toFixed(2) +
              "s; bottom:" + look.b + 'px;">' +
              '<div class="passerby-chatter">💬 "' +
              escapeHtml(w.text) +
              '"</div>' +
              '<div class="passerby-figure">' +
              CH.walker(look, w.dir === "dir-rtl") +
              "</div>" +
              "</div>"
          );
        })
        .join("");

    // 3D Gondola Shelf items HTML
    var shelfItemsHtml = currentLine.shelfItems
        .map(function (item, si) {
          var firstWord = item.name.split(" ")[0];
          var isFocused =
              currentScenario.productFocus.indexOf(firstWord) !== -1;
          return (
              '<div class="gondola-item-slot ' +
              (isFocused ? "focused" : "") +
              '" onclick="AEON_ACTIONS.speakShelfItem(\'' +
              escapeHtml(item.name) +
              "', '" +
              escapeHtml(item.tag) +
              '\')" title="Bấm để nghe tên sản phẩm tiếng Anh">' +
              '<span class="slot-promo-badge">' +
              escapeHtml(item.tag) +
              "</span>" +
              '<div class="slot-icon">' +
              CH.pack(item.icon, si, currentLine.number) +
              "</div>" +
              '<div class="slot-name">' +
              escapeHtml(item.name) +
              "</div>" +
              '<div class="slot-price-rail">' +
              escapeHtml(item.price) +
              "</div>" +
              "</div>"
          );
        })
        .join("");

    // PG Overhead Speech Bubble Text
    var pgSpeechHtml = "";
    if (state.feedback && state.feedback.type === "success") {
      pgSpeechHtml =
          "💬 <strong>" +
          escapeHtml(currentLine.pgName) +
          ':</strong> "' +
          escapeHtml(state.chosenReplyText || currentScenario.keyPhrase) +
          '"';
    } else if (state.feedback && state.feedback.type === "error") {
      pgSpeechHtml =
          "💬 <strong>" +
          escapeHtml(currentLine.pgName) +
          ':</strong> "Oops, let me rephrase that more politely for you!"';
    } else {
      pgSpeechHtml =
          "💬 <strong>" +
          escapeHtml(currentLine.pgName) +
          ':</strong> "Welcome to AEON Mall! How may I help you today?"';
    }

    // Options HTML (2-column console below the live supermarket stage)
    var letters = ["A", "B", "C", "D"];
    var optionsHtml = currentScenario.options
        .map(function (option, idx) {
          var isSelected = state.selectedOptionId === option.id;
          var isAnsweredCorrect =
              state.feedback &&
              state.feedback.type === "success" &&
              option.isCorrect;
          var isWrongSelected =
              state.feedback &&
              state.feedback.type === "error" &&
              isSelected &&
              !option.isCorrect;

          var cardClass = "option-card";
          var badgeText = letters[idx] || "A";
          if (isAnsweredCorrect) {
            cardClass += " correct";
            badgeText = "✓";
          } else if (isWrongSelected) {
            cardClass += " wrong";
            badgeText = "✕";
          } else if (isSelected) {
            cardClass += " selected";
          }

          return (
              '<div class="' +
              cardClass +
              '">' +
              '<button class="option-main-btn" onclick="AEON_ACTIONS.chooseOption(' +
              idx +
              ')">' +
              '<span class="option-letter">' +
              badgeText +
              "</span>" +
              '<span class="option-text">' +
              escapeHtml(option.text) +
              "</span>" +
              "</button>" +
              '<button class="option-speak-btn" title="Nghe phát âm đáp án này" onclick="AEON_ACTIONS.speakOptionByIndex(' +
              idx +
              ', event)">🔈</button>' +
              "</div>"
          );
        })
        .join("");

    // Feedback HTML
    var feedbackHtml = "";
    if (state.feedback) {
      var isSuccess = state.feedback.type === "success";
      feedbackHtml =
          '<div class="feedback-box ' +
          (isSuccess ? "feedback-success" : "feedback-error") +
          ' animate-pop">' +
          '<div class="feedback-header">' +
          '<div class="feedback-title">' +
          (isSuccess
              ? "🎉 BÍP! CHỐT ĐƠN THÀNH CÔNG — KHÁCH ĐÃ BỎ HÀNG VÀO GIỎ!"
              : "💡 KHÁCH LẮC ĐẦU CHƯA ƯNG Ý — HÃY CHỌN CÂU LỊCH SỰ HƠN NHÉ! (-1 ❤️)") +
          "</div>" +
          (isSuccess
              ? '<div class="reward-pills">' +
              '<span class="pill-green">+' +
              state.feedback.reward +
              " 💎 Chốt đơn</span>" +
              (state.feedback.bonus > 0
                  ? '<span class="pill-aeon">+' +
                  state.feedback.bonus +
                  " 💎 Phản xạ nhanh</span>"
                  : "") +
              "</div>"
              : "") +
          "</div>" +
          '<p class="feedback-desc">' +
          escapeHtml(state.feedback.text) +
          "</p>" +
          grammarHtml +
          (isSuccess
              ? '<div class="feedback-bottom-row">' +
              '<div class="saved-keyphrase-inline">🌟 <strong>Mẫu câu chuẩn đã lưu:</strong> "' +
              escapeHtml(currentScenario.keyPhrase) +
              '" <button class="btn-mini-speak" onclick="AEON_ACTIONS.speakKeyPhrase()">🔈 Nghe lại</button></div>' +
              '<button class="btn-next-customer pulse-aeon" onclick="AEON_ACTIONS.nextCustomer()">' +
              (state.scenarioIndexInLine + 1 < lineScenarios.length
                  ? "Đón vị khách tiếp theo bước vào quầy ➔"
                  : "Tổng kết ca làm việc tại Line ➔") +
              "</button>" +
              "</div>"
              : "") +
          "</div>";
    }

    // Level Up Modal HTML
    var levelUpModalHtml = "";
    if (state.levelUpModal) {
      var lv = state.levelUpModal;
      levelUpModalHtml =
          '<div class="modal-backdrop">' +
          '<div class="modal-card modal-small animate-pop">' +
          '<div class="levelup-icon">' +
          lv.badgeIcon +
          "</div>" +
          '<span class="pill-tag">THĂNG CẤP THÀNH CÔNG!</span>' +
          '<h2 class="modal-title">Level ' +
          lv.level +
          ": " +
          escapeHtml(lv.title) +
          "</h2>" +
          '<p class="modal-subtitle">' +
          escapeHtml(lv.enTitle) +
          "</p>" +
          '<div class="perk-box">' +
          '<div class="perk-label">🎁 Quyền lợi mới mở khóa:</div>' +
          "<div>" +
          escapeHtml(lv.perk) +
          "</div>" +
          "</div>" +
          '<button class="btn-primary-full" onclick="AEON_ACTIONS.closeLevelUpModal()">Tuyệt vời! Tiếp tục bán hàng 💎</button>' +
          "</div>" +
          "</div>";
    }

    // Shift Summary Modal HTML
    var shiftSummaryHtml = "";
    if (state.shiftSummaryModal) {
      var summaryItems = lineScenarios
          .map(function (s, idx) {
            return (
                '<div class="handbook-item">' +
                '<div class="handbook-item-main">' +
                '<div class="handbook-tag">' +
                (idx + 1) +
                ". " +
                escapeHtml(s.productFocus) +
                " (" +
                escapeHtml(s.customerName) +
                ")</div>" +
                '<div class="handbook-en">"' +
                escapeHtml(s.keyPhrase) +
                '"</div>' +
                '<div class="handbook-vi">→ ' +
                escapeHtml(s.keyPhraseVi) +
                "</div>" +
                '<div class="handbook-vocab">📌 Từ vựng: ' +
                escapeHtml(s.vocabularyNote) +
                "</div>" +
                "</div>" +
                '<button class="btn-mini-speak" onclick="AEON_ACTIONS.speakScenarioKeyPhraseById(\'' +
                s.id +
                "')\">🔈 Nghe</button>" +
                "</div>"
            );
          })
          .join("");

      var nextLineButtons = data.lines
          .map(function (l) {
            var unlocked = currentLevelObj.level >= l.requiredLevel;
            if (l.id === currentLine.id || !unlocked) return "";
            return (
                '<button class="btn-aeon" onclick="AEON_ACTIONS.closeShiftSummary(); AEON_ACTIONS.selectLine(\'' +
                l.id +
                "')\">Qua Line " +
                l.number +
                ": " +
                escapeHtml(l.name) +
                " ➔</button>"
            );
          })
          .join("");

      shiftSummaryHtml =
          '<div class="modal-backdrop">' +
          '<div class="modal-card modal-large animate-pop">' +
          '<div class="modal-header-bar">' +
          "<div>" +
          '<div class="modal-kicker">HOÀN THÀNH CA LÀM VIỆC</div>' +
          "<h2>🎉 Tổng kết Line " +
          currentLine.number +
          ": " +
          escapeHtml(currentLine.name) +
          "</h2>" +
          "</div>" +
          '<button class="btn-close-x" onclick="AEON_ACTIONS.closeShiftSummary()">✕</button>' +
          "</div>" +
          '<div class="modal-body-scroll">' +
          '<div class="summary-stats-grid">' +
          '<div class="stat-card"><span>Đơn đã chốt ở Line</span><strong>' +
          completedInCurrentLine +
          "/" +
          lineScenarios.length +
          "</strong></div>" +
          '<div class="stat-card"><span>Tổng Kim Cương</span><strong>' +
          state.diamonds +
          " 💎</strong></div>" +
          '<div class="stat-card"><span>Cấp bậc hiện tại</span><strong>Lv.' +
          currentLevelObj.level +
          " " +
          escapeHtml(currentLevelObj.title) +
          "</strong></div>" +
          "</div>" +
          '<h3 class="section-subtitle">📚 Các mẫu câu giao tiếp tiếng Anh đã học tại ' +
          escapeHtml(currentLine.name) +
          ":</h3>" +
          '<div class="handbook-list">' +
          summaryItems +
          "</div>" +
          "</div>" +
          '<div class="modal-footer-bar">' +
          '<button class="btn-outline" onclick="AEON_ACTIONS.replayCurrentLine()">🔁 Luyện lại Line này</button>' +
          '<div class="footer-right-btns">' +
          nextLineButtons +
          '<button class="btn-dark" onclick="AEON_ACTIONS.closeShiftSummary()">Đóng</button>' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>";
    }

    // Handbook Modal HTML
    var handbookModalHtml = "";
    if (state.showHandbook) {
      var filteredScenarios = data.scenarios.filter(function (s) {
        var isLearned = state.completedIds.indexOf(s.id) !== -1;
        if (state.handbookFilterLine === "learned") return isLearned;
        if (state.handbookFilterLine === "all") return true;
        return s.lineId === state.handbookFilterLine;
      });

      var filterTabs = [
        { id: "all", label: "Tất cả (21 mẫu câu)" },
        {
          id: "learned",
          label: "Đã chốt đơn (" + state.completedIds.length + ")"
        },
        { id: "line1", label: "🍵 Line 1: Đồ ăn & Nước" },
        { id: "line2", label: "💄 Line 2: Mỹ phẩm" },
        { id: "line3", label: "🏠 Line 3: Gia dụng & VPP" }
      ]
          .map(function (t) {
            var active = state.handbookFilterLine === t.id;
            return (
                '<button class="filter-pill ' +
                (active ? "active" : "") +
                '" onclick="AEON_ACTIONS.setHandbookFilter(\'' +
                t.id +
                "')\">" +
                escapeHtml(t.label) +
                "</button>"
            );
          })
          .join("");

      var handbookCardsHtml =
          filteredScenarios.length === 0
              ? '<div class="empty-state">📭 Chưa có mẫu câu nào trong mục này. Hãy chốt đơn cho khách để lưu mẫu câu nhé!</div>'
              : filteredScenarios
                  .map(function (scen) {
                    var isLearned = state.completedIds.indexOf(scen.id) !== -1;
                    return (
                        '<div class="handbook-item ' +
                        (isLearned ? "learned" : "") +
                        '">' +
                        '<div class="handbook-item-main">' +
                        '<div class="handbook-meta">' +
                        '<span class="handbook-tag">' +
                        escapeHtml(scen.productFocus) +
                        "</span>" +
                        '<span class="handbook-customer">Khách: ' +
                        escapeHtml(scen.customerName) +
                        " (" +
                        escapeHtml(scen.customerOrigin) +
                        ")</span>" +
                        (isLearned
                            ? '<span class="learned-badge">✓ Đã thuộc</span>'
                            : '<span class="unlearned-badge">Chưa học</span>') +
                        "</div>" +
                        '<div class="handbook-q"><strong>Khách hỏi:</strong> "' +
                        escapeHtml(scen.customerSpeech) +
                        '"</div>' +
                        '<div class="handbook-en"><strong>PG trả lời:</strong> "' +
                        escapeHtml(scen.keyPhrase) +
                        '"</div>' +
                        '<div class="handbook-vi">→ ' +
                        escapeHtml(scen.keyPhraseVi) +
                        "</div>" +
                        '<div class="handbook-vocab">📌 Từ vựng cần nhớ: ' +
                        escapeHtml(scen.vocabularyNote) +
                        "</div>" +
                        "</div>" +
                        '<button class="btn-aeon-sm" onclick="AEON_ACTIONS.speakScenarioKeyPhraseById(\'' +
                        scen.id +
                        "')\">🔈 Phát âm</button>" +
                        "</div>"
                    );
                  })
                  .join("");

      handbookModalHtml =
          '<div class="modal-backdrop">' +
          '<div class="modal-card modal-large animate-pop">' +
          '<div class="modal-header-bar">' +
          "<div>" +
          '<div class="modal-kicker">AEON SALES ENGLISH HANDBOOK</div>' +
          "<h2>📒 Sổ Tay Mẫu Câu & Từ Vựng (" +
          state.completedIds.length +
          "/" +
          data.scenarios.length +
          " đã học)</h2>" +
          "</div>" +
          '<button class="btn-close-x" onclick="AEON_ACTIONS.closeHandbook()">✕</button>' +
          "</div>" +
          '<div class="filter-bar">' +
          filterTabs +
          "</div>" +
          '<div class="modal-body-scroll">' +
          '<div class="handbook-list">' +
          handbookCardsHtml +
          "</div>" +
          "</div>" +
          '<div class="modal-footer-bar" style="justify-content:flex-end;">' +
          '<button class="btn-aeon" onclick="AEON_ACTIONS.closeHandbook()">Đóng sổ tay</button>' +
          "</div>" +
          "</div>" +
          "</div>";
    }

    var moodIcon =
        state.feedback && state.feedback.type === "success"
            ? "🤩"
            : state.feedback && state.feedback.type === "error"
                ? "😕"
                : "🙋🏼‍♂️";

    var isScenarioDone =
        state.completedIds.indexOf(currentScenario.id) !== -1;

    root.innerHTML =
        '<div class="app-shell">' +
        /* HEADER */
        '<header class="top-header">' +
        '<div class="header-inner">' +
        '<div class="brand-and-level">' +
        '<div class="aeon-logo-box">' +
        '<span class="aeon-brand-text">AEON</span>' +
        '<span class="aeon-sub-badge">Mall Simulator</span>' +
        "</div>" +
        '<div class="pg-profile-pill">' +
        '<div class="pg-mini-avatar">' +
        currentLine.pgAvatar +
        "</div>" +
        '<div class="pg-level-info">' +
        '<div class="pg-level-title">' +
        '<span class="lv-tag">Lv.' +
        currentLevelObj.level +
        "</span>" +
        "<strong>" +
        currentLevelObj.badgeIcon +
        " " +
        escapeHtml(currentLevelObj.title) +
        "</strong>" +
        "</div>" +
        '<div class="progress-wrap">' +
        '<div class="progress-labels">' +
        "<span>" +
        escapeHtml(currentLevelObj.enTitle) +
        "</span>" +
        "<span>" +
        (isMax
            ? "MAX LEVEL"
            : "Còn " +
            needed +
            " 💎 lên Lv." +
            (currentLevelObj.level + 1)) +
        "</span>" +
        "</div>" +
        '<div class="progress-track">' +
        '<div class="progress-fill" style="width:' +
        percent +
        '%"></div>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="header-actions">' +
        '<div class="heart-pill" title="Bấm để hồi đầy tim năng lượng" onclick="AEON_ACTIONS.refillHearts()">❤️ ' +
        state.hearts +
        "/5</div>" +
        '<div class="diamond-pill">' +
        "<span>💎</span><strong>" +
        state.diamonds +
        "</strong>" +
        (state.diamondFloat
            ? '<span class="diamond-burst-badge animate-diamond-burst">' +
            state.diamondFloat +
            "</span>"
            : "") +
        "</div>" +
        '<button class="btn-handbook" onclick="AEON_ACTIONS.openHandbook()">📒 Sổ tay (' +
        state.completedIds.length +
        "/" +
        data.scenarios.length +
        ")</button>" +
        '<button class="btn-reset" title="Chơi lại từ đầu" onclick="AEON_ACTIONS.resetProgress()">🔄</button>' +
        "</div>" +
        "</div>" +
        /* LINE SWITCHER */
        '<div class="line-switcher-bar">' +
        '<div class="line-switcher-inner">' +
        '<span class="switcher-label">CHỌN QUẦY HÀNG (LINE):</span>' +
        lineTabsHtml +
        "</div>" +
        "</div>" +
        "</header>" +
        /* MAIN AREA */
        '<main class="main-container">' +
        /* ================= REALISTIC 2.5D SUPERMARKET WORLD ================= */
        '<section class="supermarket-world">' +
        /* 1. Ceiling with LED tubes & Swinging AEON Signboards */
        '<div class="mall-ceiling">' +
        '<div class="ceiling-lights"><span class="led-tube"></span><span class="led-tube"></span><span class="led-tube"></span><span class="led-tube"></span></div>' +
        '<div class="hanging-sign">' +
        "<span>" +
        currentLine.icon +
        "</span>" +
        "<span>AISLE " +
        currentLine.number +
        " • " +
        escapeHtml(currentLine.enName.toUpperCase()) +
        "</span>" +
        "</div>" +
        '<div class="hanging-promo-banner">✨ ' +
        escapeHtml(currentLine.bannerText) +
        " ✨</div>" +
        '<div class="ceiling-right-controls">' +
        '<span style="color:#fbcfe8; font-size:11.5px; font-weight:800; margin-right:4px;">Khách (' +
        (state.scenarioIndexInLine + 1) +
        "/" +
        lineScenarios.length +
        "):</span>" +
        queueDotsHtml +
        "</div>" +
        "</div>" +
        /* 2. Distant Supermarket Departments Wall */
        '<div class="mall-back-wall">' +
        '<div class="distant-department">🍣 <span>AEON SUSHI & DELICA</span> <span class="distant-tag">FRESH</span></div>' +
        '<div class="distant-department">🥐 <span>AEON BAKERY CAFE</span> <span class="distant-tag">HOT BREAD</span></div>' +
        '<div class="distant-department">🏧 <span>TAX REFUND & CASHIER</span> <span class="distant-tag">EXIT A ➔</span></div>' +
        "</div>" +
        /* 3. Animated Pedestrian Walkway Aisle with Shoppers Walking & Talking! */
        '<div class="mall-pedestrian-aisle">' +
        '<div class="aisle-floor-label">🚶 LỐI ĐI SIÊU THỊ AEON MALL (MAIN SHOPPING AISLE) 🛒</div>' +
        passersbyHtml +
        "</div>" +
        /* 4. Foreground Interactive Booth: 3D Gondola Rack + Live Talking Characters */
        '<div class="mall-foreground-stage">' +
        /* Left: 3D Multi-tier Gondola Product Rack */
        '<div class="gondola-rack">' +
        '<div class="gondola-top-canopy">' +
        "<span>🛍️ KỆ HÀNG " +
        escapeHtml(currentLine.name.toUpperCase()) +
        "</span>" +
        '<span class="canopy-focus-pill">Khách hỏi: ' +
        escapeHtml(currentScenario.productFocus) +
        "</span>" +
        "</div>" +
        '<div class="gondola-shelves-grid">' +
        shelfItemsHtml +
        "</div>" +
        "</div>" +
        /* Right: Live Consultation Counter with Overhead Speech Bubbles */
        '<div class="booth-stage-area">' +
        '<div class="characters-live-floor">' +
        /* PG Character + PG Overhead Speech Bubble */
        '<div class="actor-spot">' +
        '<div class="overhead-speech-bubble pg-bubble">' +
        pgSpeechHtml +
        "</div>" +
        '<div class="actor-body-card pg-standee animate-float">' +
        '<div class="actor-emoji-face">' +
        CH.pg(currentLine.id, pgMood, pgTalking) +
        "</div>" +
        '<div class="actor-uniform-label">🪪 ' +
        escapeHtml(currentLine.pgName) +
        "</div>" +
        "</div>" +
        "</div>" +
        /* Foreign Customer + Customer Overhead Live Speech Bubble */
        '<div class="actor-spot animate-walk-in">' +
        '<div class="overhead-speech-bubble cust-bubble">' +
        '<div class="bubble-top-bar">' +
        '<span class="cust-origin-badge">' +
        escapeHtml(currentScenario.customerName) +
        " (" +
        escapeHtml(currentScenario.customerOrigin) +
        ")</span>" +
        '<button class="btn-bubble-audio ' +
        (state.isSpeaking ? "speaking" : "") +
        '" onclick="AEON_ACTIONS.speakCurrentCustomer()">' +
        (state.isSpeaking ? "🔊 Đang nói..." : "🔈 Nghe khách nói") +
        "</button>" +
        "</div>" +
        '<p class="cust-speech-text">"' +
        escapeHtml(currentScenario.customerSpeech) +
        '"</p>' +
        custReplyHtml +
        '<div class="bubble-hint-bar">' +
        '<button class="btn-mini-translate" onclick="AEON_ACTIONS.toggleHint()">💡 ' +
        (state.showTranslation ? "Ẩn dịch tiếng Việt" : "Dịch tiếng Việt & Từ vựng") +
        "</button>" +
        (!state.usedHintThisTurn &&
        !state.hadWrongAttemptThisTurn &&
        !state.feedback
            ? '<span class="fast-bonus-pill">⚡ Không dịch: +5 💎</span>'
            : "") +
        "</div>" +
        (state.showTranslation
            ? '<div class="inline-translation-pop animate-pop">' +
            "<div><strong>🇻🇳 Dịch:</strong> \"" +
            escapeHtml(currentScenario.customerTranslation) +
            "\"</div>" +
            '<div style="margin-top:3px;"><strong>📌 Từ vựng:</strong> ' +
            escapeHtml(currentScenario.vocabularyNote) +
            "</div>" +
            "</div>"
            : "") +
        "</div>" +
        '<div class="actor-body-card cust-standee ' +
        (state.isSpeaking ? "animate-talking" : "") +
        " " +
        (state.feedback && state.feedback.type === "error"
            ? "animate-shake"
            : "") +
        '">' +
        '<div class="actor-emoji-face">' +
        CH.customer(currentScenario.id, custMood, custTalking) +
        "</div>" +
        '<span class="actor-reaction-floating">' +
        moodIcon +
        "</span>" +
        '<div class="actor-uniform-label">🌍 ' +
        escapeHtml(currentScenario.customerName) +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        /* Foreground Checkout / Tasting Counter Table */
        '<div class="aeon-checkout-desk">' +
        '<div class="desk-surface-props">' +
        '<div class="desk-prop-item pos-unit"><span class="pos-scanner-dot"></span> <span>' + posText + "</span></div>" +
        '<div class="desk-prop-item">🎁 <span>Sản phẩm trên quầy: ' +
        escapeHtml(currentScenario.productFocus) +
        "</span></div>" +
        '<div class="desk-prop-item">' +
        (isScenarioDone
            ? "✅ <span>Đã thanh toán</span>"
            : "💬 <span>Đang tư vấn trực tiếp</span>") +
        "</div>" +
        "</div>" +
        '<div class="desk-front-sign">' +
        '<span class="desk-aeon-badge">AEON CONSULTATION COUNTER</span>' +
        "<span>" +
        (state.streak >= 2
            ? "🔥 Chuỗi chốt đơn liên tiếp x" + state.streak
            : "Độ khó tình huống: " + escapeHtml(currentScenario.difficulty)) +
        "</span>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</section>" +
        /* ================= INTERACTIVE RESPONSE CONSOLE ================= */
        '<section class="interaction-console">' +
        '<div class="console-header">' +
        "<h3>💁‍♀️ Bạn (PG AEON) sẽ trả lời vị khách này như thế nào?</h3>" +
        "<span>Bấm vào câu trả lời để nói với khách • Bấm 🔈 để nghe phát âm mẫu</span>" +
        "</div>" +
        '<div class="options-grid-2col">' +
        optionsHtml +
        "</div>" +
        feedbackHtml +
        "</section>" +
        "</main>" +
        levelUpModalHtml +
        shiftSummaryHtml +
        handbookModalHtml +
        "</div>";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();