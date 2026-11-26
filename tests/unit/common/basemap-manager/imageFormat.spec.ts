import { sniffImage } from '../../../../src/common/basemap-manager/imageFormat';

const DIMENSION = 128;

function buildPngHeader(width: number, height: number): Buffer {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const chunkLength = Buffer.alloc(4);
  chunkLength.writeUInt32BE(13);
  const chunkType = Buffer.from('IHDR', 'ascii');
  const widthBuf = Buffer.alloc(4);
  widthBuf.writeUInt32BE(width);
  const heightBuf = Buffer.alloc(4);
  heightBuf.writeUInt32BE(height);
  const rest = Buffer.alloc(5 + 4);
  return Buffer.concat([signature, chunkLength, chunkType, widthBuf, heightBuf, rest]);
}

function buildWebpVp8xHeader(width: number, height: number): Buffer {
  const riff = Buffer.from('RIFF', 'ascii');
  const fileSize = Buffer.alloc(4);
  const webp = Buffer.from('WEBP', 'ascii');
  const vp8x = Buffer.from('VP8X', 'ascii');
  const chunkSize = Buffer.alloc(4);
  const flags = Buffer.from([0x00]);
  const reserved = Buffer.from([0x00, 0x00, 0x00]);
  const widthMinusOne = Buffer.alloc(3);
  widthMinusOne.writeUIntLE(width - 1, 0, 3);
  const heightMinusOne = Buffer.alloc(3);
  heightMinusOne.writeUIntLE(height - 1, 0, 3);
  return Buffer.concat([riff, fileSize, webp, vp8x, chunkSize, flags, reserved, widthMinusOne, heightMinusOne]);
}

describe('sniffImage', () => {
  it('recognizes a valid PNG and reports its declared dimensions', () => {
    const sniffed = sniffImage(buildPngHeader(DIMENSION, DIMENSION));

    expect(sniffed).toEqual({ mimeType: 'image/png', width: DIMENSION, height: DIMENSION });
  });

  it('recognizes a valid WebP (VP8X) and reports its declared dimensions', () => {
    const sniffed = sniffImage(buildWebpVp8xHeader(DIMENSION, DIMENSION));

    expect(sniffed).toEqual({ mimeType: 'image/webp', width: DIMENSION, height: DIMENSION });
  });

  it('reports non-128x128 PNG dimensions rather than rejecting outright - callers enforce the size policy', () => {
    const otherSize = 256;
    const sniffed = sniffImage(buildPngHeader(otherSize, otherSize));

    expect(sniffed).toEqual({ mimeType: 'image/png', width: otherSize, height: otherSize });
  });

  it('returns undefined for a buffer that is neither PNG nor WebP', () => {
    expect(sniffImage(Buffer.from('not an image, just some bytes that happen to be long enough'))).toBeUndefined();
  });

  it('returns undefined for a truncated/too-short buffer', () => {
    expect(sniffImage(Buffer.from([0x89, 0x50, 0x4e, 0x47]))).toBeUndefined();
  });
});
