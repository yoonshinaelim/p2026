export interface ExperienceItem {
    id: number;
    title1: string;
    title2: string;
    company: string;
    period: string;
    description: string[];
  }
  
  export const experienceData: ExperienceItem[] = [
    {
      id: 1,
      title1: "SHINHANCARD",
      title2: "web & mobile management",
      company: "M4A",
      period: "2026.04",
      description: ["React 및 TypeScript 기반의 웹 서비스 개발", "컴포넌트 중심의 설계 및 디자인 시스템 구축"]
    },
    {
      id: 2,
      title1: "Industrial Designer",
      title2: "Industrial Designer",
      company: "Creative Studio",
      period: "2017.03 - 2019.03",
      description: ["제품 외형 및 구조 설계", "사용자 중심의 인터페이스 프로토타이핑"]
    },
  ];