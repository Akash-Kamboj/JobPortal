import React from 'react'
import JobCards from './JobCards'

const randomJobs = [1,2,3,4,5,6,7,8]

export default function LatestJobs() {
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-4xl font-bold">
        <span className="text-[#6A38C2">Latest & Top </span>Job Openings{" "}
      </h2>

      <div className="grid grid-cols-3 gap-4 my-5">
        {randomJobs.map((job, index) => (
          <JobCards></JobCards>
        ))}
      </div>
    </div>
  );
}
