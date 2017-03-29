let pool = 0;

function generate() {
  return btoa(`-${++pool}`);
}

export default generate;
