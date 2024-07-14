import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, BookOpen, GraduationCap, Cherry, Star } from 'lucide-react';

const StudentRegistration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // API呼び出しをシミュレート
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(data);
    setRegistrationSuccess(true);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (registrationSuccess) {
      const timer = setTimeout(() => setRegistrationSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess]);

  const inputClasses = "w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors duration-200 ease-in-out";
  const labelClasses = "block mb-2 text-sm font-medium text-gray-600";
  const errorClasses = "mt-1 text-xs text-red-500";

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
            <Cherry className="mr-2 text-pink-500" />
            学生登録
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className={labelClasses}>
                <User className="inline mr-2" size={16} />
                氏名
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "氏名は必須です" })}
                className={inputClasses}
              />
              {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className={labelClasses}>
                <Mail className="inline mr-2" size={16} />
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { 
                  required: "メールアドレスは必須です",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "有効なメールアドレスを入力してください"
                  }
                })}
                className={inputClasses}
              />
              {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className={labelClasses}>
                <Phone className="inline mr-2" size={16} />
                電話番号
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone", { 
                  required: "電話番号は必須です",
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: "有効な電話番号を入力してください"
                  }
                })}
                className={inputClasses}
              />
              {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="birthdate" className={labelClasses}>
                <Calendar className="inline mr-2" size={16} />
                生年月日
              </label>
              <input
                id="birthdate"
                type="date"
                {...register("birthdate", { required: "生年月日は必須です" })}
                className={inputClasses}
              />
              {errors.birthdate && <p className={errorClasses}>{errors.birthdate.message}</p>}
            </div>

            <div>
              <label htmlFor="school" className={labelClasses}>
                <GraduationCap className="inline mr-2" size={16} />
                学校名
              </label>
              <input
                id="school"
                type="text"
                {...register("school", { required: "学校名は必須です" })}
                className={inputClasses}
              />
              {errors.school && <p className={errorClasses}>{errors.school.message}</p>}
            </div>

            <div>
              <label htmlFor="course" className={labelClasses}>
                <BookOpen className="inline mr-2" size={16} />
                希望コース
              </label>
              <select
                id="course"
                {...register("course", { required: "希望コースは必須です" })}
                className={inputClasses}
              >
                <option value="">選択してください</option>
                <option value="business">ビジネス</option>
                <option value="creator">クリエイター</option>
                <option value="engineer">エンジニア</option>
              </select>
              {errors.course && <p className={errorClasses}>{errors.course.message}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 text-white bg-gradient-to-r from-pink-500 to-red-500 rounded-md hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200 ease-in-out"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  登録中...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Star className="mr-2" size={16} />
                  登録する
                </span>
              )}
            </motion.button>
          </form>

          {registrationSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="mt-4 p-4 bg-green-100 text-green-700 rounded-md"
            >
              登録が完了しました！
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;