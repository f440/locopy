import * as assert from 'assert';
import * as Handlebars from 'handlebars';

// Register helpers for testing
function registerHandlebarsHelpers(): void {
	Handlebars.registerHelper('replace', function(pattern: string, replacement: string, str: string) {
		if (typeof str !== 'string') {
			return str;
		}
		try {
			const regex = new RegExp(pattern, 'g');
			return str.replace(regex, replacement);
		} catch (e) {
			return str;
		}
	});

	Handlebars.registerHelper('encodeURIComponent', function(str: string) {
		if (typeof str !== 'string') {
			return str;
		}
		return encodeURIComponent(str);
	});
}

function formatText(template: string, data: any): string {
	try {
		const compiledTemplate = Handlebars.compile(template);
		return compiledTemplate(data);
	} catch (error) {
		throw error;
	}
}

suite('Handlebars Template Test Suite', () => {
	suiteSetup(() => {
		registerHandlebarsHelpers();
	});

	test('Basic variable substitution', () => {
		const template = '{{relativePath}}:{{startLine}}';
		const data = { relativePath: 'src/test.ts', startLine: 10 };
		const result = formatText(template, data);
		assert.strictEqual(result, 'src/test.ts:10');
	});

	test('Conditional endLine rendering', () => {
		const template = '{{relativePath}}:{{startLine}}{{#if endLine}}-{{endLine}}{{/if}}';
		
		// Without endLine
		const data1 = { relativePath: 'src/test.ts', startLine: 10 };
		const result1 = formatText(template, data1);
		assert.strictEqual(result1, 'src/test.ts:10');
		
		// With endLine
		const data2 = { relativePath: 'src/test.ts', startLine: 10, endLine: 15 };
		const result2 = formatText(template, data2);
		assert.strictEqual(result2, 'src/test.ts:10-15');
	});

	test('Markdown link with selectedText fallback', () => {
		const template = '[{{#if selectedText}}{{selectedText}}{{else}}{{fileName}}{{/if}}]({{relativePath}})';
		
		// With selectedText
		const data1 = { selectedText: 'Hello World', fileName: 'test.ts', relativePath: 'src/test.ts' };
		const result1 = formatText(template, data1);
		assert.strictEqual(result1, '[Hello World](src/test.ts)');
		
		// Without selectedText
		const data2 = { selectedText: '', fileName: 'test.ts', relativePath: 'src/test.ts' };
		const result2 = formatText(template, data2);
		assert.strictEqual(result2, '[test.ts](src/test.ts)');
	});

	test('Replace helper function', () => {
		const template = '{{replace "test" "spec" fileName}}';
		const data = { fileName: 'test.ts' };
		const result = formatText(template, data);
		assert.strictEqual(result, 'spec.ts');
	});

	test('EncodeURIComponent helper function', () => {
		const template = '{{encodeURIComponent relativePath}}';
		const data = { relativePath: 'src/test file.ts' };
		const result = formatText(template, data);
		assert.strictEqual(result, 'src%2Ftest%20file.ts');
	});

	test('Complex template with multiple helpers', () => {
		const template = '{{encodeURIComponent (replace " " "_" relativePath)}}:{{startLine}}';
		const data = { relativePath: 'src/test file.ts', startLine: 10 };
		const result = formatText(template, data);
		assert.strictEqual(result, 'src%2Ftest_file.ts:10');
	});
});
