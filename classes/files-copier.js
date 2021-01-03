
"use strict";

const FilesOperation = require("./files-operation");
const ResourceIdentification = require("./resource-identification");
const ShellScripting = require("./shell-scripting");


module.exports = class FilesCopier extends FilesOperation {

	constructor(operation, filesName, manifestPath = ResourceIdentification.copyManifestPath) {
		super(operation, filesName);
		this.manifestPath = manifestPath;
	}

	// Discovering copy specs

	discoverCopySpecsFromManifestInFolder(manifestFolder = "") {
		let r = {};
		const manifestData = this.workspace.readJSONFileAt(this.sourcesInstallFolder + manifestFolder + this.manifestPath);
		if (manifestData) {
			for (const [sourcePath, destinationSpec] of Object.entries(manifestData)) {
				if (destinationSpec != ResourceIdentification.fileSpecInheritOption) {
					r[this.sourcesInstallFolder + manifestFolder + sourcePath] = destinationSpec;
				} else {
					for (const [subsourceInstallPath, subdestinationSpec] of Object.entries(this.discoverCopySpecsFromManifestInFolder(manifestFolder + sourcePath))) {
						r[subsourceInstallPath] = subdestinationSpec;
					}
				}
			}
		}
		return r;
	}

	discoverCopySpecs() {
		return this.discoverCopySpecsFromManifestInFolder();
	}

	// Configuring workspace tasks

	get makeTaskName() { return "make_" + this.frameworkName + "_" + this.filesName; }
	get shellScriptToMake() {
		let r = [];
		for (const [sourceInstallPath, destinationSpec] of Object.entries(this.discoverCopySpecs())) {
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
		this.workspace.defineTaskWithNameAndScript(this.makeTaskName, this.shellScriptToMake);
	}
};
