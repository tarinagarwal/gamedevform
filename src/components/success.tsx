import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('subtle-grid.svg')] bg-center opacity-10"></div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Card className="backdrop-blur-sm bg-gray-800/30 border-gray-700/20 shadow-xl text-gray-100">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mx-auto"
            >
              <CheckCircle className="w-16 h-16 text-green-400" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-gray-100">
              Thank You!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg">
              Your application has been successfully submitted. We appreciate
              your interest in joining Alterino Game Dev!
            </p>
            <p className="text-lg">
              Please join our WhatsApp group to stay updated:
            </p>
            <a
              href="https://chat.whatsapp.com/EqgMBSGrcOG5r0jwzdxDKr"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Join WhatsApp Group
            </a>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
