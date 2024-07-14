import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowRight, ArrowLeft, RefreshCw, Maximize2, Minimize2, Users } from 'lucide-react';

const ConveyorBeltOptimization = () => {
  const [currentSpeed, setCurrentSpeed] = useState(20);
  const [optimalSpeed, setOptimalSpeed] = useState(25);
  const [efficiency, setEfficiency] = useState(80);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const conveyorRef = useRef(null);
  const [customerConsumptionRate, setCustomerConsumptionRate] = useState(18);

  const speedData = [
    { time: '10:00', current: 18, optimal: 22, consumption: 16 },
    { time: '11:00', current: 20, optimal: 24, consumption: 18 },
    { time: '12:00', current: 22, optimal: 26, consumption: 20 },
    { time: '13:00', current: 24, optimal: 28, consumption: 22 },
    { time: '14:00', current: 26, optimal: 30, consumption: 24 },
    { time: '15:00', current: 24, optimal: 28, consumption: 22 },
    { time: '16:00', current: 22, optimal: 26, consumption: 20 },
    { time: '17:00', current: 20, optimal: 24, consumption: 18 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpeed(prevSpeed => {
        const newSpeed = prevSpeed + (Math.random() - 0.5) * 2;
        return Math.max(15, Math.min(30, newSpeed));
      });
      setOptimalSpeed(prevSpeed => {
        const newSpeed = prevSpeed + (Math.random() - 0.5) * 2;
        return Math.max(20, Math.min(35, newSpeed));
      });
      setCustomerConsumptionRate(prevRate => {
        const newRate = prevRate + (Math.random() - 0.5) * 2;
        return Math.max(14, Math.min(28, newRate));
      });
      setEfficiency(prevEfficiency => {
        const newEfficiency = (customerConsumptionRate / currentSpeed) * 100;
        return Math.max(70, Math.min(95, newEfficiency));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSpeed, customerConsumptionRate]);

  useEffect(() => {
    if (conveyorRef.current) {
      conveyorRef.current.style.animationDuration = `${60 / currentSpeed}s`;
    }
  }, [currentSpeed]);

  const handleSpeedChange = (direction) => {
    setCurrentSpeed(prevSpeed => {
      const newSpeed = direction === 'increase' ? prevSpeed + 1 : prevSpeed - 1;
      return Math.max(15, Math.min(30, newSpeed));
    });
  };

  const handleOptimize = () => {
    setCurrentSpeed(optimalSpeed);
    setAnimationKey(prevKey => prevKey + 1);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="bg-indigo-50 p-6 rounded-lg shadow-lg max-w-6xl mx-auto my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-900">回転レーン最適化</h2>
        <button
          onClick={toggleFullscreen}
          className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors duration-300"
        >
          {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-indigo-800">現在の回転速度</h3>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => handleSpeedChange('decrease')}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="text-4xl font-bold text-indigo-600">{currentSpeed.toFixed(1)}</div>
            <button
              onClick={() => handleSpeedChange('increase')}
              className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-300"
            >
              <ArrowRight size={24} />
            </button>
          </div>
          <p className="text-center mt-2 text-gray-600">皿/分</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-indigo-800">最適回転速度</h3>
          <div className="flex items-center justify-center">
            <div className="text-4xl font-bold text-green-600">{optimalSpeed.toFixed(1)}</div>
          </div>
          <p className="text-center mt-2 text-gray-600">皿/分</p>
          <button
            onClick={handleOptimize}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center justify-center w-full hover:bg-indigo-700 transition-colors duration-300"
          >
            <RefreshCw size={20} className="mr-2" />
            最適化する
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-indigo-800">お客様の消費速度</h3>
          <div className="flex items-center justify-center">
            <Users size={24} className="mr-2 text-indigo-600" />
            <div className="text-4xl font-bold text-indigo-600">{customerConsumptionRate.toFixed(1)}</div>
          </div>
          <p className="text-center mt-2 text-gray-600">皿/分</p>
        </div>
      </div>

      {/* <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-indigo-800">効率性</h3>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                現在の効率
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-indigo-600">
                {efficiency.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <div
              style={{ width: `${efficiency}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-indigo-800">速度比較グラフ</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={speedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="current"
              stroke="#4F46E5"
              activeDot={{ r: 8 }}
              name="現在の速度"
            />
            <Line
              type="monotone"
              dataKey="optimal"
              stroke="#10B981"
              activeDot={{ r: 8 }}
              name="最適速度"
            />
            <Line
              type="monotone"
              dataKey="consumption"
              stroke="#F59E0B"
              activeDot={{ r: 8 }}
              name="お客様の消費速度"
            />
          </LineChart>
        </ResponsiveContainer>
      </div> */}

      <div
        key={animationKey}
        className="mt-8 bg-white p-6 rounded-lg shadow-md overflow-hidden"
      >
        <h3 className="text-xl font-semibold mb-4 text-indigo-800">回転レーンシミュレーション</h3>
        <div className="relative h-64 w-64 mx-auto">
          <div className="absolute inset-0 rounded-full border-8 border-gray-300"></div>
          <div
            ref={conveyorRef}
            className="absolute inset-0"
            style={{ animation: `spin ${60 / currentSpeed}s linear infinite` }}
          >
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="absolute w-16 h-16 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${index * 45}deg) translateY(-88px)`,
                }}
              >
                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center">
                  <span className="text-3xl">🍣</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConveyorBeltOptimization;
