const containsSemicolons = (string) => {
    console.log(string);
    if (typeof string == 'object') {
        let flag = false;
        Object.values(string).forEach((val) => {
            if (val.match(/[;]/) || val.match(/%3B/)) {
                console.log(val);
                flag = true;
            }
        });
        return flag;
    }
    else {
        return string.match(/[;]/) || string.match(/%3B/);
    }
};
export default containsSemicolons;
//# sourceMappingURL=checkSqlStrings.js.map