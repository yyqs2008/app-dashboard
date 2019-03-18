/**
 * 数字格式化（数字千位分隔符）
 * @param num
 * @returns {*}
 */
export function formatNumber(num) {
    if(!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)){
        return num;
    }
    let a = RegExp.$1,b = RegExp.$2,c = RegExp.$3;
    let re = new RegExp("(\\d)(\\d{3})(,|$)");
    while(re.test(b)){
        b = b.replace(re,"$1,$2$3");
    }
    return a +""+ b +""+ c;
}