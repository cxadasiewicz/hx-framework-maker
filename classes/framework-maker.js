
"use strict";

const IncludesCopier = require("./includes-copier");
const Maker = require("./maker");
const ResourcesCopier = require("./resources-copier");
const SassCompiler = require("./sass-compiler");


module.exports = class FrameworkMaker extends Maker {

	// Configuring workspace tasks

	get makeTaskName() {
		return "make_" + this.frameworkName;
	}

	configureWorkspaceToMake() {
		const sassCompiler = new SassCompiler();
		sassCompiler.setContextFrom(this);
		sassCompiler.configureWorkspaceToMake();
		const resourcesCopier = new ResourcesCopier();
		resourcesCopier.setContextFrom(this);
		resourcesCopier.collectInstallCopyPaths();
		resourcesCopier.configureWorkspaceToMake();
		const includesCopier = new IncludesCopier();
		includesCopier.setContextFrom(this);
		includesCopier.collectInstallCopyPaths();
		includesCopier.configureWorkspaceToMake();
		this.workspace.addCompoundTask(this.makeTaskName, [
			sassCompiler.makeTaskName,
			resourcesCopier.makeTaskName,
			includesCopier.makeTaskName
		]);
	}

	static configureWorkspaceForProduct(workspace, product) {
		const maker = new FrameworkMaker();
		maker.setContext(workspace, product);
		maker.configureWorkspaceToMake();
	}
};
