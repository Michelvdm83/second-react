import { useRef, useEffect } from "react";

export default function WeatherChart({currentWeatherData}){
    const canvasRef = useRef(null);

    const fullCanvasWidth = 710;
    const fullCanvasHeight= 450;
    const indexSpaceLeft = 50;
    const indexSpaceBottom = 60;
    const startingPointChartBottom = fullCanvasHeight - indexSpaceBottom;
    const startingPointChartLeft = indexSpaceLeft;
    const maxTemp = 25;

    useEffect(() => {
        console.log("check");
        if(currentWeatherData == null) return;
        const weatherGraph = canvasRef.current;
        var ctx = weatherGraph.getContext("2d");

        const hours = currentWeatherData.hourly.time;
        const temps = currentWeatherData.hourly.temperature_2m;
        let tempMax = Math.max(...temps);
        let tempMin = Math.min(...temps);
        tempMax = tempMax > maxTemp? Math.ceil(tempMax/5)*5 : maxTemp;
        tempMin = tempMin < 0? Math.floor(tempMin/5)*5 : 0;

        ctx.clearRect(0, 0, fullCanvasWidth, fullCanvasHeight);
        ctx.beginPath();
        ctx.rect(startingPointChartLeft, 0, (fullCanvasWidth-indexSpaceLeft), (fullCanvasHeight - indexSpaceBottom));
        ctx.stroke();
    
        const stepX = new Number((fullCanvasWidth-indexSpaceLeft)/(hours.length-1));
        const tempToY = new Number((fullCanvasHeight - indexSpaceBottom)/(tempMax-tempMin));
    
        ctx.beginPath();
        ctx.textAlign = "end";
        ctx.textBaseline = "middle";
        ctx.font = "15px Arial";
        for(count = tempMin; count < tempMax; count+=5){
            ctx.fillText(count+"°C", indexSpaceLeft, (fullCanvasHeight - indexSpaceBottom) - ((count-tempMin) * tempToY))
        }
        ctx.stroke();
    
        ctx.save();
        ctx.beginPath();
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.rotate(-90 * Math.PI / 180);
        ctx.translate(-785, 0);
        for(hourStep = 0; hourStep < hours.length; hourStep++){
            let dateTime = new Date(hours[hourStep]);
            console.log(dateTime);
            let textToPrint = dateTime.getHours()==0? dateTime.toLocaleDateString("default", {month: 'short', day: '2-digit'}) : dateTime.toLocaleTimeString("default", {hour: `2-digit`, minute: `2-digit`});
            ctx.fillText(textToPrint, (fullCanvasHeight - indexSpaceBottom), (indexSpaceLeft + (hourStep*stepX)));
        }
        ctx.stroke();
        ctx.restore();
    
        ctx.beginPath();
        for(i = 0; i < hours.length; i++){
            let row = weatherTable.insertRow(-1);
            const thisDateTime = new Date(hours[i]);
            row.insertCell().innerText = thisDateTime.toLocaleString();
            row.insertCell().innerText = temps[i];
    
            const currentX = new Number(indexSpaceLeft + (i * stepX));
            const currentY = new Number((fullCanvasHeight - indexSpaceBottom) - (temps[i] * tempToY));
            if(i == 0){    
                ctx.moveTo(currentX,currentY);
            } else {
                ctx.lineTo(currentX, currentY);
            }
        }
        ctx.stroke();
    }, [currentWeatherData]);

    
    return (
        <canvas ref={canvasRef} width={710} height={450}/>
    );
}