const rnd_buffer = new Array<number>(16);
const hex_table = new Array<string>(256);

for(let i = 0; i < 256; ++i) {
  hex_table[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf : Array<number>) : string {
  var i = 0;

  return hex_table[buf[i++]] + hex_table[buf[i++]] +
         hex_table[buf[i++]] + hex_table[buf[i++]] + '-' +
         hex_table[buf[i++]] + hex_table[buf[i++]] + '-' +
         hex_table[buf[i++]] + hex_table[buf[i++]] + '-' +
         hex_table[buf[i++]] + hex_table[buf[i++]] + '-' +
         hex_table[buf[i++]] + hex_table[buf[i++]] +
         hex_table[buf[i++]] + hex_table[buf[i++]] +
         hex_table[buf[i++]] + hex_table[buf[i++]];
}

export default function uuid() : string {
  let r = null;

  for (let i = 0; i < 16; i++) {
    if((i & 0x03) === 0) {
      r = Math.random() * 0x100000000;
    }

    rnd_buffer[i] = r >>> ((i & 0x03) << 3) & 0xff;
  }

  return bytesToUuid(rnd_buffer);
};
