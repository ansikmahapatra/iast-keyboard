"use client"
import React, { useState, useRef, useEffect } from 'react';
import sanscript from '@indic-transliteration/sanscript';
import localFont from 'next/font/local';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBackspace, FaShareAlt, FaInfo } from 'react-icons/fa';

const myFont = localFont({
  src: [{ path: '../fonts/NavBharati.ttf' }],
  variable: '--font-bharati',
});

interface IASTKeyboardProps { }

const IASTKeyboard: React.FC<IASTKeyboardProps> = () => {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const queryString = useSearchParams();
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

  useEffect(() => {
    if (queryString.has('iast')) {
      const decodedIAST = decodeURIComponent(queryString.get('iast') as string);
      setInputText(decodedIAST);
    }
  }, [queryString.get('iast')]);


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

  const handleShare = () => {
    const encodedIAST = encodeURIComponent(inputText);
    router.push(`/?iast=${encodedIAST}`);
    handleCopy();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('URL copied to clipboard!');
  };

  const handleToast = (toastMessage: string | null) => {
    if (!toastMessage) return;
    toast.info(toastMessage);
  }

  const handleBharati = () => {
    toast.info(
      <span className={`${myFont.className}`}>
        bhārati / {sanscript.t("bhārati", "iast", "devanagari")}
      </span>
    );
  }

  const scripts = [
    { name: 'Devanagari', script: "devanagari", iast: "devanāgarī", native: "देवनागरी" },
    { name: 'Odia', script: "oriya", iast: "or̤iā", native: "ଓଡ଼ିଆ" },
    { name: 'Brahmi', script: "brahmi", iast: "brāhmī", native: "𑀩𑁆𑀭𑀸𑀳𑁆𑀫𑀻" },
    { name: 'Ol Chiki', script: "ol_chiki", iast: "ol ciki", native: "ᱳᱞᱚ ᱪᱚᱤᱠᱚᱤ" },
    { name: 'Grantha', script: "grantha", iast: "grantha", native: "𑌗𑍍𑌰𑌨𑍍𑌥" },
    { name: 'Tamil', script: "tamil", iast: "tamiḻ", native: "தமிழ்" },
    { name: 'Malayalam', script: "malayalam", iast: "malayāl̤aṃ", native: "മലയാളം" },
    { name: 'Telugu', script: "telugu", iast: "telugu", native: "తెలుగు" },
    { name: 'Kannada', script: "kannada", iast: "kannaḍa", native: "ಕನ್ನಡ" },
    { name: 'Sinhala', script: "sinhala", iast: "siṃhala", native: "සිංහල" },
    { name: 'Bengali', script: "bengali", iast: "bāṃlā", native: "বাংলা" },
    { name: 'Gurmukhi', script: "gurmukhi", iast: "gurmukhī", native: "ਗੁਰਮੁਖੀ" },
    { name: 'Modi', script: "modi", iast: "moḍī", native: "𑘦𑘻𑘚𑘲" },
    { name: 'Gujarati', script: "gujarati", iast: "gujarātī", native: "ગુજરાતી" },
    { name: 'Sharada', script: "sharada", iast: "śāradā", native: "𑆯𑆳𑆫𑆢𑆳" },
    { name: 'Siddham', script: "siddham", iast: "siddhaṃ", native: "𑖭𑖰𑖟𑖿𑖠𑖽" },
    { name: 'Tibetan', script: "tibetan", iast: "bod yig", native: "བོད་ཡིག" },
    { name: 'Manipuri', script: "manipuri", iast: "maṇipurī", native: "ꯃꯅꯤꯄꯨꯔꯤ" },
    { name: 'Multani', script: "multani", iast: null, native: null },
    { name: 'Ahom', script: "ahom", iast: null, native: null },
    { name: 'Burmese', script: "burmese", iast: null, native: null },
    { name: 'Thai', script: "thai", iast: null, native: null },
    { name: 'Khmer', script: "khmer", iast: null, native: null },
    { name: 'Balinese', script: "balinese", iast: null, native: null },
    { name: 'Javanese', script: "javanese", iast: null, native: null },
    { name: 'Cyrillic', script: "cyrillic", iast: null, native: null },
    { name: 'Urdu', script: "urdu", iast: "urdū", native: "اُرَْدَُو" },
    { name: 'Kharoshti', script: "kharoshthi", iast: "kharoṣṭhī", native: "𐨑𐨪𐨆𐨮𐨿𐨛𐨁𐨌" },
    // { name: 'Dogra', script: "dogra", iast: null, native: null },
    // { name: 'Lao', script: "lao", iast: null, native: null },
    { name: 'Rohingya', script: "rohingya", iast: null, native: null },
    { name: 'Avestan', script: "avestan", iast: null, native: null },
  ];

  return (
    <div style={{ height: 'auto', width: '100%' }}>
      <div style={{ padding: '20px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          ref={inputRef}
          style={{ width: '100%', marginBottom: '10px', color: 'black', textAlign: 'center', height: '50px', border: '2px solid gray', borderRadius: '50px' }}
          placeholder="Enter IAST text here..."
        />

        <div style={{ marginTop: '10px', display: 'inline-grid' }}>
          {iastRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{ display: 'flex', justifyContent: 'left', gap: '5px', marginBottom: '5px' }}
            >
              {row.map((char) => (
                <div
                  key={char}
                  className='keyboard keys'
                  onClick={() => handleCharClick(char)}
                  title={char}
                >
                  {char}
                </div>
              ))}
            </div>
          ))}
          <div
            key="7"
            style={{ display: 'flex', justifyContent: 'left', gap: '5px', marginBottom: '5px' }}
          >
            <div
              key="Space"
              className='keyboard longkeys'
              onClick={() => handleSpace()}
              title="Space"
            >
              Space
            </div>
            <div
              key="Backspace"
              className='keyboard share'
              onClick={() => handleBackspace()}
              title="Backspace"
            >
              <FaBackspace />
            </div>
            <div
              key="Share"
              className='keyboard share'
              onClick={() => handleShare()}
              title="Backspace"
            >
              <FaShareAlt />
            </div>
          </div>
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
                Bharati <FaInfo className='info' onClick={() => handleBharati()} />
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }} className={`${myFont.className}`}>
                {sanscript.t(inputText, "iast", "devanagari")}
              </td>
            </tr>
            {scripts.map((scriptInfo) => (
              <tr key={scriptInfo.name}>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>
                  {scriptInfo.name}
                  {scriptInfo.native && <FaInfo className='info' onClick={() => handleToast(scriptInfo.iast + " / " + scriptInfo.native)} />}
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

      <ToastContainer />
    </div>
  );
};

export default IASTKeyboard;
