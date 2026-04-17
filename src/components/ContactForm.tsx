import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from '@emailjs/browser';

// Zod 스키마 정의
const contactSchema = z.object({
  name: z.string().min(2, "이름을 입력해주세요."),
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  phone: z.string().regex(/^010-\d{4}-\d{4}$/, "010-****-**** 형식으로 입력해주세요."),
  company: z.string().min(1, " 회사명을 입력해주세요."),
  message: z.string().min(1, "내용을 입력해주세요."),
});

type ContactFormData = z.infer<typeof contactSchema>;
export const ContactForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
    } = useForm<ContactFormData>({
      resolver: zodResolver(contactSchema),
    });

      const onSubmit = async (data: ContactFormData) => {
        try {
          await emailjs.send(
            "ysal4505@gmail.com",
            "template_7qlwtge",
            {
              from_name: data.name,   
              from_email: data.email, 
              phone: data.phone,      
              company: data.company,  
              message: data.message,  
            },
            "uIqJmu5H3bIHqJI5x"
          );
          
          alert("문의가 접수되었습니다!");
        } catch (error) {
          alert("전송 실패");
        }
      };
  
    return (
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" {...register("name")} autoComplete="off" placeholder="name" />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
            <input type="email" {...register("email")} autoComplete="off" placeholder="e-mail" />
        </div>
        <div>
          <input type="tel" {...register("phone")} autoComplete="off" placeholder="phone number" />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
        <div>
          <input type="text" {...register("company")} autoComplete="off" placeholder="company" />
          {errors.company && <p>{errors.company.message}</p>}
        </div>

        <div>
          <textarea {...register("message")} autoComplete="off" placeholder="message" />
          {errors.message && <p>{errors.message.message}</p>}
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "전송 중..." : "send"}
        </button>
      </form>
    );
  };