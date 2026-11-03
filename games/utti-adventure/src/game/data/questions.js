import { PROVINCES } from './provinces.js';
import { FACTS } from './facts.js';

export const TOPIC_LABEL = { ln: 'Làng nghề truyền thống', dd: 'Địa danh', ah: 'Anh hùng & Danh nhân', ds: 'Ẩm thực & Đặc sản', vh: 'Văn hóa & Lễ hội' };

// Handwritten rows: [topic, difficulty, question, [correct, wrong, wrong, wrong], explanation]
// The correct answer is first in source; QuizManager shuffles options at runtime.
const HAND = {
  'can-tho': [
    ['dd', 'easy', 'Người bán hàng ở chợ nổi thường treo hàng lên vật gì để khách từ xa nhìn thấy?', ['Cây bẹo', 'Biển quảng cáo điện tử', 'Cờ hiệu thể thao', 'Đèn lồng giấy'], 'Cây bẹo là cây sào dựng trên ghe, treo mẫu hàng để rao bán giữa sông nước ồn ào.'],
    ['dd', 'easy', 'Bến Ninh Kiều của Cần Thơ nằm bên dòng sông nào?', ['Sông Hậu', 'Sông Hồng', 'Sông Hương', 'Sông Đồng Nai'], 'Bến Ninh Kiều nằm bên sông Hậu, một nhánh lớn của sông Mê Kông.'],
    ['dd', 'easy', 'Phong Điền được nhiều du khách biết đến với loại hình du lịch nào?', ['Du lịch sinh thái miệt vườn', 'Du lịch trượt tuyết', 'Du lịch sa mạc', 'Du lịch hang động'], 'Phong Điền có nhiều vườn cây ăn trái, kênh rạch nên rất hợp với du lịch sinh thái miệt vườn.'],
    ['dd', 'medium', 'Chùa Ông ở Cần Thơ thờ vị nhân vật nào là chính?', ['Quan Công', 'Khổng Tử', 'Trần Hưng Đạo', 'Thần Nông'], 'Chùa Ông (Quảng Triệu hội quán) thờ Quan Công, gắn với cộng đồng người Hoa ở Cần Thơ.'],
    ['ds', 'easy', 'Bánh cống Cần Thơ thường có nhân gồm những gì?', ['Đậu xanh và tôm', 'Chuối và dừa', 'Khoai môn và sữa', 'Thịt bò và phô mai'], 'Bánh cống có nhân đậu xanh, thịt, tôm, chiên vàng giòn và ăn kèm rau sống.'],
    ['dd', 'medium', 'Cầu Cần Thơ bắc qua sông Hậu, nối Cần Thơ với tỉnh nào?', ['Vĩnh Long', 'Cà Mau', 'An Giang', 'Kiên Giang'], 'Cầu Cần Thơ nối hai bờ sông Hậu, giúp đi lại giữa Cần Thơ và Vĩnh Long thuận tiện hơn.'],
    ['dd', 'easy', 'Nhà cổ Bình Thủy thuộc quận nào của Cần Thơ?', ['Bình Thủy', 'Ninh Kiều', 'Thốt Nốt', 'Cái Răng'], 'Nhà cổ Bình Thủy nằm ở quận Bình Thủy, có kiến trúc pha trộn Đông – Tây.'],
    ['dd', 'medium', 'Thiền viện Trúc Lâm Phương Nam thuộc dòng thiền nào?', ['Trúc Lâm', 'Lâm Tế', 'Thảo Đường', 'Vô Ngôn Thông'], 'Thiền viện Trúc Lâm Phương Nam thuộc dòng thiền Trúc Lâm của Việt Nam.'],
    ['dd', 'easy', 'Vườn cò Bằng Lăng nổi tiếng với loài chim nào?', ['Cò', 'Đại bàng', 'Chim cánh cụt', 'Vẹt'], 'Vườn cò Bằng Lăng là nơi trú ngụ của nhiều đàn cò, thu hút người yêu thiên nhiên.'],
    ['vh', 'medium', 'UNESCO ghi danh Đờn ca tài tử Nam Bộ là di sản gì?', ['Di sản văn hóa phi vật thể đại diện của nhân loại', 'Di sản thiên nhiên thế giới', 'Kỳ quan thế giới mới', 'Di sản tư liệu thế giới'], 'Năm 2013, Đờn ca tài tử Nam Bộ được UNESCO ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại.'],
    ['vh', 'medium', 'Văn hóa chợ nổi Cái Răng được công nhận là loại di sản nào?', ['Di sản văn hóa phi vật thể quốc gia', 'Di sản thiên nhiên thế giới', 'Bảo vật quốc gia', 'Di tích lịch sử cấp tỉnh'], 'Văn hóa chợ nổi Cái Răng là một trong 4 di sản văn hóa phi vật thể quốc gia của Cần Thơ.'],
    ['vh', 'hard', 'Di sản nào sau đây là di sản văn hóa phi vật thể quốc gia của Cần Thơ?', ['Lễ hội Kỳ yên Đình Bình Thủy', 'Hội Gióng', 'Nhã nhạc cung đình Huế', 'Ca trù'], 'Cần Thơ có 4 di sản phi vật thể quốc gia: Văn hóa chợ nổi Cái Răng, Lễ hội Kỳ yên Đình Bình Thủy, Hò Cần Thơ và Hát ru của người Việt ở Cần Thơ.'],
    ['ln', 'medium', 'Nghề làm bánh tráng Thuận Hưng đã tồn tại và phát triển trên bao nhiêu năm?', ['Trên 200 năm', 'Khoảng 20 năm', 'Khoảng 50 năm', 'Dưới 10 năm'], 'Làng nghề bánh tráng Thuận Hưng hình thành và phát triển trên 200 năm.'],
    ['ln', 'easy', 'Làng nghề đan lưới Thơm Rơm thuộc quận nào của Cần Thơ?', ['Thốt Nốt', 'Ninh Kiều', 'Cái Răng', 'Phong Điền'], 'Thơm Rơm là làng nghề đan lưới truyền thống ở quận Thốt Nốt.'],
    ['ln', 'medium', 'Làng hoa Phó Thọ – Bà Bộ nằm ở quận nào của Cần Thơ?', ['Bình Thủy', 'Thốt Nốt', 'Ô Môn', 'Cái Răng'], 'Làng hoa Phó Thọ – Bà Bộ là làng nghề lâu đời của quận Bình Thủy.'],
    ['ah', 'medium', 'Vở tuồng Kim Thạch kỳ duyên là tác phẩm của ai?', ['Bùi Hữu Nghĩa', 'Nguyễn Đình Chiểu', 'Phan Văn Trị', 'Hồ Biểu Chánh'], 'Kim Thạch kỳ duyên là bản tuồng của Thủ khoa Bùi Hữu Nghĩa.'],
    ['ah', 'hard', 'Tuồng Kim Thạch kỳ duyên có điểm gì đặc biệt?', ['Là vở tuồng đầu tiên của Việt Nam được dịch sang tiếng Pháp', 'Là vở tuồng đầu tiên được dựng thành phim', 'Là vở tuồng dài nhất Việt Nam', 'Là vở tuồng đầu tiên viết bằng chữ Quốc ngữ'], 'Đây được xem là vở tuồng đầu tiên của Việt Nam được dịch sang tiếng Pháp.'],
    ['ah', 'medium', 'Năm 1835, Bùi Hữu Nghĩa đỗ danh hiệu nào ở kỳ thi Hương tại trường thi Gia Định?', ['Thủ khoa (giải nguyên)', 'Trạng nguyên', 'Bảng nhãn', 'Thám hoa'], 'Ông đỗ đầu kỳ thi Hương nên được gọi là Thủ khoa Nghĩa.'],
    ['ah', 'medium', 'Đồng chí Châu Văn Liêm sinh năm 1902 ở vùng đất nào của Cần Thơ?', ['Thới Thạnh', 'Bình Thủy', 'Phong Điền', 'Cái Răng'], 'Châu Văn Liêm sinh ngày 29/6/1902 ở làng Thới Thạnh, là một trong những trí thức Cần Thơ đầu tiên giác ngộ lý tưởng cộng sản.'],
    ['dd', 'easy', 'Cần Thơ nổi tiếng với danh xưng nào?', ['Tây Đô', 'Đất Võ', 'Thành phố hoa phượng đỏ', 'Cố đô'], 'Cần Thơ được gọi là Tây Đô, thủ phủ của miền Tây sông nước.'],
    ['dd', 'medium', 'Vườn cò Bằng Lăng nằm ở quận nào của Cần Thơ?', ['Thốt Nốt', 'Ninh Kiều', 'Bình Thủy', 'Cái Răng'], 'Vườn cò Bằng Lăng là điểm du lịch của quận Thốt Nốt.'],
    ['ds', 'easy', 'Món lẩu mắm thường được nấu từ nguyên liệu chính nào?', ['Mắm cá', 'Nấm', 'Sữa dừa', 'Hải sản đông lạnh'], 'Lẩu mắm nấu từ mắm cá, ăn kèm nhiều loại rau đồng.']
  ],
  'vinh-long': [
    ['dd', 'medium', 'Cù lao An Bình của Vĩnh Long nằm giữa dòng sông nào?', ['Sông Tiền', 'Sông Sài Gòn', 'Sông Vàm Cỏ', 'Sông Đà'], 'Cù lao An Bình nằm giữa sông Tiền, nổi tiếng với vườn trái cây và nhà vườn.'],
    ['dd', 'easy', 'Chợ nổi Trà Ôn họp trên dòng sông nào?', ['Sông Hậu', 'Sông Đà', 'Sông Mã', 'Sông Đáy'], 'Chợ nổi Trà Ôn họp trên sông Hậu.'],
    ['dd', 'medium', 'Cầu Mỹ Thuận nối Vĩnh Long với tỉnh nào?', ['Tiền Giang', 'Bến Tre', 'Long An', 'An Giang'], 'Cầu Mỹ Thuận bắc qua sông Tiền, nối Vĩnh Long với Tiền Giang.'],
    ['ln', 'medium', 'Làng nghề gốm ở Mang Thít (Vĩnh Long) nổi tiếng với loại gốm nào?', ['Gốm đỏ', 'Gốm men lam', 'Gốm sứ trắng', 'Gốm xanh ngọc'], 'Mang Thít nổi tiếng với gốm đỏ và các lò nung ven sông.'],
    ['dd', 'hard', 'Văn Thánh Miếu ở Vĩnh Long thờ ai?', ['Khổng Tử', 'Quan Công', 'Bà Chúa Xứ', 'Đức Phật Thích Ca'], 'Văn Thánh Miếu là nơi thờ Khổng Tử, thể hiện truyền thống hiếu học.'],
    ['ds', 'easy', 'Bưởi Năm Roi nổi tiếng ở vùng nào?', ['Bình Minh, Vĩnh Long', 'Hà Giang', 'Đà Lạt', 'Pleiku'], 'Bưởi Năm Roi là đặc sản nổi tiếng của Bình Minh, Vĩnh Long.'],
    ['ds', 'easy', 'Vùng Bình Tân của Vĩnh Long nổi tiếng trồng loại củ nào?', ['Khoai lang', 'Sâm', 'Cà rốt', 'Su hào'], 'Bình Tân được biết đến là vùng trồng khoai lang lớn của Vĩnh Long.'],
    ['dd', 'easy', 'Vĩnh Long nằm giữa hai nhánh nào của sông Mê Kông?', ['Sông Tiền và sông Hậu', 'Sông Đà và sông Lô', 'Sông Hồng và sông Thái Bình', 'Sông Cả và sông Mã'], 'Vĩnh Long nằm giữa sông Tiền và sông Hậu, vì vậy có nhiều cù lao và vườn cây trái.'],
    ['ds', 'medium', 'Tam Bình, Vĩnh Long nổi tiếng với loại cam nào?', ['Cam sành', 'Cam Cao Phong', 'Cam Vinh', 'Cam Xã Đoài'], 'Tam Bình nổi tiếng với cam sành; ba loại cam còn lại thuộc các vùng khác.'],
    ['dd', 'easy', 'Ở miệt vườn, du khách thường đi trên kênh rạch nhỏ bằng phương tiện nào?', ['Xuồng ba lá', 'Tàu cao tốc', 'Khinh khí cầu', 'Xe lửa'], 'Xuồng ba lá nhỏ gọn, len lỏi được vào kênh rạch hẹp giữa vườn cây.'],
    ['ln', 'easy', 'Làng gốm đỏ Mang Thít nằm bên dòng sông nào?', ['Sông Cổ Chiên', 'Sông Hương', 'Sông Đà', 'Sông Cầu'], 'Những lò gạch gốm Mang Thít soi bóng bên dòng sông Cổ Chiên.'],
    ['ln', 'hard', 'Nghề làm gạch Mang Thít hình thành khi cộng đồng nào truyền kỹ thuật cho người Kinh và người Hoa?', ['Người Khmer', 'Người Chăm', 'Người Tày', 'Người Mường'], 'Làng nghề gạch gốm Mang Thít hình thành từ cuối thế kỷ 19, đầu thế kỷ 20, khi người Khmer truyền lại kỹ thuật làm gạch.'],
    ['ln', 'medium', 'Làng nghề cốm kẹo Cửu Long nằm ở đâu?', ['Cù lao An Bình', 'Mang Thít', 'Tam Bình', 'Trà Ôn'], 'Du khách xuôi dòng về cù lao An Bình để xem làm cốm tại làng nghề cốm kẹo Cửu Long.'],
    ['ln', 'medium', 'Làng nghề tàu hủ ky ở Vĩnh Long thuộc thị xã nào?', ['Bình Minh', 'Tam Bình', 'Vũng Liêm', 'Trà Ôn'], 'Làng nghề tàu hủ ky nằm ở thị xã Bình Minh.'],
    ['ln', 'medium', 'Làng nghề ở Tam Bình đan thảm từ loại cây nào?', ['Lục bình', 'Cói', 'Mây', 'Tre trúc'], 'Người dân Tam Bình đan lục bình thành thảm và đồ thủ công.'],
    ['ln', 'easy', 'Bánh tráng giấy Tường Lộc thuộc huyện nào của Vĩnh Long?', ['Tam Bình', 'Mang Thít', 'Vũng Liêm', 'Trà Ôn'], 'Làng nghề bánh tráng giấy Tường Lộc nằm ở huyện Tam Bình.'],
    ['dd', 'medium', 'Biệt danh "vương quốc đỏ" của Mang Thít xuất phát từ đâu?', ['Những lò gạch, gốm màu đỏ dọc sông Cổ Chiên', 'Rừng hoa phượng đỏ', 'Những cánh đồng ớt', 'Những cây cầu sơn đỏ'], 'Dọc sông Cổ Chiên là những lò gạch gốm đỏ rực dưới nắng, trông như những lâu đài thu nhỏ.'],
    ['dd', 'medium', 'Văn Xương bên cạnh Văn Thánh Miếu Vĩnh Long thờ những ai?', ['Các thần văn học và danh sĩ có công với giáo dục', 'Các vị tướng chống Pháp', 'Các vua nhà Nguyễn', 'Các nghệ nhân gốm'], 'Văn Xương thờ các thần văn học và danh sĩ có công đối với nền giáo dục.'],
    ['dd', 'hard', 'Cầu nào bắc qua sông Hậu nối Vĩnh Long với Cần Thơ?', ['Cầu Cần Thơ', 'Cầu Mỹ Thuận', 'Cầu Rạch Miễu', 'Cầu Hàm Luông'], 'Cầu Cần Thơ nối hai bờ sông Hậu; còn cầu Mỹ Thuận bắc qua sông Tiền.'],
    ['ah', 'easy', 'Cố Thủ tướng Võ Văn Kiệt được người dân thân mật gọi là gì?', ['Sáu Dân', 'Bảy Hùng', 'Tám Phú', 'Chín Hạnh'], 'Người dân gọi thân mật ông là "Sáu Dân".'],
    ['ah', 'medium', 'Khu lưu niệm Thủ tướng Võ Văn Kiệt nằm ở huyện nào của Vĩnh Long?', ['Vũng Liêm', 'Tam Bình', 'Mang Thít', 'Bình Tân'], 'Khu lưu niệm nằm ở thị trấn Vũng Liêm, huyện Vũng Liêm.'],
    ['ah', 'hard', 'Nơi nào Phan Thanh Giản tuẫn tiết vào năm 1867?', ['Vĩnh Long', 'Hà Nội', 'Huế', 'Sài Gòn'], 'Phan Thanh Giản mất ở Vĩnh Long năm 1867 sau khi Pháp chiếm ba tỉnh miền Tây Nam Kỳ.'],
    ['ah', 'medium', 'Ông Phạm Hùng, người con của Vĩnh Long, từng giữ chức vụ nào?', ['Chủ tịch Hội đồng Bộ trưởng', 'Chủ tịch nước', 'Chủ tịch Quốc hội', 'Tổng Bí thư'], 'Phạm Hùng từng làm Chủ tịch Hội đồng Bộ trưởng.'],
    ['ds', 'easy', 'Bưởi Năm Roi là đặc sản của thị xã nào ở Vĩnh Long?', ['Bình Minh', 'Vũng Liêm', 'Long Hồ', 'Tam Bình'], 'Bưởi Năm Roi nổi tiếng ở vùng Bình Minh.']
  ],
  'tien-giang': [
    ['dd', 'medium', 'Chùa Vĩnh Tràng nổi tiếng ở thành phố nào của Tiền Giang?', ['Mỹ Tho', 'Gò Công', 'Cai Lậy', 'Cái Bè'], 'Chùa Vĩnh Tràng nằm ở Mỹ Tho, nổi bật với kiến trúc kết hợp nhiều phong cách.'],
    ['dd', 'easy', 'Chợ nổi Cái Bè họp trên dòng sông nào?', ['Sông Tiền', 'Sông Hương', 'Sông Hồng', 'Sông Đà'], 'Chợ nổi Cái Bè họp trên sông Tiền.'],
    ['dd', 'easy', 'Cồn Thới Sơn gần Mỹ Tho nằm trên dòng sông nào?', ['Sông Tiền', 'Sông Đáy', 'Sông Lam', 'Sông Kôn'], 'Cồn Thới Sơn là cù lao trên sông Tiền.'],
    ['dd', 'medium', 'Cầu Rạch Miễu nối Tiền Giang với tỉnh nào?', ['Bến Tre', 'Vĩnh Long', 'Cần Thơ', 'Sóc Trăng'], 'Cầu Rạch Miễu bắc qua sông Tiền, nối Tiền Giang với Bến Tre.'],
    ['ds', 'easy', 'Hủ tiếu Mỹ Tho là món ăn đặc trưng của tỉnh nào?', ['Tiền Giang', 'Quảng Nam', 'Thừa Thiên Huế', 'Nam Định'], 'Mỹ Tho thuộc Tiền Giang và nổi tiếng với món hủ tiếu.'],
    ['ds', 'hard', 'Xoài cát Hòa Lộc là đặc sản của tỉnh nào?', ['Tiền Giang', 'Cao Bằng', 'Quảng Ninh', 'Điện Biên'], 'Xoài cát Hòa Lộc là đặc sản Tiền Giang, nổi tiếng thơm ngọt.'],
    ['ds', 'medium', 'Vú sữa Lò Rèn nổi tiếng ở xã Vĩnh Kim, thuộc tỉnh nào?', ['Tiền Giang', 'Bình Định', 'Thanh Hóa', 'Hà Tĩnh'], 'Vĩnh Kim thuộc Tiền Giang, nơi có vú sữa Lò Rèn nổi tiếng.'],
    ['ah', 'hard', 'Năm 1785, Nguyễn Huệ đánh thắng quân Xiêm ở trận nào trên đất Tiền Giang?', ['Rạch Gầm – Xoài Mút', 'Bạch Đằng', 'Chi Lăng', 'Ngọc Hồi – Đống Đa'], 'Trận Rạch Gầm – Xoài Mút năm 1785 là chiến thắng lớn của Nguyễn Huệ trước quân Xiêm.'],
    ['ds', 'medium', 'Cai Lậy (Tiền Giang) nổi tiếng với loại trái cây nào?', ['Sầu riêng', 'Vải thiều', 'Mận hậu', 'Đào'], 'Cai Lậy có nhiều vườn sầu riêng, một đặc sản của Tiền Giang.'],
    ['ah', 'hard', 'Thái hậu Từ Dũ, mẹ vua Tự Đức, sinh ra ở vùng đất nào của Tiền Giang?', ['Gò Công', 'Mỹ Tho', 'Cái Bè', 'Cai Lậy'], 'Thái hậu Từ Dũ sinh ra ở Gò Công, vùng đất giàu truyền thống của Tiền Giang.'],
    ['ah', 'easy', 'Trương Định được suy tôn danh hiệu nào khi lãnh đạo nghĩa quân chống Pháp ở Gò Công?', ['Bình Tây Đại nguyên soái', 'Đông Hải đại tướng', 'Bắc Bình Vương', 'Phó vương'], 'Nghĩa quân suy tôn ông là Bình Tây Đại nguyên soái.'],
    ['ah', 'medium', 'Trương Định tuẫn tiết ở Gò Công vào năm nào?', ['1864', '1884', '1945', '1802'], 'Trương Định tuẫn tiết ngày 20/8/1864; năm 2024 Tiền Giang kỷ niệm 160 năm sự kiện này.'],
    ['ah', 'medium', 'Thủ khoa Nguyễn Hữu Huân sinh ra ở huyện nào của Tiền Giang ngày nay?', ['Chợ Gạo', 'Cái Bè', 'Gò Công Đông', 'Tân Phước'], 'Ông sinh năm 1830 ở xã Mỹ Tịnh An, huyện Chợ Gạo.'],
    ['ah', 'hard', 'Thủ khoa Nguyễn Hữu Huân bị thực dân Pháp hành hình ở đâu?', ['Đầu cầu Tịnh Hà', 'Quảng trường Mỹ Tho', 'Chợ Cái Bè', 'Bến Bình Đông'], 'Ông bị giặc Pháp hành hình ở đầu cầu Tịnh Hà.'],
    ['dd', 'medium', 'Di tích nào của Tiền Giang được xếp hạng Di tích quốc gia đặc biệt?', ['Các địa điểm khởi nghĩa Trương Định', 'Chùa Vĩnh Tràng', 'Chợ nổi Cái Bè', 'Cồn Thới Sơn'], 'Bằng xếp hạng Di tích quốc gia đặc biệt "Các địa điểm khởi nghĩa Trương Định" được trao cho Tiền Giang năm 2024.'],
    ['dd', 'medium', 'Lũy Pháo Đài ở xã Phú Tân, Gò Công do ai chỉ huy xây dựng?', ['Trương Định', 'Nguyễn Huệ', 'Thoại Ngọc Hầu', 'Võ Duy Dương'], 'Lũy Pháo Đài là công trình phòng thủ do Bình Tây Đại nguyên soái Trương Định chỉ huy xây dựng.'],
    ['ln', 'medium', 'Làng nghề Ông Non ở Gò Công nổi tiếng với nghề gì?', ['Đóng tủ thờ từ gỗ quý', 'Làm gốm', 'Dệt chiếu', 'Làm nón lá'], 'Làng nghề Ông Non chuyên đóng tủ thờ từ gỗ quý như gõ, mun, cẩm lai.'],
    ['ds', 'medium', 'Đặc sản mắm nào nổi tiếng ở Gò Công?', ['Mắm tôm chà', 'Mắm cá linh', 'Mắm thái', 'Mắm ruốc Huế'], 'Gò Công nổi tiếng với mắm tôm chà, ăn kèm thịt ba rọi luộc, rau sống và bún tươi.'],
    ['dd', 'medium', 'Chùa Vĩnh Tràng được xây dựng vào thời gian nào?', ['Đầu thế kỷ 19', 'Thế kỷ 10', 'Giữa thế kỷ 20', 'Cuối thế kỷ 15'], 'Chùa Vĩnh Tràng được xây vào đầu thế kỷ 19 theo phong cách Á – Âu.'],
    ['dd', 'medium', 'Khu di tích Rạch Gầm – Xoài Mút thuộc huyện nào của Tiền Giang?', ['Châu Thành', 'Cái Bè', 'Gò Công Tây', 'Chợ Gạo'], 'Khu di tích nằm ở xã Kim Sơn, huyện Châu Thành.'],
    ['dd', 'hard', 'Nhà thờ Cái Bè mang phong cách kiến trúc nào?', ['Roman', 'Gothic', 'Hồi giáo', 'Khmer'], 'Nhà thờ Cái Bè là công trình kiến trúc Roman cổ kính ở ngã ba sông.'],
    ['dd', 'medium', 'Chợ nổi Cái Bè nằm ở ngã ba sông, nơi giao thoa của những tỉnh nào?', ['Tiền Giang, Vĩnh Long, Bến Tre', 'Cần Thơ, An Giang, Kiên Giang', 'Long An, Tây Ninh, Bình Dương', 'Cà Mau, Bạc Liêu, Sóc Trăng'], 'Chợ nổi Cái Bè nằm ở ngã ba sông, nơi giao thoa của Tiền Giang, Vĩnh Long và Bến Tre.']
  ],
  'ben-tre': [
    ['ln', 'medium', 'Hai làng nghề nào ở Giồng Trôm được công nhận là Di sản văn hóa phi vật thể quốc gia cuối năm 2018?', ['Bánh tráng Mỹ Lồng và bánh phồng Sơn Đốc', 'Kẹo dừa Mỏ Cày và chiếu Mỏ Cày', 'Hoa kiểng Cái Mơn và gạch gốm', 'Nón lá và mây tre'], 'Bánh tráng Mỹ Lồng (xã Mỹ Thạnh) và bánh phồng Sơn Đốc (xã Hưng Nhượng) được Bộ VHTTDL công nhận cuối năm 2018.'],
    ['ln', 'easy', 'Kẹo dừa Bến Tre nổi tiếng nhất ở vùng nào?', ['Mỏ Cày', 'Ba Tri', 'Thạnh Phú', 'Bình Đại'], 'Kẹo dừa Bến Tre nổi tiếng, đặc biệt là kẹo dừa Mỏ Cày.'],
    ['ln', 'medium', 'Làng nghề bánh phồng Sơn Đốc thuộc xã nào?', ['Hưng Nhượng', 'Mỹ Thạnh', 'Phú Lễ', 'Định Thủy'], 'Bánh phồng Sơn Đốc ở xã Hưng Nhượng, huyện Giồng Trôm, đã tồn tại hơn một thế kỷ.'],
    ['ln', 'medium', 'Làng nghề bánh tráng Mỹ Lồng thuộc xã nào của huyện Giồng Trôm?', ['Mỹ Thạnh', 'Hưng Nhượng', 'Tân Mỹ', 'Phước Tuy'], 'Làng bánh tráng Mỹ Lồng thuộc xã Mỹ Thạnh.'],
    ['ln', 'hard', 'Nguyên liệu nào thường dùng để làm bánh phồng Sơn Đốc?', ['Nếp sáp, nước cốt dừa và đường', 'Bột mì và trứng', 'Khoai lang và sữa', 'Gạo lứt và mè'], 'Người dân đồ nếp sáp thành xôi rồi xay nhuyễn với nước cốt dừa, đường.'],
    ['ln', 'medium', 'Bánh dừa Giồng Luông được gói bằng gì?', ['Đọt non dừa nước', 'Lá chuối khô', 'Lá sen', 'Giấy bạc'], 'Bánh dừa Giồng Luông thấm hương từ lá dừa nước non.'],
    ['ln', 'medium', 'Hát sắc bùa gắn với làng nghề nào ở Ba Tri?', ['Phú Lễ', 'Mỹ Lồng', 'Sơn Đốc', 'Cái Mơn'], 'Ở làng nghề Phú Lễ, du khách nghe hát sắc bùa và tìm hiểu nghề nấu rượu nếp.'],
    ['ah', 'easy', 'Truyện thơ Lục Vân Tiên là của ai?', ['Nguyễn Đình Chiểu', 'Nguyễn Du', 'Hồ Xuân Hương', 'Nguyễn Trãi'], 'Lục Vân Tiên là tác phẩm nổi tiếng của nhà thơ Nguyễn Đình Chiểu.'],
    ['ah', 'medium', 'Phong trào Đồng Khởi bùng nổ ở Bến Tre vào năm nào?', ['1960', '1945', '1975', '1930'], 'Phong trào Đồng Khởi nổ ra ở Bến Tre vào năm 1960 rồi lan rộng khắp miền Nam.'],
    ['ah', 'medium', 'Bà Nguyễn Thị Định giữ chức vụ nào trong Quân giải phóng miền Nam?', ['Phó Tư lệnh', 'Tư lệnh', 'Chính ủy', 'Tổng tham mưu trưởng'], 'Bà là Phó Tư lệnh Quân giải phóng miền Nam.'],
    ['ah', 'medium', 'Khu lăng mộ Nguyễn Đình Chiểu nằm ở huyện nào của Bến Tre?', ['Ba Tri', 'Bình Đại', 'Châu Thành', 'Thạnh Phú'], 'Khu lăng mộ ở xã An Đức, huyện Ba Tri.'],
    ['ah', 'hard', 'Phan Thanh Giản sinh ở huyện nào của Bến Tre?', ['Ba Tri', 'Mỏ Cày', 'Chợ Lách', 'Giồng Trôm'], 'Phan Thanh Giản sinh ở Ba Tri, từng làm Kinh lược sứ Nam Kỳ.'],
    ['ah', 'medium', 'Học giả Trương Vĩnh Ký sinh ở Cái Mơn, thuộc huyện nào của Bến Tre?', ['Chợ Lách', 'Ba Tri', 'Bình Đại', 'Thạnh Phú'], 'Cái Mơn thuộc huyện Chợ Lách.'],
    ['dd', 'easy', 'Bến Tre được mệnh danh là xứ gì?', ['Xứ Dừa', 'Xứ sở sen', 'Xứ vải', 'Xứ chè'], 'Bến Tre có hơn 200.000 hộ trồng dừa nên được gọi là xứ Dừa.'],
    ['dd', 'easy', 'Sông nào sau đây là một nhánh của sông Tiền chảy qua Bến Tre?', ['Hàm Luông', 'Sông Hồng', 'Sông Mã', 'Sông Đà'], 'Bến Tre nằm trên cù lao hình thành bởi các nhánh sông Tiền: sông Mỹ Tho, Hàm Luông, Cổ Chiên.'],
    ['dd', 'medium', 'Cồn Phụng nổi tiếng gắn với ai?', ['Ông Đạo Dừa', 'Nguyễn Đình Chiểu', 'Thoại Ngọc Hầu', 'Trương Định'], 'Cồn Phụng là di tích giữa sông Tiền gắn với ông Đạo Dừa.'],
    ['dd', 'medium', 'Làng du kích Đồng Khởi thuộc huyện nào của Bến Tre?', ['Mỏ Cày', 'Ba Tri', 'Giồng Trôm', 'Chợ Lách'], 'Làng du kích Đồng Khởi ở xã Định Thủy, huyện Mỏ Cày.'],
    ['ah', 'medium', 'Lãnh binh Nguyễn Ngọc Thăng (1798 – 1866) sinh ở huyện nào của Bến Tre?', ['Giồng Trôm', 'Ba Tri', 'Chợ Lách', 'Thạnh Phú'], 'Ông sinh ở vùng Mỹ Thạnh, nay thuộc huyện Giồng Trôm; tên ông gắn với nhiều cây cầu, con đường và trường học.'],
    ['ah', 'hard', 'Ai được gọi là vị tướng bưng biền và có đền thờ ở Bến Tre?', ['Đồng Văn Cống', 'Trương Định', 'Thiên hộ Dương', 'Thoại Ngọc Hầu'], 'Trung tướng Đồng Văn Cống được gọi là vị tướng bưng biền; đền thờ ông là một điểm tham quan ở Bến Tre.'],
    ['ds', 'medium', 'Khoảng bao nhiêu phần số hộ dân Bến Tre trồng dừa?', ['Khoảng hai phần ba', 'Một phần mười', 'Một phần tư', 'Gần như toàn bộ'], 'Bến Tre có hơn 200.000 hộ trồng dừa, chiếm khoảng hai phần ba số hộ trong tỉnh.']
  ],
  'dong-thap': [
    ['dd', 'easy', 'Đồng Tháp thường được gọi bằng cái tên nào?', ['Đất Sen hồng', 'Xứ Dừa', 'Đất Võ', 'Thành phố hoa phượng đỏ'], 'Đồng Tháp được gọi là Đất Sen hồng.'],
    ['ln', 'medium', 'Làng chiếu Định Yên thuộc huyện nào của Đồng Tháp?', ['Lấp Vò', 'Lai Vung', 'Châu Thành', 'Tháp Mười'], 'Định Yên là xã nổi tiếng dệt chiếu thuộc huyện Lấp Vò.'],
    ['ln', 'hard', 'Làng nghề đóng xuồng, ghe rạch Bà Đài thuộc huyện nào?', ['Lai Vung', 'Lấp Vò', 'Hồng Ngự', 'Thanh Bình'], 'Làng nghề đóng xuồng, ghe rạch Bà Đài ở huyện Lai Vung là Di sản văn hóa phi vật thể quốc gia.'],
    ['ln', 'easy', 'Làng hoa kiểng Sa Đéc còn có tên gọi nào khác?', ['Làng hoa Tân Quy Đông', 'Làng hoa Phó Thọ', 'Làng hoa Vĩnh Phú', 'Làng hoa Ngọc Hà'], 'Làng hoa Sa Đéc còn được gọi là làng hoa kiểng Tân Quy Đông.'],
    ['ln', 'medium', 'Sa Đéc được xem là thủ phủ của loại cây nào ở miền Tây?', ['Hoa kiểng', 'Cà phê', 'Hồ tiêu', 'Cao su'], 'Sa Đéc là thành phố hoa của khu vực Nam Bộ, thủ phủ hoa của miền Tây.'],
    ['ln', 'medium', 'Làng nào ở Đồng Tháp nổi tiếng với nghề dệt khăn choàng?', ['Long Khánh', 'Định Yên', 'Tân Quy Đông', 'Bình An'], 'Nghề dệt choàng (khăn) Long Khánh là nghề truyền thống của Đồng Tháp.'],
    ['ln', 'medium', 'Làng chổi lông gà Bình An thuộc huyện nào?', ['Lấp Vò', 'Hồng Ngự', 'Tam Nông', 'Tân Hồng'], 'Làng chổi lông gà Bình An nằm ở huyện Lấp Vò.'],
    ['ln', 'medium', 'Nem Lai Vung là sản phẩm của làng nghề thuộc huyện nào?', ['Lai Vung', 'Lấp Vò', 'Châu Thành', 'Thanh Bình'], 'Nghề làm nem Lai Vung là nghề nổi tiếng của huyện Lai Vung.'],
    ['ah', 'easy', 'Cụ Phó bảng Nguyễn Sinh Sắc là thân sinh của ai?', ['Chủ tịch Hồ Chí Minh', 'Tổng Bí thư Lê Duẩn', 'Đại tướng Võ Nguyên Giáp', 'Thủ tướng Phạm Văn Đồng'], 'Cụ Nguyễn Sinh Sắc là thân sinh của Chủ tịch Hồ Chí Minh.'],
    ['ah', 'medium', 'Cụ Nguyễn Sinh Sắc lần đầu đến làng Hòa An (Đồng Tháp) để làm gì?', ['Bốc thuốc chữa bệnh cho dân', 'Dạy võ', 'Buôn lúa gạo', 'Làm quan huyện'], 'Cụ đến làng Hòa An để bốc thuốc trị bệnh cho nhân dân.'],
    ['ah', 'hard', 'Thiên hộ Dương lấy vùng nào làm căn cứ chống Pháp?', ['Đồng Tháp Mười', 'Bảy Núi', 'Cà Mau', 'Hà Tiên'], 'Thiên hộ Dương lập căn cứ kháng Pháp ở vùng Đồng Tháp Mười.'],
    ['dd', 'medium', 'Khu di tích Gò Tháp thuộc huyện nào của Đồng Tháp?', ['Tháp Mười', 'Cao Lãnh', 'Thanh Bình', 'Lai Vung'], 'Khu di tích Gò Tháp nằm ở xã Tân Kiều, huyện Tháp Mười.'],
    ['dd', 'medium', 'Vườn quốc gia Tràm Chim nổi tiếng với loài chim nào?', ['Sếu đầu đỏ', 'Chim cu gáy', 'Đại bàng', 'Chim én'], 'Tràm Chim là nơi bảo tồn loài sếu đầu đỏ.'],
    ['dd', 'easy', 'Khu di tích Xẻo Quýt được ví như gì?', ['Đồng Tháp Mười thu nhỏ', 'Hạ Long trên cạn', 'Sa Pa miền Tây', 'Đà Lạt xứ nóng'], 'Xẻo Quýt được biết đến như một Đồng Tháp Mười thu nhỏ.'],
    ['dd', 'hard', 'Nhà cổ Huỳnh Thủy Lê nằm ở thành phố nào của Đồng Tháp?', ['Sa Đéc', 'Cao Lãnh', 'Hồng Ngự', 'Tân Hồng'], 'Nhà cổ Huỳnh Thủy Lê là điểm tham quan nổi tiếng của Sa Đéc.'],
    ['ds', 'medium', 'Quýt hồng Lai Vung khi chín chuyển sang màu gì?', ['Hồng', 'Tím', 'Xanh', 'Đen'], 'Quýt hồng Lai Vung vỏ vàng cam, khi chín chuyển sang màu hồng đặc trưng.']
  ],
  'an-giang': [
    ['dd', 'easy', 'Miếu Bà Chúa Xứ nằm dưới chân núi nào?', ['Núi Sam', 'Núi Cấm', 'Núi Bà Đen', 'Núi Sập'], 'Miếu Bà Chúa Xứ ở chân núi Sam, thành phố Châu Đốc.'],
    ['vh', 'medium', 'Lễ vía Bà Chúa Xứ núi Sam diễn ra vào thời gian nào?', ['Ngày 23 – 27 tháng 4 âm lịch', 'Rằm tháng Giêng', 'Mùng 5 tháng 5 âm lịch', 'Rằm tháng 7'], 'Hội Bà Chúa Xứ núi Sam diễn ra từ 23 đến 27 tháng 4 âm lịch.'],
    ['dd', 'medium', 'Chùa Tây An được xây dựng vào năm nào?', ['1847', '1700', '1920', '1986'], 'Chùa Tây An ở chân núi Sam được xây năm 1847.'],
    ['dd', 'hard', 'Chùa Tây An mang dáng dấp kiến trúc của nước nào?', ['Ấn Độ', 'Pháp', 'Nhật Bản', 'Thái Lan'], 'Chùa Tây An mang dáng dấp một công trình kiến trúc Ấn Độ.'],
    ['dd', 'medium', 'Kênh Vĩnh Tế nối Châu Đốc với địa điểm nào?', ['Hà Tiên', 'Cà Mau', 'Vĩnh Long', 'Mỹ Tho'], 'Kênh Vĩnh Tế là con kênh đào nối Châu Đốc với Hà Tiên.'],
    ['ah', 'medium', 'Thoại Ngọc Hầu được nhắc đến với chức danh nào gắn với trấn Vĩnh Thanh?', ['Tổng trấn', 'Tể tướng', 'Thái sư', 'Đô đốc thủy quân'], 'Ông được nhắc đến là Tổng trấn Vĩnh Thanh.'],
    ['ah', 'hard', 'Hai con kênh nào gắn với công lao của Thoại Ngọc Hầu?', ['Thoại Hà và Vĩnh Tế', 'Bảo Định và Chợ Gạo', 'Xáng Cà Mau và Phụng Hiệp', 'Nhiêu Lộc và Thị Nghè'], 'Thoại Ngọc Hầu chỉ huy đào kênh Thoại Hà và kênh Vĩnh Tế.'],
    ['ln', 'medium', 'Lụa Tân Châu nổi tiếng với dòng lụa nào?', ['Lãnh Mỹ A', 'Lụa Hà Đông', 'Lụa Vạn Phúc', 'Lụa Mã Châu'], 'Lãnh Mỹ A là dòng lụa trứ danh của Tân Châu.'],
    ['ln', 'medium', 'Lãnh Mỹ A nổi bật với màu gì?', ['Đen mượt', 'Đỏ tươi', 'Trắng tinh', 'Xanh ngọc'], 'Lãnh Mỹ A nổi tiếng với sắc đen mượt và độ mềm đặc biệt.'],
    ['ln', 'hard', 'Lãnh Mỹ A được nhuộm bằng loại trái nào?', ['Mặc nưa', 'Chàm', 'Nghệ', 'Bồ kết'], 'Trái mặc nưa được dùng nhuộm lụa Lãnh Mỹ A và cả thổ cẩm Chăm.'],
    ['ln', 'medium', 'Người Chăm ở Châu Phong, An Giang nổi tiếng với nghề thủ công nào?', ['Dệt thổ cẩm', 'Làm gốm', 'Đúc đồng', 'Khảm trai'], 'Làng Chăm Châu Phong nổi tiếng với nghề dệt thổ cẩm.'],
    ['dd', 'medium', 'Các làng Chăm ở An Giang chủ yếu theo tôn giáo nào?', ['Hồi giáo', 'Công giáo', 'Phật giáo', 'Đạo Cao Đài'], 'Các làng Chăm ở An Giang là làng Hồi giáo, mỗi làng có một thánh đường.'],
    ['dd', 'easy', 'Cây nào là hình ảnh đặc trưng của cánh đồng Tà Pạ ở Tri Tôn?', ['Thốt nốt', 'Dừa', 'Cau', 'Tre'], 'Cánh đồng Tà Pạ điểm xuyết những hàng thốt nốt giữa trời xanh.'],
    ['dd', 'medium', 'Du khách đến rừng tràm Trà Sư thường làm gì?', ['Đi xuồng ngắm chim giữa rừng tràm', 'Trượt tuyết', 'Lặn biển', 'Leo núi đá'], 'Trà Sư là rừng tràm ngập nước nổi tiếng với du lịch sinh thái đi xuồng.'],
    ['ds', 'medium', 'Bánh bò ở An Giang nổi tiếng được làm từ loại đường nào?', ['Đường thốt nốt', 'Đường phèn', 'Đường cát trắng', 'Mật mía'], 'Bánh bò thốt nốt dùng đường từ cây thốt nốt.'],
    ['dd', 'medium', 'Dãy Thất Sơn còn được gọi là gì?', ['Bảy Núi', 'Ngũ Hành Sơn', 'Tam Đảo', 'Tứ Cung'], 'Thất Sơn nghĩa là bảy ngọn núi, thường gọi là Bảy Núi.'],
    ['ah', 'medium', 'Khu lưu niệm Chủ tịch Tôn Đức Thắng nằm ở thành phố nào của An Giang?', ['Long Xuyên', 'Châu Đốc', 'Tân Châu', 'Hà Tiên'], 'Ông sinh ra ở cù lao Ông Hổ, Long Xuyên, nơi có khu lưu niệm.']
  ],
  'tra-vinh': [
    ['vh', 'easy', 'Lễ hội Ok Om Bok của người Khmer còn được gọi là lễ gì?', ['Lễ cúng trăng', 'Lễ mừng năm mới', 'Lễ cúng ông bà', 'Lễ Vu Lan'], 'Ok Om Bok còn gọi là lễ cúng trăng của đồng bào Khmer.'],
    ['vh', 'medium', 'Lễ hội Ok Om Bok diễn ra vào thời điểm nào?', ['Rằm tháng 10 âm lịch', 'Rằm tháng Giêng', 'Mùng 5 tháng 5 âm lịch', 'Rằm tháng 8 âm lịch'], 'Lễ hội diễn ra vào Rằm tháng Mười âm lịch, tập trung nhiều hoạt động ở Ao Bà Om.'],
    ['vh', 'medium', 'Lễ hội Ok Om Bok được công nhận là loại di sản nào?', ['Di sản văn hóa phi vật thể quốc gia', 'Di sản thiên nhiên thế giới', 'Kỳ quan thế giới mới', 'Bảo vật quốc gia'], 'Ok Om Bok là một trong những di sản văn hóa phi vật thể quốc gia, được công nhận năm 2014.'],
    ['vh', 'easy', 'Hoạt động sôi nổi nhất trên Ao Bà Om trong lễ hội Ok Om Bok là gì?', ['Đua ghe ngo', 'Đua xe đạp', 'Đua ngựa', 'Đấu vật'], 'Cuộc đua ghe ngo trên Ao Bà Om thu hút hàng chục nghìn người xem.'],
    ['vh', 'hard', 'Ghe ngo của người Khmer được làm từ gì?', ['Khoét từ thân cây gỗ lớn', 'Ghép bằng tre', 'Đúc bằng thép', 'Đúc bằng nhựa composite'], 'Ghe ngo là loại thuyền độc mộc, được chế tác từ thân cây gỗ.'],
    ['vh', 'medium', 'Tết cổ truyền (mừng năm mới) của người Khmer có tên là gì?', ['Chol Chnam Thmay', 'Sene Dolta', 'Ok Om Bok', 'Vu Lan thắng hội'], 'Chol Chnam Thmay là lễ mừng năm mới của người Khmer, vào khoảng tháng 4 dương lịch.'],
    ['vh', 'medium', 'Lễ Sene Dolta của người Khmer là lễ gì?', ['Lễ cúng ông bà', 'Lễ cúng trăng', 'Lễ mừng năm mới', 'Lễ cầu mưa'], '"Sen" nghĩa là cúng, "Dol" là bà và "Ta" là ông: đây là lễ cúng ông bà.'],
    ['vh', 'medium', 'Lễ Vu Lan thắng hội (lễ hội chùa Ông Bổn) ở Cầu Kè diễn ra vào ngày nào?', ['27 – 28 tháng 7 âm lịch', 'Rằm tháng Giêng', 'Rằm tháng 10', 'Mùng 1 Tết'], 'Lễ hội được tổ chức vào ngày 27 và 28 tháng 7 âm lịch hằng năm ở thị trấn Cầu Kè.'],
    ['dd', 'easy', 'Ao Bà Om còn có tên gọi khác là gì?', ['Ao Vuông', 'Hồ Gươm', 'Hồ Tây', 'Hồ Xuân Hương'], 'Ao Bà Om còn được gọi là Ao Vuông.'],
    ['dd', 'medium', 'Ao Bà Om được công nhận là di tích lịch sử – văn hóa quốc gia vào năm nào?', ['1996', '1975', '2010', '1945'], 'Quần thể Ao Bà Om được công nhận là di tích quốc gia năm 1996.'],
    ['dd', 'hard', 'Tên gọi Ao Bà Om gắn với truyền thuyết của dân tộc nào?', ['Khmer', 'Chăm', 'Tày', 'Mường'], 'Ao Bà Om là nhân vật chính trong một truyền thuyết của người Khmer.'],
    ['dd', 'medium', 'Quanh Ao Bà Om nổi tiếng với điều gì?', ['Rừng cây cổ thụ trăm tuổi với bộ rễ nổi dáng kỳ lạ', 'Núi đá vôi', 'Cồn cát trắng', 'Thác nước'], 'Ao Bà Om có hồ nước trong xanh và rừng cây trăm tuổi với nhiều bộ rễ nổi hình dạng độc đáo.'],
    ['dd', 'medium', 'Chùa Âng còn có tên gọi nào khác?', ['Angkorajaborey', 'Wat Phnom', 'Kompong Chary', 'Wat Kosla'], 'Chùa Âng còn gọi là chùa Angkorajaborey, một ngôi chùa Khmer cổ.'],
    ['dd', 'medium', 'Chùa Âng cách trung tâm thành phố Trà Vinh khoảng bao xa?', ['Khoảng 7 km', 'Khoảng 70 km', 'Khoảng 700 m', 'Khoảng 170 km'], 'Chùa Âng cách trung tâm thành phố Trà Vinh khoảng 7 km, gần Ao Bà Om.'],
    ['dd', 'medium', 'Chùa Hang là ngôi chùa Khmer thuộc thị trấn nào?', ['Châu Thành', 'Duyên Hải', 'Cầu Kè', 'Càng Long'], 'Từ thành phố Trà Vinh đi thị trấn Châu Thành sẽ đến chùa Hang.'],
    ['dd', 'medium', 'Trà Vinh có ít nhất khoảng bao nhiêu ngôi chùa Khmer?', ['Khoảng 140 ngôi', 'Khoảng 14 ngôi', 'Khoảng 1.400 ngôi', 'Khoảng 4 ngôi'], 'Trà Vinh có ít nhất khoảng 140 ngôi chùa Khmer.'],
    ['dd', 'easy', 'Thành phố Trà Vinh được gọi là thành phố gì nhờ nhiều cây xanh?', ['Thành phố xanh', 'Thành phố hoa', 'Thành phố ngàn hoa', 'Thành phố ánh sáng'], 'Thành phố Trà Vinh được biết đến là "thành phố xanh" với hàng nghìn cây cổ thụ.'],
    ['dd', 'hard', 'Cầu Cổ Chiên trên quốc lộ 60 nối Trà Vinh với tỉnh nào?', ['Bến Tre', 'Vĩnh Long', 'Tiền Giang', 'Sóc Trăng'], 'Cầu Cổ Chiên nối hai tỉnh Bến Tre và Trà Vinh.'],
    ['dd', 'medium', 'Biển Ba Động thuộc huyện nào của Trà Vinh?', ['Duyên Hải', 'Cầu Kè', 'Tiểu Cần', 'Càng Long'], 'Biển Ba Động thuộc huyện Duyên Hải.'],
    ['ln', 'medium', 'Làng bánh tét Trà Cuôn thuộc huyện nào của Trà Vinh?', ['Cầu Ngang', 'Cầu Kè', 'Châu Thành', 'Trà Cú'], 'Bánh tét Trà Cuôn là đặc sản của huyện Cầu Ngang.'],
    ['ln', 'medium', 'Bánh tét Trà Cuôn thường được làm từ loại gạo nào?', ['Nếp sáp', 'Gạo tẻ', 'Gạo lứt', 'Gạo nàng hương'], 'Bánh tét Trà Cuôn được làm từ nếp sáp, nhân đậu xanh, thịt, hoặc chuối.'],
    ['ln', 'medium', 'Làng muối nào gắn với vùng biển Ba Động?', ['Làng muối Cồn Cù', 'Làng muối Sa Huỳnh', 'Làng muối Hòn Khói', 'Làng muối Tuyết Diêm'], 'Làng muối Cồn Cù ở Duyên Hải nằm quanh biển Ba Động; ba làng muối còn lại ở các tỉnh miền Trung.'],
    ['ds', 'easy', 'Dừa sáp nổi tiếng ở huyện nào của Trà Vinh?', ['Cầu Kè', 'Duyên Hải', 'Trà Cú', 'Tiểu Cần'], 'Cầu Kè được gọi là thủ phủ dừa sáp của Việt Nam.'],
    ['ds', 'medium', 'Dừa sáp khác dừa thường ở điểm nào?', ['Cơm dừa đặc ruột, dẻo như sáp', 'Quả to gấp đôi', 'Vỏ màu tím', 'Không có cơm dừa'], 'Dừa sáp có cơm dừa đặc ruột, dẻo như sáp, thường dùng làm sinh tố.'],
    ['ds', 'medium', 'Cầu Kè bắt đầu trồng dừa sáp từ thập niên nào?', ['Thập niên 1960', 'Thập niên 1930', 'Thập niên 1990', 'Thập niên 2010'], 'Cầu Kè trồng dừa sáp từ những năm 1960.'],
    ['ds', 'medium', 'Bánh canh Bến Có được bán ngay ở đâu?', ['Dưới chân cầu Bến Có', 'Trên chợ nổi', 'Trong chùa Âng', 'Trên biển Ba Động'], 'Bánh canh Bến Có là đặc sản bán ngay dưới chân cầu Bến Có.'],
    ['ah', 'medium', 'Anh hùng Nguyễn Thị Út (Út Tịch) được gọi bằng danh xưng nào?', ['Người mẹ cầm súng', 'Nữ tướng Đồng Khởi', 'Cô giáo miền Tây', 'Bà Chúa Xứ'], 'Bà được gọi là "Người mẹ cầm súng", quê ở xã Tam Ngãi, huyện Cầu Kè.'],
    ['ah', 'medium', 'Anh hùng Nguyễn Thị Út quê ở xã nào của Cầu Kè?', ['Tam Ngãi', 'Long Khánh', 'Phước Hưng', 'Hòa Ân'], 'Tam Ngãi (Cầu Kè) là quê hương của nữ anh hùng Út Tịch và cũng là xã anh hùng.'],
    ['ah', 'hard', 'Soạn giả cải lương Viễn Châu sinh năm nào?', ['1922', '1945', '1900', '1960'], 'Soạn giả Viễn Châu sinh năm 1922 ở Trà Vinh, là một bậc thầy của sân khấu cải lương.'],
    ['ah', 'easy', 'Soạn giả Viễn Châu gắn với loại hình nghệ thuật nào?', ['Cải lương', 'Chèo', 'Tuồng', 'Quan họ'], 'Viễn Châu là soạn giả cải lương, loại hình sân khấu bắt đầu ở Nam Bộ vào đầu thập niên 1920.']
  ]
};

