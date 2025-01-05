module.exports = {
    isJsonString: (jsonString) => {
        try {
            if (typeof jsonString == "object") {
                return false
            }
            var o = JSON.parse(jsonString);
            if (o && typeof o === "object") {
                return true;
            }
        } catch (e) {
        }


        return false;
    }
}