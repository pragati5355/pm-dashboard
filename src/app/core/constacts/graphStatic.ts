export const GraphStaticData = {
    PIE_CHART:
    [{
        type: "pie",
        values: [1, 3, 8, 4],
        labels: ["Wages", "Operating expenses", "Cost of sales", "Insurance"],
        // textinfo: "label+percent",
        hoverinfo: 'label+percent+name',
        textinfo: 'none',
        insidetextorientation: "radial",
        hole: .7,
        // textinfo: 'none'
      }] 
    //   [{
    //     values: [16, 15, 12, 6, 5, 4, 42],
    //     labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
    //     domain: {
    //         row: 7,
    //         column: 1
    //       },
    //     name: 'GHG Emissions',
    //     // hoverinfo: 'label+percent+name',
    //     hole: .7,
    //     type: "pie",
    //     hoverinfo: 'label+percent+name',
    //     textinfo: 'none'
    //   }],

  };
  
  
  export interface StaticInterface {
    [key: string]: string;
  }
  