// app/portfolio/page.js (or pages/portfolio.js)
const Portfolio = () => {
    // This would typically be fetched from your backend or a state management solution
    const portfolioItems = [
      { id: 1, name: 'Bitcoin', amount: 0.5 },
      { id: 2, name: 'Ethereum', amount: 2 },
    ];
  
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-300 p-6">
        <h1 className="text-4xl font-bold text-white mb-4">My Portfolio</h1>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <ul>
            {portfolioItems.map((item) => (
              <li key={item.id} className="flex justify-between py-2 border-b border-gray-300">
                <span>{item.name}</span>
                <span>{item.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default Portfolio;
  