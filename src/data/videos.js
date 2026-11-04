import { img } from './project.js';
const real = [
  {
    id: 1,
    title: 'Làng dệt thổ cẩm Chăm Châu Phong (Tân Châu)',
    description: 'Lắng nghe tiếng thoi dệt lạch cạch bên nhà sàn gỗ và khám phá bí thuật nhuộm màu tự nhiên cực xịn của người Chăm An Giang.',
    thumbnail: "/DetThoCam.png",
    platform: 'TikTok',
    duration: '00:49',
    url: 'https://www.tiktok.com/@soulofmekong0/video/7695394323407359284?is_from_webapp=1&sender_device=pc&web_id=7678253183156635137'
  },
  { 
    id: 2,
    title: 'Làng bánh tráng Cù lao Mây (Vĩnh Long)', 
    description: 'Băng phà sang cù lao Mây dạo bếp tráng bánh, tự tay thử đổ bánh tráng dẻo thơm và thưởng thức vị ngọt hơn 100 năm tuổi.', 
    thumbnail: "/BanhTrang.png", 
    platform: 'TikTok', 
    duration: '00:55', 
    url: 'https://www.tiktok.com/@soulofmekong0/video/7697243492346645761?is_from_webapp=1&sender_device=pc&web_id=7678253183156635137'
  },
  { 
    id: 3,
    title: 'Làng dệt thổ cẩm Chăm Châu Phong (An Giang)', 
    description: 'Trò chuyện cùng chị Saphynah bên khung dệt gỗ, lắng nghe câu chuyện giữ lửa nghề dệt thổ cẩm truyền thống và sắc màu văn hóa Chăm Nam Bộ.', 
    thumbnail: "/Saphynah.png", 
    platform: 'TikTok', 
    duration: '01:36', 
    url: 'https://www.tiktok.com/@soulofmekong0/video/7699105391405190401?is_from_webapp=1&sender_device=pc&web_id=7678253183156635137'
  },
  { 
    id: 4,
    title: 'Làng nghề tơ lụa Tân Châu (An Giang)', 
    description: 'Tìm về xứ tơ lụa Tân Châu trứ danh, khám phá quy trình nhuộm trái mặc nưa kỳ công và sắc đen huyền thoại của Lãnh Mỹ A.', 
    thumbnail: "/ToLua.png", 
    platform: 'TikTok', 
    duration: '00:59', 
    url: 'https://www.tiktok.com/@soulofmekong0/video/7702336651288218900?is_from_webapp=1&sender_device=pc&web_id=7678253183156635137'
  },
  { 
    id: 5,
    title: 'Đám giỗ miền Tây - Ấm áp tình làng nghĩa xóm', 
    description: 'Về miền Tây đi đám giỗ, cảm nhận không khí quây quần bên mâm cỗ truyền thống và nét văn hóa thắt chặt tình làng nghĩa xóm.', 
    thumbnail: "/DamGio.png", 
    platform: 'TikTok', 
    duration: '00:40', 
    url: 'https://www.tiktok.com/@soulofmekong0/video/7702844066685357332?is_from_webapp=1&sender_device=pc&web_id=7678253183156635137'
  },
  { 
    id: 6,
    title: 'Làng gạch Mang Thít (Vĩnh Long)', 
    description: 'Ghé thăm Vương quốc đỏ Mang Thít bên dòng Cổ Chiên, chiêm ngưỡng những lò gạch rêu phong và câu chuyện di sản trăm năm.', 
    thumbnail: "/LangGach.png", 
    platform: 'TikTok', 
    duration: '00:42', 
    url: 'https://www.tiktok.com/@soulofmekong0/video/7703604334973439252?is_from_webapp=1&sender_device=pc&web_id=7678253183156635137'
  },
  { 
    id: 7,
    title: 'Ghe tàu sông nước miền Tây', 
    description: 'Ngoạn cảnh sông nước Mê Kông, khám phá nhịp sống hồ hởi trên những chiếc ghe thuyền và văn hóa buôn bán bồng bềnh đặc trưng.', 
    thumbnail: "/GheTauSongNuoc.png", 
    platform: 'TikTok', 
    duration: '01:50', 
    url: 'https://www.tiktok.com/@soulofmekong0/video/7703759677867216148?is_from_webapp=1&sender_device=pc&web_id=7678253183156635137'
  },
  { 
    id: 8,
    title: 'Phỏng vấn chị Minh Thư - Đờn ca tài tử', 
    description: 'Trò chuyện cùng chị Minh Thư, lắng nghe tâm sự giữ lửa ngón đờn tiếng hát và tình yêu sâu đậm với di sản Đờn ca tài tử Nam Bộ.', 
    thumbnail: "/DonCaTaiTu.png", 
    platform: 'TikTok', 
    duration: '01:10', 
    url: 'https://www.tiktok.com/@soulofmekong0/video/7704348678785420545?is_from_webapp=1&sender_device=pc&web_id=7678253183156635137'
  },
];
export const videos = [...real].sort((a, b) => new Date(b.date) - new Date(a.date));
