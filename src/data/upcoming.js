import { img } from './project.js';
// Các bài/địa điểm sẽ bổ sung sau — CHƯA hiển thị trên web (chỉ giữ lại để dùng về sau).
// Khi nhóm đã đến địa điểm nào, chuyển bài đó sang stories.js (kèm province, short, icon, order, body, refs).
export const upcoming = [
  {
    slug: 'cho-noi-cai-rang',
    title: 'Chợ nổi Cái Răng — Nét đẹp văn hóa đang dần mai một?',
    category: 'Phóng sự',
    date: '26/09/2026',
    place: 'Chợ nổi Cái Răng, Cần Thơ',
    read: '7 phút đọc',
    image: img.chonoi, 
    featured: true,
    excerpt: 'Chợ nổi Cái Răng không chỉ là nơi giao thương buôn bán sầm uất trên sông nước mà còn là biểu tượng tinh hoa văn hóa đặc trưng hàng thế kỷ của miền Tây Nam Bộ. Thế nhưng, giữa nhịp sống cầu đường hiện đại và sự thay đổi của thế hệ trẻ, liệu nhịp chèo cây bẹo này có còn bền bỉ tồn tại?'
  },
  {
    slug: 'phu-nu-mien-tay',
    title: 'Hành trình cùng những người phụ nữ miền Tây',
    category: 'Phóng sự',
    date: '25/09/2026',
    image: img.phunu,
    excerpt: 'Hành trình ghi lại đời sống và nghề mưu sinh của những người phụ nữ miền Tây.'
  },
  {
    slug: 'tuoi-tre-lan-toa',
    title: 'Tuổi trẻ và hành trình lan tỏa giá trị văn hóa',
    category: 'Góc nhìn trẻ',
    date: '22/09/2026',
    image: img.tre,
    excerpt: 'Góc nhìn của người trẻ bản địa về việc gìn giữ và lan tỏa giá trị văn hóa Mekong.'
  },
  {
    slug: 'xuong-ba-la',
    title: 'Từ những chiếc xuồng ba lá đến du lịch cộng đồng',
    category: 'Phóng sự',
    date: '24/09/2026',
    image: img.xuong, excerpt: 'Những chiếc xuồng ba lá không chỉ là phương tiện di chuyển mộc mạc mà còn là một phần linh hồn của miền Tây sông nước được người trẻ gìn giữ...'
  },
  {
    slug: 'am-thuc-mien-tay',
    title: 'Ẩm thực miền Tây — Hương vị từ đất, từ người',
    category: 'Ẩm thực',
    date: '20/09/2026',
    image: img.amthuc,
    excerpt: 'Mỗi món ăn là một câu chuyện thấm đượm phù sa, một nét văn hóa được người mẹ miền Tây gìn giữ qua bao thế hệ hào sảng thân thương...'
  },
  {
    slug: 'don-ca-tai-tu',
    title: 'Giữ gìn tiếng hát đờn ca tài tử Nam Bộ',
    category: 'Văn hóa',
    date: '17/09/2026',
    image: img.dca,
    excerpt: 'Tiếng hát đàn ca không chỉ là âm nhạc mà còn là tiếng lòng hào phóng, mộc mạc và tri ân đất mẹ của người dân miền Tây sông nước...'
  },
  {
    slug: 'tuoi-tre-bao-ton',
    title: 'Tuổi trẻ với sứ mệnh bảo tồn văn hóa địa phương',
    category: 'Dự án trẻ',
    date: '12/09/2026',
    image: img.sv,
    excerpt: 'Những hành động nhỏ hôm nay của nhóm bạn trẻ sinh viên có thể tạo nên thay đổi lớn cho việc gìn giữ ký ức phù sa mai này...'
  },
];
