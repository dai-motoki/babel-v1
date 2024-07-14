import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale);

const SecurityMonitor = () => {
  const canvasRef = useRef(null);
  const [explanation, setExplanation] = useState('');
  const [attackLog, setAttackLog] = useState([]);
  const [developmentData, setDevelopmentData] = useState([]);
  const [errorData, setErrorData] = useState([]);
  const [attackData, setAttackData] = useState([]);
  const [comment, setComment] = useState('');
  const [effects, setEffects] = useState([]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;

    class Particle {
      constructor(x, y, classId, parentCell) {
        this.x = x;
        this.y = y;
        this.classId = classId;
        this.parentCell = parentCell;
        this.radius = 3;
        this.color = '#808080';
        this.isInfected = false;
        this.infectionTime = 0;
        this.glowRadius = 0;
        this.glowOpacity = 0;
        this.isUnderDevelopment = false;
        this.developmentStartTime = 0;
        this.isUnderEvent = false;
        this.eventStartTime = 0;
        this.eventType = null;
      }

      update() {
        if (this.isInfected) {
          const elapsedTime = Date.now() - this.infectionTime;
          if (elapsedTime > 5000) {
            this.isInfected = false;
            this.color = '#808080';
            this.glowRadius = 0;
            this.glowOpacity = 0;
            this.radius = 11;
          } else {
            const infectionProgress = elapsedTime / 5000;
            this.color = `rgb(${Math.floor(128 + infectionProgress * 127)}, 0, 0)`;
            this.glowRadius = 15 * infectionProgress;
            this.glowOpacity = 0.5 * (1 - infectionProgress);
            this.radius = 10;
          }
        }

        if (this.isUnderDevelopment) {
          const elapsedTime = Date.now() - this.developmentStartTime;
          if (elapsedTime > 10000) {
            this.isUnderDevelopment = false;
            this.color = '#808080';
            this.radius = 3;
          } else {
            const developmentProgress = elapsedTime / 10000;
            this.color = `rgb(0, 0, ${Math.floor(128 + developmentProgress * 127)})`;
            this.radius = 10;
          }
        }

        if (this.isUnderEvent) {
          const elapsedTime = Date.now() - this.eventStartTime;
          if (elapsedTime > 2000) {
            this.isUnderEvent = false;
            this.eventType = null;
            this.radius = 9;
          } else {
            if (this.eventType === 'error') {
              this.color = 'orange'; // エラー発生時はおれんじ
            }
            this.radius = 12;
          }
        }

        this.x += (Math.random() - 0.5) * 0.5;
        this.y += (Math.random() - 0.5) * 0.5;
        const dx = this.x - this.parentCell.x;
        const dy = this.y - this.parentCell.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > this.parentCell.radius) {
          this.x = this.parentCell.x + (dx / distance) * this.parentCell.radius;
          this.y = this.parentCell.y + (dy / distance) * this.parentCell.radius;
        }
      }

      draw() {
        if (this.isInfected || this.isUnderDevelopment || this.isUnderEvent) {
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glowRadius);
          let glowColor;
          if (this.isInfected) {
            glowColor = 'rgba(255, 0, 0, ';
          } else if (this.isUnderDevelopment) {
            glowColor = 'rgba(0, 255, 0, ';
          } else if (this.isUnderEvent) {
            switch (this.eventType) {
              case 'attack':
                glowColor = 'rgba(255, 0, 0, ';
                break;
              case 'error':
                glowColor = 'rgba(255, 165, 0, ';
                break;
              case 'development':
                glowColor = 'rgba(0, 255, 0, ';
                break;
              default:
                glowColor = 'rgba(0, 0, 255, ';
            }
          }
          gradient.addColorStop(0, glowColor + `${this.glowOpacity})`);
          gradient.addColorStop(1, glowColor + '0)');
          ctx.fillStyle = gradient;
          ctx.arc(this.x, this.y, this.glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      infect() {
        this.isInfected = true;
        this.infectionTime = Date.now();
        this.isUnderDevelopment = false;
        this.startEvent('infection');
        setComment(`${this.parentCell.className}の粒子が感染しました！`);
        setEffects(prevEffects => [...prevEffects, { x: this.x, y: this.y, type: 'infection', startTime: Date.now() }]);
      }

      startDevelopment() {
        this.isUnderDevelopment = true;
        this.developmentStartTime = Date.now();
        this.isInfected = false;
        this.startEvent('development');
        setComment(`${this.parentCell.className}の粒子が開発中です！`);
        setEffects(prevEffects => [...prevEffects, { x: this.x, y: this.y, type: 'development', startTime: Date.now() }]);
      }

      startEvent(eventType) {
        this.isUnderEvent = true;
        this.eventStartTime = Date.now();
        this.eventType = eventType;
        this.glowRadius = 10;
        this.glowOpacity = 0.5;
      }
    }

    class CellMembrane {
      constructor(x, y, radius, particleCount, className, description) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.className = className;
        this.description = description;
        this.particles = [];
        this.isUnderAttack = false;
        this.attackStartTime = 0;
        this.attackCount = 0;
        this.glowRadius = 0;
        this.glowOpacity = 0;

        for (let i = 0; i < particleCount; i++) {
          const theta = Math.random() * Math.PI * 2;
          const r = Math.random() * radius;
          const px = this.x + r * Math.cos(theta);
          const py = this.y + r * Math.sin(theta);
          this.particles.push(new Particle(px, py, i, this));
        }
      }

      update() {
        this.particles.forEach(particle => particle.update());

        if (this.isUnderAttack) {
          const elapsedTime = Date.now() - this.attackStartTime;
          if (elapsedTime > 1000) {
            this.isUnderAttack = false;
            this.glowRadius = 0;
            this.glowOpacity = 0;
          } else {
            const attackProgress = elapsedTime / 1000;
            this.glowRadius = 20 * (1 - attackProgress);
            this.glowOpacity = 0.5 * (1 - attackProgress);
          }
        }
      }

      draw() {
        if (this.isUnderAttack) {
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, this.radius + this.glowRadius);
          gradient.addColorStop(0, `rgba(255, 0, 0, ${this.glowOpacity})`);
          gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.arc(this.x, this.y, this.radius + this.glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.isUnderAttack ? 'red' : '#808080';
        ctx.lineWidth = this.isUnderAttack ? 3 : 1;
        ctx.stroke();

        this.particles.forEach(particle => particle.draw());

        for (let i = 0; i < this.particles.length; i++) {
          for (let j = i + 1; j < this.particles.length; j++) {
            const dx = this.particles[i].x - this.particles[j].x;
            const dy = this.particles[i].y - this.particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 20) {
              ctx.beginPath();
              ctx.moveTo(this.particles[i].x, this.particles[i].y);
              ctx.lineTo(this.particles[j].x, this.particles[j].y);
              ctx.strokeStyle = `rgba(128, 128, 128, ${1 - distance / 20})`;
              ctx.stroke();
            }
          }
        }

        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.description, this.x, this.y);
      }

      removeParticles(count) {
        return this.particles.splice(0, count).length;
      }

      attack() {
        this.isUnderAttack = true;
        this.attackStartTime = Date.now();
        const removedCount = this.removeParticles(1);
        this.attackCount++;
        
        if (removedCount > 0 && this.particles.length > 0) {
          const randomIndex = Math.floor(Math.random() * this.particles.length);
          this.particles[randomIndex].infect();
        }

        setAttackLog(prevLog => [...prevLog, `${this.className}が攻撃を受けました。攻撃回数: ${this.attackCount}`]);
        setAttackData(prevData => [...prevData, { x: new Date(), y: this.attackCount }]);
        setComment(`${this.className}が攻撃を受けました！`);
        setEffects(prevEffects => [...prevEffects, { x: this.x, y: this.y, type: 'attack', startTime: Date.now() }]);
      }

      triggerError() {
        const randomIndex = Math.floor(Math.random() * this.particles.length);
        this.particles[randomIndex].startEvent('error');
        setEffects(prevEffects => [...prevEffects, { x: this.particles[randomIndex].x, y: this.particles[randomIndex].y, type: 'error', startTime: Date.now() }]);
        setComment(`${this.className}でエラーが発生しました！`);
      }

      startDevelopment() {
        const randomIndex = Math.floor(Math.random() * this.particles.length);
        this.particles[randomIndex].startDevelopment();
      }
    }

    const membranes = [
      new CellMembrane(width / 2, height / 2, 100, 50, 'メインシステム', 'システム全体の制御'),
      new CellMembrane(width / 4, height / 4, 50, 25, 'データベース', 'データの保存と管理'),
      new CellMembrane(3 * width / 4, height / 4, 50, 25, 'ユーザー認証', '認証と権限管理'),
      new CellMembrane(width / 4, 3 * height / 4, 50, 25, 'ログ管理', 'システムログの記録'),
      new CellMembrane(3 * width / 4, 3 * height / 4, 50, 25, 'ファイアウォール', '不正アクセスの防御'),
    ];

    function drawEffect(effect) {
      const elapsedTime = Date.now() - effect.startTime;
      const maxRadius = 30;
      const duration = 2000;
      
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration;
        const radius = maxRadius * Math.sin(progress * Math.PI);
        const alpha = 1 - progress;
        
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(effect.x, effect.y, 0, effect.x, effect.y, radius);
        const color = effect.type === 'attack' ? 'rgba(255, 0, 0, ' :
                      effect.type === 'error' ? 'rgba(255, 165, 0, ' :
                      effect.type === 'development' ? 'rgba(0, 255, 0, ' :
                      'rgba(0, 0, 255, ';
        gradient.addColorStop(0, color + `${alpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = color + `${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(effect.type.toUpperCase(), effect.x, effect.y);
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      membranes.forEach(membrane => {
        membrane.update();
        membrane.draw();
      });
      effects.forEach(drawEffect);
      
      setEffects(prevEffects => prevEffects.filter(effect => Date.now() - effect.startTime < 2000));
      
      requestAnimationFrame(animate);
    }

    animate();

    setInterval(() => {
      setDevelopmentData(prevData => {
        const developmentProgress = Math.random() * 100;
        const randomMembrane = membranes[Math.floor(Math.random() * membranes.length)];
        randomMembrane.startDevelopment();
        return [...prevData, { x: new Date(), y: developmentProgress }];
      });
      setErrorData(prevData => {
        const errorCount = Math.floor(Math.random() * 10);
        if (errorCount > 3) {
          const randomMembrane = membranes[Math.floor(Math.random() * membranes.length)];
          randomMembrane.triggerError();
          setComment(`エラーが発生しています！エラー数: ${errorCount}`);
        }
        return [...prevData, { x: new Date(), y: errorCount }];
      });
      if (Math.random() < 0.3) {
        const randomIndex = Math.floor(Math.random() * membranes.length);
        membranes[randomIndex].attack();
      }
    }, 3000);

    canvasRef.current.addEventListener('click', (event) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      membranes.forEach(membrane => {
        membrane.particles.forEach(particle => {
          const dx = particle.x - x;
          const dy = particle.y - y;
          if (Math.sqrt(dx * dx + dy * dy) < particle.radius) {
            setExplanation(`クラスID: ${particle.classId}, 所属: ${particle.parentCell.className}, 機能: ${particle.parentCell.description}`);
            setEffects(prevEffects => [...prevEffects, { x: particle.x, y: particle.y, type: 'click', startTime: Date.now() }]);
          }
        });
      });
    });

  }, []);

  const developmentChartData = {
    datasets: [{
      label: '開発進捗',
      data: developmentData,
      backgroundColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const errorChartData = {
    datasets: [{
      label: 'エラー数',
      data: errorData,
      backgroundColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }]
  };

  const attackChartData = {
    datasets: [{
      label: '攻撃回数',
      data: attackData,
      backgroundColor: 'rgb(255, 159, 64)',
      tension: 0.1
    }]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'second'
        },
        min: () => Date.now() - 60 * 1000,
        max: () => Date.now()
      },
      y: {
        beginAtZero: true
      }
    },
    animation: {
      duration: 0
    },
    barPercentage: 1.0,
    categoryPercentage: 1.0,
  };

  const generateSampleData = () => {
    const now = Date.now();
    const sampleData = [];
    for (let i = 0; i < 60; i++) {
      sampleData.push({
        x: now - (60 - i) * 1000,
        y: Math.floor(Math.random() * 100)
      });
    }
    return sampleData;
  };

  useEffect(() => {
    setDevelopmentData(generateSampleData());
    setErrorData(generateSampleData().map(item => ({ ...item, y: Math.floor(item.y / 10) })));
    setAttackData(generateSampleData().map(item => ({ ...item, y: Math.floor(item.y / 20) })));

    const updateInterval = setInterval(() => {
      const now = Date.now();
      setDevelopmentData(prevData => [
        ...prevData.slice(1),
        { x: now, y: Math.floor(Math.random() * 100) }
      ]);
      setErrorData(prevData => [
        ...prevData.slice(1),
        { x: now, y: Math.floor(Math.random() * 10) }
      ]);
      setAttackData(prevData => [
        ...prevData.slice(1),
        { x: now, y: Math.floor(Math.random() * 5) }
      ]);
      
      // エフェクトの追加（確率を調整）
      if (Math.random() < 0.3) {
        setEffects(prevEffects => [
          ...prevEffects,
          { 
            x: Math.random() * canvasRef.current.width, 
            y: Math.random() * canvasRef.current.height, 
            type: ['development', 'error', 'attack'][Math.floor(Math.random() * 3)], 
            startTime: now 
          }
        ]);
      }
    }, 1000);

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <canvas ref={canvasRef} width={800} height={400} style={{ border: '1px solid black', position: 'relative', zIndex: 1 }} />
      {explanation && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          maxWidth: '80%',
          textAlign: 'center',
          zIndex: 0
        }}>
          {explanation}
        </div>
      )}
      {comment && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(255, 0, 0, 0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          maxWidth: '80%',
          textAlign: 'center',
          zIndex: 0
        }}>
          {comment}
        </div>
      )}
      <div style={{
        position: 'absolute',
        top: '420px',
        left: '0',
        width: '100%',
        height: 'calc(100% - 420px)',
        backgroundColor: '#f0f0f0',
        padding: '20px',
        overflowY: 'scroll',
        zIndex: 0
      }}>
        <h3>リアルタイムモニタ</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '30%' }}>
            <h4>開発状況</h4>
            <Bar options={chartOptions} data={developmentChartData} />
          </div>
          <div style={{ width: '30%' }}>
            <h4>エラー状況</h4>
            <Bar options={chartOptions} data={errorChartData} />
          </div>
          <div style={{ width: '30%' }}>
            <h4>攻撃情報</h4>
            <Bar options={chartOptions} data={attackChartData} />
          </div>
        </div>
        <h3>攻撃ログ</h3>
        {attackLog.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
};

export default SecurityMonitor;





