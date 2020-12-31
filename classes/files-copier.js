
"use strict";

const FilesMaker = require("./files-maker");
const ResourceIdentification = require("./resource-identification");
const ShellScripting = require("./shell-scripting");


module.exports = class FilesCopier extends FilesMaker {

	constructor(maker, filesName, manifestPath = ResourceIdentification.copyManifestPath) {
		super(maker, filesName);
		this.manifestPath = manifestPath;
		this.copySpecs = {};
	}

	// Collecting copy specs

	collectCopySpecsFromReadingManifestInFolder(manifestFolder = "") {
		let r = {};
		const manifestData = this.workspace.readJSONAt(this.sourcesInstallFolder + manifestFolder + this.manifestPath);
		if (manifestData) {
			for (const [sourcePath, destinationSpec] of Object.entries(manifestData)) {
				if (destinationSpec != ResourceIdentification.fileSpecInheritOption) {
					r[this.sourcesInstallFolder + manifestFolder + sourcePath] = destinationSpec;
				} else {
					for (const [subsourceInstallPath, subdestinationSpec] of Object.entries(this.collectCopySpecsFromReadingManifestInFolder(manifestFolder + sourcePath))) {
						r[subsourceInstallPath] = subdestinationSpec;
					}
				}
			}
		}
		return r;
	}

	collectCopySpecs() {
		this.copySpecs = this.collectCopySpecsFromReadingManifestInFolder();
	}

	// Configuring workspace tasks

	get makeTaskName() { return "make_" + this.frameworkName + "_" + this.filesName; }
	get shellScriptToMake() {
		let r = [];
		for (const [sourceInstallPath, destinationSpec] of Object.entries(this.copySpecs)) {
			const destinationSpecParts = destinationSpec.split(ResourceIdentification.fileSpecSeparator);
			const destinationInstallFolder = this.publicInstallFolder + destinationSpecParts[0];
			const destinationSubpath = (destinationSpecParts.length > 1 ? destinationSpecParts[1] : "");
			r.push(ShellScripting.copyToPathInFolderFromPath(
				destinationInstallFolder + destinationSubpath,
				destinationInstallFolder,
				sourceInstallPath
			));
		}
		return r;
	}

	configureWorkspaceToMake() {
		this.collectCopySpecs();
		this.workspace.addShellTask(this.makeTaskName, this.shellScriptToMake);
	}
};
