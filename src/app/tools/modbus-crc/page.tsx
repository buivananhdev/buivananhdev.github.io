'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

function calculateModbusCRC16(hexInput: string) {
  const cleaned = hexInput
    .replace(/0x/gi, '')
    .replace(/[^0-9a-fA-F]/g, '')
    .trim();

  if (!cleaned) throw new Error('Vui lòng nhập dữ liệu Hex hợp lệ');
  if (cleaned.length % 2 !== 0) throw new Error('Số lượng nibble không hợp lệ');

  const bytes: number[] = [];
  for (let i = 0; i < cleaned.length; i += 2) {
    bytes.push(parseInt(cleaned.slice(i, i + 2), 16));
  }

  let crc = 0xffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) {
      if ((crc & 0x0001) !== 0) {
        crc = (crc >> 1) ^ 0xa001;
      } else {
        crc = crc >> 1;
      }
    }
  }

  const crcHex = crc.toString(16).toUpperCase().padStart(4, '0');
  const lsb = crcHex.slice(2, 4);
  const msb = crcHex.slice(0, 2);

  return { crcHex, lsb, msb, decimal: crc };
}

export default function ModbusCRCPage() {
  const [input, setInput] = useState('01 03 00 00 00 02');
  const [error, setError] = useState('');

  const result = useMemo(() => {
    try {
      const res = calculateModbusCRC16(input);
      setError('');
      return res;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi');
      return null;
    }
  }, [input]);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link href="/" className="brand">
            <span className="brand-mark">D</span>
            <span>DevTools Hub</span>
          </Link>
          <nav className="nav">
            <Link href="/">Trang chủ</Link>
            <a href="#">Công cụ</a>
          </nav>
        </div>
      </header>

      <main className="container page-content">
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/" style={{ color: '#8aa0d8' }}>
            ← Quay lại
          </Link>
        </div>

        <h1>Modbus RTU CRC-16 Calculator</h1>
        <p style={{ color: '#b8c5dd', marginBottom: '2rem' }}>
          Tính toán mã kiểm tra lỗi CRC-16 cho dữ liệu Modbus RTU hoàn toàn trên trình duyệt.
        </p>

        <div
          style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
          }}
        >
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            Nhập dữ liệu Hex Modbus
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '1rem',
              borderRadius: '10px',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              background: 'rgba(10, 14, 27, 0.9)',
              color: '#e8eef7',
              fontFamily: 'monospace',
              fontSize: '0.95rem',
              resize: 'vertical',
            }}
            placeholder="VD: 01 03 00 00 00 02"
          />

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setInput('01 03 00 00 00 02')}
              className="btn btn-secondary"
            >
              Dùng Mẫu
            </button>
            {result && (
              <button
                onClick={() => handleCopy(result.crcHex)}
                className="btn btn-primary"
              >
                Copy CRC
              </button>
            )}
          </div>

          {error && <div style={{ color: '#ff8a8a', marginTop: '1rem' }}>{error}</div>}

          {result && (
            <div
              style={{
                marginTop: '1.5rem',
                background: 'rgba(10, 14, 27, 0.9)',
                border: '1px solid rgba(96, 165, 255, 0.2)',
                borderRadius: '12px',
                padding: '1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(148, 163, 184, 0.15)', paddingBottom: '0.75rem' }}>
                <span>CRC-16</span>
                <strong style={{ fontFamily: 'monospace' }}>{result.crcHex}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(148, 163, 184, 0.15)', paddingBottom: '0.75rem' }}>
                <span>LSB</span>
                <strong style={{ fontFamily: 'monospace' }}>{result.lsb}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(148, 163, 184, 0.15)', paddingBottom: '0.75rem' }}>
                <span>MSB</span>
                <strong style={{ fontFamily: 'monospace' }}>{result.msb}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Decimal</span>
                <strong style={{ fontFamily: 'monospace' }}>{result.decimal}</strong>
              </div>
            </div>
          )}
        </div>

        <section style={{ marginTop: '3rem' }}>
          <h2>Cách Hoạt Động</h2>
          <p>
            CRC-16 Modbus sử dụng thuật toán kiểm tra lỗi để phát hiện sai sót trong truyền dữ liệu. Nó bắt đầu từ giá trị 0xFFFF và xử lý từng byte dữ liệu qua 8 vòng lặp, XOR với đa thức 0xA001 nếu bit thấp nhất là 1.
          </p>

          <h3 style={{ marginTop: '1.5rem' }}>FAQ</h3>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Tại sao cần CRC-16?</strong>
            <p>CRC-16 giúp phát hiện lỗi truyền dữ liệu giữa PLC, SCADA, và các thiết bị công nghiệp.</p>
          </div>
          <div>
            <strong>Dữ liệu có được gửi lên server không?</strong>
            <p>Không. Tất cả tính toán chạy 100% trên trình duyệt của bạn.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>© 2026 DevTools Hub</p>
        </div>
      </footer>
    </>
  );
}
