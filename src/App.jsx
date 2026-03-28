/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  Gamepad2, 
  Search, 
  Ghost, 
  Settings, 
  Star, 
  TrendingUp, 
  Clock, 
  ExternalLink,
  X,
  Maximize2,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const GAMES = [
  {
    id: "2048",
    title: "2048",
    thumbnail: "https://picsum.photos/seed/2048/400/300",
    url: "https://play2048.co/",
    category: "Puzzle",
    rating: 4.8,
    isHot: true
  },
  {
    id: "hextris",
    title: "Hextris",
    thumbnail: "https://picsum.photos/seed/hextris/400/300",
    url: "https://hextris.io/",
    category: "Arcade",
    rating: 4.5
  },
  {
    id: "slope",
    title: "Slope",
    thumbnail: "https://picsum.photos/seed/slope/400/300",
    url: "https://slopegame.io/",
    category: "Action",
    rating: 4.9,
    isHot: true
  },
  {
    id: "cookie-clicker",
    title: "Cookie Clicker",
    thumbnail: "https://picsum.photos/seed/cookie/400/300",
    url: "https://orteil.dashnet.org/cookieclicker/",
    category: "Idle",
    rating: 4.7
  },
  {
    id: "tetris",
    title: "Tetris",
    thumbnail: "https://picsum.photos/seed/tetris/400/300",
    url: "https://tetris.com/play-tetris",
    category: "Classic",
    rating: 4.9
  },
  {
    id: "paper-io",
    title: "Paper.io 2",
    thumbnail: "https://picsum.photos/seed/paperio/400/300",
    url: "https://paper-io.com/",
    category: "IO",
    rating: 4.6,
    isNew: true
  },
  {
    id: "crossy-road",
    title: "Crossy Road",
    thumbnail: "https://picsum.photos/seed/crossy/400/300",
    url: "https://www.poki.com/en/g/crossy-road",
    category: "Arcade",
    rating: 4.4
  },
  {
    id: "minecraft-classic",
    title: "Minecraft Classic",
    thumbnail: "https://picsum.photos/seed/mc/400/300",
    url: "https://classic.minecraft.net/",
    category: "Sandbox",
    rating: 5.0,
    isHot: true
  },
  {
    id: "bitlife",
    title: "BitLife",
    thumbnail: "https://picsum.photos/seed/bitlife/400/300",
    url: "https://bitlifeonline.io/",
    category: "Simulation",
    rating: 4.3
  },
  {
    id: "geometry-dash",
    title: "Geometry Dash",
    thumbnail: "https://picsum.photos/seed/gd/400/300",
    url: "https://geometrydash.io/",
    category: "Arcade",
    rating: 4.8,
    isHot: true
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers",
    thumbnail: "https://picsum.photos/seed/subway/400/300",
    url: "https://poki.com/en/g/subway-surfers",
    category: "Arcade",
    rating: 4.7
  },
  {
    id: "among-us",
    title: "Among Us Online",
    thumbnail: "https://picsum.photos/seed/among/400/300",
    url: "https://amongusplay.online/",
    category: "Action",
    rating: 4.5
  }
];

