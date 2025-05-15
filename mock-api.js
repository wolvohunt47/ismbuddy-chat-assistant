// Simple Express server to mock the vector search API
import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 8000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Mock data for vector search responses
const mockData = {
  admission: {
    heading: 'Admission Process',
    content: 'IIT ISM Dhanbad offers admission to various undergraduate and postgraduate programs through national level entrance examinations. For B.Tech programs, admissions are through JEE Advanced. For M.Tech programs, admissions are through GATE scores.',
    doc_title: 'Admissions',
    similarity: 0.92
  },
  courses: {
    heading: 'Academic Programs',
    content: 'IIT ISM Dhanbad offers a wide range of undergraduate, postgraduate, and doctoral programs across various engineering disciplines, sciences, management, and humanities.',
    doc_title: 'Academics',
    similarity: 0.89
  },
  faculty: {
    heading: 'Faculty Members',
    content: 'IIT ISM Dhanbad has a distinguished faculty with expertise in various fields. Many faculty members are renowned researchers with publications in prestigious international journals.',
    doc_title: 'Faculty',
    similarity: 0.85
  },
  hostel: {
    heading: 'Hostel Accommodation',
    content: 'IIT ISM Dhanbad provides hostel facilities for all students. There are separate hostels for boys and girls with modern amenities including Wi-Fi, recreation rooms, and dining facilities.',
    doc_title: 'Campus Life',
    similarity: 0.88
  },
  default: {
    heading: 'About IIT ISM Dhanbad',
    content: 'IIT ISM Dhanbad is one of the premier technical institutes in India. It was established as ISM in 1926 and was converted to an IIT in 2016. The institute is known for its excellence in teaching, research, and industry collaboration.',
    doc_title: 'About Us',
    similarity: 0.75
  }
};

// Search endpoint
app.post('/search', (req, res) => {
  const { query, top_k = 5 } = req.body;
  console.log(`Received search query: ${query}`);
  
  // Determine which mock data to return based on keywords in the query
  let results = [];
  
  if (query.toLowerCase().includes('admission')) {
    results.push({ section_id: 1, ...mockData.admission });
  } else if (query.toLowerCase().includes('course') || query.toLowerCase().includes('program')) {
    results.push({ section_id: 2, ...mockData.courses });
  } else if (query.toLowerCase().includes('faculty') || query.toLowerCase().includes('professor')) {
    results.push({ section_id: 3, ...mockData.faculty });
  } else if (query.toLowerCase().includes('hostel') || query.toLowerCase().includes('accommodation')) {
    results.push({ section_id: 4, ...mockData.hostel });
  } else {
    results.push({ section_id: 5, ...mockData.default });
  }
  
  // Add some additional results with lower similarity scores
  if (results.length > 0 && top_k > 1) {
    results.push({ 
      section_id: 6, 
      heading: 'Additional Information',
      content: 'For more details, please visit the official IIT ISM Dhanbad website or contact the respective departments.',
      doc_title: 'Contact Us',
      similarity: 0.65
    });
  }
  
  res.json({
    results: results.slice(0, top_k),
    query
  });
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Mock API server for ISM Buddy is running!');
});

app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
});