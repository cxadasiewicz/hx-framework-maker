
"use strict";

const FileLocations = require("./file-locations");
const Maker = require("./maker");


module.exports = class FilesMaker extends Maker {

	constructor(parentMaker, filesName) {
		super(parentMaker);
		this.filesName = filesName;
	}

	// Getting paths

	get filesFolder() { return this.filesName + "/"; }
	get sourcesInstallFolder() { return this.frameworkInstallFolder + FileLocations.sourcesFolder + this.filesFolder; }
	get publicInstallFolder() { return this.frameworkPublicInstallFolder + this.filesFolder; }
};
