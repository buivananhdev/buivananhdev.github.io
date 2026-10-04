'use client';

import { useMemo, useState } from 'react';
import { calculateModbusCRC16 } from '@/lib/tools/modbus-crc';

const SAMPLE = '01 03 00 00 00 02';

export function ModbusCRCTool() {
  const [input, setInput] = useState(SAMPLE);
  const [error, setError] = useState('');

  const result = useMemo(() => {
    try {
      const computed = calculateModbusCRC16(input);
      setError('');
      return computed;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Dữ liệu không hợp lệ.');
      return null;
    }
  }, [input]);

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.crcHex);
  };

  return (
    <div className="tool-card tool-card--interactive">
      <label htmlFor="hex-input" className="field-label">
        Nhập dữ liệu Hex Modbus
      </label>
      <textarea
        id="hex-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="textarea"
        rows={6}
        placeholder="Ví dụ: 01 03 00 00 00 02"
      />

      <div className="button-row">
        <button type="button" className="primary-button" onClick={() => setInput(SAMPLE)}>
          Dùng mẫu
        </button>
        <button type="button" className="secondary-button" onClick={handleCopy} disabled={!result}>
          Copy CRC
        </button>
      </div>

      {error ? <p className="error-text">{error}</p> : null}

      {result ? (
        <div className="result-box">
          <div className="metric-row">
            <span>CRC-16</span>
            <strong>{result.crcHex}</strong>
          </div>
          <div className="metric-row">
            <span>LSB</span>
            <strong>{result.lsb}</strong>
          </div>
          <div className="metric-row">
            <span>MSB</span>
            <strong>{result.msb}</strong>
          </div>
          <div className="metric-row">
            <span>Giá trị thập phân</span>
            <strong>{result.rawDecimal}</strong>
          </div>
        </div>
      ) : null}
    </div>
  );
}