// ---- deterministic generator: several question types per entity ----
const mulberry = a => () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const shortName = n => n.replace(/\s*\([^)]*\)/g, '').trim();
const group = s => shortName(s).toLowerCase().split(/\s+/).slice(0, 2).join(' ');
const LABEL = { dd: 'Địa danh', ah: 'Nhân vật', ds: 'Món ăn hoặc đặc sản' };
const DIFF1 = { ln: 'medium', dd: 'medium', ah: 'hard', ds: 'easy' };
const DIFF2 = { ln: 'medium', dd: 'easy', ah: 'medium', ds: 'easy' };

function generate() {
  const out = []; const pool = [];
  for (const p of PROVINCES) for (const e of FACTS[p.id]) pool.push({ ...e, pid: p.id });
  for (const p of PROVINCES) {
    const rng = mulberry([...p.id].reduce((a, c) => a * 31 + c.charCodeAt(0), 7));
    const pick = (arr, n) => { const a = arr.slice(); const r = []; while (r.length < n && a.length) r.push(a.splice(Math.floor(rng() * a.length), 1)[0]); return r; };
    let n = 0; const id = () => `${p.prefix}G${String(++n).padStart(3, '0')}`;
    for (const e of pool.filter(x => x.pid === p.id)) {
      const sn = shortName(e.name);
      // Type 1: match clause/product <-> entity
      if (e.cat === 'ln') {
        const g = e.product.toLowerCase().split(/[\s,]+/)[0], others = [...new Map(pool.filter(x => x.cat === 'ln' && x.pid !== p.id && x.product.toLowerCase().split(/[\s,]+/)[0] !== g).map(x => [x.product, x.product])).values()];
        out.push({ id: id(), provinceId: p.id, topic: 'ln', difficulty: DIFF1.ln, question: `${e.name} nổi tiếng với sản phẩm nào?`, options: [e.product, ...pick(others, 3)], correctAnswer: 0, explanation: `${sn} nổi tiếng với ${e.product}. ${e.fact}` });
      } else {
        const g = group(e.name), others = [...new Set(pool.filter(x => x.cat === e.cat && x.pid !== p.id && group(x.name) !== g).map(x => shortName(x.name)))];
        out.push({ id: id(), provinceId: p.id, topic: e.cat, difficulty: DIFF1[e.cat], question: `${LABEL[e.cat]} nào ${e.clause}?`, options: [sn, ...pick(others, 3)], correctAnswer: 0, explanation: `${sn} ${e.clause}.` });
      }
      // Type 2: which province
      if (!(e.flags || '').includes('n')) {
        const stem = e.q2 || (e.cat === 'ln' ? `${e.name} thuộc tỉnh nào?` : e.cat === 'dd' ? `${e.name} nằm ở tỉnh nào?` : e.cat === 'ds' ? `Đặc sản "${sn}" nổi tiếng ở tỉnh nào?` : `${sn} sinh ra ở tỉnh nào ngày nay?`);
        out.push({ id: id(), provinceId: p.id, topic: e.cat, difficulty: DIFF2[e.cat], question: stem, options: [p.name, ...pick(PROVINCES.filter(x => x.id !== p.id).map(x => x.name), 3)], correctAnswer: 0, explanation: `${sn}: ${e.cat === 'ln' ? e.fact : e.clause + '.'} Đáp án theo địa giới hành chính trước năm 2025: ${p.name}.` });
      }
    }
  }
  return out;
}

const handwritten = PROVINCES.flatMap(p => HAND[p.id].map((r, i) => ({
  id: `${p.prefix}${String(i + 1).padStart(3, '0')}`, provinceId: p.id, topic: r[0], difficulty: r[1],
  question: r[2], options: r[3], correctAnswer: 0, explanation: r[4]
})));
export const QUESTIONS = [...handwritten, ...generate()];
export const questionsFor = pid => QUESTIONS.filter(q => q.provinceId === pid);
