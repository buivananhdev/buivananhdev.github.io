export function parseHexInput(input: string): number[] {
  const cleaned = input
    .replace(/0x/gi, '')
    .replace(/[^0-9a-fA-F]/g, '')
    .trim();

  if (!cleaned) {
    throw new Error('Vui lòng nhập dữ liệu Hex hợp lệ.');
  }

  if (cleaned.length % 2 !== 0) {
    throw new Error('Số lượng nibble không hợp lệ. Vui lòng nhập số byte chẵn.');
  }

  const bytes: number[] = [];
  for (let i = 0; i < cleaned.length; i += 2) {
    bytes.push(parseInt(cleaned.slice(i, i + 2), 16));
  }

  return bytes;
}

export function calculateModbusCRC16(hexInput: string) {
  const bytes = parseHexInput(hexInput);
  let crc = 0xffff;

  for (const byte of bytes) {
    crc ^= byte;

    for (let bit = 0; bit < 8; bit += 1) {
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

  return {
    crcHex,
    lsb,
    msb,
    rawDecimal: crc,
  };
}
