export const GraphStaticData = {
    PIE_CHART: [{
        values: [16, 15, 12, 6, 5, 4, 42],
        labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
        domain: {column: 0},
        name: 'GHG Emissions',
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
      }],

  };
  
  
  export interface StaticInterface {
    [key: string]: string;
  }
  