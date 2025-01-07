import  React from 'react';
import iconMapping from '/src/Components/iconMapping';

const Dataone = [
    {
      title: "Income",
      amount: "$15,000",
      percentage: "+12%",
      icon: iconMapping.incomeIcon,  // Placeholder for an icon (you can use actual icon components here),
      gains: '$' + 458.91,
    },
    {
      title: "Savings",
      amount: "$5,000",
      percentage: "+5%",
      icon: iconMapping.savingsIcon,  // Placeholder for an icon
      gains: '$' + 458.91,
    },
    {
      title: "Expenses",
      amount: "$8,000",
      percentage: "-8%",
      icon: iconMapping.expenseIcon,  // Placeholder for an icon.
      gains: '$' + 458.91,
    },
    {
      title: "Balance",
      amount: "$7,000",
      percentage: "+10%",
      icon: iconMapping.balanceIcon,  // Placeholder for an icon
      gains: '$' + 458.91,
    }
  ];
  
  export default Dataone;
  