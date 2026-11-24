// Data: Levels, Lines, and 21 Real-world AEON Mall Sales English Scenarios

window.AEON_GAME_DATA = {
  levels: [
    {
      level: 1,
      title: "PG Tập sự",
      enTitle: "Trainee PG",
      minDiamonds: 0,
      nextDiamonds: 60,
      badgeIcon: "🌱",
      perk: "Mở khóa Line 1: Đồ ăn vặt & Nước giải khát (Snacks & Drinks)"
    },
    {
      level: 2,
      title: "Chuyên viên tư vấn",
      enTitle: "Sales Consultant",
      minDiamonds: 60,
      nextDiamonds: 140,
      badgeIcon: "✨",
      perk: "Mở khóa Line 2: Mỹ phẩm & Chăm sóc da (Skincare & Cosmetics)"
    },
    {
      level: 3,
      title: "Best Seller",
      enTitle: "Senior Best Seller",
      minDiamonds: 140,
      nextDiamonds: 230,
      badgeIcon: "👑",
      perk: "Mở khóa Line 3: Đồ gia dụng & Văn phòng phẩm (Home & Stationery)"
    },
    {
      level: 4,
      title: "Quản lý Line",
      enTitle: "Line Supervisor",
      minDiamonds: 230,
      nextDiamonds: 350,
      badgeIcon: "🏆",
      perk: "Mở khóa toàn bộ siêu thị & Danh hiệu Quản lý xuất sắc AEON Mall!"
    }
  ],

  lines: [
    {
      id: "line1",
      number: 1,
      name: "Đồ ăn vặt & Nước giải khát",
      enName: "Snacks & Drinks",
      requiredLevel: 1,
      icon: "🍵",
      themeColor: "from-pink-600 to-fuchsia-700",
      lightBg: "bg-pink-50",
      borderColor: "border-pink-200",
      pgName: "Mai Anh (PG Line 1)",
      pgAvatar: "👩‍🍳",
      bannerText: "TOPVALU SNACKS & JAPANESE DRINKS - BUY 2 GET 1 FREE",
      shelfItems: [
        { icon: "🍵", name: "Matcha Latte", tag: "Best Seller", price: "45.000đ" },
        { icon: "🍘", name: "Seaweed Rice Cracker", tag: "2+1 Promo", price: "32.000đ" },
        { icon: "🍫", name: "Hokkaido Dark Choco", tag: "Low Sugar", price: "68.000đ" },
        { icon: "🥤", name: "Zero-Cal Peach Tea", tag: "New", price: "25.000đ" },
        { icon: "🍪", name: "Butter Almond Cookie", tag: "Gift Box", price: "120.000đ" },
        { icon: "🍜", name: "Spicy Miso Ramen", tag: "Hot", price: "28.000đ" }
      ]
    },
    {
      id: "line2",
      number: 2,
      name: "Mỹ phẩm & Chăm sóc da",
      enName: "Skincare & Cosmetics",
      requiredLevel: 2,
      icon: "💄",
      themeColor: "from-fuchsia-700 to-purple-700",
      lightBg: "bg-fuchsia-50",
      borderColor: "border-fuchsia-200",
      pgName: "Bảo Ngọc (Beauty Advisor)",
      pgAvatar: "👩‍💼",
      bannerText: "GLAM BEAUTIQUE AEON - JAPANESE SKINCARE & FREE TESTERS",
      shelfItems: [
        { icon: "🧴", name: "Cica Calming Toner", tag: "Sensitive Skin", price: "290.000đ" },
        { icon: "☀️", name: "Aqua UV Gel SPF50+", tag: "No White Cast", price: "245.000đ" },
        { icon: "💧", name: "Hyaluronic Serum", tag: "15% OFF", price: "380.000đ" },
        { icon: "💄", name: "Velvet Matte Lipstick", tag: "Tester Ready", price: "210.000đ" },
        { icon: "🧖‍♀️", name: "Sakura Sheet Mask (7p)", tag: "Combo Deal", price: "165.000đ" },
        { icon: "🫧", name: "Amino Gentle Cleanser", tag: "pH 5.5", price: "175.000đ" }
      ]
    },
    {
      id: "line3",
      number: 3,
      name: "Gia dụng & Văn phòng phẩm",
      enName: "Home & Stationery",
      requiredLevel: 3,
      icon: "🏠",
      themeColor: "from-purple-700 to-indigo-800",
      lightBg: "bg-purple-50",
      borderColor: "border-purple-200",
      pgName: "Minh Thư (Home Specialist)",
      pgAvatar: "👩‍🔧",
      bannerText: "HÓME COÓRDY & STATIONERY - SMART LIVING & 12-MONTH WARRANTY",
      shelfItems: [
        { icon: "🍼", name: "304 Thermal Tumbler", tag: "12h Hot/Cold", price: "260.000đ" },
        { icon: "🍱", name: "Glass Microwave Box", tag: "BPA-Free", price: "135.000đ" },
        { icon: "🖊️", name: "0.38mm Gel Pen Set", tag: "Made in Japan", price: "95.000đ" },
        { icon: "🫖", name: "Smart Electric Kettle", tag: "1-Yr Warranty", price: "590.000đ" },
        { icon: "📓", name: "B5 Dotted Planner", tag: "100gsm Paper", price: "85.000đ" },
        { icon: "🍳", name: "Ceramic Non-Stick Pan", tag: "Induction OK", price: "420.000đ" }
      ]
    }
  ],

  scenarios: [
    // ================= LINE 1: SNACKS & DRINKS (7 SCENARIOS) =================
    {
      id: "l1_s1",
      lineId: "line1",
      customerName: "Mr. Liam",
      customerOrigin: "Australia 🇦🇺",
      customerAvatar: "🧑🏼‍🦱",
      difficulty: "Cơ bản",
      productFocus: "🍵 Matcha Latte",
      customerSpeech: "Excuse me! This Japanese Matcha Latte looks great. How much is a box, and is it very sweet?",
      customerTranslation: "Xin lỗi cho tôi hỏi! Hộp Matcha Latte Nhật Bản này trông ngon quá. Một hộp giá bao nhiêu và vị của nó có ngọt gắt không?",
      keyPhrase: "It's 45,000 VND per box. It has a rich green tea flavor and is only lightly sweetened.",
      keyPhraseVi: "Sản phẩm có giá 45.000đ một hộp. Trà có vị matcha đậm đà và chỉ ngọt dịu nhẹ thôi ạ.",
      vocabularyNote: "lightly sweetened (ngọt dịu nhẹ), rich flavor (hương vị đậm đà)",
      options: [
        {
          id: "a",
          text: "It's 45,000 VND per box. It has a rich green tea flavor and is only lightly sweetened. Would you like to try a free sample?",
          isCorrect: true,
          feedbackVi: "Tuyệt vời! Bạn đã báo giá rõ ràng, mô tả đúng vị 'lightly sweetened' (ngọt dịu) và chủ động mời khách dùng thử (free sample)."
        },
        {
          id: "b",
          text: "Forty-five thousand. Look at the price tag on the shelf, please. Not too sweet.",
          isCorrect: false,
          feedbackVi: "Cách trả lời này hơi cộc lốc. Khi tư vấn tại AEON, bạn nên nói trọn câu lịch sự thay vì bảo khách tự nhìn bảng giá."
        },
        {
          id: "c",
          text: "Yes, it is very cheap and has super much sugar inside for you.",
          isCorrect: false,
          feedbackVi: "Sai ngữ pháp ('super much sugar') và chưa đúng thông tin sản phẩm, khiến khách e ngại về lượng đường."
        },
        {
          id: "d",
          text: "I don't drink matcha so I don't know the taste, sorry sir.",
          isCorrect: false,
          feedbackVi: "Là PG đứng quầy, bạn cần nắm rõ hương vị sản phẩm để tư vấn cho khách nhé!"
        }
      ]
    },
    {
      id: "l1_s2",
      lineId: "line1",
      customerName: "Ms. Chloe",
      customerOrigin: "USA 🇺🇸",
      customerAvatar: "👩🏼",
      difficulty: "Cơ bản",
      productFocus: "🍘 Seaweed Rice Cracker",
      customerSpeech: "Hi there! I see a 'Buy 2 Get 1 Free' sign on these seaweed rice crackers. Can I mix different flavors?",
      customerTranslation: "Chào bạn! Tôi thấy biển 'Mua 2 Tặng 1' ở quầy bánh gạo rong biển này. Tôi có được chọn gộp nhiều vị khác nhau không?",
      keyPhrase: "Yes, of course! You can mix and match any flavors from this promotion rack.",
      keyPhraseVi: "Dạ hoàn toàn được ạ! Chị có thể chọn kết hợp bất kỳ hương vị nào trên kệ khuyến mãi này.",
      vocabularyNote: "mix and match (chọn kết hợp nhiều loại/vị), promotion rack (kệ hàng khuyến mãi)",
      options: [
        {
          id: "a",
          text: "No, read the sign carefully. Only same flavor is okay.",
          isCorrect: false,
          feedbackVi: "Câu nói thiếu lịch sự ('read the sign carefully') và làm khách mất thiện cảm."
        },
        {
          id: "b",
          text: "Yes, of course! You can mix and match any flavors on this promotion rack, and the third pack is completely free.",
          isCorrect: true,
          feedbackVi: "Chính xác! Cụm từ 'mix and match any flavors' cực kỳ tự nhiên và hữu ích khi giải thích chương trình khuyến mãi tại siêu thị."
        },
        {
          id: "c",
          text: "Buy two pay three, you can take whatever you want.",
          isCorrect: false,
          feedbackVi: "Bạn nói nhầm thành 'Buy two pay three' (Mua 2 trả tiền 3) làm khách hiểu lầm hoàn toàn chương trình!"
        },
        {
          id: "d",
          text: "Maybe yes, maybe no, please ask the cashier later.",
          isCorrect: false,
          feedbackVi: "Trả lời thiếu chắc chắn sẽ khiến khách bỏ sản phẩm lại kệ."
        }
      ]
    },
    {
      id: "l1_s3",
      lineId: "line1",
      customerName: "Mr. Kenji",
      customerOrigin: "Singapore 🇸🇬",
      customerAvatar: "👨🏻",
      difficulty: "Trung bình",
      productFocus: "🥤 Zero-Cal Peach Tea",
      customerSpeech: "I'm on a low-sugar diet. Could you recommend a refreshing drink that doesn't have added sugar?",
      customerTranslation: "Tôi đang ăn kiêng giảm đường. Bạn có thể gợi ý giúp tôi một loại đồ uống giải khát không chứa đường pha thêm được không?",
      keyPhrase: "I highly recommend this Zero-Calorie Peach Tea. It's sugar-free and very refreshing!",
      keyPhraseVi: "Em xin gợi ý dòng Trà Đào 0 Calo này ạ. Sản phẩm không đường và uống rất mát!",
      vocabularyNote: "sugar-free / no added sugar (không đường), refreshing (tươi mát, sảng khoái)",
      options: [
        {
          id: "a",
          text: "You should drink water only because all drinks here make you fat.",
          isCorrect: false,
          feedbackVi: "Nói 'make you fat' là tối kỵ trong giao tiếp bán hàng! Bạn vừa mất đơn vừa làm khách phật ý."
        },
        {
          id: "b",
          text: "I highly recommend our Zero-Calorie Peach Tea! It's completely sugar-free and tastes very refreshing.",
          isCorrect: true,
          feedbackVi: "Chuẩn xác! Sử dụng 'I highly recommend...' kèm từ khóa 'sugar-free' và 'refreshing' đánh trúng tâm lý khách ăn kiêng."
        },
        {
          id: "c",
          text: "This chocolate drink has 50% sugar, maybe good enough for you.",
          isCorrect: false,
          feedbackVi: "Khách đang tìm đồ uống không đường (no added sugar), giới thiệu đồ uống có 50% đường là chưa đúng nhu cầu."
        },
        {
          id: "d",
          text: "Sorry, I don't know what 'low-sugar diet' means.",
          isCorrect: false,
          feedbackVi: "Đừng bỏ cuộc! 'Low-sugar diet' là chế độ ăn ít đường, rất phổ biến khi khách mua đồ uống."
        }
      ]
    },
    {
      id: "l1_s4",
      lineId: "line1",
      customerName: "Mrs. Elena",
      customerOrigin: "Germany 🇩🇪",
      customerAvatar: "👩🏼‍🦳",
      difficulty: "Trung bình",
      productFocus: "🍪 Butter Almond Cookie",
      customerSpeech: "My son has a peanut allergy. Do these butter cookies contain any peanuts?",
      customerTranslation: "Con trai tôi bị dị ứng đậu phộng (lạc). Loại bánh quy bơ này có chứa đậu phộng không bạn?",
      keyPhrase: "Let me check the allergen information for you. This one contains almonds, not peanuts, but it's made in a facility that handles nuts.",
      keyPhraseVi: "Để em kiểm tra thông tin chất gây dị ứng giúp chị nhé. Bánh này dùng hạnh nhân chứ không có đậu phộng, nhưng được sản xuất tại nhà máy có xử lý các loại hạt ạ.",
      vocabularyNote: "allergen information (thông tin chất gây dị ứng), contain (chứa thành phần)",
      options: [
        {
          id: "a",
          text: "It's okay, eating a little bit of peanut won't hurt him.",
          isCorrect: false,
          feedbackVi: "Rất nguy hiểm! Dị ứng thực phẩm (food allergy) là vấn đề nghiêm trọng, tuyệt đối không khuyên khách cứ ăn thử."
        },
        {
          id: "b",
          text: "Let me check the ingredient label for you. It uses almonds instead of peanuts, and here is our nut-free rice cracker if you want to be 100% safe!",
          isCorrect: true,
          feedbackVi: "Tư vấn cực kỳ chuyên nghiệp! Bạn vừa kiểm tra nhãn thành phần (ingredient label), vừa gợi ý thêm lựa chọn 'nut-free' an toàn tuyệt đối."
        },
        {
          id: "c",
          text: "No peanut, only butter. Just buy it quickly.",
          isCorrect: false,
          feedbackVi: "Trả lời qua loa và thúc giục khách ('Just buy it quickly') khiến khách không yên tâm về độ an toàn của sản phẩm."
        },
        {
          id: "d",
          text: "I cannot read English on the box, you check it yourself.",
          isCorrect: false,
          feedbackVi: "Thái độ đùn đẩy cho khách tự xem là không phù hợp với tiêu chuẩn dịch vụ AEON."
        }
      ]
    },
    {
      id: "l1_s5",
      lineId: "line1",
      customerName: "Mr. David",
      customerOrigin: "UK 🇬🇧",
      customerAvatar: "🧔🏻‍♂️",
      difficulty: "Trung bình",
      productFocus: "🍫 Hokkaido Dark Choco",
      customerSpeech: "I'm flying back to London tomorrow and want to buy some snacks as gifts. When is the expiration date on this chocolate box?",
      customerTranslation: "Ngày mai tôi bay về London và muốn mua ít đồ ăn vặt làm quà. Hạn sử dụng của hộp sô-cô-la này là đến khi nào vậy?",
      keyPhrase: "The expiration date is printed on the back—it's good until October next year, perfect for gifts!",
      keyPhraseVi: "Hạn sử dụng được in ở mặt sau hộp ạ—bánh còn hạn đến tháng 10 năm sau, rất thích hợp để làm quà tặng!",
      vocabularyNote: "expiration date / best before (hạn sử dụng), printed on the back (in ở mặt sau)",
      options: [
        {
          id: "a",
          text: "The expiration date is printed on the back—it's good until October next year! It also comes in a lovely gift box, perfect for traveling.",
          isCorrect: true,
          feedbackVi: "Xuất sắc! Bạn chỉ rõ vị trí hạn sử dụng (expiration date) và khen thêm bao bì hộp quà rất hợp mang đi máy bay."
        },
        {
          id: "b",
          text: "It expires next week, so you must eat it on the airplane tomorrow.",
          isCorrect: false,
          feedbackVi: "Khách mua làm quà tặng (as gifts) mà bạn đưa hàng cận date tuần sau là khách sẽ từ chối ngay!"
        },
        {
          id: "c",
          text: "Chocolate never expires, don't worry about the date.",
          isCorrect: false,
          feedbackVi: "Thông tin sai thực tế. Mọi thực phẩm đóng gói đều có hạn sử dụng (Best Before / Expiration Date)."
        },
        {
          id: "d",
          text: "Where is London? Have a nice flight goodbye.",
          isCorrect: false,
          feedbackVi: "Bạn quên mất chưa trả lời câu hỏi chính của khách về hạn sử dụng rồi!"
        }
      ]
    },
    {
      id: "l1_s6",
      lineId: "line1",
      customerName: "Ms. Yuna",
      customerOrigin: "South Korea 🇰🇷",
      customerAvatar: "👩🏻",
      difficulty: "Nâng cao",
      productFocus: "🍜 Spicy Miso Ramen",
      customerSpeech: "I love spicy noodles, but is this Spicy Miso Ramen too hot? How does it compare to Korean fire noodles?",
      customerTranslation: "Tôi thích mì cay, nhưng loại Mì Miso Cay này có cay quá không? So với mì cay Hàn Quốc thì thế nào?",
      keyPhrase: "It's mildly spicy with a savory miso broth—much gentler than Korean fire noodles!",
      keyPhraseVi: "Mì này có vị cay vừa phải cùng nước súp miso đậm đà—dịu hơn nhiều so với mì siêu cay Hàn Quốc ạ!",
      vocabularyNote: "mildly spicy (cay vừa phải), savory broth (nước súp đậm đà thơm ngon)",
      options: [
        {
          id: "a",
          text: "It's mildly spicy with a rich, savory miso broth—much gentler than Korean fire noodles, so you can really enjoy the flavor!",
          isCorrect: true,
          feedbackVi: "Điểm 10 cho khả năng mô tả ẩm thực! Cụm 'mildly spicy' và 'savory miso broth' giúp khách hình dung hương vị ngay lập tức."
        },
        {
          id: "b",
          text: "It is super hot, your mouth will burn if you eat it.",
          isCorrect: false,
          feedbackVi: "Mô tả phóng đại làm khách sợ không dám mua."
        },
        {
          id: "c",
          text: "Japanese noodles and Korean noodles are the same thing.",
          isCorrect: false,
          feedbackVi: "Trả lời thiếu kiến thức sản phẩm. Mì Miso Nhật Bản có vị thanh và đậm súp tương miso, khác hẳn mì cay Hàn Quốc."
        },
        {
          id: "d",
          text: "I don't eat spicy food, please choose another one.",
          isCorrect: false,
          feedbackVi: "Câu trả lời làm cụt hứng mua sắm của khách hàng."
        }
      ]
    },
    {
      id: "l1_s7",
      lineId: "line1",
      customerName: "Mr. Carlos",
      customerOrigin: "Spain 🇪🇸",
      customerAvatar: "👨🏽",
      difficulty: "Nâng cao",
      productFocus: "🍪 Gift Box Combo",
      customerSpeech: "I'm taking 4 boxes of these almond cookies and 3 packs of matcha latte. Do I get any special gift or discount today?",
      customerTranslation: "Tôi lấy 4 hộp bánh quy hạnh nhân này và 3 hộp matcha latte. Hôm nay mua nhiều vậy tôi có được tặng quà hay giảm giá gì đặc biệt không?",
      keyPhrase: "With bills over 500,000 VND at our line, you receive a free AEON canvas tote bag!",
      keyPhraseVi: "Với hóa đơn trên 500.000đ tại quầy bên em, anh sẽ được tặng kèm một túi vải canvas AEON miễn phí ạ!",
      vocabularyNote: "complimentary / free gift (quà tặng kèm miễn phí), purchase over... (đơn hàng trên...)",
      options: [
        {
          id: "a",
          text: "No discount, price is fixed in supermarket. Thank you.",
          isCorrect: false,
          feedbackVi: "Trả lời quá cứng nhắc. Khi khách mua số lượng lớn, hãy giới thiệu quà tặng kèm theo hóa đơn (gift with purchase)."
        },
        {
          id: "b",
          text: "Thank you for your big purchase! Since your total at our line is over 500,000 VND, you'll receive a complimentary AEON canvas tote bag right now!",
          isCorrect: true,
          feedbackVi: "Chốt đơn đỉnh cao! Từ 'complimentary' (tặng miễn phí) vừa sang trọng vừa khiến khách cực kỳ hào hứng khi mua nhiều."
        },
        {
          id: "c",
          text: "If you want discount, come back next month.",
          isCorrect: false,
          feedbackVi: "Nói khách quay lại tháng sau chẳng khác nào từ chối đơn hàng lớn ngay trước mắt!"
        },
        {
          id: "d",
          text: "I can give you one plastic bag for free.",
          isCorrect: false,
          feedbackVi: "Túi nilon đựng hàng không phải là quà tặng khuyến mãi hấp dẫn cho đơn hàng lớn."
        }
      ]
    },

    // ================= LINE 2: SKINCARE & COSMETICS (7 SCENARIOS) =================
    {
      id: "l2_s1",
      lineId: "line2",
      customerName: "Ms. Sophie",
      customerOrigin: "France 🇫🇷",
      customerAvatar: "👩🏼‍🦰",
      difficulty: "Cơ bản",
      productFocus: "🧴 Cica Calming Toner",
      customerSpeech: "Bonjour! My skin gets red easily in this humid weather. Do you have a gentle toner for sensitive skin?",
      customerTranslation: "Xin chào! Da tôi rất dễ bị ửng đỏ trong thời tiết nóng ẩm này. Quầy mình có loại nước cân bằng (toner) dịu nhẹ nào cho da nhạy cảm không?",
      keyPhrase: "This Cica Calming Toner is alcohol-free and specially formulated for sensitive skin.",
      keyPhraseVi: "Dòng Toner Cica làm dịu da này không chứa cồn và được thiết kế chuyên biệt cho làn da nhạy cảm ạ.",
      vocabularyNote: "alcohol-free (không cồn), sensitive skin (da nhạy cảm), soothe redness (làm dịu vết ửng đỏ)",
      options: [
        {
          id: "a",
          text: "Yes! Our Cica Calming Toner is alcohol-free and fragrance-free. It helps soothe redness and is perfect for sensitive skin.",
          isCorrect: true,
          feedbackVi: "Tư vấn chuẩn Beauty Advisor! Nhấn mạnh 'alcohol-free' (không cồn), 'fragrance-free' (không hương liệu) và 'soothe redness' làm khách yên tâm tuyệt đối."
        },
        {
          id: "b",
          text: "All toners here are the same, just pick the pink bottle.",
          isCorrect: false,
          feedbackVi: "Với khách có làn da nhạy cảm (sensitive skin), tư vấn qua loa 'loại nào cũng giống nhau' sẽ khiến khách không dám mua."
        },
        {
          id: "c",
          text: "You should wash your face with cold water instead of buying toner.",
          isCorrect: false,
          feedbackVi: "Bạn đang là chuyên viên tư vấn mỹ phẩm mà lại khuyên khách đừng mua mỹ phẩm!"
        },
        {
          id: "d",
          text: "This strong peeling toner has a lot of alcohol, very cool on skin.",
          isCorrect: false,
          feedbackVi: "Da nhạy cảm đang ửng đỏ mà dùng sản phẩm nhiều cồn (alcohol) sẽ gây kích ứng nặng hơn."
        }
      ]
    },
    {
      id: "l2_s2",
      lineId: "line2",
      customerName: "Ms. Emma",
      customerOrigin: "Canada 🇨🇦",
      customerAvatar: "👩🏽",
      difficulty: "Trung bình",
      productFocus: "☀️ Aqua UV Gel SPF50+",
      customerSpeech: "I'm looking for a daily sunscreen. Does this Aqua UV Gel leave a white cast or feel sticky?",
      customerTranslation: "Tôi đang tìm kem chống nắng dùng hằng ngày. Dòng Aqua UV Gel này có để lại vệt trắng trên da hay bị bết dính không bạn?",
      keyPhrase: "Not at all! It has a lightweight watery texture that absorbs quickly with zero white cast.",
      keyPhraseVi: "Dạ hoàn toàn không ạ! Sản phẩm có kết cấu dạng gel nước mỏng nhẹ, thấm nhanh và không hề để lại vệt trắng.",
      vocabularyNote: "lightweight texture (kết cấu mỏng nhẹ), absorb quickly (thấm nhanh), zero white cast (không để lại vệt trắng)",
      options: [
        {
          id: "a",
          text: "Yes, it makes your face very white like a ghost and quite sticky.",
          isCorrect: false,
          feedbackVi: "Mô tả như vậy thì không vị khách nào dám mua kem chống nắng của quầy bạn cả!"
        },
        {
          id: "b",
          text: "Not at all! It has a lightweight, watery gel texture that absorbs quickly and leaves zero white cast. Feel free to test it on the back of your hand!",
          isCorrect: true,
          feedbackVi: "Tuyệt đỉnh! Bạn dùng đúng bộ từ vựng mỹ phẩm đắt giá: 'lightweight texture', 'absorbs quickly', 'zero white cast' và mời khách thử tester trên mu bàn tay."
        },
        {
          id: "c",
          text: "I don't know what 'white cast' is, sorry madam.",
          isCorrect: false,
          feedbackVi: "'White cast' là vệt trắng trên da khi bôi kem chống nắng—một thuật ngữ cực kỳ quan trọng ở quầy Skincare!"
        },
        {
          id: "d",
          text: "Don't open the box! No testing allowed here.",
          isCorrect: false,
          feedbackVi: "Quầy Glam Beautique tại AEON luôn có mẫu thử (tester) cho khách trải nghiệm kết cấu sản phẩm."
        }
      ]
    },
    {
      id: "l2_s3",
      lineId: "line2",
      customerName: "Ms. Mei Ling",
      customerOrigin: "Malaysia 🇲🇾",
      customerAvatar: "🧕🏻",
      difficulty: "Cơ bản",
      productFocus: "💄 Velvet Matte Lipstick",
      customerSpeech: "This coral lipstick shade is so pretty! Do you have a tester so I can check the color, and is shade #03 in stock?",
      customerTranslation: "Màu son cam san hô này xinh quá! Bạn có thỏi mẫu thử để tôi xem màu không, và màu số #03 còn hàng mới không?",
      keyPhrase: "Here is the tester and a disposable cotton swab. And yes, shade #03 is in stock—let me get you a brand-new one!",
      keyPhraseVi: "Đây là thỏi son thử và tăm bông dùng một lần ạ. Màu #03 bên em vẫn còn hàng—để em lấy một thỏi mới nguyên hộp cho chị nhé!",
      vocabularyNote: "tester (mẫu thử), in stock (còn hàng), brand-new (mới nguyên hộp)",
      options: [
        {
          id: "a",
          text: "Here is the tester and a clean cotton swab for you! And yes, shade #03 is in stock—let me grab a brand-new sealed box for you.",
          isCorrect: true,
          feedbackVi: "Rất chu đáo và hợp vệ sinh! Đưa mẫu thử kèm tăm bông sạch (clean cotton swab) và lấy hàng mới nguyên seal (brand-new sealed box) là chuẩn 5 sao."
        },
        {
          id: "b",
          text: "Just open any box on the shelf and try it on your lips.",
          isCorrect: false,
          feedbackVi: "Không được bóc hộp hàng bán mới (sealed stock) để thử vì sẽ làm hỏng hàng trưng bày!"
        },
        {
          id: "c",
          text: "Sold out everywhere, don't ask me about #03.",
          isCorrect: false,
          feedbackVi: "Cách trả lời gắt gỏng sẽ làm khách rời quầy ngay lập tức."
        },
        {
          id: "d",
          text: "You can buy the used tester on the table for full price.",
          isCorrect: false,
          feedbackVi: "Hàng mẫu thử (tester) đã qua sử dụng tuyệt đối không được bán cho khách!"
        }
      ]
    },
    {
      id: "l2_s4",
      lineId: "line2",
      customerName: "Mr. Alex",
      customerOrigin: "UK 🇬🇧",
      customerAvatar: "👱🏼‍♂️",
      difficulty: "Trung bình",
      productFocus: "💧 Hyaluronic Serum",
      customerSpeech: "My skin feels super dry from staying in air-conditioned rooms all day. How should I use this Hyaluronic Acid Serum?",
      customerTranslation: "Da tôi bị khô căng do ngồi phòng máy lạnh cả ngày. Tôi nên sử dụng lọ Serum Hyaluronic Acid này như thế nào?",
      keyPhrase: "Apply 2 to 3 drops on slightly damp skin after cleansing, then seal it in with your moisturizer.",
      keyPhraseVi: "Anh thoa 2 đến 3 giọt lên nền da còn hơi ẩm sau khi rửa mặt, sau đó khóa ẩm lại bằng kem dưỡng nhé.",
      vocabularyNote: "apply 2-3 drops (thoa 2-3 giọt), damp skin (da còn ẩm), lock in moisture (khóa ẩm)",
      options: [
        {
          id: "a",
          text: "Just pour the whole bottle on your face once a week.",
          isCorrect: false,
          feedbackVi: "Hướng dẫn sai cách sử dụng! Serum chỉ dùng 2-3 giọt mỗi lần thôi."
        },
        {
          id: "b",
          text: "It's very simple! Apply 2 to 3 drops onto slightly damp skin after washing your face, then follow with a moisturizer to lock in hydration.",
          isCorrect: true,
          feedbackVi: "Hướng dẫn ngắn gọn, dễ hiểu và đúng chuẩn khoa học chăm sóc da! Khách nam rất thích những lời khuyên rõ ràng như vậy."
        },
        {
          id: "c",
          text: "Men don't need serum, just use body soap.",
          isCorrect: false,
          feedbackVi: "Định kiến sai lầm và làm mất khách hàng tiềm năng!"
        },
        {
          id: "d",
          text: "Read the Japanese text on the back of the bottle.",
          isCorrect: false,
          feedbackVi: "Khách nước ngoài không đọc được chữ Nhật trên bao bì nên mới nhờ bạn tư vấn bằng tiếng Anh."
        }
      ]
    },
    {
      id: "l2_s5",
      lineId: "line2",
      customerName: "Mrs. Hannah",
      customerOrigin: "New Zealand 🇳🇿",
      customerAvatar: "👩🏼‍🦱",
      difficulty: "Nâng cao",
      productFocus: "🧖‍♀️ Sakura Sheet Mask",
      customerSpeech: "I saw these Sakura sheet masks are on promotion. If I buy 3 packs, how much do I save?",
      customerTranslation: "Tôi thấy mặt nạ giấy hoa anh đào này đang có khuyến mãi. Nếu tôi mua combo 3 gói thì tiết kiệm được bao nhiêu?",
      keyPhrase: "If you buy the 3-pack bundle, you get 20% off—saving you nearly 100,000 VND!",
      keyPhraseVi: "Nếu chị mua theo combo 3 gói sẽ được giảm 20%—tiết kiệm được gần 100.000đ đó ạ!",
      vocabularyNote: "bundle deal (ưu đãi mua theo combo), get 20% off (được giảm 20%), save you... (giúp bạn tiết kiệm...)",
      options: [
        {
          id: "a",
          text: "I'm bad at math, please calculate it on your phone.",
          isCorrect: false,
          feedbackVi: "Là nhân viên bán hàng, bạn cần nắm rõ mức ưu đãi combo để chốt đơn nhanh cho khách."
        },
        {
          id: "b",
          text: "Great choice! One pack is 165,000 VND, but with our 3-pack bundle deal, you get 20% off—saving you nearly 100,000 VND in total!",
          isCorrect: true,
          feedbackVi: "Kỹ năng up-sell tuyệt vời! Đưa ra con số tiết kiệm cụ thể ('saving you nearly 100,000 VND') giúp khách chốt ngay combo 3 gói."
        },
        {
          id: "c",
          text: "Buying 3 packs is more expensive than buying 1 pack.",
          isCorrect: false,
          feedbackVi: "Giải thích dễ gây hiểu nhầm rằng mua combo bị đắt hơn mua lẻ."
        },
        {
          id: "d",
          text: "No promotion today, the sign is old from last year.",
          isCorrect: false,
          feedbackVi: "Trả lời thiếu chuyên nghiệp, làm khách mất niềm tin vào bảng giá tại quầy."
        }
      ]
    },
    {
      id: "l2_s6",
      lineId: "line2",
      customerName: "Ms. Jessica",
      customerOrigin: "USA 🇺🇸",
      customerAvatar: "👱🏼‍♀️",
      difficulty: "Trung bình",
      productFocus: "🫧 Amino Gentle Cleanser",
      customerSpeech: "Can this Amino Cleanser remove waterproof mascara, or do I need a separate makeup remover?",
      customerTranslation: "Sữa rửa mặt Amino này có tẩy sạch được mascara chống nước không, hay tôi cần dùng thêm nước tẩy trang riêng?",
      keyPhrase: "This is a gentle daily cleanser. For waterproof mascara, I recommend using an oil-based makeup remover first.",
      keyPhraseVi: "Đây là sữa rửa mặt dịu nhẹ hằng ngày. Với mascara chống nước, em khuyên chị nên dùng tẩy trang gốc dầu trước để làm sạch sâu nhé.",
      vocabularyNote: "waterproof makeup (trang điểm chống nước), makeup remover (nước/dầu tẩy trang), double cleansing (làm sạch kép)",
      options: [
        {
          id: "a",
          text: "This cleanser is super gentle for daily washing. For stubborn waterproof mascara, I recommend pairing it with our cleansing oil right here for double cleansing!",
          isCorrect: true,
          feedbackVi: "Tư vấn trung thực lại còn cross-sell (bán chéo) thêm được chai dầu tẩy trang! Khách hàng cực kỳ đánh giá cao sự am hiểu này."
        },
        {
          id: "b",
          text: "Yes, it removes everything including wall paint, very strong!",
          isCorrect: false,
          feedbackVi: "Nói quá sự thật! Nếu khách mua về không tẩy được mascara chống nước, khách sẽ quay lại phàn nàn."
        },
        {
          id: "c",
          text: "Don't wear mascara anymore, then you don't need remover.",
          isCorrect: false,
          feedbackVi: "Lời khuyên kém duyên và không giải quyết được nhu cầu của khách."
        },
        {
          id: "d",
          text: "I don't know what 'waterproof' means.",
          isCorrect: false,
          feedbackVi: "'Waterproof' nghĩa là chống thấm nước—từ vựng cơ bản khi bán mỹ phẩm trang điểm và kem chống nắng."
        }
      ]
    },
    {
      id: "l2_s7",
      lineId: "line2",
      customerName: "Mr. Lucas",
      customerOrigin: "Brazil 🇧🇷",
      customerAvatar: "🧑🏽‍🦱",
      difficulty: "Nâng cao",
      productFocus: "🎁 Skincare Gift Set",
      customerSpeech: "I'm buying this skincare set as an anniversary gift for my wife. What if she already has this one? Can she exchange it?",
      customerTranslation: "Tôi mua bộ dưỡng da này làm quà kỷ niệm ngày cưới cho vợ. Nhỡ cô ấy có bộ này rồi thì có đổi sang sản phẩm khác được không?",
      keyPhrase: "Yes! Unopened items with the original receipt can be exchanged within 7 days at the Customer Service counter.",
      keyPhraseVi: "Dạ được ạ! Sản phẩm còn nguyên tem mác kèm hóa đơn gốc có thể đổi trong vòng 7 ngày tại quầy Dịch vụ Khách hàng.",
      vocabularyNote: "unopened item (sản phẩm chưa bóc seal), original receipt (hóa đơn gốc), exchange within 7 days (đổi hàng trong 7 ngày)",
      options: [
        {
          id: "a",
          text: "No return, no exchange once you pay. Be careful.",
          isCorrect: false,
          feedbackVi: "Trả lời cứng nhắc làm khách chần chừ không dám mua quà giá trị cao."
        },
        {
          id: "b",
          text: "Of course! As long as the box remains unopened and sealed, she can easily exchange it within 7 days with the original receipt. Would you like free gift wrapping too?",
          isCorrect: true,
          feedbackVi: "Điểm 10 trọn vẹn! Bạn giải thích rõ điều kiện đổi trả (unopened & original receipt within 7 days) và còn mời gói quà miễn phí (free gift wrapping)."
        },
        {
          id: "c",
          text: "She can use half of the bottle and bring it back for a refund.",
          isCorrect: false,
          feedbackVi: "Sai quy định siêu thị! Mỹ phẩm đã khui dùng một nửa (trừ lỗi nhà sản xuất) không thể hoàn trả thông thường."
        },
        {
          id: "d",
          text: "Call your wife right now and ask her before buying.",
          isCorrect: false,
          feedbackVi: "Khách đang muốn tạo bất ngờ kỷ niệm ngày cưới mà bạn bảo gọi hỏi trước thì mất hết ý nghĩa món quà!"
        }
      ]
    },

    // ================= LINE 3: HOME & STATIONERY (7 SCENARIOS) =================
    {
      id: "l3_s1",
      lineId: "line3",
      customerName: "Mr. Thomas",
      customerOrigin: "Sweden 🇸🇪",
      customerAvatar: "🧔🏼",
      difficulty: "Cơ bản",
      productFocus: "🍼 304 Thermal Tumbler",
      customerSpeech: "Hi! This HÓME COÓRDY stainless steel tumbler looks sleek. How long does it keep iced coffee cold?",
      customerTranslation: "Chào bạn! Bình giữ nhiệt inox HÓME COÓRDY này nhìn sang quá. Nó giữ lạnh cho cà phê đá được trong bao lâu vậy?",
      keyPhrase: "Thanks to its double-wall vacuum insulation, it keeps drinks cold for up to 12 hours without condensation!",
      keyPhraseVi: "Nhờ thiết kế cách nhiệt chân không 2 lớp, bình giữ lạnh được tới 12 tiếng mà không hề bị đọng hơi nước bên ngoài ạ!",
      vocabularyNote: "vacuum insulation (cách nhiệt chân không), keep cold/hot for up to 12 hours (giữ lạnh/nóng tới 12 tiếng), condensation (đọng mồ hôi/hơi nước)",
      options: [
        {
          id: "a",
          text: "It keeps your iced coffee cold for up to 12 hours and hot drinks warm for 8 hours! Plus, the double-wall design prevents water drops from forming on the outside.",
          isCorrect: true,
          feedbackVi: "Tư vấn quá thuyết phục! Nêu rõ thời gian giữ nhiệt (up to 12 hours) và tính năng chống đọng nước (double-wall design) khiến khách chốt đơn ngay."
        },
        {
          id: "b",
          text: "Maybe 20 minutes, same as a normal plastic cup.",
          isCorrect: false,
          feedbackVi: "Bình giữ nhiệt inox 304 mà giữ lạnh có 20 phút thì không ai mua cả!"
        },
        {
          id: "c",
          text: "Only for hot water, if you put ice inside it will break.",
          isCorrect: false,
          feedbackVi: "Thông tin sai! Bình giữ nhiệt inox 304 giữ được cả nóng lẫn lạnh."
        },
        {
          id: "d",
          text: "I don't drink coffee so I never tested this bottle.",
          isCorrect: false,
          feedbackVi: "Trả lời thiếu chuyên nghiệp. Thông số giữ nhiệt đều được ghi rõ trong tài liệu sản phẩm."
        }
      ]
    },
    {
      id: "l3_s2",
      lineId: "line3",
      customerName: "Mrs. Priya",
      customerOrigin: "India 🇮🇳",
      customerAvatar: "👩🏽‍💼",
      difficulty: "Trung bình",
      productFocus: "🍱 Glass Microwave Box",
      customerSpeech: "Are these glass food containers microwave-safe? Do I need to take the lid off before heating?",
      customerTranslation: "Hộp thủy tinh đựng thực phẩm này có dùng được trong lò vi sóng không? Tôi có cần tháo nắp ra trước khi hâm nóng không?",
      keyPhrase: "Yes, the heat-resistant glass body is microwave-safe and oven-safe! Just open the steam vent on the lid before heating.",
      keyPhraseVi: "Dạ thân hộp bằng thủy tinh chịu nhiệt dùng tốt trong lò vi sóng và lò nướng ạ! Chị chỉ cần mở van thoát hơi trên nắp trước khi hâm nóng nhé.",
      vocabularyNote: "microwave-safe (an toàn cho lò vi sóng), heat-resistant glass (thủy tinh chịu nhiệt), steam vent (van thoát hơi)",
      options: [
        {
          id: "a",
          text: "Yes! The heat-resistant glass is both microwave-safe and dishwasher-safe. Just pop open the little steam vent on the BPA-free lid before heating!",
          isCorrect: true,
          feedbackVi: "Xuất sắc! Bạn giải đáp chính xác cả phần thân hộp (microwave-safe) lẫn cách mở van thoát hơi (steam vent) trên nắp nhựa BPA-free."
        },
        {
          id: "b",
          text: "Never put glass in the microwave, it will explode immediately.",
          isCorrect: false,
          feedbackVi: "Hộp thủy tinh chịu nhiệt chuyên dụng (heat-resistant borosilicate glass) được thiết kế để dùng an toàn trong lò vi sóng."
        },
        {
          id: "c",
          text: "Lock all four clips tightly so no air can escape when heating.",
          isCorrect: false,
          feedbackVi: "Hướng dẫn sai nguy hiểm! Khi quay lò vi sóng phải mở van thoát hơi hoặc hé nắp để tránh áp suất hơi nước làm bung nắp."
        },
        {
          id: "d",
          text: "Try it at home and see what happens.",
          isCorrect: false,
          feedbackVi: "Trả lời thiếu trách nhiệm với sự an toàn của khách hàng."
        }
      ]
    },
    {
      id: "l3_s3",
      lineId: "line3",
      customerName: "Mr. Arthur",
      customerOrigin: "USA 🇺🇸",
      customerAvatar: "👨🏼‍🏫",
      difficulty: "Cơ bản",
      productFocus: "🖊️ 0.38mm Gel Pen Set",
      customerSpeech: "I'm a left-handed writer, so ink smudges easily. Does this 0.38mm Japanese gel pen dry quickly?",
      customerTranslation: "Tôi viết tay trái nên mực rất dễ bị nhòe. Dòng bút gel Nhật Bản ngòi 0.38mm này mực có nhanh khô không bạn?",
      keyPhrase: "Yes! This pen uses fast-drying gel ink that won't smudge, even for left-handed writers. You can test it on this notepad!",
      keyPhraseVi: "Dạ có ạ! Dòng bút này sử dụng mực gel khô siêu tốc không bị lem nhòe, rất hợp cho người thuận tay trái. Anh có thể viết thử lên tập giấy thử này nhé!",
      vocabularyNote: "fast-drying ink (mực nhanh khô), smudge-proof / won't smudge (không bị lem nhòe), notepad (giấy thử bút)",
      options: [
        {
          id: "a",
          text: "Yes! It features fast-drying, smudge-proof ink specifically loved by left-handed writers. Please test it out on our notepad right here!",
          isCorrect: true,
          feedbackVi: "Tuyệt vời! Hai cụm từ 'fast-drying' và 'smudge-proof' giải quyết đúng nỗi lo của người thuận tay trái, kèm lời mời viết thử trên giấy."
        },
        {
          id: "b",
          text: "You should learn to write with your right hand instead.",
          isCorrect: false,
          feedbackVi: "Câu nói vô duyên và thiếu tôn trọng khách hàng."
        },
        {
          id: "c",
          text: "It takes 10 minutes to dry, you need to blow on the paper.",
          isCorrect: false,
          feedbackVi: "Mực bút mất 10 phút mới khô thì không ai mua để ghi chép cả!"
        },
        {
          id: "d",
          text: "Please buy a pencil if you are afraid of ink.",
          isCorrect: false,
          feedbackVi: "Đánh mất cơ hội bán bộ bút gel cao cấp chỉ vì câu trả lời thiếu thiện chí."
        }
      ]
    },
    {
      id: "l3_s4",
      lineId: "line3",
      customerName: "Mr. Daniel",
      customerOrigin: "Netherlands 🇳🇱",
      customerAvatar: "🧑🏼‍💻",
      difficulty: "Nâng cao",
      productFocus: "🫖 Smart Electric Kettle",
      customerSpeech: "I want to buy this electric kettle for my apartment in Ho Chi Minh City. Does it come with a warranty, and does it have auto shut-off?",
      customerTranslation: "Tôi muốn mua chiếc ấm đun siêu tốc này cho căn hộ ở TP.HCM. Sản phẩm có bảo hành không và có tính năng tự ngắt điện khi sôi không?",
      keyPhrase: "It comes with a 12-month official warranty at all AEON stores and features automatic shut-off and boil-dry protection.",
      keyPhraseVi: "Sản phẩm được bảo hành chính hãng 12 tháng tại mọi hệ thống AEON, đồng thời có tính năng tự ngắt khi sôi và chống cạn nước ạ.",
      vocabularyNote: "12-month warranty (bảo hành 12 tháng), automatic shut-off (tự động ngắt điện), boil-dry protection (bảo vệ chống đun cạn nước)",
      options: [
        {
          id: "a",
          text: "No warranty for electronics, once you leave the store you fix it yourself.",
          isCorrect: false,
          feedbackVi: "Đồ điện gia dụng tại AEON luôn có chế độ bảo hành chính hãng, nói không bảo hành sẽ làm khách bỏ đi ngay."
        },
        {
          id: "b",
          text: "Yes, sir! It includes a 12-month official warranty at any AEON store, plus safety features like automatic shut-off and boil-dry protection.",
          isCorrect: true,
          feedbackVi: "Quá chuyên nghiệp! Bạn nắm vững thuật ngữ kỹ thuật gia dụng: '12-month official warranty', 'automatic shut-off' và 'boil-dry protection'."
        },
        {
          id: "c",
          text: "You must watch the kettle closely and unplug it before it boils.",
          isCorrect: false,
          feedbackVi: "Ấm siêu tốc hiện đại đều có rơ-le tự ngắt (auto shut-off), nói khách phải tự canh rút điện là sai thông số."
        },
        {
          id: "d",
          text: "The voltage here is different, it won't work in Vietnam.",
          isCorrect: false,
          feedbackVi: "Hàng phân phối tại AEON Việt Nam đều tương thích chuẩn điện 220V tại Việt Nam."
        }
      ]
    },
    {
      id: "l3_s5",
      lineId: "line3",
      customerName: "Ms. Clara",
      customerOrigin: "Italy 🇮🇹",
      customerAvatar: "👩🏻",
      difficulty: "Trung bình",
      productFocus: "🍳 Ceramic Non-Stick Pan",
      customerSpeech: "My apartment has an induction stove. Will this ceramic non-stick frying pan work on an induction cooktop?",
      customerTranslation: "Căn hộ của tôi dùng bếp từ. Chiếc chảo chống dính phủ sứ này có đun được trên bếp từ không bạn?",
      keyPhrase: "Yes, it has a magnetic stainless steel base, so it works on all stovetops including induction, gas, and infrared!",
      keyPhraseVi: "Dạ được ạ! Đáy chảo có lớp inox nhiễm từ nên dùng tốt trên mọi loại bếp bao gồm bếp từ, bếp gas và bếp hồng ngoại!",
      vocabularyNote: "induction stove / cooktop (bếp từ), non-stick coating (lớp phủ chống dính), compatible with all stovetops (dùng được mọi loại bếp)",
      options: [
        {
          id: "a",
          text: "Yes, definitely! You can see the induction symbol on the bottom—it has a magnetic base that works on all stovetops, including induction and gas.",
          isCorrect: true,
          feedbackVi: "Điểm 10 cho chuyên viên gia dụng! Chỉ cho khách biểu tượng bếp từ dưới đáy chảo (induction symbol on the bottom) là cách thuyết phục trực quan nhất."
        },
        {
          id: "b",
          text: "I don't know what 'induction stove' is, maybe just use a campfire.",
          isCorrect: false,
          feedbackVi: "'Induction stove' là bếp từ—câu hỏi phổ biến số 1 khi khách mua nồi chảo tại siêu thị!"
        },
        {
          id: "c",
          text: "No, ceramic pans melt on induction stoves.",
          isCorrect: false,
          feedbackVi: "Thông tin hoàn toàn sai lệch."
        },
        {
          id: "d",
          text: "Buy a new gas stove to match this pan.",
          isCorrect: false,
          feedbackVi: "Khuyên khách đổi cả bếp chỉ để mua 1 cái chảo là điều phi thực tế."
        }
      ]
    },
    {
      id: "l3_s6",
      lineId: "line3",
      customerName: "Ms. Ji-yeon",
      customerOrigin: "South Korea 🇰🇷",
      customerAvatar: "👩🏻‍🎨",
      difficulty: "Trung bình",
      productFocus: "📓 B5 Dotted Planner",
      customerSpeech: "I use watercolor brush pens for bullet journaling. Is the paper in this B5 dotted notebook thick enough so ink won't bleed through?",
      customerTranslation: "Tôi hay dùng bút lông màu nước để trang trí sổ tay (bullet journal). Giấy của cuốn sổ chấm bi cỡ B5 này có đủ dày để mực không bị thấm sang trang sau không?",
      keyPhrase: "It uses premium 100gsm thick paper, which prevents ink bleed-through and ghosting!",
      keyPhraseVi: "Sổ sử dụng định lượng giấy dày cao cấp 100gsm, giúp chống thấm mực và không bị hằn chữ sang mặt sau ạ!",
      vocabularyNote: "thick paper (giấy dày), bleed through (thấm mực qua trang sau), dotted notebook (sổ kẻ chấm bi)",
      options: [
        {
          id: "a",
          text: "The paper is very thin like tissue paper, ink goes everywhere.",
          isCorrect: false,
          feedbackVi: "Chê chính sản phẩm chất lượng cao của quầy mình làm khách bỏ ý định mua."
        },
        {
          id: "b",
          text: "It's ideal for journaling! This notebook uses thick 100gsm cream paper, which prevents ink from bleeding through to the next page.",
          isCorrect: true,
          feedbackVi: "Đỉnh cao từ vựng văn phòng phẩm! Cụm từ '100gsm paper' và 'prevents ink from bleeding through' khiến khách yêu sổ tay mê mẩn ngay."
        },
        {
          id: "c",
          text: "Only write on one side of the paper and throw away the other side.",
          isCorrect: false,
          feedbackVi: "Giải pháp lãng phí và làm giảm giá trị sản phẩm."
        },
        {
          id: "d",
          text: "We only sell notebooks for math homework, not for drawing.",
          isCorrect: false,
          feedbackVi: "Sổ Dotted Planner (kẻ chấm) được thiết kế chuyên dụng cho Bullet Journaling và ghi chép sáng tạo."
        }
      ]
    },
    {
      id: "l3_s7",
      lineId: "line3",
      customerName: "Mr. Robert & Mrs. Linda",
      customerOrigin: "Australia 🇦🇺",
      customerAvatar: "👫🏼",
      difficulty: "Nâng cao",
      productFocus: "🛒 Full Home & Kitchen Set",
      customerSpeech: "We're taking the electric kettle, two frying pans, and four glass containers. Since we're tourists spending over 2 million VND, can we get a VAT refund invoice or home delivery?",
      customerTranslation: "Vợ chồng tôi lấy ấm siêu tốc, 2 chiếc chảo và 4 hộp thủy tinh. Vì chúng tôi là khách du lịch mua trên 2 triệu đồng, siêu thị có hỗ trợ xuất hóa đơn hoàn thuế VAT hoặc giao hàng về khách sạn không?",
      keyPhrase: "Yes to both! After checkout, please bring your receipt and passport to the AEON Tax Refund & Delivery Desk right by the exit.",
      keyPhraseVi: "Dạ siêu thị hỗ trợ cả hai ạ! Sau khi thanh toán, anh chị mang hóa đơn và hộ chiếu qua Quầy Hoàn Thuế & Giao Hàng của AEON ngay lối ra nhé.",
      vocabularyNote: "VAT tax refund (hoàn thuế GTGT cho khách du lịch), passport & receipt (hộ chiếu & hóa đơn), delivery desk (quầy giao hàng)",
      options: [
        {
          id: "a",
          text: "Yes to both! Let me help carry these to the cashier. After paying, just bring your receipt and passport to the AEON Tax Refund & Delivery Desk near Entrance A!",
          isCorrect: true,
          feedbackVi: "Xứng danh Quản lý Line (Line Supervisor)! Bạn không chỉ nắm rõ thủ tục hoàn thuế du lịch (Tax Refund with receipt & passport) và giao hàng, mà còn chủ động bê đồ giúp khách ra quầy thu ngân."
        },
        {
          id: "b",
          text: "Too heavy! Carry them yourselves and no tax refund here.",
          isCorrect: false,
          feedbackVi: "Thái độ phục vụ kém và cung cấp sai thông tin dịch vụ của trung tâm bách hóa AEON."
        },
        {
          id: "c",
          text: "Give me 2 million cash directly and I won't print a receipt.",
          isCorrect: false,
          feedbackVi: "Vi phạm nghiêm trọng quy định thu ngân của siêu thị! Mọi giao dịch đều phải thanh toán qua quầy thu ngân có hóa đơn."
        },
        {
          id: "d",
          text: "You have to buy 100 kettles to get delivery.",
          isCorrect: false,
          feedbackVi: "Trả lời thiếu nghiêm túc với đơn hàng giá trị cao."
        }
      ]
    }
  ]
};