export const formatTimeStamp = (timeStamp: number): string => {
   const a = new Date(timeStamp * 1000);
   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   const year = a.getFullYear();
   const month = months[a.getMonth()];
   const date = a.getDate();
   const hour = a.getHours();
   const min = a.getMinutes();
   const sec = a.getSeconds();
   const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
   return time;
};

export const extractHostName = (url: string): string => {
   let hostname = url.indexOf('//') > -1 ? url.split('/')[2] : url.split('/')[0];
   //find & remove port number
   hostname = hostname.split(':')[0];
   //find & remove "?"
   hostname = hostname.split('?')[0];
   return hostname;
};
