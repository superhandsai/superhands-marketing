-- Create contact_submissions table for storing contact form submissions
-- Run this script in your Supabase SQL Editor

-- Create the table
create table public.contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.contact_submissions enable row level security;

-- Allow anyone to insert (for form submissions)
create policy "Enable insert for all users" on public.contact_submissions
  for insert with check (true);

-- Only allow reads for authenticated users (admin access)
create policy "Enable read access for authenticated users only" on public.contact_submissions
  for select using (auth.role() = 'authenticated');

-- Optional: Create an index on created_at for faster queries
create index contact_submissions_created_at_idx on public.contact_submissions(created_at desc);

-- Optional: Create an index on email for searching
create index contact_submissions_email_idx on public.contact_submissions(email);
