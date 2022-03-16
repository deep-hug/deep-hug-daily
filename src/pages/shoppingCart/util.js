/**
 * @desc: 四舍五入  保留两位有效数字
 * @param {*}
 * @return {*}
 */
function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num)) {
        num = '0';
    }
    var sign = num == (num = Math.abs(num));
    num = Math.floor(num * 100 + 0.50000000001);
    var cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) {
        cents = '0' + cents;
    }
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    }
    return parseFloat((sign ? '' : '-') + num + '.' + cents); // 输出 0.3  (Number)
    // return ((sign) ? '' : '-') + num + '.' + cents;        // 输出 0.30 (String)
}

/**
 * @desc: 放大计算数字的倍数 （用于加减乘除）
 * @param {*}
 * @return {*}
 */
function decimalDigit(arr) {
    // arr 是一个字符串数组
    var digit = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].split('.')[1]) {
            digit.push(arr[i].split('.')[1].length);
        } else {
            digit.push(0);
        }
    }
    return Math.pow(10, Math.max.apply(null, digit));
}

/**
 * @desc: 加法封装 （多个数相加）
 * @param {*}
 * @return {*}
 */
function addition(...arr) {
    let strArr = [];
    for (let i in arr) {
        arr[i] = parseFloat(arr[i]);
        strArr.push(arr[i].toString());
    }
    let digit = decimalDigit(strArr);
    let arr_count = 0;
    arr.forEach((item) => {
        arr_count += item * digit;
    });
    let value = arr_count / digit;
    return formatCurrency(value);
}

/**
 * @desc: 减法封装
 * @param {*}
 * @return {*}
 */
function subtraction(total, ...arr) {
    let strArr = [];
    strArr.push(total.toString());
    for (let i in arr) {
        arr[i] = parseFloat(arr[i]);
        strArr.push(arr[i].toString());
    }
    var digit = decimalDigit(strArr);
    let arr_count = 0;
    arr.forEach((item) => {
        arr_count += item * digit;
    });
    var value = (total * digit - arr_count) / digit;
    if (value >= 0) {
        // 这个if判断 value最小值是0（因为是金额的数值运，会减掉优惠券的金额，最小为0）   total是开始的金额，后面的都是应该减掉的金额
        return formatCurrency(value);
    } else {
        return 0;
    }
    // return formatCurrency(value)      //  这样就直接输出值（不进行金额的运算）
}
/**
 * @desc: 乘法封装
 * @param {*}
 * @return {*}
 */
function multiplication(...arr) {
    let strArr = [];
    for (let i in arr) {
        arr[i] = parseFloat(arr[i]);
        strArr.push(arr[i].toString());
    }
    let digit = decimalDigit(strArr);
    let arr_count = 1;
    arr.forEach((item) => {
        arr_count *= item * digit;
    });
    let value = arr_count / Math.pow(digit, arr.length);
    return formatCurrency(value);
}
/**
 * @desc: 除法封装
 * @param {*}
 * @return {*}
 */
function division(total, ...arr) {
    let strArr = [];
    strArr.push(total.toString());
    for (let i in arr) {
        arr[i] = parseFloat(arr[i]);
        strArr.push(arr[i].toString());
    }
    var digit = decimalDigit(strArr);
    let arr_count = 1;
    arr.forEach((item) => {
        arr_count *= item * digit;
    });
    var value = ((total * digit) / arr_count) * Math.pow(digit, arr.length - 1);
    return formatCurrency(value);
}

export { addition, subtraction, multiplication, division };
