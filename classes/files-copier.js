
"use strict";

const FilesMaker = require("./files-maker");
const ResourceIdentification = require("./resource-identification");
const ShellScripting = require("./shell-scripting");


module.exports = class FilesCopier extends FilesMaker {

	constructor(parentMaker, filesName, filesManifestPath = ResourceIdentification.copyManifestPath) {
		super(parentMaker, filesName);
		this.filesManifestPath = filesManifestPath;
		this.installCopyPaths = {};
	}

	// Managing install copy paths

	readInstallCopyPathsAt(manifestFolder = "") {
		let r = {};
		try {
			const copyPaths = this.workspace.tryReadingJSONAt(this.sourcesInstallFolder + manifestFolder + this.filesManifestPath);
			for (const sourcePath of Object.keys(copyPaths)) {
				const targetSpec = copyPaths[sourcePath];
				if (targetSpec == ResourceIdentification.fileSpecInheritedValue) {
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

	get makeTaskName() { return "make_" + this.frameworkName + "_" + this.filesName; }
	get shellScriptToMake() {
		let r = [];
		const installCopyPathKeys = Object.keys(this.installCopyPaths);
		if (installCopyPathKeys.length) {
			r.push(ShellScripting.ensureDirectory(this.publicInstallFolder));
			for (const sourcePath of installCopyPathKeys) {
				const targetSpecParts = this.installCopyPaths[sourcePath].split(ResourceIdentification.fileSpecSeparator);
				const targetFolder = targetSpecParts[0];
				const targetFilename = (targetSpecParts.length > 1 ? targetSpecParts[1] : "");
				r.push(ShellScripting.ensureDirectory(targetFolder));
				r.push(ShellScripting.copyFiles(sourcePath, targetFolder + targetFilename));
			}
		}
		return r;
	}

	configureWorkspaceToMake() {
		this.collectInstallCopyPaths();
		this.workspace.addShellTask(this.makeTaskName, this.shellScriptToMake);
	}
};
