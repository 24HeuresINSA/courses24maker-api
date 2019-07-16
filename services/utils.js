function modelToJSON (model) {
	return JSON.parse(JSON.stringify(model));
};

function isInCorrectExtension(base64string) {
	var ret = false;
	base64string.startsWith("JVBER") ? ret = true : null;
	base64string.startsWith("/9j/") ? ret = true : null
	base64string.startsWith("iVBORw") ? ret = true : null
	return ret;
}

module.exports = {
	modelToJSON: modelToJSON,
	isInCorrectExtension: isInCorrectExtension
};