
"use strict";

const FilesMaker = require("./files-maker");
const ResourceIdentification = require("./resource-identification");


module.exports = class SassCompiler extends FilesMaker {

	constructor(parentMaker) {
		super(parentMaker, ResourceIdentification.cssFolder);
	}

	// Getting paths

	get rootInstallPath() { return this.sourcesInstallFolder + ResourceIdentification.cssRootPath; }
	get publicInstallPath() { return this.publicInstallFolder + this.frameworkName + ResourceIdentification.cssPublicExtension; }
	get publicMinifiedInstallPath() { return this.publicInstallFolder + this.frameworkName + ResourceIdentification.cssPublicMinifiedExtension; }

	// Configuring workspace tasks

	get makeTaskName() { return "make_" + this.frameworkName + "_css"; }

	get processTaskName() { return "process_" + this.frameworkName + "_css"; }
	get shellScriptToProcess() {
		return ["sass" + " " + this.rootInstallPath + " " + this.publicInstallPath];
	}

	get postprocessTaskName() { return "postprocess_" + this.frameworkName + "_css"; }
	get shellScriptToPostprocess() {
		return ["postcss" + " " + this.publicInstallPath + " --replace --use autoprefixer"];
	}

	get optimizeTaskName() { return "optimize_" + this.frameworkName + "_css"; }
	get shellScriptToOptimize() {
		return ["cleancss" + " " + this.publicInstallPath + " --output " + this.publicMinifiedInstallPath];
	}

	configureWorkspaceToMake() {
		this.workspace.addShellTask(this.processTaskName, this.shellScriptToProcess);
		this.workspace.addShellTask(this.postprocessTaskName, this.shellScriptToPostprocess);
		this.workspace.addShellTask(this.optimizeTaskName, this.shellScriptToOptimize);
		this.workspace.addCompoundTask(this.makeTaskName, [
			this.processTaskName,
			this.postprocessTaskName,
			this.optimizeTaskName
		]);
	}
};
