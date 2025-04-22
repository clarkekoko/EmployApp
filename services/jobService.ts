import { Job } from '../types/job';
import { mockJobs } from './mockJobData';

// Get all jobs
export const getAllJobs = async (): Promise<Job[]> => {
  try {
    return mockJobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

// Get job by ID
export const getJobById = async (id: string): Promise<Job | null> => {
  try {
    const job = mockJobs.find(job => job.id === id);
    return job || null;
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error;
  }
};

// Search jobs
export const searchJobs = async (query: string): Promise<Job[]> => {
  try {
    const lowerCaseQuery = query.toLowerCase();
    return mockJobs.filter(job => 
      job.title.toLowerCase().includes(lowerCaseQuery) ||
      job.employer.toLowerCase().includes(lowerCaseQuery) ||
      job.location.toLowerCase().includes(lowerCaseQuery) ||
      job.description.toLowerCase().includes(lowerCaseQuery)
    );
  } catch (error) {
    console.error('Error searching jobs:', error);
    throw error;
  }
};

// Add a new job
export const addJob = async (jobData: Omit<Job, 'id'>): Promise<string | null> => {
  try {
    const newJob: Job = {
      ...jobData,
      id: (mockJobs.length + 1).toString()
    };
    mockJobs.push(newJob);
    return newJob.id;
  } catch (error) {
    console.error('Error adding job:', error);
    return null;
  }
};

// Update a job
export const updateJob = async (jobId: string, jobData: Partial<Job>): Promise<boolean> => {
  try {
    const index = mockJobs.findIndex(job => job.id === jobId);
    if (index === -1) return false;
    
    mockJobs[index] = {
      ...mockJobs[index],
      ...jobData
    };
    return true;
  } catch (error) {
    console.error('Error updating job:', error);
    return false;
  }
};

// Delete a job
export const deleteJob = async (jobId: string): Promise<boolean> => {
  try {
    const index = mockJobs.findIndex(job => job.id === jobId);
    if (index === -1) return false;
    
    mockJobs.splice(index, 1);
    return true;
  } catch (error) {
    console.error('Error deleting job:', error);
    return false;
  }
};
