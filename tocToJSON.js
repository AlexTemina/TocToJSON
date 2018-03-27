let strings = [];

function printGroup(level) {
  let previousVal;
  let string = level > 0 ? ': {\n' : '';

  let i = 0;
  while (strings.length > 0) {
    const t = _.split(strings[0], '(')[0];
    const tSplitted = _.split(t, '.');
    const currentLevel = tSplitted.length - 2;
    let val = _.last(tSplitted);
    val = val.substring(1, val.length - 1);

    console.log(strings.length);

    const tabs = _.repeat('\t', level);

    if (currentLevel > level) {
      string += tabs + printGroup(currentLevel);
      i = -1;
    } else if (currentLevel < level) {
      string += tabs;

      if (i > 0) {
        string += `: {\n "text": "${previousVal}"\n}`;
      }

      string += '\n},\n';

      return string;
    } else {
      string += tabs;

      if (i > 0) {
        string += `: {\n "text": "${previousVal}"\n},\n`;
      }

      string += `"${_.camelCase(val)}"`;

      strings = _.drop(strings);

      if (strings.length === 0) {
        string += `: {\n "text": "${val}"\n},\n`;
        return string;
      }
    }

    i += 1;
    previousVal = val;
  }

  return `${string}}`;
}

const openFile = (event) => {
  const input = event.target;
  const reader = new FileReader();
  reader.onload = () => {
    const text = reader.result;
    const node = document.getElementById('output');

    const textByLines = _.split(text, '\n');
    strings = _.filter(textByLines, t => _.split(t, '.').length >= 2);

    let string = '';
    string += printGroup(0);

    node.innerText = string;
  };
  reader.readAsText(input.files[0]);
};
