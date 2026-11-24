// Follow-up dialogue layered on top of the 21 scenarios (data.js stays untouched).
// After the PG answers correctly, the customer replies naturally and a grammar spotlight appears.
window.AEON_DIALOGUE = {
    l1_s1: {
        reply: "Lightly sweetened? That's just what I was hoping for. I'll take two boxes, and could I try a sample before I decide?",
        replyVi: "Ngọt dịu nhẹ à? Đúng thứ tôi mong. Tôi lấy hai hộp, và tôi có thể nếm thử trước khi quyết định không?",
        grammar: { title: "Could I + động từ nguyên mẫu", tip: "Xin phép lịch sự: Could I try...? lịch sự hơn Can I...? Còn \"only lightly sweetened\" dùng only + trạng từ + quá khứ phân từ để nhấn mạnh mức độ nhẹ." }
    },
    l1_s2: {
        reply: "Brilliant! If I mix three flavors, will the discount apply to the cheapest one, or to the whole bundle?",
        replyVi: "Tuyệt! Nếu tôi trộn ba vị thì giảm giá áp dụng cho gói rẻ nhất hay cả combo?",
        grammar: { title: "Câu điều kiện loại 1", tip: "If + hiện tại đơn, will + động từ. Ví dụ: If I mix three flavors, will the discount apply...? Dùng khi nói về khả năng có thật ở hiện tại hoặc tương lai gần." }
    },
    l1_s3: {
        reply: "Perfect. I'd rather avoid anything artificial, though. Is it sweetened with stevia, or is it completely unsweetened?",
        replyVi: "Hay quá. Nhưng tôi muốn tránh đồ nhân tạo. Nó ngọt từ cỏ ngọt, hay hoàn toàn không đường?",
        grammar: { title: "would rather + động từ nguyên mẫu", tip: "I'd rather avoid... = Tôi thích tránh... hơn. Sau would rather luôn là động từ nguyên mẫu không \"to\". Khác nhau: sugar-free (không đường) và unsweetened (không thêm vị ngọt nào)." }
    },
    l1_s4: {
        reply: "Thank you for being so careful. Since he's allergic, is there another biscuit that's made in a nut-free facility?",
        replyVi: "Cảm ơn bạn đã cẩn thận. Vì bé dị ứng, có loại bánh nào được làm ở cơ sở không dính hạt không?",
        grammar: { title: "Since = bởi vì (nêu lý do)", tip: "Since he's allergic = Vì bé bị dị ứng. Since đứng đầu câu để nêu lý do đã rõ. Cụm nut-free facility: danh từ + free = không có danh từ đó (sugar-free, gluten-free)." }
    },
    l1_s5: {
        reply: "October next year, lovely. Have these been stored properly? I won't be home until tomorrow night, so they'll be in my luggage all day.",
        replyVi: "Tháng Mười năm sau, tốt quá. Hàng được bảo quản đúng cách chưa? Tối mai tôi mới về nhà nên chúng sẽ nằm trong hành lý cả ngày.",
        grammar: { title: "Hiện tại hoàn thành bị động", tip: "Have these been stored properly? = have/has + been + quá khứ phân từ. Dùng khi hỏi về một việc đã xảy ra mà kết quả còn liên quan đến hiện tại." }
    },
    l1_s6: {
        reply: "Much gentler, you say? Then I'll give it a go. If it turns out too mild, I might add some chili oil. Do you sell any here?",
        replyVi: "Nhẹ hơn nhiều à? Vậy tôi thử xem. Nếu hóa ra quá nhạt, có thể tôi thêm dầu ớt. Ở đây có bán không?",
        grammar: { title: "So sánh hơn có bổ nghĩa", tip: "much gentler than... = nhẹ hơn nhiều so với... Thêm much/far/a lot trước tính từ so sánh để nhấn mạnh độ chênh lệch. Cụm give it a go = thử một lần." }
    },
    l1_s7: {
        reply: "A free tote bag, wonderful! If I spend a little more to reach that amount, can the bag be added to this same receipt?",
        replyVi: "Có túi tote tặng, tuyệt! Nếu tôi mua thêm một chút cho đủ mức đó, túi có được ghi vào cùng hóa đơn này không?",
        grammar: { title: "receive / get + quà tặng", tip: "you receive a free tote bag = bạn nhận được. Trong văn nói của nhân viên bán hàng, receive trang trọng hơn get. Cấu trúc spend + tiền + to + động từ nguyên mẫu: dùng để nêu mục đích của việc chi tiêu." }
    }
};