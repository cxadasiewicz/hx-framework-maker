
"use strict";

const MakeOperation = require("./make-operation");
const ResourceIdentification = require("./resource-identification");


module.exports = class FilesOperation extends MakeOperation {

	constructor(operation, filesName) {
		super(operation);
		this.filesName = filesName;
	}

	// Getting paths

	get filesFolder() { return this.filesName + "/"; }
	get sourcesInstallFolder() { return this.frameworkInstallFolder + ResourceIdentification.sourcesFolder + this.filesFolder; }
	get publicInstallFolder() { return this.frameworkPublicInstallFolder + this.filesFolder; }
};
