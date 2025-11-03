"use client";
import React from "react";
import { Award, CheckCircle, Clock } from "lucide-react";

type CourseStatsProps = {
  totalCertificates: number;
  mintedCertificates: number;
  pendingCertificates: number;
};

const CourseStats: React.FC<CourseStatsProps> = ({
  totalCertificates,
  mintedCertificates,
  pendingCertificates,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Certificates */}
      <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalCertificates}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Total Certificates
            </p>
          </div>
        </div>
      </div>

      {/* Minted Certificates */}
      <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {mintedCertificates}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Minted NFTs
            </p>
          </div>
        </div>
      </div>

      {/* Pending Certificates */}
      <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
            <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {pendingCertificates}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Pending Mint
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStats;
