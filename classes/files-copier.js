
"use strict";

const FileLocations = require("./file-locations");
const JSONStrings = require("./json-strings");
const Maker = require("./maker");
const ShellScripting = require("./shell-scripting");


module.exports = class FilesCopier extends Maker {

	constructor() {
		super();
		this.filesFolder = "";
		this.filesManifestPath = "";
		this.filesName = "";
		this.installCopyPaths = {};
	}

	// Getting paths

	get sourcesInstallFolder() {
		return this.frameworkInstallFolder + FileLocations.sourcesFolder + this.filesFolder;
	}
	get publicInstallFolder() {
		return this.frameworkPublicInstallFolder + this.filesFolder;
	}

	// Managing install copy paths

	readInstallCopyPathsAt(manifestFolder = "") {
		let r = {};
		try {
			const copyPaths = this.workspace.tryReadingJSONAt(this.sourcesInstallFolder + manifestFolder + this.filesManifestPath);
			for (const sourcePath of Object.keys(copyPaths)) {
				const targetSpec = copyPaths[sourcePath];
				if (targetSpec == JSONStrings.inheritedValue) {
					const subcopyPaths = this.readInstallCopyPathsAt(manifestFolder + sourcePath);
					for (const subsourcePath of Object.keys(subcopyPaths)) {
						r[subsourcePath] = subcopyPaths[subsourcePath];
					}
				} else {
					r[this.sourcesInstallFolder + manifestFolder + sourcePath] = this.publicInstallFolder + targetSpec;
				}
			}
		} catch (e) { }
		return r;
	}
	collectInstallCopyPaths() {
		this.installCopyPaths = this.readInstallCopyPathsAt();
	}

	// Configuring workspace tasks

	get makeTaskName() {
		return "make_" + this.frameworkName + "_" + this.filesName;
	}
	get shellScriptToMake() {
		let r = [];
		const installCopyPathKeys = Object.keys(this.installCopyPaths);
		if (installCopyPathKeys.length) {
			r.push(ShellScripting.ensureFolder(this.publicInstallFolder));
			for (const sourcePath of installCopyPathKeys) {
				const targetSpecParts = this.installCopyPaths[sourcePath].split(JSONStrings.fileSpecSeparator);
				const targetFolder = targetSpecParts[0];
				const targetFilename = (targetSpecParts.length > 1 ? targetSpecParts[1] : "");
				r.push(ShellScripting.ensureFolder(targetFolder));
				r.push(ShellScripting.copyFiles(sourcePath, targetFolder + targetFilename));
			}
		}
		return r;
	}

	configureWorkspaceToMake() {
		this.workspace.addShellTask(this.makeTaskName, this.shellScriptToMake);
	}
};
