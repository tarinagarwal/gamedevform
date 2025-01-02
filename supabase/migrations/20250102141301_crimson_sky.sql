/*
  # Game Development Club Applications Schema

  1. New Tables
    - `applications`
      - Basic information fields
      - Skills and experience
      - Preferences
      - Additional information
  
  2. Security
    - Enable RLS
    - Add policies for:
      - Insert access for authenticated and anonymous users
      - Select access for admin users only
*/

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  
  -- Basic Information
  full_name text NOT NULL,
  usn text NOT NULL,
  branch_semester text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  
  -- Skills and Experience
  skillset text[] NOT NULL,
  experience_level text NOT NULL,
  has_projects boolean NOT NULL,
  portfolio_link text,
  
  -- Preferences
  weekly_hours text NOT NULL,
  communication_platform text NOT NULL,
  gaming_preferences text,
  
  -- Additional Information
  join_reason text NOT NULL,
  has_computer boolean NOT NULL
);

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone
CREATE POLICY "Anyone can insert applications"
  ON applications
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only admins can view applications
CREATE POLICY "Only admins can view applications"
  ON applications
  FOR SELECT
  TO authenticated
  USING (auth.email() = 'tarinagarwal@gmail.com');