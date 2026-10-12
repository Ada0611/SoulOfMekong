import { img } from './project.js';
const real = [
  {
    id: 1,
    title: 'Làng dệt thổ cẩm Chăm Châu Phong (Tân Châu)',
    description: 'Lắng nghe tiếng thoi dệt lạch cạch bên nhà sàn gỗ và khám phá bí thuật nhuộm màu tự nhiên cực xịn của người Chăm An Giang.',
    thumbnail: "/DetThocam.png",
    platform: 'TikTok',
    date: '11/10/2026',
    duration: '00:49',
    url: 'https://www.tiktok.com/@soulofmekong0/video/7695394323407359284?is_from_webapp=1&sender_device=pc&web_id=7678253183156635137'
  },
];
export const videos = [...real].sort((a, b) => new Date(b.date) - new Date(a.date));
