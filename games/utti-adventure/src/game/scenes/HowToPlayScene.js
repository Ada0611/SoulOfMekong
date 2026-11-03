import Phaser from 'phaser';
import { W, H, CORRECT_PER_BADGE } from '../config/constants.js';
import Backdrop from '../ui/backdrop.js';
import gm from '../managers/GameManager.js';
import { txt, button, panel, fadeTo } from '../ui/widgets.js';
export default class HowToPlayScene extends Phaser.Scene {
  constructor() { super('HowToPlayScene'); }
  create() {
    const pid = gm.provinceId; this.cameras.main.fadeIn(250, 0, 0, 0);
    new Backdrop(this, pid, { clouds: false });
    panel(this, W / 2, H / 2, 1120, 660); txt(this, W / 2, 62, 38, '#2f6a2a').setText('HƯỚNG DẪN');
    const line = (y, s, size = 20) => txt(this, W / 2 + 40, y, size, '#3a2410', { fontStyle: 'normal', align: 'left', wordWrap: { width: 800 } }).setText(s).setOrigin(.5, .5);
    this.add.image(190, 232, 'utti_run_1').setScale(.55).setOrigin(.5, 1);
    line(112, 'MÁY TÍNH:  SPACE / ↑ / W nhảy  ·  ↓ / S cúi  ·  P hoặc ESC tạm dừng  ·  M tắt/bật âm', 19);
    line(146, 'ĐIỆN THOẠI:  chạm bên phải màn hình để NHẢY  ·  giữ nút CÚI ở góc trái', 19);
    line(190, 'Nhảy qua khúc gỗ, giỏ trái cây, gà, xuồng và trâu. Cúi người để chui qua cành dừa đang rơi! Bị va chạm mất 1 mạng (có 3 mạng).', 19);
    line(250, `Mỗi 200 điểm, Út Tí gặp một THỬ THÁCH KHÁM PHÁ về làng nghề, địa danh, anh hùng... Mỗi câu trả lời ĐÚNG là 1 mảnh ghép: đủ ${CORRECT_PER_BADGE} câu đúng để nhận 1 huy hiệu. Trả lời sai không mất mạng.`, 19);
    txt(this, W / 2, 310, 24, '#b3641a').setText('VẬT PHẨM BỔ TRỢ (nhảy lên để nhặt)');
    [['shield', 'Lá chắn', 'Chặn 1 lần va chạm, tối đa 15 giây.'], ['boots', 'Dép thần tốc', 'Chạy nhanh và xuyên qua chướng ngại trong 6 giây.'], ['nonla', 'Nón lá may mắn', 'Nhân đôi điểm trong 10 giây.'], ['fruit', 'Trái cây hồi sức', '+1 mạng (khi đầy mạng thì thưởng 30 điểm).']].forEach(([k, n, d], i) => {
      const y = 354 + i * 52; this.add.image(210, y, 'it_' + k).setScale(.26); txt(this, 262, y - 11, 20, '#6a3f12').setText(n).setOrigin(0, .5); txt(this, 262, y + 12, 17, '#3a2410', { fontStyle: 'normal' }).setText(d).setOrigin(0, .5);
    });
    txt(this, W / 2, 574, 18, '#2f6a2a', { fontStyle: 'normal', align: 'center', wordWrap: { width: 980 } }).setText('Hành trình có 6 chương: Cần Thơ → Vĩnh Long → Tiền Giang → Đồng Tháp → Bến Tre → Trà Vinh. Hoàn thành đủ 10 huy hiệu của một tỉnh để mở khóa tỉnh tiếp theo.');
    button(this, W / 2, 636, 240, 50, '◀ QUAY LẠI', () => fadeTo(this, 'MainMenuScene'), { color: 0x8a4a2a });
  }
}
