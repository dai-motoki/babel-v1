import React, { useState, useEffect } from 'react';
import { ScrollText, Calendar, Info, ChevronRight, ChevronLeft } from 'lucide-react';

const HistoricalArchive = () => {
  const [currentEra, setCurrentEra] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eras = [
    { name: '奈良時代', year: '710-794', events: [
      { title: '唐菓子の伝来', year: '710', description: '遣唐使により中国から唐菓子が日本に伝来しました。' },
      { title: '奈良の大仏開眼供養', year: '752', description: '東大寺の大仏開眼供養で、唐菓子が振る舞われました。' },
    ]},
    { name: '平安時代', year: '794-1185', events: [
      { title: '餅菓子の発展', year: '900頃', description: '餅を使った和菓子が発展し、宮中行事で使用されるようになりました。' },
      { title: '源氏物語に和菓子の記述', year: '1008頃', description: '源氏物語に和菓子の記述が登場し、貴族文化の一部となっていたことがわかります。' },
    ]},
    { name: '鎌倉時代', year: '1185-1333', events: [
      { title: '茶の湯の普及', year: '1200頃', description: '茶の湯の普及とともに、茶菓子としての和菓子が発展しました。' },
      { title: '羊羹の誕生', year: '1300頃', description: '寒天を使用した羊羹が誕生し、保存性の高い和菓子として人気を博しました。' },
    ]},
    { name: '室町時代', year: '1336-1573', events: [
      { title: '茶道の確立', year: '1400頃', description: '茶道の確立により、茶菓子としての和菓子の役割がさらに重要になりました。' },
      { title: '菓子屋の出現', year: '1500頃', description: '専門の菓子屋が出現し、和菓子の商業化が進みました。' },
    ]},
    { name: '江戸時代', year: '1603-1868', events: [
      { title: '砂糖の普及', year: '1650頃', description: '砂糖の普及により、和菓子の種類が大幅に増加しました。' },
      { title: '落雁の発明', year: '1700頃', description: '木型を使用した落雁が発明され、芸術性の高い和菓子が誕生しました。' },
      { title: '菓子文化の全国展開', year: '1800頃', description: '各地の名物菓子が生まれ、和菓子文化が全国に広まりました。' },
    ]},
    { name: '明治時代以降', year: '1868-現在', events: [
      { title: '洋菓子の影響', year: '1870頃', description: '西洋菓子の影響を受け、新しい和菓子が誕生しました。' },
      { title: '和菓子の工業化', year: '1920頃', description: '和菓子の製造が工業化され、大量生産が可能になりました。' },
      { title: '和菓子の海外進出', year: '2000頃', description: '和菓子が海外で注目され、日本文化の一つとして世界に広まっています。' },
    ]},
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEra((prevEra) => (prevEra + 1) % eras.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevEra = () => {
    setCurrentEra((prevEra) => (prevEra - 1 + eras.length) % eras.length);
  };

  const handleNextEra = () => {
    setCurrentEra((prevEra) => (prevEra + 1) % eras.length);
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8 text-center font-serif">和菓子の歴史アーカイブ</h1>
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <button onClick={handlePrevEra} className="text-[#006400] hover:text-[#007500] transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-2xl font-bold text-[#4A2311] font-serif">{eras[currentEra].name}</h2>
          <button onClick={handleNextEra} className="text-[#006400] hover:text-[#007500] transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>
        <p className="text-lg text-[#4A2311] mb-4 text-center">{eras[currentEra].year}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {eras[currentEra].events.map((event, index) => (
            <div
              key={index}
              className="bg-[#F3EAD3] rounded-lg p-4 cursor-pointer hover:bg-[#FFB7C5] transition-colors"
              onClick={() => setSelectedEvent(event)}
            >
              <h3 className="text-lg font-bold text-[#4A2311] mb-2">{event.title}</h3>
              <p className="text-[#4A2311]">{event.year}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-[#4A2311] mb-4 font-serif">{selectedEvent.title}</h3>
          <p className="text-lg text-[#4A2311] mb-4">{selectedEvent.year}</p>
          <p className="text-[#4A2311]">{selectedEvent.description}</p>
        </div>
      )}

      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-bold text-[#4A2311] mb-4 font-serif">和菓子の歴史を探る</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
            <ScrollText size={48} className="text-[#006400] mb-2" />
            <h3 className="text-lg font-bold text-[#4A2311] mb-2">文献調査</h3>
            <p className="text-[#4A2311] text-center">古文書や料理書から和菓子の歴史を紐解きます。</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
            <Calendar size={48} className="text-[#006400] mb-2" />
            <h3 className="text-lg font-bold text-[#4A2311] mb-2">年表作成</h3>
            <p className="text-[#4A2311] text-center">和菓子の発展を時系列で整理し、変遷を追います。</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
            <Info size={48} className="text-[#006400] mb-2" />
            <h3 className="text-lg font-bold text-[#4A2311] mb-2">文化的背景</h3>
            <p className="text-[#4A2311] text-center">各時代の文化や社会背景と和菓子の関係を探ります。</p>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-[#4A2311]">
        <p>© 2023 和菓子歴史アーカイブ. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HistoricalArchive;