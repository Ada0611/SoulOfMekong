import { Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Archive from './pages/Archive.jsx';
import Article from './pages/Article.jsx';
import Videos from './pages/Videos.jsx';
import Gallery from './pages/Gallery.jsx';
import About from './pages/About.jsx';
const NotFound = () => (<div className="max-w-3xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-4"><h1 className="font-headline-lg text-headline-lg text-primary">Không tìm thấy trang</h1><p className="text-on-surface-variant">Trang bạn tìm không tồn tại hoặc đã được di chuyển.</p><Link to="/" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-ui text-label-ui">Về trang chủ</Link></div>);
export default function App() {
  return (<Routes><Route element={<Layout />}>
    <Route index element={<Home />} /><Route path="cau-chuyen" element={<Archive />} /><Route path="cau-chuyen/:slug" element={<Article />} />
    <Route path="video" element={<Videos />} /><Route path="thu-vien-anh" element={<Gallery />} /><Route path="ve-du-an" element={<About />} /><Route path="*" element={<NotFound />} />
  </Route></Routes>);
}
