
"use strict";

const Maker = require("./maker");
const ResourceIdentification = require("./resource-identification");


module.exports = class FilesMaker extends Maker {

	constructor(maker, filesName) {
		super(maker);
		this.filesName = filesName;
	}

	// Getting paths

	get filesFolder() { return this.filesName + "/"; }
	get sourcesInstallFolder() { return this.frameworkInstallFolder + ResourceIdentification.sourcesFolder + this.filesFolder; }
	get publicInstallFolder() { return this.frameworkPublicInstallFolder + this.filesFolder; }
};
