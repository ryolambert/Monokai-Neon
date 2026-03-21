import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const checkMode = process.argv.includes('--check');

const variants = [
  {
    id: 'monokai-neon',
    label: 'Monokai Neon',
    file: 'themes/Monokai Neon-color-theme.json',
    preview: 'assets/preview-monokai-neon.svg',
    gallery: 'Punchy neon accents tuned for bright rooms and long coding sessions.',
    palette: {
      background: '#171a1f',
      sidebar: '#12151a',
      panel: '#0f1217',
      surface: '#1f2430',
      elevated: '#252b38',
      lineHighlight: '#202632',
      selection: '#33415c',
      selectionInactive: '#293244',
      guide: '#2a3140',
      guideActive: '#44506a',
      border: '#2b3140',
      foreground: '#f8f8f2',
      muted: '#c7cbd8',
      subtle: '#8f98ad',
      comment: '#7f89a3',
      accent: '#78a9ff',
      cyan: '#66d9ef',
      green: '#8be85a',
      yellow: '#ffd866',
      orange: '#ffb86c',
      red: '#ff6188',
      pink: '#ff79c6',
      purple: '#c792ea',
      white: '#ffffff'
    }
  },
  {
    id: 'monokai-neon-contrast',
    label: 'Monokai Neon Contrast',
    file: 'themes/Monokai Neon Contrast-color-theme.json',
    preview: 'assets/preview-monokai-neon-contrast.svg',
    gallery: 'Sharper contrast and brighter guides for accessibility-first dark workspaces.',
    palette: {
      background: '#111318',
      sidebar: '#0c0e13',
      panel: '#090b0f',
      surface: '#1b2130',
      elevated: '#232a3a',
      lineHighlight: '#1c2230',
      selection: '#3d4d70',
      selectionInactive: '#313d56',
      guide: '#354057',
      guideActive: '#556482',
      border: '#39445d',
      foreground: '#fbfcff',
      muted: '#d7dceb',
      subtle: '#a3acc4',
      comment: '#98a3bf',
      accent: '#8bb8ff',
      cyan: '#79e4ff',
      green: '#9ef769',
      yellow: '#ffe07d',
      orange: '#ffc27a',
      red: '#ff7b9c',
      pink: '#ff8cd6',
      purple: '#d3a4ff',
      white: '#ffffff'
    }
  },
  {
    id: 'monokai-neon-storm',
    label: 'Monokai Neon Storm',
    file: 'themes/Monokai Neon Storm-color-theme.json',
    preview: 'assets/preview-monokai-neon-storm.svg',
    gallery: 'A cooler slate-blue interpretation with calmer UI chrome and vivid syntax.',
    palette: {
      background: '#1a1f2b',
      sidebar: '#151925',
      panel: '#111521',
      surface: '#242c3b',
      elevated: '#2a3446',
      lineHighlight: '#232a39',
      selection: '#334564',
      selectionInactive: '#2a3850',
      guide: '#313b4e',
      guideActive: '#4b5a78',
      border: '#344057',
      foreground: '#f6f7fb',
      muted: '#c9cfde',
      subtle: '#8d98b2',
      comment: '#8390ae',
      accent: '#7db4ff',
      cyan: '#6edcef',
      green: '#8fe388',
      yellow: '#ffd580',
      orange: '#ffb37c',
      red: '#ff6b93',
      pink: '#ff86d2',
      purple: '#c8a2ff',
      white: '#ffffff'
    }
  },
  {
    id: 'monokai-neon-oled',
    label: 'Monokai Neon OLED',
    file: 'themes/Monokai Neon OLED-color-theme.json',
    preview: 'assets/preview-monokai-neon-oled.svg',
    gallery: 'Pure black editor chrome for OLED panels with softened neon to reduce haloing.',
    palette: {
      background: '#000000',
      sidebar: '#050505',
      panel: '#020202',
      surface: '#101010',
      elevated: '#171717',
      lineHighlight: '#0d0d0d',
      selection: '#23344f',
      selectionInactive: '#182438',
      guide: '#1f1f1f',
      guideActive: '#373737',
      border: '#232323',
      foreground: '#f5f7ff',
      muted: '#ccd3e5',
      subtle: '#98a2bc',
      comment: '#8e99b5',
      accent: '#7fb4ff',
      cyan: '#70d8f2',
      green: '#95e76d',
      yellow: '#ffe178',
      orange: '#ffbe72',
      red: '#ff7697',
      pink: '#ff8ad8',
      purple: '#d2a6ff',
      white: '#ffffff'
    }
  }
];

