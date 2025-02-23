"use client"
import React, { useState, useRef, useEffect } from 'react';
import sanscript from '@indic-transliteration/sanscript';
import localFont from 'next/font/local';

const myFont = localFont({
  src: [{ path: '../fonts/NavBharati.ttf' }],
  variable: '--font-bharati',
});

interface IASTKeyboardProps { }

const IASTKeyboard: React.FC<IASTKeyboardProps> = () => {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const iastRows = [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['a', 'ā', 'i', 'ī', 'u', 'ū', 'e', 'o', 'h', 'ḥ'],
    ['k', 'g', 'c', 'j', 't', 'd', 'ṭ', 'ḍ', 'p', 'b'],
    ['n', 'ṅ', 'ñ', 'ṇ', 'ṉ', 'm', 'ṃ', 'm̐', '~', 'v'],
    ['s', 'ś', 'ṣ', 'y', 'ẏ', 'r', 'ṛ', 'ṝ', 'r̤', 'ṟ'],
    ['l', 'ḷ', 'ḹ', 'l̤', 'ḻ', 'q', 'ġ', 'z', 'f', 'k͟h'],
  ];

  const handleCharClick = (char: string) => {
    setInputText((prevText) => prevText + char);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBackspace = () => {
    setInputText((prevText) => prevText.slice(0, -1));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSpace = () => {
    setInputText((prevText) => prevText + ' ');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const scripts = [
    { name: 'Devanagari', script: "devanagari" },
    { name: 'Odia', script: "oriya" },
    { name: 'Brahmi', script: "brahmi" },
    { name: 'Ol Chiki', script: "ol_chiki" },
    { name: 'Grantha', script: "grantha" },
    { name: 'Tamil', script: "tamil" },
    { name: 'Malayalam', script: "malayalam" },
    { name: 'Telugu', script: "telugu" },
    { name: 'Kannada', script: "kannada" },
    { name: 'Sinhala', script: "sinhala" },
    { name: 'Bengali', script: "bengali" },
    { name: 'Gurmukhi', script: "gurmukhi" },
    { name: 'Modi', script: "modi" },
    { name: 'Gujarati', script: "gujarati" },
    { name: 'Sharada', script: "sharada" },
    { name: 'Siddham', script: "siddham" },
    { name: 'Burmese', script: "burmese" },
    { name: 'Tibetan', script: "tibetan" },
    { name: 'Thai', script: "thai" },
    { name: 'Khmer', script: "khmer" },
    { name: 'Balinese', script: "balinese" },
    { name: 'Javanese', script: "javanese" },
    { name: 'Ahom', script: "ahom" },
    { name: 'Manipuri', script: "manipuri" },
    { name: 'Cyrillic', script: "cyrillic" },
    { name: 'Kharoshti', script: "kharoshthi" },
    { name: 'Multani', script: "multani" },
    // { name: 'Dogra', script: "dogra" },
    // { name: 'Lao', script: "lao" },
    { name: 'Urdu', script: "urdu" },
    { name: 'Rohingya', script: "rohingya" },
    { name: 'Avestan', script: "avestan" },
  ];

  return (
    <div style={{ height: 'auto', width: '100%' }}>
      <div style={{ padding: '20px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          ref={inputRef}
          style={{ width: '100%', marginBottom: '10px', color: 'black' }}
        />
        <div style={{ display: "flex", gap: "40%", marginBottom: "10px" }}>
          <button onClick={handleSpace}>Space</button>
          <button onClick={handleBackspace}>Backspace</button>
        </div>

        <div style={{ marginTop: '10px', display: 'inline-grid' }}>
          {iastRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{ display: 'flex', justifyContent: 'left', gap: '5px', marginBottom: '5px' }}
            >
              {row.map((char) => (
                <div
                  key={char}
                  style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                    minWidth: '40px'
                  }}
                  onClick={() => handleCharClick(char)}
                  title={char}
                >
                  {char}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px', overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            tableLayout: 'fixed',
          }}
        >
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left', width: '40%' }}>
                Script
              </th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left', width: '60%' }}>
                Transliteration
              </th>
            </tr>
          </thead>
          <tbody>
            <tr key="bharati">
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>
                Bharati
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }} className={`${myFont.className}`}>
                {sanscript.t(inputText, "iast", "devanagari")}
              </td>
            </tr>
            {scripts.map((scriptInfo) => (
              <tr key={scriptInfo.name}>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>
                  {scriptInfo.name}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>
                  {sanscript.t(inputText, "iast", scriptInfo.script)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section style={{ padding: '40px', textAlign: 'left' }}>
        <h2>Resources:</h2>
        <ol>
          <li>
            <a href="https://bharatiscript.com/#fonts">
              Bharati Script Documentation
            </a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/@indic-transliteration/sanscript">
              @indic-transliteration/sanscript Documentation
            </a>
          </li>
        </ol>
      </section>
    </div>
  );
};

export default IASTKeyboard;