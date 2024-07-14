import React, { useState, useEffect } from 'react';
import { Scroll, Calendar, Book, Search } from 'lucide-react';

const HistoricalArchive = () => {
  const [selectedEra, setSelectedEra] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  const historicalEvents = [
    { id: 1, era: '平安', year: 794, event: '平安時代始まり、宮中で菓子文化が発展' },
    { id: 2, era: '鎌倉', year: 1192, event: '鎌倉時代、抹茶と共に茶菓子が普及' },
    { id: 3, era: '室町', year: 1338, event: '室町時代、茶の湯の発展と共に和菓子が進化' },
    { id: 4, era: '安土桃山', year: 1573, event: '安土桃山時代、南蛮菓子の影響を受ける' },
    { id: 5, era: '江戸', year: 1603, event: '江戸時代、各地で独自の和菓子文化が発展' },
    { id: 6, era: '明治', year: 1868, event: '明治時代、西洋菓子の技術が和菓子に影響' },
    { id: 7, era: '大正', year: 1912, event: '大正時代、和洋折衷の新しい和菓子が誕生' },
    { id: 8, era: '昭和', year: 1926, event: '昭和時代、和菓子の大量生産が始まる' },
    { id: 9, era: '平成', year: 1989, event: '平成時代、伝統と革新の融合が進む' },
    { id: 10, era: '令和', year: 2019, event: '令和時代、世界に和菓子文化が広がる' },
  ];

  useEffect(() => {
    filterEvents();
  }, [selectedEra, searchTerm]);

  const filterEvents = () => {
    let filtered = historicalEvents;
    if (selectedEra !== 'all') {
      filtered = filtered.filter(event => event.era === selectedEra);
    }
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.year.toString().includes(searchTerm)
      );
    }
    setFilteredEvents(filtered);
  };

  const handleEraChange = (era) => {
    setSelectedEra(era);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-cream-100 min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">和菓子の歴史アーカイブ</h1>
      
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => handleEraChange('all')}
          className={`px-4 py-2 rounded-full ${
            selectedEra === 'all' ? 'bg-green-800 text-white' : 'bg-white text-green-800'
          } border border-green-800 hover:bg-green-700 hover:text-white transition duration-300`}
        >
          全て
        </button>
        {['平安', '鎌倉', '室町', '安土桃山', '江戸', '明治', '大正', '昭和', '平成', '令和'].map(era => (
          <button
            key={era}
            onClick={() => handleEraChange(era)}
            className={`px-4 py-2 rounded-full ${
              selectedEra === era ? 'bg-green-800 text-white' : 'bg-white text-green-800'
            } border border-green-800 hover:bg-green-700 hover:text-white transition duration-300`}
          >
            {era}時代
          </button>
        ))}
      </div>

      <div className="mb-8 flex justify-center">
        <div className="relative">
          <input
            type="text"
            placeholder="検索..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 border border-green-800 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-green-800" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white p-6 rounded-lg shadow-md border border-green-200 hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-4">
              <Calendar className="text-green-800 mr-2" size={24} />
              <span className="text-xl font-semibold text-green-800">{event.year}年</span>
            </div>
            <div className="flex items-center mb-4">
              <Book className="text-green-800 mr-2" size={24} />
              <span className="text-lg font-medium text-green-700">{event.era}時代</span>
            </div>
            <p className="text-gray-700 leading-relaxed">{event.event}</p>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center text-gray-600 mt-8">
          <Scroll className="inline-block mb-2 text-green-800" size={48} />
          <p>該当する歴史イベントが見つかりません。</p>
        </div>
      )}

      <footer className="mt-16 text-center text-gray-600">
        <p>© 2023 和菓子歴史アーカイブ. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HistoricalArchive;