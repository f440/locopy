import * as vscode from 'vscode';
import * as path from 'path';
import * as Handlebars from 'handlebars';

interface FormatConfig {
	name: string;
	format: string;
}

interface EditorInfo {
	document: vscode.TextDocument;
	selection: vscode.Selection;
	absolutePath: string;
	relativePath: string;
	fileName: string;
	selectedText: string;
	startLine: number;
	endLine?: number;
}

export function activate(context: vscode.ExtensionContext) {
	// Register Handlebars helpers
	registerHandlebarsHelpers();

	const copyWithFormatCommand = vscode.commands.registerCommand('locopy.copyWithFormat', async () => {
		await copyWithFormat();
	});

	const copyQuickCommand = vscode.commands.registerCommand('locopy.copyQuick', async () => {
		await copyQuick();
	});

	context.subscriptions.push(copyWithFormatCommand, copyQuickCommand);
}

async function copyWithFormat(): Promise<void> {
	const editorInfo = getEditorInfo();
	if (!editorInfo) {
		vscode.window.showErrorMessage('No active editor found');
		return;
	}

	const formats = getFormats();
	if (formats.length === 0) {
		vscode.window.showErrorMessage('No formats configured');
		return;
	}

	const items = formats.map(format => ({
		label: format.name,
		description: format.format,
		format: format
	}));

	const selected = await vscode.window.showQuickPick(items, {
		placeHolder: 'Select a format to copy'
	});

	if (selected) {
		const formattedText = formatText(selected.format.format, editorInfo);
		await copyToClipboard(formattedText);
		if (getShowSuccessMessage()) {
			vscode.window.showInformationMessage('Copied to clipboard');
		}
	}
}

async function copyQuick(): Promise<void> {
	const editorInfo = getEditorInfo();
	if (!editorInfo) {
		vscode.window.showErrorMessage('No active editor found');
		return;
	}

	const formats = getFormats();
	if (formats.length === 0) {
		vscode.window.showErrorMessage('No formats configured');
		return;
	}

	const formattedText = formatText(formats[0].format, editorInfo);
	await copyToClipboard(formattedText);
	if (getShowSuccessMessage()) {
		vscode.window.showInformationMessage('Copied to clipboard');
	}
}

function getEditorInfo(): EditorInfo | null {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return null;
	}

	const document = editor.document;
	const selection = editor.selection;
	const absolutePath = document.uri.fsPath;
	const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
	const relativePath = workspaceFolder 
		? path.relative(workspaceFolder.uri.fsPath, absolutePath)
		: path.basename(absolutePath);
	const fileName = path.basename(absolutePath);
	const selectedText = document.getText(selection);
	
	const startLine = selection.start.line + 1;
	let endLine: number | undefined;
	
	if (!selection.isEmpty && selection.start.line !== selection.end.line) {
		endLine = selection.end.character === 0 ? selection.end.line : selection.end.line + 1;
	}

	return {
		document,
		selection,
		absolutePath,
		relativePath,
		fileName,
		selectedText,
		startLine,
		endLine
	};
}

function getFormats(): FormatConfig[] {
	const config = vscode.workspace.getConfiguration('locopy');
	return config.get<FormatConfig[]>('formats', []);
}

function getShowSuccessMessage(): boolean {
	const config = vscode.workspace.getConfiguration('locopy');
	return config.get<boolean>('showSuccessMessage', true);
}

function registerHandlebarsHelpers(): void {
	// Register replace helper: {{replace "pattern" "replacement" string}}
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

	// Register encodeURIComponent helper: {{encodeURIComponent string}}
	Handlebars.registerHelper('encodeURIComponent', function(str: string) {
		if (typeof str !== 'string') {
			return str;
		}
		return encodeURIComponent(str);
	});
}

function formatText(template: string, info: EditorInfo): string {
	try {
		const compiledTemplate = Handlebars.compile(template);
		return compiledTemplate({
			absolutePath: info.absolutePath,
			relativePath: info.relativePath,
			fileName: info.fileName,
			selectedText: info.selectedText,
			startLine: info.startLine,
			endLine: info.endLine
		});
	} catch (error) {
		vscode.window.showErrorMessage(`Template error: ${error}`);
		return template;
	}
}

async function copyToClipboard(text: string): Promise<void> {
	await vscode.env.clipboard.writeText(text);
}

export function deactivate() {}
