# Asset pipeline (reference)
Các script Python (pillow, numpy, scipy, opencv) dùng để tạo asset từ ảnh nguồn do chủ dự án cung cấp.
Đường dẫn trong script đang trỏ tới `/mnt/user-data/uploads` và `/tmp/n`; sửa lại cho môi trường của bạn khi chạy.

- `chars.py` + `chars_export.py`: `animation.png` (đứng yên, nhảy, cúi) và `chạy.png` (chạy) -> `public/assets/characters/*`. Xóa bóng đổ, căn theo đỉnh nón và mặt đất, chuẩn hóa kích thước theo bề rộng nón.
- `badges.py` + `badges_final.py`: `huy_hiệu_v2.png` -> `public/assets/badges/<id>.png` (60 huy hiệu). Có bước vẽ lại chữ ruy-băng cho 8 huy hiệu bị sai nhãn.
- `assets_misc.py`: `trâu.png`, `bg_CT.png` -> trâu, nền Cần Thơ (cắt 16:9), ô đường đi lặp liền mạch, lá chắn.
- `items_draw.py`: vẽ vector nón lá, dép, trái cây.
- `../extract_sprites.py`: tách khúc gỗ, giỏ, gà, xuồng, cành dừa từ `utti-animation-reference.png` (bản đợt 1).
