import Page from '../components/Section.jsx';
import { project } from '../data/project.js';
export default function About() {
  return (<Page kicker="Về dự án" title="SoulOfMekong" sub="Preserving the Lifestyle and Culture of the People in Southwestern Vietnam">
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 flex flex-col gap-4 text-body-lead text-on-surface-variant font-body-lead"><p>SoulOfMekong là dự án truyền thông độc lập nhằm bảo tồn và lan tỏa những giá trị văn hóa, lối sống đặc trưng của người dân vùng Tây Nam Bộ, góp phần gìn giữ bản sắc và phát triển cộng đồng địa phương.</p><p>Website ghi lại nếp sống, truyền thống, con người và làng nghề miền Tây qua câu chuyện, video và hình ảnh. Ở số đầu tiên, nhóm giới thiệu 4 điểm đến đã trực tiếp ghé thăm: làng lụa Lãnh Mỹ A ở Tân Châu và làng thổ cẩm Chăm ở Châu Phong (An Giang), vùng lò gạch gốm đỏ Mang Thít và làng bánh tráng cù lao Mây (Vĩnh Long). Những địa điểm khác sẽ được bổ sung trong các số tiếp theo.</p></div>
      <div className="bg-surface-container-low rounded-xl p-6 border border-surface-container-high flex flex-col gap-2 text-body-sm">
        <span className="font-label-stamp text-label-stamp text-tertiary-container uppercase">Thông tin học phần</span>
        <p>{project.university}</p><p>{project.course}</p><p>Lớp: {project.className}</p><p>Ngày báo cáo: {project.reportDate}</p></div></div>
    <div className="flex flex-col gap-4"><h2 className="font-headline-md text-headline-md text-primary">Thành viên &amp; tỷ lệ đóng góp</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">{project.members.map(m => <div key={m.name} className="bg-primary-container text-white rounded-lg p-4"><p className="font-label-ui text-label-ui">{m.name}</p><p className="font-label-stamp text-label-stamp text-secondary-fixed-dim mt-1">{m.share}%</p></div>)}</div></div>
  </Page>);
}
