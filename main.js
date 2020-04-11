let container, df, div;
let uri = './data.json';
let req = new Request(uri, {method:'GET'});
document.addEventListener('DOMContentLoaded', () => {
    fetch(req)
        .then((res) => res.json())
        .then((json) => {
            //console.log(json.hourly.data)
            container = document.getElementById('container');
            df = new DocumentFragment();

            json.hourly.data.forEach(element => {
                //console.log(element);
                div = document.createElement('div');
                div.classList.add('hour');
                let timestamp = element.time;
                div.id = `ts_${timestamp.toString()}`;
               
                let temp = parseInt(element.temperature);
                div.textContent = temp.toString().concat('\u00B0');
                div.title = element.summary;

                //to show the time
                let span = document.createElement('span');
                let timmy = new Date(timestamp * 1000);
                span.textContent = timmy.getHours().toString().concat(":00");
                div.appendChild(span);
                df.appendChild(div);
            });
            container.appendChild(df);

            //calculating the precipiattion

            json.hourly.data.filter((element) => {
                if (element.precipProbability > 0.5) {
                    return true;
                }

                return false;

            }).map((element) => {
                return element.time;
            }).forEach((timestamp) => {
               // console.log(timestamp)
                //debugger;
                let id = 'ts_'.concat(timestamp);
                //    console.log( document.getElementById(id));
                document.getElementById(id.toString()).classList.add('precip');
            });

    
            let highObj = json.hourly.data.reduce((accumulator, hour)=>{
                if(hour.temperature > accumulator.temp){
                    return {temp: hour.temperature, time: hour.time};
                }else{
                    return accumulator;
                }
            }, {temp:-100, time:1000})
            let id = 'ts_' + highObj.time;
            document.getElementById(id).classList.add('hot');

         

        })

       // })
    
        .catch((err) => {
            console.log(err.message);
        })
});