import config from '../config/Config';

export const url = () => {
    return `${config.PUBLIC_URL}`;
}

export const convertResponse = <T>(data: any) => {
    let result = {};
    Object.keys(data).forEach((key: string) => {
        result = {
            ...result,
            [key.charAt(0).toLowerCase() + key.substr(1, key.length)]: data[key]
        }
    })
    return result as T;
}

export const getUrl = (suffix: string) => {
    return `${config.api}${suffix}`;
}

export const formatDate = (strDate: string) => {
    const d = new Date(strDate);
    const month = d.getMonth() + 1;
    return (d.getDate() < 10 ? "0" + d.getDate().toString() : d.getDate().toString()) + "/" + (month < 10 ? "0" + month.toString() : month.toString()) + "/" + d.getFullYear();
}

export const sumColumn = (arr: Array<any>, key: string, isFormat: boolean = false, decimal: number = 0) => {
    let sum = 0;
    arr.forEach((row)=>{
        if (!row[key]){
            return 0;
        }
        sum = sum + row[key];
    })
    if (isFormat){
        return formatNumber(sum);
    }
    return sum;
}


export const formatNumber = (num: number, decimal: number = 0) => {
    return num.toFixed(decimal).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }