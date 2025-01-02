import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/lib/supabase';
import { Application } from '@/types/application';
import ApplicationCard from './admin/ApplicationCard';
import ApplicationFilters from './admin/ApplicationFilters';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');

  useEffect(() => {
    checkAuth();
    fetchApplications();
  }, []);

  async function checkAuth() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user || session.user.email !== 'tarinagarwal@gmail.com') {
      navigate('/admin-login');
    }
  }

  async function fetchApplications() {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setApplications(data);
    } catch (error) {
      toast.error('Error fetching applications');
    } finally {
      setLoading(false);
    }
  }

  const filteredApplications = applications.filter((app) => {
    const searchMatch =
      app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.usn.toLowerCase().includes(searchTerm.toLowerCase());

    const experienceMatch =
      experienceFilter === 'all' || app.experience_level === experienceFilter;

    return searchMatch && experienceMatch;
  });

  const exportToCSV = () => {
    // ... (keep the existing exportToCSV function)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <Card className="container mx-auto max-w-7xl bg-gray-800 border-gray-700 shadow-2xl">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-100">
              Game Dev Applications
            </CardTitle>
            <p className="text-gray-400 text-sm sm:text-base">
              Total Applications: {filteredApplications.length}
            </p>
          </div>
          <Button
            onClick={exportToCSV}
            className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          <ApplicationFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            experienceFilter={experienceFilter}
            onExperienceFilterChange={setExperienceFilter}
          />

          <ScrollArea className="h-[calc(100vh-300px)]">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {filteredApplications.map((application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

