import React, { useState, useEffect } from 'react';
import masterConfig from '../config/master.config.js';

interface Region {
  name: string;
  code: string;
  country: string;
  currency: string;
  language: string;
  isActive: boolean;
  isPrimary: boolean;
}

interface RegionSelectorProps {
  onRegionChange: (region: Region) => void;
  currentRegion?: string;
  className?: string;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  onRegionChange,
  currentRegion = 'midlands',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    // Load regions from master config
    const activeRegions = Object.values(masterConfig.global.regions)
      .filter((region: any) => region.isActive)
      .map((region: any) => ({
        name: region.name,
        code: region.code,
        country: region.country,
        currency: region.currency,
        language: region.language,
        isActive: region.isActive,
        isPrimary: region.isPrimary
      }));
    
    setRegions(activeRegions);
    
    // Set current region
    const current = activeRegions.find(r => r.code === currentRegion);
    if (current) {
      setSelectedRegion(current);
    }
  }, [currentRegion]);

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    setIsOpen(false);
    onRegionChange(region);
  };

  const getFlagEmoji = (country: string) => {
    const flagMap: { [key: string]: string } = {
      'UK': '🇬🇧',
      'IE': '🇮🇪',
      'DE': '🇩🇪',
      'FR': '🇫🇷',
      'NL': '🇳🇱'
    };
    return flagMap[country] || '🌍';
  };

  const getCurrencySymbol = (currency: string) => {
    const currencyMap: { [key: string]: string } = {
      'GBP': '£',
      'EUR': '€',
      'USD': '$'
    };
    return currencyMap[currency] || currency;
  };

  if (!selectedRegion) {
    return <div>Loading regions...</div>;
  }

  return (
    <div className={`region-selector ${className}`}>
      <button
        className="region-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select region"
      >
        <span className="region-flag">
          {getFlagEmoji(selectedRegion.country)}
        </span>
        <span className="region-name">
          {selectedRegion.name}
        </span>
        <span className="region-currency">
          {getCurrencySymbol(selectedRegion.currency)}
        </span>
        <span className="region-arrow">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <div className="region-dropdown">
          {regions.map((region) => (
            <button
              key={region.code}
              className={`region-option ${selectedRegion.code === region.code ? 'selected' : ''}`}
              onClick={() => handleRegionSelect(region)}
            >
              <span className="region-flag">
                {getFlagEmoji(region.country)}
              </span>
              <span className="region-info">
                <span className="region-name">{region.name}</span>
                <span className="region-country">{region.country}</span>
              </span>
              <span className="region-currency">
                {getCurrencySymbol(region.currency)}
              </span>
              {region.isPrimary && (
                <span className="region-primary">Primary</span>
              )}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .region-selector {
          position: relative;
          display: inline-block;
        }

        .region-selector-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(96, 165, 250, 0.1);
          border: 1px solid rgba(96, 165, 250, 0.3);
          border-radius: 8px;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
          font-weight: 500;
        }

        .region-selector-button:hover {
          background: rgba(96, 165, 250, 0.2);
          border-color: rgba(96, 165, 250, 0.5);
        }

        .region-flag {
          font-size: 16px;
        }

        .region-name {
          font-weight: 600;
        }

        .region-currency {
          font-weight: 500;
          color: #60a5fa;
        }

        .region-arrow {
          font-size: 12px;
          color: #94a3b8;
        }

        .region-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #1e293b;
          border: 1px solid rgba(96, 165, 250, 0.3);
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          margin-top: 4px;
          overflow: hidden;
        }

        .region-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: transparent;
          border: none;
          color: #ffffff;
          cursor: pointer;
          transition: background 0.2s ease;
          width: 100%;
          text-align: left;
          font-size: 14px;
        }

        .region-option:hover {
          background: rgba(96, 165, 250, 0.1);
        }

        .region-option.selected {
          background: rgba(96, 165, 250, 0.2);
          color: #60a5fa;
        }

        .region-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .region-country {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 400;
        }

        .region-primary {
          font-size: 10px;
          color: #10b981;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  );
};

export default RegionSelector; 