const CATEGORIES = ["All", "Action", "Puzzle", "Arcade", "Idle", "Classic", "IO", "Sandbox", "Simulation"];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGame, setSelectedGame] = useState(null);
  const [isStealthMode, setIsStealthMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Stealth Mode Effect: Change Tab Title and Favicon
  useEffect(() => {
    if (isStealthMode) {
      document.title = "Google Classroom";
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = 'https://ssl.gstatic.com/classroom/favicon.png';
      document.getElementsByTagName('head')[0].appendChild(link);
    } else {
      document.title = "Nexus Unblocked";
      const link = document.querySelector("link[rel*='icon']");
      if (link) link.href = "/vite.svg";
    }
  }, [isStealthMode]);

  const filteredGames = GAMES.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedGame(null)}>
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Gamepad2 className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tighter hidden sm:block">NEXUS<span className="text-orange-500">GAMES</span></span>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-orange-500 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Search games..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsStealthMode(!isStealthMode)}
              className={`p-2 rounded-full transition-all ${isStealthMode ? 'bg-orange-500 text-white' : 'hover:bg-white/10 text-white/60'}`}
              title="Stealth Mode (Cloak Tab)"
            >
              <Ghost size={20} />
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full hover:bg-white/10 text-white/60 transition-all"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat 
                ? 'bg-orange-500 text-white' 
                : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hero Section (Only shown when no game selected) */}
        {!selectedGame && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 relative rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[3/1] group"
          >
            <img 
              src="https://picsum.photos/seed/gaming/1200/400" 
              alt="Featured" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Featured</span>
                <span className="text-white/60 text-xs flex items-center gap-1"><Star size={12} className="fill-orange-500 text-orange-500" /> 5.0 Rating</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">MINECRAFT CLASSIC</h1>
              <button 
                onClick={() => setSelectedGame(GAMES.find(g => g.id === "minecraft-classic") || null)}
                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2"
              >
                Play Now <ExternalLink size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Game Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game, index) => (
              <motion.div
                layout
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedGame(game)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-3">
                  <img 
                    src={game.thumbnail} 
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-xl shadow-orange-500/40">
                      <Gamepad2 size={24} />
                    </div>
                  </div>
                  {game.isNew && (
                    <span className="absolute top-3 left-3 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">New</span>
                  )}
                  {game.isHot && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Hot</span>
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white/90 group-hover:text-orange-500 transition-colors">{game.title}</h3>
                    <p className="text-xs text-white/40">{game.category}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-orange-500 font-medium">
                    <Star size={12} className="fill-orange-500" />
                    {game.rating}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredGames.length === 0 && (
          <div className="py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-4">
              <Search size={32} className="text-white/20" />
            </div>
            <h2 className="text-xl font-bold text-white/60">No games found</h2>
            <p className="text-white/40 text-sm">Try searching for something else or change category.</p>
          </div>
        )}
      </main>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          >
            <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
                <h2 className="font-bold text-sm sm:text-base">{selectedGame.title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/10 rounded-full text-white/60 transition-all">
                  <Maximize2 size={18} />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-full text-white/60 transition-all">
                  <Info size={18} />
                </button>
                <a 
                  href={selectedGame.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-orange-600 transition-all flex items-center gap-2"
                >
                  Open in New Tab <ExternalLink size={14} />
                </a>
              </div>
            </div>
            <div className="flex-1 bg-black relative">
              <iframe 
                src={selectedGame.url}
                className="w-full h-full border-none"
                title={selectedGame.title}
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-black/60"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Settings</h2>
                  <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-white/10 rounded-full">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">Stealth Mode</p>
                      <p className="text-xs text-white/40">Changes tab title and icon to Google Classroom</p>
                    </div>
                    <button 
                      onClick={() => setIsStealthMode(!isStealthMode)}
                      className={`w-12 h-6 rounded-full transition-all relative ${isStealthMode ? 'bg-orange-500' : 'bg-white/10'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isStealthMode ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-white/40 mb-2">About Nexus Games</p>
                    <p className="text-sm text-white/60 leading-relaxed">
                      A high-performance portal for unblocked web games. Built for speed, privacy, and accessibility.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Gamepad2 className="text-orange-500" size={24} />
                <span className="text-xl font-bold tracking-tighter">NEXUS<span className="text-orange-500">GAMES</span></span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                The ultimate destination for unblocked gaming. Play your favorite games anywhere, anytime.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Popular Games</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">New Releases</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Request a Game</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">DMCA Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all cursor-pointer">
                  <TrendingUp size={20} />
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all cursor-pointer">
                  <Clock size={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-xs text-white/20">
            &copy; 2026 Nexus Games. All rights reserved. Not affiliated with any game developers mentioned.
          </div>
        </div>
      </footer>
    </div>
  );
}
