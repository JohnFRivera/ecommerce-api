const getErrors = (errors) => {
    var errorArray = [];
    let keys = Object.keys(errors);
    keys.forEach(key => {
        errorArray.push({
            id: key,
            message: errors[key].message
        });
    });
    return errorArray;
};

export {
    getErrors
};