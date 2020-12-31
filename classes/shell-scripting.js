
"use strict";


module.exports = class ShellScripting {

	static copyFromTo(source, destination) { return [`cp -a ${source} ${destination}`]; }
	static ensureDirectory(source) { return [`mkdir -p ${source}`]; }
	static remove(source) { return [`rm -rf ${source}`]; }

	static copyToPathInFolderFromPath(destinationInstallPath, destinationInstallFolder, sourceInstallPath) {
		let r = [];
		r.push(this.remove(destinationInstallPath));
		r.push(this.ensureDirectory(destinationInstallFolder));
		r.push(this.copyFromTo(sourceInstallPath, destinationInstallPath));
		return r;
	}
};
