"use client"
import type { NextPage } from 'next';
import IASTKeyboard from './components/IASTKeyboard';
import { Suspense } from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaFacebook, } from 'react-icons/fa';

const handleInstagram = () => {
  window.open('https://www.instagram.com/ansikmahapatra/', '_blank');
}

const handleFacebook = () => {
  window.open('https://www.facebook.com/ansik.mahapatra/', '_blank');
}

const handleLinkedin = () => {
  window.open('https://www.linkedin.com/in/ansik-mahapatra/', '_blank');
}

const handleGithub = () => {
  window.open('http://github.com/ansikmahapatra', '_blank');
}

const Home: NextPage = () => {
  return (
    <div style={{ padding: '6%', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px' }}>IAST Keyboard + Transliteration</h1>
      <h1 style={{ fontSize: '28px' }}>by āṃśika aṃśumāna mahāpātra</h1>
      <div className='socials'>
        <FaInstagram className='social' onClick={() => handleInstagram()} />
        <FaLinkedin className='social' onClick={() => handleLinkedin()} />
        <FaGithub className='social' onClick={() => handleGithub()} />
        <FaFacebook className='social' onClick={() => handleFacebook()} />
      </div>
      <Suspense>
        <IASTKeyboard />
      </Suspense>
    </div>
  );
};

export default Home;