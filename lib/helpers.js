const chunkArr  = (arr, length) => {
  const chunks = [];
  let i = 0;
  
  while (i < arr.length) {
    chunks.push(arr.slice(i, i += length));
  }

  return chunks;
}

module.exports = {
  chunkArr: chunkArr,
};