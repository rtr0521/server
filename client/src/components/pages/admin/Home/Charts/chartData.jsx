export const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: "User 1",
            data: [411, 510, 300, 11, 200, 111, 600],
            borderColor: "rgb(75, 192, 192)",
        },
        {
          label: "User 2",
          data: [223, 111, 444, 22, 115, 312, 411],
          borderColor: "rgb(175, 92, 152)",
      },
      {
        label: "User 3",
        data: [31, 255, 113, 92, 777, 542, 321],
        borderColor: "rgb(5, 92, 92)",
    },
        
    ],
};
export const barChartData = {
    labels: ['Rent', 'Groceries', 'Utilities', 'Entertainment', 'Transportation'],
    datasets: [
        {
            label: "Brigada",
            data: [223, 111, 444, 22, 115, 312, 411],
            backgroundColor: ["rgba(255,99,132,0.2"],
            borderColor: ["rgb(75, 192, 192)"],
            borderWidth: 1
        },{
          label: "Brigada",
          data: [31, 255, 113, 92, 777, 542, 321],
          backgroundColor: ["rgba(255,99,132,0.2"],
          borderColor: ["rgb(75, 192, 192)"],
          borderWidth: 1
      },
        
    ],
};

export const pieChartData = {
  labels: ['User1', 'User2', 'User3', 'User4', 'User5'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [1200, 5000, 1500, 9000, 8000],
      backgroundColor: ["rgba(239,35,60,1","rgba(5,99,12,0.7","rgba(255,99,2,1"
        ,"rgba(215,19,13,0.8","rgba(155,99,12,0.5",
      ],
      hoverOffset: 4,
    },
    {
      label: 'Dataset 1',
      data: [1100, 300, 1500, 9000, 8000],
      backgroundColor: ["rgba(239,35,60,1","rgba(5,99,12,0.7","rgba(255,99,2,1"
        ,"rgba(215,19,13,0.8","rgba(155,99,12,0.5",
      ],
      hoverOffset: 4,
    },
    {
      label: 'Dataset 1',
      data: [1200, 5000, 1500, 9000, 8000],
      backgroundColor: ["rgba(239,35,60,1","rgba(5,99,12,0.7","rgba(255,99,2,1"
        ,"rgba(215,19,13,0.8","rgba(155,99,12,0.5",
      ],
      hoverOffset: 4,
    }
  ]
};