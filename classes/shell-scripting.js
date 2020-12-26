
"use strict";


module.exports = class ShellScripting {

	static copyFiles(source, target) { return [`cp -a ${source} ${target}`]; }
	static ensureFolder(source) { return [`mkdir -p ${source}`]; }
};