const samples = {
  overview: {
    title: 'TypeScript + React',
    subtitle: 'Monaco workbench preview',
    tabs: ['src/app.tsx', 'src/theme.ts', 'package.json'],
    activeTab: 0,
    sidebarTitle: 'Explorer',
    sidebarItems: ['src', '  components', '  app.tsx', '  theme.ts', 'README.md', 'package.json'],
    activeSidebarItem: '  app.tsx',
    lines: [
      [{ text: 'import', color: 'purple' }, { text: ' { useMemo } ', color: 'foreground' }, { text: 'from', color: 'purple' }, { text: ' ', color: 'foreground' }, { text: '\'react\'', color: 'yellow' }, { text: ';', color: 'subtle' }],
      [{ text: 'import', color: 'purple' }, { text: ' { ThemeVariant } ', color: 'foreground' }, { text: 'from', color: 'purple' }, { text: ' ', color: 'foreground' }, { text: '\'./theme\'', color: 'yellow' }, { text: ';', color: 'subtle' }],
      [],
      [{ text: 'const', color: 'purple' }, { text: ' accentScale', color: 'foreground' }, { text: ' = ', color: 'subtle' }, { text: '[', color: 'foreground' }, { text: '\'default\'', color: 'yellow' }, { text: ', ', color: 'foreground' }, { text: '\'contrast\'', color: 'yellow' }, { text: ', ', color: 'foreground' }, { text: '\'oled\'', color: 'yellow' }, { text: ']', color: 'foreground' }, { text: ';', color: 'subtle' }],
      [],
      [{ text: 'export', color: 'purple' }, { text: ' function ', color: 'foreground' }, { text: 'App', color: 'green' }, { text: '()', color: 'foreground' }, { text: ' {', color: 'foreground' }],
      [{ text: '  const', color: 'purple' }, { text: ' activeTheme', color: 'foreground' }, { text: ' = ', color: 'subtle' }, { text: 'useMemo', color: 'green' }, { text: '(() => ', color: 'foreground' }, { text: 'accentScale', color: 'foreground' }, { text: '.', color: 'subtle' }, { text: 'find', color: 'green' }, { text: '(', color: 'foreground' }, { text: '(name)', color: 'orange' }, { text: ' => ', color: 'subtle' }, { text: 'name', color: 'orange' }, { text: ' !== ', color: 'subtle' }, { text: '\'contrast\'', color: 'yellow' }, { text: '), []);', color: 'foreground' }],
      [{ text: '  return', color: 'purple' }, { text: ' (', color: 'foreground' }],
      [{ text: '    <', color: 'red' }, { text: 'main', color: 'green' }, { text: ' className', color: 'cyan' }, { text: '=', color: 'subtle' }, { text: '\"theme-preview\"', color: 'yellow' }, { text: '>', color: 'red' }],
      [{ text: '      <', color: 'red' }, { text: 'h1', color: 'green' }, { text: '>', color: 'red' }, { text: 'Monokai Neon', color: 'foreground' }, { text: '</', color: 'red' }, { text: 'h1', color: 'green' }, { text: '>', color: 'red' }],
      [{ text: '      <', color: 'red' }, { text: 'p', color: 'green' }, { text: '>', color: 'red' }, { text: '{', color: 'foreground' }, { text: 'activeTheme', color: 'orange' }, { text: '}', color: 'foreground' }, { text: ' is accessibility tuned.', color: 'foreground' }, { text: '</', color: 'red' }, { text: 'p', color: 'green' }, { text: '>', color: 'red' }],
      [{ text: '    </', color: 'red' }, { text: 'main', color: 'green' }, { text: '>', color: 'red' }],
      [{ text: '  );', color: 'foreground' }],
      [{ text: '}', color: 'foreground' }]
    ]
  },
  python: {
    title: 'Python',
    subtitle: 'FastAPI + Pydantic preview',
    tabs: ['api.py', 'settings.py'],
    activeTab: 0,
    sidebarTitle: 'Explorer',
    sidebarItems: ['app', '  api.py', '  models.py', '  settings.py'],
    activeSidebarItem: '  api.py',
    lines: [
      [{ text: 'from', color: 'purple' }, { text: ' fastapi ', color: 'foreground' }, { text: 'import', color: 'purple' }, { text: ' APIRouter', color: 'cyan' }],
      [{ text: 'from', color: 'purple' }, { text: ' pydantic ', color: 'foreground' }, { text: 'import', color: 'purple' }, { text: ' BaseModel', color: 'cyan' }],
      [],
      [{ text: 'class', color: 'purple' }, { text: ' ThemeRequest', color: 'cyan' }, { text: '(', color: 'foreground' }, { text: 'BaseModel', color: 'cyan' }, { text: '):', color: 'foreground' }],
      [{ text: '    variant', color: 'orange' }, { text: ': ', color: 'subtle' }, { text: 'str', color: 'cyan' }, { text: ' = ', color: 'subtle' }, { text: '\"oled\"', color: 'yellow' }],
      [{ text: '    contrast_ratio', color: 'orange' }, { text: ': ', color: 'subtle' }, { text: 'float', color: 'cyan' }, { text: ' = ', color: 'subtle' }, { text: '12.4', color: 'orange' }],
      [],
      [{ text: 'router', color: 'foreground' }, { text: ' = ', color: 'subtle' }, { text: 'APIRouter', color: 'cyan' }, { text: '()', color: 'foreground' }],
      [],
      [{ text: '@router', color: 'red' }, { text: '.', color: 'subtle' }, { text: 'post', color: 'green' }, { text: '(', color: 'foreground' }, { text: '\"/preview\"', color: 'yellow' }, { text: ')', color: 'foreground' }],
      [{ text: 'async', color: 'purple' }, { text: ' def ', color: 'foreground' }, { text: 'create_preview', color: 'green' }, { text: '(', color: 'foreground' }, { text: 'payload', color: 'orange' }, { text: ': ', color: 'subtle' }, { text: 'ThemeRequest', color: 'cyan' }, { text: ') -> ', color: 'subtle' }, { text: 'dict', color: 'cyan' }, { text: '[', color: 'foreground' }, { text: 'str', color: 'cyan' }, { text: ', ', color: 'foreground' }, { text: 'str', color: 'cyan' }, { text: ']:', color: 'foreground' }],
      [{ text: '    return', color: 'purple' }, { text: ' {', color: 'foreground' }],
      [{ text: '        \"variant\"', color: 'yellow' }, { text: ': ', color: 'subtle' }, { text: 'payload', color: 'orange' }, { text: '.', color: 'subtle' }, { text: 'variant', color: 'orange' }, { text: ',', color: 'foreground' }],
      [{ text: '        \"status\"', color: 'yellow' }, { text: ': ', color: 'subtle' }, { text: '\"generated\"', color: 'yellow' }],
      [{ text: '    }', color: 'foreground' }]
    ]
  },
  rust: {
    title: 'Rust',
    subtitle: 'Serde + Tokio preview',
    tabs: ['src/main.rs', 'src/theme.rs'],
    activeTab: 0,
    sidebarTitle: 'Explorer',
    sidebarItems: ['src', '  main.rs', '  theme.rs', 'Cargo.toml'],
    activeSidebarItem: '  main.rs',
    lines: [
      [{ text: 'use', color: 'purple' }, { text: ' serde', color: 'cyan' }, { text: '::', color: 'subtle' }, { text: '{', color: 'foreground' }, { text: 'Deserialize', color: 'cyan' }, { text: ', ', color: 'foreground' }, { text: 'Serialize', color: 'cyan' }, { text: '};', color: 'foreground' }],
      [{ text: 'use', color: 'purple' }, { text: ' tokio', color: 'cyan' }, { text: '::time::', color: 'subtle' }, { text: 'Duration', color: 'cyan' }, { text: ';', color: 'foreground' }],
      [],
      [{ text: '#[derive', color: 'red' }, { text: '(', color: 'foreground' }, { text: 'Debug', color: 'cyan' }, { text: ', ', color: 'foreground' }, { text: 'Serialize', color: 'cyan' }, { text: ', ', color: 'foreground' }, { text: 'Deserialize', color: 'cyan' }, { text: ')]', color: 'foreground' }],
      [{ text: 'struct', color: 'purple' }, { text: ' ThemePreset', color: 'cyan' }, { text: ' {', color: 'foreground' }],
      [{ text: '    name', color: 'orange' }, { text: ': ', color: 'subtle' }, { text: 'String', color: 'cyan' }, { text: ',', color: 'foreground' }],
      [{ text: '    oled', color: 'orange' }, { text: ': ', color: 'subtle' }, { text: 'bool', color: 'cyan' }, { text: ',', color: 'foreground' }],
      [{ text: '}', color: 'foreground' }],
      [],
      [{ text: '#[tokio', color: 'red' }, { text: '::', color: 'subtle' }, { text: 'main', color: 'green' }, { text: ']', color: 'foreground' }],
      [{ text: 'async', color: 'purple' }, { text: ' fn ', color: 'foreground' }, { text: 'main', color: 'green' }, { text: '()', color: 'foreground' }, { text: ' -> ', color: 'subtle' }, { text: 'Result', color: 'cyan' }, { text: '<', color: 'foreground' }, { text: '()', color: 'foreground' }, { text: ', ', color: 'foreground' }, { text: 'Box', color: 'cyan' }, { text: '<dyn std::error::Error>>', color: 'foreground' }, { text: ' {', color: 'foreground' }],
      [{ text: '    let', color: 'purple' }, { text: ' preset', color: 'foreground' }, { text: ' = ', color: 'subtle' }, { text: 'ThemePreset', color: 'cyan' }, { text: ' { ', color: 'foreground' }, { text: 'name', color: 'orange' }, { text: ': ', color: 'subtle' }, { text: 'String', color: 'cyan' }, { text: '::', color: 'subtle' }, { text: 'from', color: 'green' }, { text: '(', color: 'foreground' }, { text: '\"Storm\"', color: 'yellow' }, { text: '), ', color: 'foreground' }, { text: 'oled', color: 'orange' }, { text: ': ', color: 'subtle' }, { text: 'false', color: 'purple' }, { text: ' };', color: 'foreground' }],
      [{ text: '    tokio', color: 'cyan' }, { text: '::time::', color: 'subtle' }, { text: 'sleep', color: 'green' }, { text: '(', color: 'foreground' }, { text: 'Duration', color: 'cyan' }, { text: '::', color: 'subtle' }, { text: 'from_millis', color: 'green' }, { text: '(', color: 'foreground' }, { text: '120', color: 'orange' }, { text: ')).await;', color: 'foreground' }],
      [{ text: '    Ok', color: 'green' }, { text: '(', color: 'foreground' }, { text: '()', color: 'foreground' }, { text: ')', color: 'foreground' }],
      [{ text: '}', color: 'foreground' }]
    ]
  },
  go: {
    title: 'Go',
    subtitle: 'HTTP handler preview',
    tabs: ['server.go', 'theme.go'],
    activeTab: 0,
    sidebarTitle: 'Explorer',
    sidebarItems: ['cmd', '  server.go', 'internal', '  theme.go', 'go.mod'],
    activeSidebarItem: '  server.go',
    lines: [
      [{ text: 'package', color: 'purple' }, { text: ' main', color: 'foreground' }],
      [],
      [{ text: 'import', color: 'purple' }, { text: ' (', color: 'foreground' }],
      [{ text: '    ', color: 'foreground' }, { text: '\"encoding/json\"', color: 'yellow' }],
      [{ text: '    ', color: 'foreground' }, { text: '\"net/http\"', color: 'yellow' }],
      [{ text: ')', color: 'foreground' }],
      [],
      [{ text: 'type', color: 'purple' }, { text: ' ThemeResponse', color: 'cyan' }, { text: ' struct', color: 'purple' }, { text: ' {', color: 'foreground' }],
      [{ text: '    Variant', color: 'orange' }, { text: ' string ', color: 'cyan' }, { text: '`json:\"variant\"`', color: 'yellow' }],
      [{ text: '    Ratio', color: 'orange' }, { text: '   float64 ', color: 'cyan' }, { text: '`json:\"ratio\"`', color: 'yellow' }],
      [{ text: '}', color: 'foreground' }],
      [],
      [{ text: 'func', color: 'purple' }, { text: ' previewHandler', color: 'green' }, { text: '(', color: 'foreground' }, { text: 'writer', color: 'orange' }, { text: ' ', color: 'foreground' }, { text: 'http.ResponseWriter', color: 'cyan' }, { text: ', ', color: 'foreground' }, { text: 'request', color: 'orange' }, { text: ' ', color: 'foreground' }, { text: '*http.Request', color: 'cyan' }, { text: ') ', color: 'foreground' }, { text: '{', color: 'foreground' }],
      [{ text: '    response', color: 'foreground' }, { text: ' := ', color: 'subtle' }, { text: 'ThemeResponse', color: 'cyan' }, { text: '{', color: 'foreground' }, { text: 'Variant', color: 'orange' }, { text: ': ', color: 'subtle' }, { text: '\"Contrast\"', color: 'yellow' }, { text: ', ', color: 'foreground' }, { text: 'Ratio', color: 'orange' }, { text: ': ', color: 'subtle' }, { text: '13.2', color: 'orange' }, { text: '}', color: 'foreground' }],
      [{ text: '    writer', color: 'foreground' }, { text: '.', color: 'subtle' }, { text: 'Header', color: 'green' }, { text: '()', color: 'foreground' }, { text: '.', color: 'subtle' }, { text: 'Set', color: 'green' }, { text: '(', color: 'foreground' }, { text: '\"Content-Type\"', color: 'yellow' }, { text: ', ', color: 'foreground' }, { text: '\"application/json\"', color: 'yellow' }, { text: ')', color: 'foreground' }],
      [{ text: '    _ = ', color: 'subtle' }, { text: 'json', color: 'cyan' }, { text: '.', color: 'subtle' }, { text: 'NewEncoder', color: 'green' }, { text: '(', color: 'foreground' }, { text: 'writer', color: 'orange' }, { text: ').', color: 'foreground' }, { text: 'Encode', color: 'green' }, { text: '(', color: 'foreground' }, { text: 'response', color: 'foreground' }, { text: ')', color: 'foreground' }],
      [{ text: '}', color: 'foreground' }]
    ]
  }
};

