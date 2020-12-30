
"use strict";

const FilesCopier = require("./classes/files-copier");
const FilesMaker = require("./classes/files-maker");
const FrameworkMaker = require("./classes/framework-maker");
const IncludesCopier = require("./classes/includes-copier");
const Maker = require("./classes/maker");
const ResourceIdentification = require("./classes/resource-identification");
const ResourcesCopier = require("./classes/resources-copier");
const SassCompiler = require("./classes/sass-compiler");
const ShellScripting = require("./classes/shell-scripting");


module.exports = class HXFrameworkMaker {

	static get name() { return "hx-framework-maker"; }

	static get FilesCopier() { return FilesCopier; }
	static get FilesMaker() { return FilesMaker; }
	static get FrameworkMaker() { return FrameworkMaker; }
	static get IncludesCopier() { return IncludesCopier; }
	static get Maker() { return Maker; }
	static get ResourceIdentification() { return ResourceIdentification; }
	static get ResourcesCopier() { return ResourcesCopier; }
	static get SassCompiler() { return SassCompiler; }
	static get ShellScripting() { return ShellScripting; }

	static configureWorkspaceForProduct(workspace, product) {
		FrameworkMaker.configureWorkspaceForProduct(workspace, product);
	}
}
