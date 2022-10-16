import { Chart } from "frappe-charts";

const JSONQuery = {
  query: [
    {
      code: "Vuosi",
      selection: {
        filter: "item",
        values: [
          "2000",
          "2001",
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021"
        ]
      }
    },
    {
      code: "Alue",
      selection: {
        filter: "item",
        values: ["SSS"]
      }
    },
    {
      code: "Tiedot",
      selection: {
        filter: "item",
        values: ["vaesto"]
      }
    }
  ],
  response: {
    format: "json-stat2"
  }
};

const getData = async () => {
  const url =
    "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(JSONQuery)
  });
  const data = await res.json();
  return data;
};

async function editdata(valueCodes) {
  const url3 =
    "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";
  const newQuery = JSONQuery;
  newQuery.query[1].selection.values[0] = Object(valueCodes);
  console.log(newQuery);
  let res3 = await fetch(url3, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newQuery)
  });
  if (!res3.ok) {
    return;
  }
  let data3 = await res3.json();
  return data3;
}

const getData2 = async () => {
  const url2 =
    "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";
  const res2 = await fetch(url2, {
    method: "GET"
  });
  const data2 = await res2.json();
  return data2;
};

const chartData = async () => {
  const data = await getData();
  const labels = Object.values(data.dimension.Vuosi.category.label);
  const parties = Object.values(data.value);
  const chartData = {
    labels: labels,
    datasets: [{ name: "Data", values: parties }]
  };

  const chart = new Chart("#chart", {
    title: "Chart",
    data: chartData,
    type: "line",
    height: 450,
    colors: ["#eb5146"]
  });
};

chartData();

document.getElementById("submit-data").onclick = function () {
  const chartData2 = async () => {
    let nameMuni = document.getElementById("input-area").value;
    const data2 = await getData2();
    const codes = Object.values(data2.variables[1].values);
    const areaName = Object.values(data2.variables[1].valueTexts);
    for (let i = 0; i <= areaName.length; i++) {
      if (
        nameMuni.charAt(0).toUpperCase() + nameMuni.slice(1) ===
        areaName[i]
      ) {
        console.log(codes[i]);
        const chartData3 = async () => {
          console.log("hei");
          const data3 = await editdata(codes[i]);
          console.log(codes[i]);
          console.log("data3");
          console.log(data3);

          const labels = Object.values(data3.dimension.Vuosi.category.label);
          const parties = Object.values(data3.value);
          console.log(labels);
          console.log(parties);
          const chartData2 = {
            labels: labels,
            datasets: [{ name: "Data", values: parties }]
          };
          const chart = new Chart("#chart", {
            title: "ChartArea",
            data: chartData2,
            type: "line",
            height: 450,
            colors: ["#eb5146"]
          });
        };
        chartData3();
      }
    }
  };
  chartData2();
};