const semanticTokenColors = (palette) => ({
  namespace: palette.cyan,
  class: palette.cyan,
  enum: palette.cyan,
  interface: palette.cyan,
  struct: palette.cyan,
  type: palette.cyan,
  typeParameter: palette.orange,
  parameter: palette.orange,
  variable: palette.foreground,
  'variable.readonly': palette.red,
  property: palette.orange,
  'property.readonly': palette.red,
  enumMember: palette.orange,
  decorator: palette.red,
  function: palette.green,
  'function.defaultLibrary': palette.cyan,
  method: palette.green,
  'method.defaultLibrary': palette.cyan,
  macro: palette.red,
  label: palette.yellow,
  regexp: palette.cyan,
  'string.escape': palette.orange,
  number: palette.orange,
  keyword: palette.purple,
  comment: {
    foreground: palette.comment,
    fontStyle: 'italic'
  }
});

const tokenColors = (palette) => [
  rule('Comments', ['comment', 'punctuation.definition.comment'], palette.comment, 'italic'),
  rule('Keywords', ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control', 'keyword.operator.new', 'keyword.operator.expression'], palette.purple, 'bold'),
  rule('Modifiers & decorators', ['entity.name.function.decorator', 'entity.name.type.module', 'meta.annotation', 'punctuation.decorator'], palette.red),
  rule('Language constants', ['constant.language', 'constant.language.boolean', 'constant.language.null', 'support.constant', 'constant.character.escape'], palette.purple),
  rule('Strings', ['string', 'string.quoted', 'markup.inline.raw.string.markdown'], palette.yellow),
  rule('String escapes and regex', ['constant.other.symbol', 'string.regexp', 'constant.character', 'string.template punctuation.definition.string', 'keyword.other.template'], palette.orange),
  rule('Numbers', ['constant.numeric', 'constant.numeric.integer', 'constant.numeric.float'], palette.orange),
  rule('Functions', ['entity.name.function', 'support.function', 'support.function.any-method', 'meta.function-call', 'variable.function'], palette.green),
  rule('Methods', ['meta.method', 'meta.function.method', 'entity.name.method'], palette.green),
  rule('Types', ['entity.name.type', 'entity.name.class', 'entity.name.struct', 'entity.name.enum', 'entity.name.interface', 'support.type', 'support.class', 'support.type.primitive', 'storage.type.class'], palette.cyan),
  rule('Namespaces', ['entity.name.namespace', 'entity.name.module', 'entity.name.package', 'support.namespace'], palette.cyan),
  rule('Parameters', ['variable.parameter', 'meta.parameter.object-pattern', 'meta.parameter.type.variable'], palette.orange),
  rule('Properties', ['variable.other.property', 'variable.object.property', 'meta.object-literal.key', 'support.variable.property', 'entity.other.attribute-name'], palette.orange),
  rule('Constants', ['variable.other.constant', 'entity.name.constant', 'constant.other.color'], palette.red),
  rule('Tags', ['entity.name.tag', 'meta.tag', 'punctuation.definition.tag', 'punctuation.separator.key-value'], palette.red),
  rule('Attributes', ['entity.other.attribute-name.html', 'entity.other.attribute-name.css', 'meta.attribute', 'support.type.property-name.css'], palette.green),
  rule('Selectors', ['entity.other.attribute-name.class.css', 'entity.other.attribute-name.id.css', 'meta.selector.css', 'entity.name.tag.css'], palette.pink),
  rule('JSON and YAML keys', ['support.type.property-name.json', 'meta.object-literal.key.json', 'entity.name.tag.yaml'], palette.orange),
  rule('Markdown headings', ['markup.heading', 'markup.heading.markdown', 'entity.name.section.markdown'], palette.pink, 'bold'),
  rule('Markdown emphasis', ['markup.bold', 'markup.italic', 'markup.underline.link', 'markup.quote.markdown'], palette.yellow),
  rule('Markdown lists', ['beginning.punctuation.definition.list.markdown', 'markup.list', 'markup.raw.block.markdown'], palette.cyan),
  rule('Links', ['markup.underline.link', 'string.other.link.title', 'markup.link', 'markup.underline.link.image'], palette.accent, 'underline'),
  rule('Diff inserted', ['markup.inserted', 'diff.inserted', 'meta.diff.header.from-file'], palette.green),
  rule('Diff removed', ['markup.deleted', 'diff.deleted', 'meta.diff.header.to-file'], palette.red),
  rule('Diff changed', ['markup.changed', 'diff.changed'], palette.yellow),
  rule('Errors', ['invalid', 'invalid.illegal', 'invalid.deprecated'], palette.red, 'underline'),
  rule('Punctuation', ['punctuation', 'meta.brace', 'meta.delimiter', 'punctuation.separator', 'punctuation.terminator'], palette.foreground),
  rule('TypeScript specific', ['entity.name.type.alias.ts', 'support.type.object.module.ts', 'entity.name.type.module.ts', 'storage.type.type.ts'], palette.cyan),
  rule('Python decorators', ['entity.name.function.decorator.python', 'support.type.exception.python', 'storage.type.annotation.python'], palette.red),
  rule('Go declarations', ['entity.name.package.go', 'entity.name.import.go', 'storage.type.go'], palette.cyan),
  rule('Rust lifetimes and traits', ['storage.modifier.lifetime.rust', 'support.type.rust', 'entity.name.trait.rust'], palette.orange),
  rule('Shell variables', ['variable.other.normal.shell', 'variable.parameter.function.shell'], palette.red)
];

function rule(name, scope, foreground, fontStyle = '') {
  return {
    name,
    scope,
    settings: {
      foreground,
      ...(fontStyle ? { fontStyle } : {})
    }
  };
}

function withAlpha(hex, opacity) {
  const alpha = Math.round(Math.max(0, Math.min(1, opacity)) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${alpha}`;
}

function createColors(palette) {
  return {
    foreground: palette.muted,
    'focusBorder': palette.accent,
    'activityBar.activeBorder': palette.accent,
    'activityBar.background': palette.panel,
    'activityBar.foreground': palette.foreground,
    'activityBar.inactiveForeground': withAlpha(palette.foreground, 0.64),
    'activityBarBadge.background': palette.pink,
    'activityBarBadge.foreground': palette.panel,
    'badge.background': palette.accent,
    'badge.foreground': palette.panel,
    'breadcrumb.background': palette.background,
    'breadcrumb.foreground': withAlpha(palette.foreground, 0.72),
    'breadcrumb.activeSelectionForeground': palette.foreground,
    'button.background': palette.accent,
    'button.foreground': palette.panel,
    'button.hoverBackground': palette.cyan,
    'checkbox.background': palette.surface,
    'checkbox.border': palette.border,
    'debugToolBar.background': palette.surface,
    'descriptionForeground': withAlpha(palette.foreground, 0.7),
    'dropdown.background': palette.surface,
    'dropdown.border': palette.border,
    'dropdown.foreground': palette.foreground,
    'editor.background': palette.background,
    'editor.foreground': palette.foreground,
    'editor.lineHighlightBackground': palette.lineHighlight,
    'editor.selectionBackground': withAlpha(palette.selection, 0.9),
    'editor.inactiveSelectionBackground': withAlpha(palette.selectionInactive, 0.9),
    'editor.selectionHighlightBackground': withAlpha(palette.accent, 0.18),
    'editor.wordHighlightBackground': withAlpha(palette.cyan, 0.16),
    'editor.wordHighlightStrongBackground': withAlpha(palette.orange, 0.18),
    'editor.findMatchBackground': withAlpha(palette.purple, 0.7),
    'editor.findMatchHighlightBackground': withAlpha(palette.cyan, 0.22),
    'editor.foldBackground': withAlpha(palette.accent, 0.09),
    'editor.hoverHighlightBackground': withAlpha(palette.yellow, 0.08),
    'editor.rangeHighlightBackground': withAlpha(palette.orange, 0.08),
    'editorLink.activeForeground': palette.accent,
    'editorCursor.foreground': palette.foreground,
    'editorError.foreground': palette.red,
    'editorWarning.foreground': palette.yellow,
    'editorInfo.foreground': palette.cyan,
    'editorGroup.background': palette.background,
    'editorGroup.border': palette.border,
    'editorGroup.dropBackground': withAlpha(palette.accent, 0.18),
    'editorGroupHeader.tabsBackground': palette.sidebar,
    'editorGutter.background': palette.background,
    'editorGutter.addedBackground': palette.green,
    'editorGutter.deletedBackground': palette.red,
    'editorGutter.modifiedBackground': palette.cyan,
    'editorIndentGuide.background': palette.guide,
    'editorIndentGuide.activeBackground': palette.guideActive,
    'editorLineNumber.foreground': withAlpha(palette.subtle, 0.9),
    'editorLineNumber.activeForeground': palette.foreground,
    'editorOverviewRuler.border': palette.border,
    'editorOverviewRuler.addedForeground': withAlpha(palette.green, 0.8),
    'editorOverviewRuler.deletedForeground': withAlpha(palette.red, 0.8),
    'editorOverviewRuler.modifiedForeground': withAlpha(palette.cyan, 0.8),
    'editorOverviewRuler.errorForeground': withAlpha(palette.red, 0.9),
    'editorOverviewRuler.warningForeground': withAlpha(palette.yellow, 0.9),
    'editorOverviewRuler.infoForeground': withAlpha(palette.cyan, 0.9),
    'editorSuggestWidget.background': palette.surface,
    'editorSuggestWidget.border': palette.border,
    'editorSuggestWidget.foreground': palette.foreground,
    'editorSuggestWidget.highlightForeground': palette.accent,
    'editorSuggestWidget.selectedBackground': palette.elevated,
    'editorWidget.background': palette.surface,
    'editorWidget.border': palette.border,
    'gitDecoration.addedResourceForeground': palette.green,
    'gitDecoration.deletedResourceForeground': palette.red,
    'gitDecoration.modifiedResourceForeground': palette.orange,
    'input.background': palette.surface,
    'input.border': palette.border,
    'input.foreground': palette.foreground,
    'input.placeholderForeground': withAlpha(palette.subtle, 0.85),
    'list.activeSelectionBackground': palette.elevated,
    'list.activeSelectionForeground': palette.foreground,
    'list.focusOutline': palette.accent,
    'list.highlightForeground': palette.accent,
    'list.hoverBackground': withAlpha(palette.elevated, 0.85),
    'list.inactiveSelectionBackground': withAlpha(palette.surface, 0.85),
    'list.inactiveSelectionForeground': palette.foreground,
    'menu.background': palette.surface,
    'menu.foreground': palette.foreground,
    'menu.selectionBackground': palette.elevated,
    'menu.selectionForeground': palette.foreground,
    'minimap.background': withAlpha(palette.panel, 0.75),
    'minimap.selectionHighlight': withAlpha(palette.accent, 0.18),
    'panel.background': palette.sidebar,
    'panel.border': palette.border,
    'panelTitle.activeForeground': palette.foreground,
    'panelTitle.inactiveForeground': withAlpha(palette.foreground, 0.65),
    'peekView.border': palette.accent,
    'peekViewEditor.background': palette.background,
    'peekViewResult.background': palette.sidebar,
    'peekViewResult.selectionBackground': palette.elevated,
    'peekViewTitle.background': palette.panel,
    'scrollbarSlider.background': withAlpha(palette.subtle, 0.25),
    'scrollbarSlider.hoverBackground': withAlpha(palette.subtle, 0.4),
    'scrollbarSlider.activeBackground': withAlpha(palette.subtle, 0.5),
    'sideBar.background': palette.sidebar,
    'sideBar.border': palette.border,
    'sideBar.foreground': palette.muted,
    'sideBarSectionHeader.background': palette.panel,
    'sideBarSectionHeader.foreground': palette.foreground,
    'statusBar.background': palette.panel,
    'statusBar.foreground': palette.foreground,
    'statusBar.debuggingBackground': palette.purple,
    'statusBar.noFolderBackground': palette.panel,
    'statusBarItem.hoverBackground': withAlpha(palette.elevated, 0.9),
    'tab.activeBackground': palette.background,
    'tab.activeBorderTop': palette.accent,
    'tab.activeForeground': palette.foreground,
    'tab.border': palette.border,
    'tab.hoverBackground': palette.surface,
    'tab.inactiveBackground': palette.sidebar,
    'tab.inactiveForeground': withAlpha(palette.foreground, 0.65),
    'terminal.background': palette.background,
    'terminal.foreground': palette.foreground,
    'terminal.ansiBlack': '#525866',
    'terminal.ansiBlue': palette.accent,
    'terminal.ansiBrightBlack': '#7a8192',
    'terminal.ansiBrightBlue': palette.cyan,
    'terminal.ansiBrightCyan': '#8be9fd',
    'terminal.ansiBrightGreen': '#b6ff8f',
    'terminal.ansiBrightMagenta': palette.pink,
    'terminal.ansiBrightRed': '#ff8fad',
    'terminal.ansiBrightWhite': palette.white,
    'terminal.ansiBrightYellow': '#fff19a',
    'terminal.ansiCyan': palette.cyan,
    'terminal.ansiGreen': palette.green,
    'terminal.ansiMagenta': palette.purple,
    'terminal.ansiRed': palette.red,
    'terminal.ansiWhite': palette.muted,
    'terminal.ansiYellow': palette.yellow,
    'terminalCursor.background': palette.foreground,
    'terminalCursor.foreground': palette.foreground,
    'textLink.foreground': palette.accent,
    'textLink.activeForeground': palette.cyan,
    'textPreformat.foreground': palette.yellow,
    'titleBar.activeBackground': palette.panel,
    'titleBar.activeForeground': palette.foreground,
    'titleBar.inactiveBackground': palette.panel,
    'titleBar.inactiveForeground': withAlpha(palette.foreground, 0.65),
    'welcomePage.tileBackground': palette.surface,
    'widget.border': palette.border,
    'editorBracketHighlight.foreground1': palette.red,
    'editorBracketHighlight.foreground2': palette.orange,
    'editorBracketHighlight.foreground3': palette.yellow,
    'editorBracketHighlight.foreground4': palette.green,
    'editorBracketHighlight.foreground5': palette.cyan,
    'editorBracketHighlight.foreground6': palette.purple,
    'editorBracketPairGuide.activeBackground1': palette.red,
    'editorBracketPairGuide.activeBackground2': palette.orange,
    'editorBracketPairGuide.activeBackground3': palette.yellow,
    'editorBracketPairGuide.activeBackground4': palette.green,
    'editorBracketPairGuide.activeBackground5': palette.cyan,
    'editorBracketPairGuide.activeBackground6': palette.purple,
    'editorBracketPairGuide.background1': withAlpha(palette.red, 0.35),
    'editorBracketPairGuide.background2': withAlpha(palette.orange, 0.35),
    'editorBracketPairGuide.background3': withAlpha(palette.yellow, 0.35),
    'editorBracketPairGuide.background4': withAlpha(palette.green, 0.35),
    'editorBracketPairGuide.background5': withAlpha(palette.cyan, 0.35),
    'editorBracketPairGuide.background6': withAlpha(palette.purple, 0.35)
  };
}

function createTheme(variant) {
  return {
    name: variant.label,
    $schema: 'vscode://schemas/color-theme',
    type: 'dark',
    semanticHighlighting: true,
    colors: createColors(variant.palette),
    tokenColors: tokenColors(variant.palette),
    semanticTokenColors: semanticTokenColors(variant.palette)
  };
}

function luminance(hex) {
  const [r, g, b] = hex.match(/[A-Fa-f0-9]{2}/g).slice(0, 3).map((value) => parseInt(value, 16) / 255).map((channel) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground, background) {
  const light = Math.max(luminance(foreground), luminance(background));
  const dark = Math.min(luminance(foreground), luminance(background));
  return Number(((light + 0.05) / (dark + 0.05)).toFixed(2));
}

function buildAccessibilityReport() {
  return Object.fromEntries(
    variants.map((variant) => [
      variant.label,
      {
        'editor foreground / editor background': contrastRatio(variant.palette.foreground, variant.palette.background),
        'comment / editor background': contrastRatio(variant.palette.comment, variant.palette.background),
        'sidebar foreground / sidebar background': contrastRatio(variant.palette.muted, variant.palette.sidebar),
        'status bar foreground / status bar background': contrastRatio(variant.palette.foreground, variant.palette.panel)
      }
    ])
  );
}

function escapeXml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function previewSvg(variant, sample, { showSidebar = true } = {}) {
  const palette = variant.palette;
  const width = 1600;
  const height = 940;
  const sidebarWidth = showSidebar ? 300 : 0;
  const editorX = 40 + sidebarWidth;
  const editorWidth = width - editorX - 40;
  const headerHeight = 56;
  const tabHeight = 52;
  const editorTop = 88 + tabHeight;
  const lineHeight = 42;

  const sidebarItems = showSidebar
    ? sample.sidebarItems
        .map((item, index) => {
          const isActive = item === sample.activeSidebarItem;
          const y = 178 + index * 42;
          return `
      ${isActive ? `<rect x="56" y="${y - 28}" width="252" height="36" rx="10" fill="${withAlpha(palette.accent, 0.16)}" />` : ''}
      <text x="72" y="${y}" fill="${isActive ? palette.foreground : palette.muted}" font-size="20" font-family="Inter, Arial, sans-serif">${escapeXml(item)}</text>`;
        })
        .join('')
    : '';

  const tabs = sample.tabs
    .map((tab, index) => {
      const isActive = index === sample.activeTab;
      const x = editorX + 32 + index * 220;
      return `
    <rect x="${x}" y="96" width="200" height="40" rx="12" fill="${isActive ? palette.background : palette.surface}" stroke="${palette.border}" />
    <text x="${x + 20}" y="122" fill="${isActive ? palette.foreground : palette.muted}" font-size="18" font-family="Inter, Arial, sans-serif">${escapeXml(tab)}</text>`;
    })
    .join('');

  const codeLines = sample.lines
    .map((segments, index) => {
      const y = editorTop + index * lineHeight;
      if (segments.length === 0) {
        return `
    <text x="${editorX + 28}" y="${y}" fill="${withAlpha(palette.subtle, 0.45)}" font-size="20" font-family="JetBrains Mono, Menlo, Consolas, monospace">${String(index + 1).padStart(2, ' ')}</text>`;
      }

      let x = editorX + 92;
      const spans = segments
        .map((segment) => {
          const currentX = x;
          x += segment.text.length * 11.3;
          return `<tspan x="${currentX}" y="${y}" fill="${palette[segment.color] ?? segment.color}">${escapeXml(segment.text)}</tspan>`;
        })
        .join('');

      return `
    <text x="${editorX + 28}" y="${y}" fill="${withAlpha(palette.subtle, 0.45)}" font-size="20" font-family="JetBrains Mono, Menlo, Consolas, monospace">${String(index + 1).padStart(2, ' ')}</text>
    <text xml:space="preserve" font-size="24" font-family="JetBrains Mono, Menlo, Consolas, monospace">${spans}</text>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(variant.label)} ${escapeXml(sample.title)} preview</title>
  <desc id="desc">${escapeXml(sample.subtitle)} rendered with ${escapeXml(variant.label)} colors.</desc>
  <rect width="${width}" height="${height}" rx="28" fill="${palette.panel}" />
  <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="24" fill="${palette.background}" stroke="${palette.border}" stroke-width="2" />
  <rect x="24" y="24" width="${width - 48}" height="${headerHeight}" rx="24" fill="${palette.panel}" />
  <circle cx="64" cy="52" r="10" fill="${palette.red}" />
  <circle cx="96" cy="52" r="10" fill="${palette.yellow}" />
  <circle cx="128" cy="52" r="10" fill="${palette.green}" />
  <text x="164" y="58" fill="${palette.foreground}" font-size="24" font-family="Inter, Arial, sans-serif">${escapeXml(variant.label)}</text>
  <text x="${width - 360}" y="58" fill="${palette.subtle}" font-size="18" font-family="Inter, Arial, sans-serif">${escapeXml(sample.subtitle)}</text>

  ${showSidebar ? `<rect x="40" y="88" width="${sidebarWidth}" height="${height - 144}" rx="18" fill="${palette.sidebar}" stroke="${palette.border}" />
  <text x="64" y="132" fill="${palette.foreground}" font-size="20" font-family="Inter, Arial, sans-serif">${escapeXml(sample.sidebarTitle)}</text>${sidebarItems}` : ''}

  <rect x="${editorX}" y="88" width="${editorWidth}" height="52" rx="18" fill="${palette.sidebar}" stroke="${palette.border}" />
  ${tabs}
  <rect x="${editorX}" y="140" width="${editorWidth}" height="${height - 196}" rx="18" fill="${palette.background}" stroke="${palette.border}" />
  <rect x="${editorX + editorWidth - 18}" y="180" width="8" height="220" rx="4" fill="${withAlpha(palette.subtle, 0.2)}" />
  <rect x="${editorX + editorWidth - 18}" y="228" width="8" height="72" rx="4" fill="${withAlpha(palette.subtle, 0.46)}" />
  <rect x="${editorX + 28}" y="${editorTop - 26}" width="${editorWidth - 56}" height="34" rx="10" fill="${withAlpha(palette.lineHighlight, 0.95)}" />
  <text x="${editorX + 28}" y="182" fill="${palette.foreground}" font-size="28" font-family="Inter, Arial, sans-serif">${escapeXml(sample.title)}</text>
  ${codeLines}
</svg>`;
}

function ensureFile(relativePath, content) {
  const target = join(rootDir, relativePath);
  mkdirSync(dirname(target), { recursive: true });

  let current = null;
  try {
    current = readFileSync(target, 'utf8');
  } catch {
    current = null;
  }

  if (current === content) {
    return;
  }

  if (checkMode) {
    throw new Error(`${relativePath} is out of date. Run npm run build.`);
  }

  writeFileSync(target, content, 'utf8');
}

for (const variant of variants) {
  ensureFile(variant.file, `${JSON.stringify(createTheme(variant), null, 2)}\n`);
}

ensureFile('assets/accessibility-report.json', `${JSON.stringify(buildAccessibilityReport(), null, 2)}\n`);
ensureFile('assets/preview-monokai-neon.svg', `${previewSvg(variants[0], samples.overview)}\n`);
ensureFile('assets/preview-monokai-neon-contrast.svg', `${previewSvg(variants[1], samples.overview)}\n`);
ensureFile('assets/preview-monokai-neon-storm.svg', `${previewSvg(variants[2], samples.overview)}\n`);
ensureFile('assets/preview-monokai-neon-oled.svg', `${previewSvg(variants[3], samples.overview)}\n`);
ensureFile('assets/syntax-python.svg', `${previewSvg(variants[0], samples.python)}\n`);
ensureFile('assets/syntax-rust.svg', `${previewSvg(variants[2], samples.rust)}\n`);
ensureFile('assets/syntax-go.svg', `${previewSvg(variants[1], samples.go)}\n`);
ensureFile('assets/syntax-oled.svg', `${previewSvg(variants[3], samples.overview, { showSidebar: false })}\n`);

if (!checkMode) {
  console.log(`Generated ${variants.length} theme variants and preview assets.`);
}
