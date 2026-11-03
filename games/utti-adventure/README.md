# Út Tí Phiêu Lưu Ký — SoulOfMekong (Đợt 2 · bản chỉn chu)

Endless runner + quiz văn hóa + sưu tầm huy hiệu. Phaser 3.90 + Vite, không cần backend.

**6 chương:** Cần Thơ → Vĩnh Long → Tiền Giang → Đồng Tháp → Bến Tre → Trà Vinh · 60 huy hiệu · ~350 câu hỏi · 4 vật phẩm bổ trợ.

## Chạy
```bash
npm install
npm run dev       # phát triển
npm run build     # build production -> dist/
npm run preview   # xem bản build
npm test          # 10 nhóm unit test (logic + kiểm tra đủ file asset)
```
Mở thử toàn bộ chương: thêm `?unlockall=1` vào URL (ví dụ `http://localhost:5173/?unlockall=1`).

## Luật chơi
- **Điều khiển:** `SPACE`/`↑`/`W` nhảy · `↓`/`S` cúi · `P`/`ESC` tạm dừng · `M` tắt/bật âm · cảm ứng: chạm bên phải để nhảy, giữ nút CÚI bên trái.
- 3 mạng, bất tử 1,5 giây sau va chạm. Cứ 200 điểm có một **Thử thách khám phá** (game dừng hẳn).
- **Mỗi huy hiệu cần 5 câu đúng**, huy hiệu được chinh phục lần lượt trong từng tỉnh; sai không mất mạng, không mất tiến độ.
- **Mở khóa chương:** đủ 10 huy hiệu của một tỉnh thì tỉnh kế tiếp mới mở (kèm màn chúc mừng + danh hiệu, một lần).
- **Vật phẩm** (nhảy lên để nhặt): Lá chắn (chặn 1 va chạm, 15 giây) · Dép thần tốc (chạy nhanh và xuyên chướng ngại, 6 giây) · Nón lá may mắn (x2 điểm, 10 giây) · Trái cây (+1 mạng, đầy mạng thì +30 điểm).

## Đồ họa
- `public/assets/characters`: Út Tí — chạy (5), đứng yên (5), nhảy (6), cúi (4), bị trúng, ngất.
- `public/assets/obstacles`, `items`: 6 chướng ngại vật (trâu hi-res) và 4 vật phẩm.
- `public/assets/badges`: 60 huy hiệu theo từng tỉnh (bản khóa xám tạo tự động khi chạy).
- `public/assets/backgrounds`: nền vẽ tay của chương (hiện có **Cần Thơ**). Chương chưa có ảnh dùng nền tự dựng nhiều lớp.
- **Thêm nền vẽ tay cho chương khác:** đặt ảnh 16:9 và ô đường đi vào `backgrounds/`, rồi thêm `backdrop: { bg, ground, scale, groundTop, water }` cho tỉnh trong `data/provinces.js` (xem mục Cần Thơ). Đường chạy của nhân vật nằm ở y = 620.

## Câu hỏi
- 53–72 câu mỗi tỉnh, chia theo: Làng nghề truyền thống, Địa danh, Anh hùng & Danh nhân, Ẩm thực & Đặc sản, Văn hóa & Lễ hội. Độ khó tăng theo mốc điểm.
- Không lặp trong một lượt chơi và không lặp giữa các lượt cho đến khi dùng hết kho câu của tỉnh (lưu trong LocalStorage, sau đó xoay vòng).
- `data/facts.js` (bảng dữ kiện có nguồn, tự sinh nhiều dạng câu) + `HAND` trong `data/questions.js` (câu viết tay). Nguồn: `docs/SOURCES.md`.
- Dữ liệu An Giang vẫn nằm trong `facts.js`/`questions.js` nhưng không dùng (không có trong `PROVINCES`).

## Cấu trúc
```
public/assets/    characters/ obstacles/ items/ badges/ backgrounds/
scripts/asset_pipeline/   cách các asset được tách và xử lý từ ảnh nguồn
src/game/
  scenes/     Boot, Preload, MainMenu, Game, Quiz, GameOver, BadgeCollection, HowToPlay
  entities/   Player           managers/   Game, Score, Quiz, Badge, Audio
  services/   Storage, GameIntegration     ui/   widgets.js, backdrop.js
  data/       provinces, badges, facts, questions     art/   backgrounds.js (nền tự dựng), props.js, badgeFallback.js
```

## Lưu trữ & tích hợp
LocalStorage key `soulofmekong_utti_v1` (version 2, tự nâng cấp từ bản cũ; không mất huy hiệu cũ). `GameIntegrationService` là adapter cho website SoulOfMekong (iframe hoặc `new Phaser.Game(config)` trong React). **Bảo mật:** khi có tài khoản, backend phải tự xác thực điểm và phần thưởng.

## Giới hạn đã biết
- **Chưa chạy thử trên trình duyệt thật** trong môi trường dựng. Đã kiểm tra: build, ESLint (no-undef), 10 nhóm test, và dựng thử khung cảnh bằng canvas. Cần chơi thử thủ công (`?unlockall=1`).
- Khung chạy rất nét; khung đứng yên/nhảy/cúi gốc có độ phân giải thấp hơn nên hơi mềm. Khung "bị trúng" và "ngất" lấy từ bản cũ (đã chỉnh cùng cỡ).
- Nền Cần Thơ là một ảnh tĩnh (đường đi, nước lấp lánh và vật thể chuyển động) vì ảnh không chia lớp được; các chương khác dùng nền tự dựng, chưa đẹp bằng ảnh vẽ tay.
- Tám huy hiệu có chữ ruy-băng gốc sai/lỗi chính tả đã được vẽ lại chữ (font DejaVu, hơi khác font gốc).
- Chưa dùng: `chạy_dạng_2d.png`, `cnv_and_bt.png` (phong cách pixel), `huy_hiệu.png`, hàng Sóc Trăng và Bạc Liêu của `huy_hiệu_v2.png` (chờ đợt sau).
- Dữ kiện đã đối chiếu nguồn trực tuyến nhưng chưa có chuyên gia địa phương rà soát; địa danh theo ranh giới trước năm 2025.

## Kiểm thử thủ công (trên trình duyệt)
[ ] Menu chọn tỉnh, tỉnh khóa không bắt đầu được · [ ] Chạy/nhảy/cúi/va chạm, đúng tư thế và hitbox · [ ] Nhặt 4 vật phẩm, hiệu ứng từng loại
[ ] Quiz ở 200 điểm, đủ 5 câu đúng mới có huy hiệu, sai không mất tiến độ · [ ] Hoàn thành tỉnh mở tỉnh kế
[ ] Nền Cần Thơ khớp đường chạy · [ ] Reload giữ tiến độ · [ ] Pause/Resume · [ ] Cảm ứng điện thoại · [ ] Âm thanh
