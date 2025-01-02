import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { GamepadIcon, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import ThankYouPage from "./success";

const skillOptions = [
  "Programming",
  "Art/Design",
  "Game Writing",
  "Sound Design",
  "Testing",
  "Can't Say",
] as const;

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  usn: z.string().min(1, "USN is required"),
  branchSemester: z.string().min(1, "Branch and semester are required"),
  email: z.string().email(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  skillset: z.array(z.string()).min(1, "Select at least one skill"),
  experienceLevel: z.enum([
    "Beginner",
    "Intermediate",
    "Advanced",
    "Can't Say",
  ]),
  hasProjects: z.boolean(),
  portfolioLink: z.string().optional(),
  weeklyHours: z.enum(["<5 hours", "5-10 hours", "10+ hours"]),
  communicationPlatform: z.enum(["WhatsApp", "Discord", "Email"]),
  gamingPreferences: z.string().optional(),
  joinReason: z.string().min(10, "Please provide a reason"),
  hasComputer: z.boolean(),
});

export default function ApplicationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillset: [],
      hasProjects: false,
      hasComputer: false,
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error } = await supabase.from("applications").insert([
        {
          full_name: values.fullName,
          usn: values.usn,
          branch_semester: values.branchSemester,
          email: values.email,
          phone: values.phone,
          skillset: values.skillset,
          experience_level: values.experienceLevel,
          has_projects: values.hasProjects,
          portfolio_link: values.portfolioLink,
          weekly_hours: values.weeklyHours,
          communication_platform: values.communicationPlatform,
          gaming_preferences: values.gamingPreferences,
          join_reason: values.joinReason,
          has_computer: values.hasComputer,
        },
      ]);

      if (error) throw error;

      toast.success("Application submitted successfully!");
      form.reset();
      setIsSubmitted(true);
    } catch (error) {
      toast.error("Error submitting application. Please try again.");
    }
  }

  if (isSubmitted) {
    return <ThankYouPage />;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/subtle-grid.svg')] bg-center opacity-10"></div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-purple-900/20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 20,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-4xl relative z-10"
      >
        <Card className="backdrop-blur-sm bg-gray-800/50 border-gray-700/20 shadow-xl text-gray-100">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mx-auto"
            >
              <GamepadIcon className="w-16 h-16 text-white" />
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Alterino Game Dev
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-700/50 border-gray-600 text-gray-100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="usn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>USN/Roll Number *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-700/50 border-gray-600 text-gray-100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="branchSemester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch and Semester *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-700/50 border-gray-600 text-gray-100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            className="bg-gray-700/50 border-gray-600 text-gray-100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            {...field}
                            className="bg-gray-700/50 border-gray-600 text-gray-100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skillset"
                    render={() => (
                      <FormItem>
                        <FormLabel>Skillset/Areas of Interest *</FormLabel>
                        <div className="grid grid-cols-2 gap-2">
                          {skillOptions.map((skill) => (
                            <FormField
                              key={skill}
                              control={form.control}
                              name="skillset"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(skill)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              skill,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== skill
                                              )
                                            );
                                      }}
                                      className="border-gray-600 text-blue-500"
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {skill}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-100">
                              <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Can't Say">Can't Say</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasProjects"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-gray-600 text-blue-500"
                          />
                        </FormControl>
                        <FormLabel>
                          Have you worked on any game development projects?
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("hasProjects") && (
                    <FormField
                      control={form.control}
                      name="portfolioLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Portfolio/Project Link</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="bg-gray-700/50 border-gray-600 text-gray-100"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="weeklyHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weekly Hours Availability *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-100">
                              <SelectValue placeholder="Select available hours" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="<5 hours">
                              &lt;5 hours
                            </SelectItem>
                            <SelectItem value="5-10 hours">
                              5-10 hours
                            </SelectItem>
                            <SelectItem value="10+ hours">10+ hours</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="communicationPlatform"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Preferred Communication Platform *
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-100">
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                            <SelectItem value="Discord">Discord</SelectItem>
                            <SelectItem value="Email">Email</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gamingPreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gaming Preferences</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What are your favorite genres or games?"
                            {...field}
                            className="bg-gray-700/50 border-gray-600 text-gray-100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="joinReason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Why do you want to join this club? *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="bg-gray-700/50 border-gray-600 text-gray-100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasComputer"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-gray-600 text-blue-500"
                          />
                        </FormControl>
                        <FormLabel>
                          Do you have a personal PC/laptop for development?
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Submit Application
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
