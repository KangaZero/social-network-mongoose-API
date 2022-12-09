// https://stackoverflow.com/questions/12409299/how-to-get-current-formatted-date-dd-mm-yyyy-in-javascript-and-append-it-to-an-i
// will always auto update createdAt if used
const formatDate = () => {

const date = new Date()
const yyyy = date.getFullYear();
let MM = date.getMonth() + 1; // Months start at 0!
let dd = date.getDate();
let hh = date.getHours();
let mm = date.getMinutes();
let ss = date.getSeconds();

if (dd < 10) dd = '0' + dd;
if (MM < 10) MM = '0' + MM;
if (hh < 10) hh = '0' + hh;
if (mm < 10) mm = '0' + mm;
if (ss < 10) ss = '0' + ss;

return `${dd}/${MM}/${yyyy}, ${hh}:${mm}:${ss}`;
};

// console.log(formatDate())

module.exports = { formatDate }