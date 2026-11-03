// Chapters are played in this order. Finishing every badge of a province unlocks the next one.
// `backdrop` (optional): painted background image in public/assets/backgrounds. Provinces without it use the procedural theme.
export const PROVINCES = [
  { id: 'can-tho', name: 'Cần Thơ', section: 'CẦN THƠ — TÂY ĐÔ', title: 'NGƯỜI KHÁM PHÁ TÂY ĐÔ', color: 0x1a6fd0, prefix: 'CT', tagline: 'Chợ nổi Cái Răng, cầu Cần Thơ',
    backdrop: { bg: 'bg_can-tho.jpg', ground: 'ground_can-tho.png', scale: 1280 / 1576, groundTop: 586, water: [395, 580] } },
  { id: 'vinh-long', name: 'Vĩnh Long', section: 'VĨNH LONG — XỨ CÙ LAO', title: 'NGƯỜI KHÁM PHÁ CÙ LAO XANH', color: 0x2aa040, prefix: 'VL', tagline: 'Vương quốc gốm đỏ' },
  { id: 'tien-giang', name: 'Tiền Giang', section: 'TIỀN GIANG — CỬA NGÕ MIỀN TÂY', title: 'NGƯỜI KHÁM PHÁ CỬA NGÕ MIỀN TÂY', color: 0xf0882a, prefix: 'TG', tagline: 'Đất Gò Công, chùa Vĩnh Tràng' },
  { id: 'dong-thap', name: 'Đồng Tháp', section: 'ĐỒNG THÁP — ĐẤT SEN HỒNG', title: 'NGƯỜI KHÁM PHÁ ĐẤT SEN HỒNG', color: 0xe0407a, prefix: 'DT', tagline: 'Sen hồng, hoa kiểng Sa Đéc' },
  { id: 'ben-tre', name: 'Bến Tre', section: 'BẾN TRE — XỨ DỪA', title: 'NGƯỜI KHÁM PHÁ XỨ DỪA', color: 0x18a8b8, prefix: 'BT', tagline: 'Xứ dừa Đồng Khởi' },
  { id: 'tra-vinh', name: 'Trà Vinh', section: 'TRÀ VINH — XỨ DỪA SÁP', title: 'NGƯỜI KHÁM PHÁ XỨ DỪA SÁP', color: 0x7a48c8, prefix: 'TV', tagline: 'Chùa Khmer, Ao Bà Om' }
];
export const getProvince = id => PROVINCES.find(p => p.id === id) || PROVINCES[0];
export const provinceIndex = id => Math.max(0, PROVINCES.findIndex(p => p.id === id));
