export const W = 1280, H = 720, GROUND_Y = 620;
export const STORAGE_KEY = 'soulofmekong_utti_v1';
export const STATE = { MENU: 'MENU', PLAYING: 'PLAYING', QUIZ: 'QUIZ', PAUSED: 'PAUSED', GAME_OVER: 'GAME_OVER' };
export const MILESTONE_STEP = 200;
export const MAX_LIVES = 3;
export const INVULN_SECONDS = 1.5;
export const CORRECT_PER_BADGE = 5;          // Đợt 2: cần 5 câu đúng cho mỗi huy hiệu
export const FONT = '"Be Vietnam Pro","Segoe UI",Roboto,Arial,sans-serif';
// Difficulty tiers: 0-199 Dễ, 200-399 Thường, 400-599 Vừa, 600-799 Khó, 800+ Nâng cao
export const LEVELS = [
  { name: 'Dễ', speed: 380 }, { name: 'Thường', speed: 440 }, { name: 'Vừa', speed: 510 },
  { name: 'Khó', speed: 580 }, { name: 'Nâng cao', speed: 660 }
];
export const PHYSICS = { gravity: 2200, jumpVelocity: -900 }; // jump apex ≈184px, air time ≈0.82s
// Vật phẩm bổ trợ (nhảy lên để nhặt)
export const ITEMS = {
  shield: { name: 'Lá chắn', desc: 'Chặn 1 lần va chạm (tối đa 15 giây)', duration: 15 },
  boots:  { name: 'Dép thần tốc', desc: 'Chạy nhanh và xuyên chướng ngại trong 6 giây', duration: 6, speedMult: 1.25 },
  nonla:  { name: 'Nón lá may mắn', desc: 'Nhân đôi điểm trong 10 giây', duration: 10, scoreMult: 2 },
  fruit:  { name: 'Trái cây hồi sức', desc: '+1 mạng (đầy mạng thì +30 điểm)' }
};
