export const getShortDate=(date:string)=>{
    let result='';
    try {
        const _date = new Date(date);
        const now = new Date();
        if(_date.getFullYear()===now.getFullYear()) {
            result=`${_date.getFullYear() } ${_date.getMonth() } ${_date.getDate() }`;
            if(_date.getMonth()===now.getMonth()&&_date.getDate()-now.getDate()<8){
                result=getWeekDay(_date);
                if(_date.getDate()===now.getDate())result=`${_date.getHours() }:${_date.getMinutes()}`
            }
        }
    }
    catch {
        return '';
    }
    return result;
}
function getWeekDay(date:Date) {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return days[date.getDay()];
}
