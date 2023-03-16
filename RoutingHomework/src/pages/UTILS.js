function sanitizeTextForURL(param) {
    return param.replace('/', "%2F");
}

export default sanitizeTextForURL;