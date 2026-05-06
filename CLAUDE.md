# GuideTravel

Website kết nối du khách với hướng dẫn viên địa phương tại Việt Nam.
Pure HTML/CSS/JS — không framework, không build step.

## Stack & Kiến trúc
- 11 trang HTML độc lập, dùng chung `style.css`, `app.js`, `lang.js`
- Không có server — mở thẳng file HTML trên browser (file://)
- Toàn bộ data lưu localStorage: `gt_session`, `gt_requests`, `gt_tracker`

## Đa ngôn ngữ (VI/EN)
- HTML tĩnh → dùng `data-i18n="key"` trên element
- JS động → dùng `t('key')` trong template literal
- Giá tiền → dùng `fmtPrice(n)` (tự chuyển VND↔USD theo ngôn ngữ)
- Thêm key mới → thêm vào CẢ HAI `TRANS.vi` và `TRANS.en` trong `lang.js`
- KHÔNG dùng chuỗi tiếng Việt hardcoded trong app.js

## Auth & Session
- `Auth.session()` → đọc `gt_session` từ localStorage
- `session.type` = `'guide'` hoặc `'tourist'`
- Pages có custom nav (hdv-dashboard) dùng `id="nav-right-dash"` để tránh
  `initNav()` overwrite

## Mô hình hoa hồng
- HDV trả 15/20/25/30% → hiển thị badge ưu tiên trong danh sách
- `COMMISSION_TIERS` trong app.js, badge dùng `t(tier.key)` để dịch

## Sau khi hoàn thành task
- Cập nhật `tracker.html`: đổi status và note cho mục tương ứng
- Cập nhật `lastUpdate` sang ngày hiện tại
- Nếu phát hiện gap/bug mới trong quá trình làm → thêm vào tracker ngay, không chờ được nhắc

## Quy trình làm việc
- Khi nhận lệnh: làm đến hoàn thiện, tự kiểm tra lại toàn bộ trước khi báo kết quả
- Không hỏi giữa chừng, không báo cáo từng bước nhỏ — chỉ đưa kết quả cuối cùng
- Sau mỗi task: trace qua luồng người dùng liên quan (vd: đăng ký → đăng nhập → dashboard) để phát hiện side effect
- Khi viết fallback `|| someDefault`: dừng lại, kiểm tra xem fallback đó có gây hiển thị sai dữ liệu không

## Không được làm
- Không thêm npm/framework/thư viện ngoài Font Awesome + Google Fonts
- Không tạo file JS/CSS mới nếu có thể sửa file hiện có
- Không xóa `fmt()` (vẫn dùng ở 1 số chỗ legacy) — thêm mới thì dùng `fmtPrice()`
