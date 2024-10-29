import JobList from '@/components/jobList/JobList';
import { Suspense } from 'react';

export default function JobListPage() {
  return (
    <Suspense>
      <JobList />
    </Suspense>
  );
}