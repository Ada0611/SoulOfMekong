import { PROVINCES } from './provinces.js';
// Badge artwork lives in public/assets/badges/<id>.png (id = "<province>-<suffix>"). Order = order they are earned.
// [suffix, name, description, cultural fact]
const ROWS = {
  'can-tho': [
    ['cho-noi', 'Chợ Nổi Cái Răng', 'Khám phá nét văn hóa thương hồ đặc trưng của vùng sông nước Cần Thơ.', 'Chợ nổi họp trên sông từ sáng sớm; ghe xuồng treo hàng lên cây bẹo để rao bán.'],
    ['ninh-kieu', 'Bến Ninh Kiều', 'Chiêm ngưỡng vẻ đẹp thơ mộng của Bến Ninh Kiều bên dòng sông Hậu.', 'Bến Ninh Kiều là nơi dạo mát quen thuộc của người dân và du khách bên sông Hậu.'],
    ['phong-dien', 'Vườn Trái Cây Phong Điền', 'Khám phá những vườn trái cây trĩu quả và vẻ đẹp miệt vườn Phong Điền.', 'Du lịch sinh thái miệt vườn với kênh rạch và vườn cây ăn trái là thế mạnh của Phong Điền.'],
    ['chua-ong', 'Chùa Ông', 'Khám phá công trình kiến trúc độc đáo mang đậm dấu ấn văn hóa người Hoa.', 'Chùa Ông (Quảng Triệu hội quán) mang kiến trúc Hoa với mái ngói cong và đèn lồng đỏ.'],
    ['am-thuc', 'Ẩm Thực Tây Đô', 'Thưởng thức những hương vị dân dã đặc trưng của vùng đất Tây Đô.', 'Bánh cống chiên vàng giòn, ăn kèm rau sống và nước mắm chua ngọt.'],
    ['cau-can-tho', 'Cầu Cần Thơ', 'Chiêm ngưỡng cây cầu dây văng bắc qua sông Hậu.', 'Cầu Cần Thơ bắc qua sông Hậu, rút ngắn đường nối Cần Thơ với Vĩnh Long.'],
    ['nha-co', 'Nhà Cổ Bình Thủy', 'Ghé thăm ngôi nhà cổ mang dáng dấp kiến trúc Đông – Tây.', 'Nhà cổ Bình Thủy là điểm tham quan nổi bật của quận Bình Thủy, Cần Thơ.'],
    ['truc-lam', 'Thiền Viện Trúc Lâm', 'Tìm chút bình yên nơi thiền viện thanh tịnh.', 'Thiền viện Trúc Lâm Phương Nam thuộc dòng thiền Trúc Lâm.'],
    ['vuon-co', 'Vườn Cò Bằng Lăng', 'Ngắm đàn cò trắng về tổ giữa rặng cây xanh.', 'Vườn cò Bằng Lăng là nơi nhiều đàn cò trú ngụ, nổi tiếng ở Cần Thơ.'],
    ['don-ca', 'Đờn Ca Tài Tử', 'Lắng nghe âm điệu đờn ca tài tử Nam Bộ.', 'Năm 2013, UNESCO ghi danh Đờn ca tài tử Nam Bộ là Di sản văn hóa phi vật thể đại diện của nhân loại.']
  ],
  'vinh-long': [
    ['cu-lao', 'Cù Lao An Bình', 'Dạo thuyền giữa cù lao xanh mát vườn trái cây.', 'Cù lao An Bình nằm giữa sông Tiền, nổi tiếng với vườn cây ăn trái và du lịch nhà vườn.'],
    ['cho-noi-tra-on', 'Chợ Nổi Trà Ôn', 'Hòa mình vào buổi chợ trên sông Hậu.', 'Chợ nổi Trà Ôn họp trên sông Hậu, nơi ghe xuồng chở nông sản miệt vườn.'],
    ['cau-my-thuan', 'Cầu Mỹ Thuận', 'Băng qua cây cầu dây văng nối hai bờ sông Tiền.', 'Cầu Mỹ Thuận bắc qua sông Tiền, nối Vĩnh Long với Tiền Giang.'],
    ['gom-do', 'Gốm Đỏ Mang Thít', 'Khám phá làng nghề gốm đỏ nung bằng lò gạch.', 'Mang Thít nổi tiếng với gốm đỏ và những lò nung lớn ven sông Cổ Chiên.'],
    ['van-thanh', 'Văn Thánh Miếu', 'Ghé thăm ngôi miếu thờ Khổng Tử giữa lòng Vĩnh Long.', 'Văn Thánh Miếu ở Vĩnh Long là nơi thờ Khổng Tử, biểu tượng của truyền thống hiếu học.'],
    ['buoi', 'Bưởi Năm Roi', 'Nếm vị ngọt thanh của bưởi Năm Roi Bình Minh.', 'Bưởi Năm Roi là đặc sản nổi tiếng của vùng Bình Minh, Vĩnh Long.'],
    ['khoai-lang', 'Khoai Lang Bình Tân', 'Tìm hiểu vùng đất trồng khoai lang lớn của Vĩnh Long.', 'Bình Tân được biết đến là vùng trồng khoai lang lớn của Vĩnh Long.'],
    ['song-tien-hau', 'Sông Tiền – Sông Hậu', 'Khám phá vùng đất nằm giữa hai nhánh sông lớn.', 'Vĩnh Long nằm kẹp giữa sông Tiền và sông Hậu, hai nhánh của sông Mê Kông.'],
    ['cam-sanh', 'Cam Sành Tam Bình', 'Thưởng thức vị cam sành mọng nước miệt vườn.', 'Tam Bình là địa phương ở Vĩnh Long nổi tiếng với cam sành.'],
    ['mien-vuon', 'Homestay Miệt Vườn', 'Nghỉ chân trong nhà vườn giữa kênh rạch yên bình.', 'Ở miệt vườn, du khách thường đi xuồng ba lá len lỏi qua các kênh rạch nhỏ.']
  ],
  'tien-giang': [
    ['vinh-trang', 'Chùa Vĩnh Tràng', 'Chiêm ngưỡng ngôi chùa cổ có kiến trúc Á – Âu độc đáo.', 'Chùa Vĩnh Tràng ở Mỹ Tho nổi tiếng với kiến trúc hòa trộn nhiều phong cách.'],
    ['cho-noi-cai-be', 'Chợ Nổi Cái Bè', 'Thưởng ngoạn chợ nổi trên sông Tiền.', 'Chợ nổi Cái Bè họp trên sông Tiền, nổi tiếng với trái cây miệt vườn.'],
    ['con-thoi-son', 'Cồn Thới Sơn', 'Đi thuyền thăm cù lao xanh giữa sông Tiền.', 'Cồn Thới Sơn là cù lao nằm trên sông Tiền, gần thành phố Mỹ Tho.'],
    ['rach-mieu', 'Cầu Rạch Miễu', 'Qua cầu Rạch Miễu nối hai bờ sông Tiền.', 'Cầu Rạch Miễu bắc qua sông Tiền, nối Tiền Giang với Bến Tre.'],
    ['hu-tieu', 'Hủ Tiếu Mỹ Tho', 'Nếm tô hủ tiếu trứ danh xứ Mỹ Tho.', 'Hủ tiếu Mỹ Tho là món ăn đặc trưng của Tiền Giang.'],
    ['xoai', 'Xoài Cát Hòa Lộc', 'Thưởng thức xoài cát thơm ngọt nổi tiếng.', 'Xoài cát Hòa Lộc là đặc sản được nhiều người biết đến của Tiền Giang.'],
    ['vu-sua', 'Vú Sữa Lò Rèn', 'Nếm vị ngọt mát của vú sữa Lò Rèn Vĩnh Kim.', 'Vú sữa Lò Rèn nổi tiếng ở xã Vĩnh Kim, Tiền Giang.'],
    ['rach-gam', 'Rạch Gầm – Xoài Mút', 'Nhớ lại chiến thắng oai hùng năm 1785.', 'Năm 1785, Nguyễn Huệ đại phá quân Xiêm tại Rạch Gầm – Xoài Mút trên đất Tiền Giang.'],
    ['lang-nghe', 'Làng Nghề Tiền Giang', 'Ghé các lò thủ công và làng nghề truyền thống.', 'Vùng Cái Bè có lò làm kẹo, bánh tráng, cốm, nung gạch; Gò Công có làng nghề Ông Non đóng tủ thờ gỗ quý.'],
    ['ban-do', 'Tiền Giang – Cửa Ngõ Miền Tây', 'Hoàn thành hành trình khám phá Tiền Giang.', 'Tiền Giang nằm bên sông Tiền, thường được gọi là cửa ngõ của miền Tây Nam Bộ.']
  ],
  'dong-thap': [
    ['vuon-quoc-gia', 'Vườn Quốc Gia Tràm Chim', 'Dạo giữa vùng đất ngập nước đặc trưng của Đồng Tháp Mười.', 'Vườn quốc gia Tràm Chim là vùng đất ngập nước tiêu biểu của Đồng Tháp Mười.'],
    ['lang-hoa', 'Làng Hoa Sa Đéc', 'Ngắm thủ phủ hoa kiểng của miền Tây.', 'Làng hoa kiểng Sa Đéc (Tân Quy Đông) hơn 100 tuổi, là thủ phủ hoa của miền Tây.'],
    ['tram-chim', 'Sếu Đầu Đỏ Tràm Chim', 'Ngắm sếu đầu đỏ trên đồng cỏ ngập nước.', 'Tràm Chim nổi tiếng với loài sếu đầu đỏ.'],
    ['xeo-quyt', 'Khu Di Tích Xẻo Quýt', 'Lạc vào Đồng Tháp Mười thu nhỏ giữa rừng tràm.', 'Xẻo Quýt từng là căn cứ cách mạng của Tỉnh ủy Đồng Tháp.'],
    ['nha-co', 'Nhà Cổ Sa Đéc', 'Ghé ngôi nhà cổ kiến trúc Đông – Tây ở Sa Đéc.', 'Nhà cổ Huỳnh Thủy Lê nằm ở thành phố Sa Đéc, mang kiến trúc Đông – Tây.'],
    ['banh-xeo', 'Bánh Xèo Miền Tây', 'Thưởng thức chiếc bánh xèo giòn rụm ăn kèm rau đồng.', 'Bánh xèo là món bánh dân dã của miền Tây, thường ăn kèm nhiều loại rau đồng.'],
    ['nem-lai-vung', 'Nem Lai Vung', 'Thưởng thức nem đặc sản xứ Sen hồng.', 'Nghề làm nem Lai Vung là nghề nổi tiếng của Đồng Tháp.'],
    ['ca-linh', 'Cá Linh Mùa Nước Nổi', 'Đón mùa nước nổi với món cá linh dân dã.', 'Cá linh là đặc sản của mùa nước nổi ở Đồng bằng sông Cửu Long.'],
    ['gao', 'Gạo Đồng Tháp', 'Tìm hiểu vựa lúa của miền Tây.', 'Đồng Tháp là một trong những vựa lúa gạo của Đồng bằng sông Cửu Long.'],
    ['sen-hong', 'Sen Hồng', 'Ngắm đồng sen hồng bạt ngàn.', 'Đồng Tháp được gọi là Đất Sen hồng.']
  ],
  'ben-tre': [
    ['keo-dua', 'Kẹo Dừa Mỏ Cày', 'Ghé xưởng xem kẹo dừa được nấu và gói thủ công.', 'Kẹo dừa Bến Tre nổi tiếng, đặc biệt là kẹo dừa Mỏ Cày.'],
    ['chua-dua', 'Chùa Dừa', 'Viếng ngôi chùa gắn với ông Đạo Dừa.', 'Chùa Dừa là điểm tham quan nổi tiếng của Bến Tre, gắn với ông Đạo Dừa.'],
    ['con-phung', 'Cồn Phụng', 'Đi thuyền thăm cồn giữa sông Tiền.', 'Cồn Phụng là điểm du lịch giữa sông Tiền, gắn với ông Đạo Dừa.'],
    ['vien-minh', 'Chùa Viên Minh', 'Tìm chút thanh tịnh nơi ngôi chùa cổ xứ dừa.', 'Chùa Viên Minh là một ngôi chùa nổi tiếng của Bến Tre.'],
    ['lang-nghe-dua', 'Làng Nghề Dừa', 'Xem những sản phẩm thủ công làm từ cây dừa.', 'Bến Tre có hơn 200.000 hộ trồng dừa, chiếm khoảng hai phần ba số hộ dân trong tỉnh.'],
    ['banh-trang', 'Bánh Tráng Mỹ Lồng', 'Xem người dân tráng, phơi và nướng bánh trên bếp than.', 'Làng nghề bánh tráng Mỹ Lồng (Giồng Trôm) được công nhận là Di sản văn hóa phi vật thể quốc gia cuối năm 2018.'],
    ['mut-dua', 'Mứt Dừa', 'Nếm vị ngọt béo của mứt dừa ngày Tết.', 'Mứt dừa là món quà đặc sản của xứ dừa, thường có mặt vào dịp Tết.'],
    ['cau-ham-luong', 'Cầu Hàm Luông', 'Qua cầu bắc ngang sông Hàm Luông.', 'Sông Hàm Luông là một nhánh của sông Tiền chảy qua Bến Tre.'],
    ['rach', 'Rạch Bến Tre', 'Đi xuồng len lỏi giữa rặng dừa nước.', 'Bến Tre có hệ thống sông rạch chằng chịt do các nhánh sông Tiền bồi đắp.'],
    ['don-ca', 'Đờn Ca Tài Tử', 'Lắng nghe tiếng đờn ca tài tử giữa miệt vườn.', 'Đờn ca tài tử Nam Bộ được UNESCO ghi danh năm 2013.']
  ],
  'tra-vinh': [
    ['ao-ba-om', 'Ao Bà Om', 'Dạo bên hồ nước trong xanh giữa rừng cây cổ thụ.', 'Ao Bà Om (còn gọi là Ao Vuông) là di tích lịch sử – văn hóa cấp quốc gia, nơi diễn ra nhiều hoạt động của lễ hội Ok Om Bok.'],
    ['chua-ang', 'Chùa Âng', 'Ghé ngôi chùa Khmer cổ kính gần Ao Bà Om.', 'Chùa Âng (Angkorajaborey) là chùa Khmer cổ cạnh Ao Bà Om, cách trung tâm thành phố Trà Vinh khoảng 7 km.'],
    ['chua-hang', 'Chùa Hang', 'Tìm đến ngôi chùa Khmer nổi tiếng ở Châu Thành.', 'Chùa Hang là một ngôi chùa Khmer nổi tiếng ở huyện Châu Thành, Trà Vinh.'],
    ['ba-dong', 'Biển Ba Động', 'Hóng gió ở bãi biển hoang sơ Duyên Hải.', 'Biển Ba Động thuộc huyện Duyên Hải, gần các làng nghề như làng muối Cồn Cù.'],
    ['banh-tet', 'Bánh Tét Trà Cuôn', 'Thưởng thức bánh tét của làng nghề Trà Cuôn.', 'Bánh tét Trà Cuôn ở huyện Cầu Ngang là đặc sản có thương hiệu của Trà Vinh, làm từ nếp sáp.'],
    ['dua-sap', 'Dừa Sáp Cầu Kè', 'Nếm dừa sáp đặc ruột có một không hai.', 'Dừa sáp Cầu Kè có cơm dừa đặc như sáp, được trồng từ những năm 1960.'],
    ['rung-ngap-man', 'Rừng Ngập Mặn', 'Đi xuồng giữa rừng ngập mặn ven biển.', 'Rừng ngập mặn ven biển Duyên Hải giúp chắn sóng và là nơi cư trú của nhiều loài thủy sinh.'],
    ['bao-tang-khmer', 'Bảo Tàng Văn Hóa Khmer', 'Tìm hiểu văn hóa của đồng bào Khmer.', 'Bảo tàng văn hóa dân tộc Khmer nằm trong cụm danh thắng Ao Bà Om – chùa Âng.'],
    ['cau-co-chien', 'Cầu Cổ Chiên', 'Qua cầu dây văng nối hai bờ sông Cổ Chiên.', 'Cầu Cổ Chiên trên quốc lộ 60 nối hai tỉnh Bến Tre và Trà Vinh.'],
    ['ok-om-bok', 'Lễ Hội Ok Om Bok', 'Ngắm đèn nước và ghe ngo trong đêm cúng trăng.', 'Lễ hội Ok Om Bok (cúng trăng) của đồng bào Khmer diễn ra vào Rằm tháng 10 âm lịch và là Di sản văn hóa phi vật thể quốc gia.']
  ]
};
export const BADGES = PROVINCES.flatMap(p => ROWS[p.id].map(r => ({ id: `${p.id}-${r[0]}`, provinceId: p.id, name: r[1], description: r[2], fact: r[3] })));
export const badgeTextureKey = (id, locked) => `badge_${id}${locked ? '_locked' : ''}`;
export const badgeFile = id => `badges/${id}.png`;
