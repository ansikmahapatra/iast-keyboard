import type { NextPage } from 'next';
import IASTKeyboard from './components/IASTKeyboard';

const Home: NextPage = () => {
  return (
    <div style={{ padding: '6%', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px' }}>IAST Keyboard + Transliteration</h1>
      <h1 style={{ fontSize: '28px' }}>by āṃśika aṃśumāna mahāpātra</h1>
      <IASTKeyboard />
    </div>
  );
};

export default Home;