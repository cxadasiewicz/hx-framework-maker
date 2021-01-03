
"use strict";

const FrameworkAssembler = require("./classes/framework-assembler");
const ProductMakefuncProvider = require("./classes/product-makefunc-provider");


module.exports = class HXFrameworkMaker extends ProductMakefuncProvider {

	static get productMakefuncName() { return "hx-framework-maker"; }

	static configureWorkspaceToMakeProduct(workspace, product) {
		new FrameworkAssembler(workspace, product).configureWorkspaceToMake();
	}
}
