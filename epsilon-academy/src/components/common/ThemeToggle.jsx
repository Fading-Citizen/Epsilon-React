import React from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../themes/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme} $isDark={isDarkMode}>
      <IconWrapper $isActive={!isDarkMode}>
        <Sun size={16} />
      </IconWrapper>
      <IconWrapper $isActive={isDarkMode}>
        <Moon size={16} />
      </IconWrapper>
      <Slider $isDark={isDarkMode} />
    </ToggleButton>
  );
};

const ToggleButton = styled.button`
  position: relative;
  width: 60px;
  height: 30px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background: ${props => props.$isDark ? '#334155' : '#e2e8f0'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px;
  overflow: hidden;

  &:hover {
    background: ${props => props.$isDark ? '#475569' : '#cbd5e1'};
  }
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 2;
  transition: all 0.3s ease;
  color: ${props => props.$isActive ? '#ffffff' : '#64748b'};
`;

const Slider = styled.div`
  position: absolute;
  top: 3px;
  left: ${props => props.$isDark ? '33px' : '3px'};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #18e2a2 0%, #087799 100%);
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export default ThemeToggle;
