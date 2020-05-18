function buildGuage(wfreq) {
    d3.json("./data/samples.json").then((x) => {
        var wfreq = x.wfreq;
        var wfreqdata = wfreq.filter(x => x.id == wfreq)
        console.log(wfreqdata)
        var wfreqdata1 = wfreqdata[0]
        console.log(wfreqdata1)

    //  Build guage chart using the sample data

    var data2= {
        domain: { x: [0, 1], y: [0, 1] },
        text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
        value: wfreq,
        title: { text: "Belly Button Washing Frequency</b><br>Scrubs per Week"},
        type: "indicator",
        mode: "gauge+number"
    }
    
    var gaugelayout = {
        width: 600,
        height: 500,
        margin: {t: 0, b: 0}
    };

    Plotly.newPlot("gauge", data2, gaugelayout);
});
};
