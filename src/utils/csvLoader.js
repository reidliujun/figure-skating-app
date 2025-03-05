import Papa from 'papaparse';

export const loadSkatingMoves = async () => {
  try {
    const response = await fetch('/data/csv/skating_moves.csv');
    const csvText = await response.text();
    
    const { data } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    });

    // Transform the flat CSV data into nested structure
    const categories = {};
    
    data.forEach(row => {
      if (!categories[row.category]) {
        categories[row.category] = {
          id: row.category,
          levels: {}
        };
      }
      
      if (!categories[row.category].levels[row.level]) {
        categories[row.category].levels[row.level] = {
          id: row.level,
          moves: []
        };
      }
      
      categories[row.category].levels[row.level].moves.push({
        id: row.move_id,
        name: row.name,
        description: row.description,
        detailedDescription: row.detailed_description,
        videoUrl: row.video_url
      });
    });

    return categories;
  } catch (error) {
    console.error('Error loading skating moves:', error);
    return null;
  }
};