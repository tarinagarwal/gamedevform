import { useState } from 'react';
import { Application } from '@/types/application';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface ApplicationCardProps {
  application: Application;
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="w-full bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-lg hover:shadow-gray-800/20 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-200">{application.full_name}</h3>
            <p className="text-sm text-gray-400">{application.email}</p>
          </div>
          <Badge variant="outline" className="mt-2 sm:mt-0 text-gray-300 border-gray-600 bg-gray-800">
            {application.experience_level}
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="text-sm font-medium text-gray-300">{application.phone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Branch & Semester</p>
            <p className="text-sm font-medium text-gray-300">{application.branch_semester}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Weekly Hours</p>
            <p className="text-sm font-medium text-gray-300">{application.weekly_hours}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {application.skillset.map((skill) => (
            <Badge key={skill} variant="secondary" className="bg-gray-700 text-gray-300">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Badge 
            variant={application.has_computer ? "success" : "destructive"}
            className={application.has_computer ? "bg-green-800 text-green-200" : "bg-red-800 text-red-200"}
          >
            {application.has_computer ? "Has Computer" : "No Computer"}
          </Badge>
          <Badge 
            variant={application.has_projects ? "success" : "secondary"}
            className={application.has_projects ? "bg-green-800 text-green-200" : "bg-red-800 text-red-200"}
          >
            {application.has_projects ? "Has Projects" : "No Projects"}
          </Badge>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ScrollArea className="h-[150px] rounded-md border border-gray-700 bg-gray-800 p-4 mb-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Gaming Preferences</p>
                      <p className="text-sm text-gray-300">{application.gaming_preferences || "--"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Why Join?</p>
                      <p className="text-sm text-gray-300">{application.join_reason}</p>
                    </div>
                  </div>
                </ScrollArea>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">USN/Roll no</p>
                    <p className="text-sm font-medium text-gray-300">{application.usn}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Communication Platform</p>
                    <p className="text-sm font-medium text-gray-300">{application.communication_platform}</p>
                  </div>
                </div>

                {application.has_projects && application.portfolio_link && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Portfolio</p>
                    <a 
                      href={application.portfolio_link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                    >
                      {application.portfolio_link}
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center text-gray-400 hover:text-gray-300 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-5 h-5 mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-5 h-5 mr-1" />
              Show More
            </>
          )}
        </button>
      </CardContent>
    </Card>
  );
}

