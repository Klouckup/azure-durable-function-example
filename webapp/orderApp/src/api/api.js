export const API = {
    registerOrder: async (data) => {
        let res = await fetch('http://localhost:7071/api/order/register', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        console.log(res);
        return res.json();
    },
    getClientId: () => {
        function guidGenerator() {
            var S4 = function() {
               return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }
        return guidGenerator();
    },
    polling: async (url) => {
        let res = await fetch(url, {
            method: 'GET'
        });
        console.log(res);
        return res.json();
    }
};