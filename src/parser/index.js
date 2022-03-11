import { List, Item } from 'linked-list';

const rules = [
  {
    name: 'quote',
    regexp: />(.+)/g,
    onMatch: v => v[1],
  },
  {
    name: 'id',
    regexp: /#(\d+)/g,
    onMatch: d => parseInt(d[1]),
  },
];

class Token extends Item {
  constructor(type, value) {
    super();
    this.type = type;
    this.value = value
  }
}

function applyRule(string, rule) {
  let i = 0;
  const results = [];
  for(const m of string.matchAll(rule.regexp)) {
    const capturedLength = m[0].length;
    const { index } = m;
    if(i < index) {
      results.push(new Token('text', string.slice(i, index)));
    }
    i = index + capturedLength;

    results.push(new Token(rule.name, rule.onMatch(m)));
  }
  return results;
}

function parseLine(line) {
  let list = new List(new Token('text', line));
  rules.forEach(rule => {
    let token = list.head;
    while(!!token) {
      const nextToken = token.next;
      if(token.type === 'text') {
        const results = applyRule(token.value, rule);
        if(results.length > 0) {
          results.forEach(item => token.prepend(item));
          token.detach();
        }
      }
      token = nextToken;
    }
  });
  return list.toArray();
}

function parseText(text) {
  const line = text.split(/\r?\n/);
  return line.map(l => ({ type: 'line', value: parseLine(l) }));
}

export default parseText;
