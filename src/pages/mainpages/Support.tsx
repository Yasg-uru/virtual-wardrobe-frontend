import React from "react";
import { FaEnvelope, FaPhone, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Support: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 p-6 transition-colors duration-500">
      <header className="text-center mb-12">
        <motion.h1
          className="text-5xl font-bold mb-4 p-5 text-gradient shadow-2xl shadow-green-600 dark:shadow-blue-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Virtual Wardrobe Support
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          We're here to help you make the most of your Virtual Wardrobe
          experience.
        </motion.p>
      </header>

      <section className="max-w-4xl mx-auto mb-16">
        <motion.h2
          className="text-3xl font-bold mb-6 flex items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FaQuestionCircle className="mr-2" /> Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4">
          {[
            {
              question: "How do I add items to my wardrobe?",
              answer:
                'To add items to your wardrobe, navigate to the "+ Add Cloth" section in the app. Fill in the details, upload a photo, and click "Save."',
            },
            {
              question: "Can I track how often I wear certain items?",
              answer:
                "Yes, the Wear Tracking feature allows you to log each time you wear an item and provides insights on your most and least worn clothes.",
            },
            {
              question: "How do I get recommendations based on the weather?",
              answer:
                "Our advanced recommendation engine suggests outfits based on the current weather conditions and your preferences, such as material and style.",
            },
            {
              question: "What should I do if I encounter a bug?",
              answer:
                "Please contact our support team with a detailed description of the issue. We’ll work to resolve it as quickly as possible.",
            },
            {
              question: "Where can I view my wear analysis?",
              answer:
                "You can view your wear analysis in the 'Wear Analysis' section of the app. This feature provides insights into your most and least worn items, cost-per-wear analysis, and suggestions for underutilized clothes.",
            },
            {
              question: "How do I access my clothing collections?",
              answer:
                "To view your collections, navigate to the 'Collections' section from the main menu. Here, you can organize and browse through your clothes based on different themes or categories.",
            },
            {
              question:
                "How do I get weather-recommended clothing on the home page?",
              answer:
                "When you visit the home page, you'll see a 'Weather Recommendations' section that suggests outfits based on the current weather. This feature considers factors like temperature, precipitation, and your personal preferences.",
            },
          ].map((faq, index) => (
            <motion.details
              key={index}
              className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <summary className="cursor-pointer font-semibold">
                {faq.question}
              </summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {faq.answer}
              </p>
            </motion.details>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto mb-16">
        <motion.h2
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </motion.h2>
        <motion.div
          className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="text-gray-700 dark:text-gray-300">
            If you need further assistance, feel free to reach out to our
            support team.
          </p>
          <div className="flex items-center space-x-4">
            <FaPhone className="text-lg text-indigo-600 dark:text-indigo-400" />
            <span className="font-semibold">Phone:</span>
            <span>+91 7999379411</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-lg text-pink-600 dark:text-pink-400" />
            <span className="font-semibold">Email:</span>
            <span>yashpawar12122004@gmail.com</span>
          </div>
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto mb-16">
        <motion.h2
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Additional Resources
        </motion.h2>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <a
            href="/user-manual"
            className="block text-indigo-600 dark:text-indigo-300 underline hover:text-indigo-800 dark:hover:text-indigo-500 transition duration-300"
          >
            User Manual
          </a>
          <a
            href="/privacy-policy"
            className="block text-pink-600 dark:text-pink-300 underline hover:text-pink-800 dark:hover:text-pink-500 transition duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="block text-green-600 dark:text-green-300 underline hover:text-green-800 dark:hover:text-green-500 transition duration-300"
          >
            Terms of Service
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Support;
