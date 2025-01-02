export type Application = {
  id: string;
  created_at: string;
  full_name: string;
  usn: string;
  branch_semester: string;
  email: string;
  phone: string;
  skillset: string[];
  experience_level: string;
  has_projects: boolean;
  portfolio_link?: string;
  weekly_hours: string;
  communication_platform: string;
  gaming_preferences?: string;
  join_reason: string;
  has_computer: boolean;
};