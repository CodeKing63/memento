
// Combine and shuffle two arrays
const shuffle = () => {
    const assets = [
      { image: '/images/MSeries.png' },
      { image: '/images/CSeries.png' },
      { image: '/images/GSeries.png'},
      { image: '/images/SSeries.png' },
      { image: '/assets/next.png' },
      { image: '/assets/node.png' },
      { image: '/assets/react.png'},
      { image: '/assets/ts.png' },
    ];
    return [...assets, ...assets]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
  };
  
  export default shuffle;