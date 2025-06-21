import * as vscode from 'vscode';
import * as path from 'path';

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
	lineNumber: string;
}

export function activate(context: vscode.ExtensionContext) {
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
	
	let lineNumber: string;
	if (selection.isEmpty) {
		lineNumber = (selection.start.line + 1).toString();
	} else if (selection.start.line === selection.end.line) {
		lineNumber = (selection.start.line + 1).toString();
	} else {
		const endLine = selection.end.character === 0 ? selection.end.line : selection.end.line + 1;
		lineNumber = `${selection.start.line + 1}-${endLine}`;
	}

	return {
		document,
		selection,
		absolutePath,
		relativePath,
		fileName,
		selectedText,
		lineNumber
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

function formatText(template: string, info: EditorInfo): string {
	return template
		.replace(/%%/g, '\x00PERCENT\x00')
		.replace(/%p/g, info.absolutePath)
		.replace(/%r/g, info.relativePath)
		.replace(/%s/g, info.selectedText)
		.replace(/%n/g, info.fileName)
		.replace(/%l/g, info.lineNumber)
		.replace(/\x00PERCENT\x00/g, '%');
}

async function copyToClipboard(text: string): Promise<void> {
	await vscode.env.clipboard.writeText(text);
}

export function deactivate() {}
