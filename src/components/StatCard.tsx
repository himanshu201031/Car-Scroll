import React from 'react';

interface StatCardProps {
  id: string;
  percent: string;
  description: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ id, percent, description, className }) => {
  return (
    <div
      id={id}
      className={`stat-card opacity-0 p-8 rounded-xl flex flex-col gap-2 z-20 pointer-events-none ${className}`}
    >
      <span className="text-6xl font-bold tracking-tighter">{percent}</span>
      <span className="text-lg font-medium max-w-[220px] leading-tight opacity-90">{description}</span>
    </div>
  );
};

export default StatCard;
