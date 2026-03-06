import React, { useEffect, useState } from 'react';
import { getTimeUntilMilestone, formatDate } from '@/utils/helpers';

interface CountdownProps {
  milestoneTimestamp: number;
}

export const Countdown: React.FC<CountdownProps> = ({ milestoneTimestamp }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMilestone(milestoneTimestamp));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilMilestone(milestoneTimestamp));
    }, 1000);

    return () => clearInterval(timer);
  }, [milestoneTimestamp]);

  if (timeLeft.isPast) {
    return (
      <div className="text-center py-8">
        <div className="inline-block bg-rsk-orange/10 border border-rsk-orange rounded-2xl px-8 py-6">
          <div className="text-2xl font-bold text-rsk-orange mb-2">
            🎉 Milestone Reached! 🎉
          </div>
          <div className="text-gray-400">
            {formatDate(milestoneTimestamp)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <div className="text-sm text-gray-400 mb-4 uppercase tracking-wide">
        Time Until 3000 Days Milestone
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        <div className="bg-rsk-gray border border-rsk-orange/30 rounded-2xl p-6 hover:border-rsk-orange transition-colors">
          <div className="text-5xl font-bold text-rsk-orange font-mono">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-400 mt-2 uppercase tracking-wide">Days</div>
        </div>

        <div className="bg-rsk-gray border border-rsk-orange/30 rounded-2xl p-6 hover:border-rsk-orange transition-colors">
          <div className="text-5xl font-bold text-rsk-light font-mono">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-400 mt-2 uppercase tracking-wide">Hours</div>
        </div>

        <div className="bg-rsk-gray border border-rsk-orange/30 rounded-2xl p-6 hover:border-rsk-orange transition-colors">
          <div className="text-5xl font-bold text-rsk-light font-mono">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-400 mt-2 uppercase tracking-wide">Minutes</div>
        </div>

        <div className="bg-rsk-gray border border-rsk-orange/30 rounded-2xl p-6 hover:border-rsk-orange transition-colors">
          <div className="text-5xl font-bold text-rsk-light font-mono">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-400 mt-2 uppercase tracking-wide">Seconds</div>
        </div>
      </div>

      <div className="text-gray-400 mt-6">
        Milestone Date: <span className="text-rsk-orange font-semibold">{formatDate(milestoneTimestamp)}</span>
      </div>
    </div>
  );
};
