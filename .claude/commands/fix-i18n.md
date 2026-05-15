# Fix i18n — Quét và sửa toàn bộ hardcoded strings

## Mục tiêu
Tìm tất cả chuỗi tiếng Việt hardcoded trong JS/HTML, thay bằng `t('key')`, thêm key vào lang.js — làm 1 lần, push 1 lần.

## Các bước thực hiện

### 1. Quét toàn bộ trước khi sửa bất cứ thứ gì
Grep các pattern sau trên toàn bộ file .js và .html:
- `toast('` — tìm toast với chuỗi tiếng Việt trực tiếp
- `alert('` — tìm alert hardcoded
- Chuỗi tiếng Việt trong template literal (ký tự có dấu)
- `innerHTML` hoặc `textContent` gán chuỗi tiếng Việt trực tiếp

### 2. Tổng hợp danh sách đầy đủ
Liệt kê tất cả instance cần sửa theo format:
```
file:dòng | chuỗi gốc | key đề xuất
```
Kiểm tra key đề xuất đã có trong TRANS.vi chưa — nếu có thì dùng lại, không tạo trùng.

### 3. Thêm tất cả key mới vào lang.js một lần
- Thêm vào `TRANS.vi` (tiếng Việt)
- Thêm vào `TRANS.en` (tiếng Anh tương đương)
- Đặt key theo nhóm: `login.*`, `hdash.*`, `dash.*`, `reg.*`, `pay.*`, `profile.*`

### 4. Sửa tất cả file một lần
Thay từng instance hardcoded bằng `t('key')` tương ứng.

### 5. Tự kiểm tra lại
- Grep lại `toast('` để xác nhận không còn chuỗi tiếng Việt
- Đảm bảo mọi key mới đều có cả `TRANS.vi` và `TRANS.en`

### 6. Push một lần
Commit message: `fix: replace all hardcoded strings with i18n keys`
