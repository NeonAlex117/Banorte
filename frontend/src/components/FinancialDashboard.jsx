import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer,
  PieChart, Pie, Legend
} from "recharts";

// IMPORTACIÓN DE IMÁGENES
import miLogoBanorte from "../assets/logo.png";
import patronFondo from "../assets/patron.png";
import iconInspeccion from "../assets/inspeccion.png";
import iconSettings from "../assets/settings.png";
import iconHome from "../assets/Home.png";


const TABS = ["Mensual", "Trimestral", "Anual"];

const COLORS = {
  rojoBanorte: "#EB0029",
  grisBanorte: "#5B6670",
  grisOscuro: "#323E48",
  fondo: "#F4F7F8",
  blanco: "#FFFFFF",
  textoMigaja: "#7B868C",
  sombraSidebar: "rgba(0, 0, 0, 0.12)",
  grisFlechaMigaja: "#9E9E9E",
  fondoTituloSidebar: "#F8F9FA" 
};

const CustomBarLabel = ({ x, y, width, value }) => (
  <text x={x + width / 2} y={y - 8} fill={COLORS.grisBanorte} textAnchor="middle" fontSize={10} fontWeight="600">
    ${(value / 1000).toFixed(1)}k
  </text>
);

export default function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState("Mensual");
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/finanzas/${activeTab.toLowerCase()}`)
      .then((res) => {
        setBarData(res.data.barras);
        setPieData(res.data.pay);
      })
      .catch(() => {
        setBarData([
          { name: "Ene", value: 3200, color: COLORS.rojoBanorte },
          { name: "Feb", value: 5800, color:  "#2600fd" },
          { name: "Mar", value: 4500, color: "#eaf118" },
        ]);
        setPieData([
          { name: "Inversión", value: 35, color: COLORS.rojoBanorte },
          { name: "Snacks", value: 25, color: "#2600fd" },
          { name: "Ocio", value: 40, color: "#eaf118" },
        ]);
      });
  }, [activeTab]);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Roboto', sans-serif; background: ${COLORS.fondo}; overflow: hidden; height: 100vh; }
        .app-container { display: flex; flex-direction: column; height: 100vh; }
        .main-header {
          background-color: ${COLORS.rojoBanorte};
          background-image: url(${patronFondo}); 
          background-repeat: repeat;
          background-size: 150px;
          background-blend-mode: soft-light;
          height: 48px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          z-index: 100;
        }
        .header-logo img { height: 26px; filter: brightness(0) invert(1); }
        .content-layout { display: flex; flex: 1; overflow: hidden; }
        .sidebar {
          width: 220px;
          background: white;
          border-right: 1px solid #E0E0E0;
          z-index: 10;
          box-shadow: 4px 0 8px ${COLORS.sombraSidebar};
        }
        .sidebar-title-box {
          background: ${COLORS.fondoTituloSidebar};
          padding: 25px 20px;
          border-bottom: 1px solid #EEE;
          margin-bottom: 10px;
        }
        .sidebar-section-title {
          font-size: 20px;
          color: ${COLORS.grisOscuro};
          text-transform: uppercase;
          font-weight: 700;
          line-height: 1.1;
        }
        .nav-item {
          padding: 12px 20px;
          font-size: 13px;
          color: ${COLORS.grisBanorte};
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-item.active { 
          color: ${COLORS.rojoBanorte}; 
          font-weight: 700; 
          border-right: 4px solid ${COLORS.rojoBanorte}; 
          background: #FFF5F6; 
        }
        .nav-icon {
          width: 18px;
          height: 18px;
          object-fit: contain;
        }
        .main-view { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .breadcrumb-strip {
          background: #EAEFF1;
          padding: 8px 25px;
          border-bottom: 1px solid #D0DDE1;
        }
        .breadcrumb { 
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .breadcrumb-item { color: ${COLORS.grisBanorte}; }
        .breadcrumb-separator { color: ${COLORS.grisFlechaMigaja}; font-size: 10px; }
        .breadcrumb-current { color: ${COLORS.rojoBanorte}; font-weight: 500; }
        .main-content-area {
          flex: 1;
          padding: 15px 25px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          overflow: hidden;
        }
        .current-page { 
          font-size: 20px; 
          font-weight: 700; 
          color: ${COLORS.grisOscuro};
          text-align: left;
        }
        .tabs { display: flex; gap: 8px; }
        .tab-btn {
          border: 1px solid #D1D1D1;
          background: white;
          padding: 4px 12px;
          font-size: 11px;
          cursor: pointer;
          border-radius: 0px; 
          color: ${COLORS.grisBanorte};
        }
        .tab-btn.active { background: ${COLORS.rojoBanorte}; color: white; border-color: ${COLORS.rojoBanorte}; }
        .charts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; flex: 1; min-height: 0; }
        .card {
          background: white;
          padding: 18px;
          border-radius: 0px; 
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
          border-top: 3px solid ${COLORS.rojoBanorte};
          display: flex;
          flex-direction: column;
        }
        .card-title { font-size: 14px; font-weight: 700; color: ${COLORS.grisOscuro}; margin-bottom: 12px; }
        .tip-box {
          background: white;
          border-left: 4px solid #FFCC00;
          padding: 12px 18px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          color: ${COLORS.grisOscuro};
          border-radius: 0px; 
        }
        .tip-box strong { color: ${COLORS.rojoBanorte}; }
      `}</style>

      <div className="app-container">
        <header className="main-header">
          <div className="header-logo">
            <img src={miLogoBanorte} alt="Banorte" />
          </div>
        </header>

        <div className="content-layout">
          <aside className="sidebar">
            <div className="sidebar-title-box">
              <div className="sidebar-section-title">Dashboard</div>
            </div>
            {/* AQUÍ USAMOS LAS VARIABLES DE IMAGEN IMPORTADAS */}
            <NavItem label="Inicio" img={iconHome} active={false} />
            <NavItem label="Mis Gastos" img={iconInspeccion} active={true} />
            <NavItem label="Límites" img={iconSettings} active={false} />
          </aside>

          <main className="main-view">
            {/* Resto del contenido igual... */}
            <div className="breadcrumb-strip">
              <div className="breadcrumb">
                <span className="breadcrumb-item">Inicio</span>
                <span className="breadcrumb-separator">›</span>
                <span className="breadcrumb-item">Mis Gastos</span>
              </div>
            </div>

            <div className="main-content-area">
              <div className="current-page">Análisis de Gastos</div>

              <div className="tabs">
                {TABS.map((tab) => (
                  <button 
                    key={tab} 
                    className={`tab-btn ${activeTab === tab ? "active" : ""}`} 
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="charts-grid">
                <div className="card">
                  <span className="card-title">Tendencia de Gastos</span>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                      <YAxis hide domain={[0, 'dataMax + 1000']} />
                      <Tooltip cursor={{fill: '#f8f8f8'}} />
                      <Bar dataKey="value" radius={0} barSize={45} label={<CustomBarLabel />}>
                        {barData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="card">
                  <span className="card-title">Distribución por Categoría</span>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={pieData} 
                        cx="50%" 
                        cy="45%" 
                        innerRadius="30%" 
                        outerRadius="100%" 
                        dataKey="value" 
                        paddingAngle={5}
                      >
                        {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip />
                      <Legend 
                        wrapperStyle={{fontSize: '10px', paddingTop: '10px'}} 
                        verticalAlign="bottom" 
                        height={36}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="tip-box">
                <span>💡</span>
                <p><strong>Sugerencia Banorte:</strong> Detectamos un incremento en ocio. ¡Ahorrar este mes te ayudará a cumplir tu meta!</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
function NavItem({ img, label, active }) {
  return (
    <div className={`nav-item ${active ? "active" : ""}`}>
      <img src={img} alt={label} className="nav-icon" />
      <span>{label}</span>
    </div>
  );
}