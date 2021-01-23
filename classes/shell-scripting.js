
"use strict";


module.exports = class ShellScripting {

	// Primitives

	static copyFromTo(source, destination) { return [`cp -a ${source} ${destination}`]; }
	static ensureDirectory(source) { return [`mkdir -p ${source}`]; }

	// Composites

	static copyToPathInFolderFromPath(destinationInstallPath, destinationInstallFolder, sourceInstallPath) {
		let r = [];
		r = r.concat(this.ensureDirectory(destinationInstallFolder));
		r = r.concat(this.copyFromTo(sourceInstallPath, destinationInstallPath));
		return r;
	}
};
