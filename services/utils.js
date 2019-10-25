function modelToJSON (model) {
	return JSON.parse(JSON.stringify(model));
};

function isBase64InCorrectExtension(base64string) {
	var ret = false;
	base64string.startsWith("JVBER") ? ret = true : null;
	base64string.startsWith("/9j/") ? ret = true : null
	base64string.startsWith("iVBORw") ? ret = true : null
	return ret;
}

function isFileCorrectExtension(base64string) {
	var ret = false;
	base64string.startsWith("JVBER") ? ret = true : null;
	base64string.startsWith("/9j/") ? ret = true : null
	base64string.startsWith("iVBORw") ? ret = true : null
	return ret;
}

module.exports = {
	modelToJSON: modelToJSON,
	isBase64InCorrectExtension: isBase64InCorrectExtension,
	isFileCorrectExtension: isFileCorrectExtension
};